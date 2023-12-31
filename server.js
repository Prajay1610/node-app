/**
 * http://usejsdoc.org/
 */
/*jshint esversion: 6 */

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

//parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Comments Backend" });
});

require("./routes/comment.routes.js")(app);



//set port, listen for requests
app.listen(3002, () => {
  console.log("Server is running on port 3002.");
});
