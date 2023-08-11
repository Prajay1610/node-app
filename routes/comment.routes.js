/*jshint esversion: 6 */

console.log("Inside Routes");
module.exports = (app) => {
  const comment = require("../controllers/comments.controller.js");
  const commentview = require("../controllers/comments.controller.js");
  const contactupdrec = require("../controllers/comments.controller.js");

  //Create New Comment
  app.post("/createComment", comment.createNew);

  //Fetch Comments Using commentId
  app.get("/comment/:commentId", commentview.viewcommentDetails);

  //Fetch Comments Using hubspotId
  app.get("/comment/hid/:hubspotId", comment.viewcommentbyHid);

  //Fetch Comments Using repId
  app.get("/comment/repid/:repId", comment.viewcommentbyRepId);

  //Fetch Comments of Current Date
  app.get("/comment/date/today", comment.viewcommentbyDate);
};
