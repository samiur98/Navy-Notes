const express = require('express');
const router = express.Router();
const body_paser = require('body-parser');
const connection = require('../database');

router.use(body_paser.urlencoded({extended: true}));
router.use(body_paser.json());

router.get('/getNotes/:userID', (req, res) => {
    // GET request for all notes of a user.
    const userID = req.params.userID;
    const sqlQuery = `SELECT * FROM notes WHERE userID = ${userID};`;

    connection.query(sqlQuery, (err, rows) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.send(rows);
        }
    });
});

router.get('/getNote/:noteID', (req, res) => {
    // GET request for a particular note, based on noteID.
    const noteID = req.params.noteID;
    const sqlQuery = `SELECT * FROM notes WHERE noteID = ${noteID};`

    connection.query(sqlQuery, (err, rows) => {
        if (err) {
            res.sendStatus(500);
        } else {
            if (rows.length === 0) {
                res.sendStatus(404);
            }
            else {
                res.send(rows);
            }
        }
    });
});

router.post('/addNote', (req, res) => {
    // POST request for adding a new note.
    const title = req.body.title;
    const text = req.body.text;
    const userID = req.body.userID;
    const sqlQuery = `INSERT INTO notes (title, text, userID) values 
                      ("${title}", "${text}", ${userID});`
    const valid = title && text && userID;
    if(!valid) {
        res.sendStatus(400);
        return;
    }

    connection.query(sqlQuery, (err) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    })
});

router.post('/updateNote', (req, res) => {
    // POST request for updating an existing note.
    const noteID = req.body.noteID;
    const title = req.body.title;
    const text = req.body.text;
    const sqlQuery = `UPDATE notes SET title = "${title}", text = "${text}"
    WHERE noteID = ${noteID};`;

    connection.query(sqlQuery, (err) => {
        if (err) {

            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

router.delete('/deleteNote/:noteID', (req, res) => {
    // DELETE request for deleting a particular note based on noteID.
    const noteID = req.params.noteID;
    const sqlQuery = `DELETE FROM notes WHERE noteID = ${noteID}`;

    connection.query(sqlQuery, (err) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;