/* Establishes connection to MySQL database and 
returns/exports the connection */

require('dotenv').config();

const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true,
});

connection.connect((err) => {
    if(err) {
        console.log('Error connecting to Database');
        return err;
    } else {
        console.log('Connection to Database successfull.');
        return 0;
    }
});

module.exports = connection;