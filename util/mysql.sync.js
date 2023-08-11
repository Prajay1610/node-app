/*jshint esversion: 6 */
require("dotenv").config();
const mysql = require("mysql2");
// const fs = require("fs");

const dbpool = mysql.createPool({
  connectionLimit: 100,
  host: '52.66.169.143',
  user:'devuser',
  password: 'devuser101',
  database: 'devdb',
  debug: false,
  multipleStatements: true,
  // ssl: {
  //   ca: fs.readFileSync(__dirname + "/cert/ca-cert.pem"),
  //   key: fs.readFileSync(__dirname + "/cert/client-key.pem"),
  //   cert: fs.readFileSync(__dirname + "/cert/client-cert.pem"),
  // },
});

console.log("Return Instance Of Connection Pool");

function getConnection(callback) {
  dbpool.getConnection(function (err, connection) {
    if (err) {
      console.error("error connecting to database: " + err.stack);
      return;
    }
    callback(err, connection);
  });
}

module.exports = { getConnection };
