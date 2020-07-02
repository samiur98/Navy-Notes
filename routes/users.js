require('dotenv').config();

const express = require('express');
const router = express.Router();
const body_parser = require('body-parser');
const connection = require('../database');
const crypto = require('crypto');
const cryptoAlgorithm = process.env.CRYPTO_ALGORITHM;
const cryptoKey = process.env.CRYPTO_KEY;

router.use(body_parser.urlencoded({extended: true}));
router.use(body_parser.json());

function encryptPassword(text) {
    // Method for encrypting password.
    let iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv(cryptoAlgorithm, 
        Buffer.from(cryptoKey), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decryptPassword(text) {
    // Method for decrypting enrypted password.
    let textSplit = text.split(':');
    let iv = Buffer.from(textSplit.shift(), 'hex');
    let encryptedText = Buffer.from(textSplit.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(cryptoAlgorithm, Buffer.from(cryptoKey), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

router.get('/userExists/:userName', (req, res) => {
    // GET request that verifys that a user exists.
    const userName = req.params.userName;
    const sqlQuery = `SELECT * FROM users WHERE user_name = "${userName}";`
    userExistsQuery(res, sqlQuery);
})

function userExistsQuery(res, sqlQuery) {
    // Performs query for userExists GET request.
    connection.query(sqlQuery, (err, rows) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            if(rows.length > 0) {
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        }
    });
}

function validateUserField(userName, password) {
    // Function that validates userName and password.
    const valid = userName && password;
    if(!valid) {
        return false;
    }
    if (userName.length <= 4) {
        return false;
    }
    if (password.length < 8) {
        return false;
    }
    return true;
}

router.post('/getUser', (req, res) => {
    // POST request for getting data about a user.
    const userName = req.body.userName;
    const password = req.body.password;
    const valid = validateUserField(userName, password);
    if(!valid) {
        res.sendStatus(400);
        return;
    }

    const sqlQuery = `SELECT * FROM users WHERE user_name = "${userName}";`
    getUserRequest(res, sqlQuery, password);
});

function getUserRequest(res, sqlQuery, providedPassword) {
    // Performs query for getUser POST request.
    connection.query(sqlQuery, (err, rows) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        if (rows.length <= 0) {
            res.sendStatus(404);
            return;
        }
        const decryptedPassword = decryptPassword(rows[0].password);
        if (decryptedPassword !== providedPassword) {
            res.sendStatus(403);
        } else {
            res.send(rows[0]);
        }
    });
}

router.post('/addUser', (req, res) => {
    // POST request for adding a new user.
    const userName = req.body.userName;
    const password = req.body.password;
    const valid = validateUserField(userName, password);
    if(!valid) {
        res.sendStatus(400);
        return;
    } 

    const encryptedPassword = encryptPassword(password);
    const sqlQuery = `INSERT INTO users (user_name, password) values
                      ("${userName}", "${encryptedPassword}");`
    addUserRequest(res, sqlQuery);
});

function addUserRequest(res, sqlQuery) {
    // Performs query for addUser POST request.
    connection.query(sqlQuery, (err) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
}

router.post('/updateUser', (req, res) => {
    // POST request for updating the password of a user.
    const userName = req.body.userName;
    const password = req.body.password;
    const valid = validateUserField(userName, password);
    if (!valid) {
        res.sendStatus(400);
        return;
    }

    const encryptedPassword = encryptPassword(password);
    const sqlQuery = `UPDATE users SET password = "${encryptedPassword}"
                      WHERE user_name = "${userName}";`
    updateUserRequest(res, sqlQuery);
});

function updateUserRequest(res, sqlQuery) {
    // Performs query for updateUser POST request.
    connection.query(sqlQuery, (err) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
}

module.exports = router;