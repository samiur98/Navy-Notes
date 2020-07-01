const express = require('express');
const router = express.Router();
const body_paser = require('body-parser')
router.use(body_paser.urlencoded({extended: true}))
router.use(body_paser.json())

router.use()

module.exports = router;