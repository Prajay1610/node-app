/*jshint esversion: 6 */

const Comment = require("../models/commentsrec.model.js");

//Create A New Comment In The Database
exports.createNew = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Comment
  const comment = new Comment({
    repId: req.body.repId,
    hubspotId: req.body.hubspotId,
    doctorName: req.body.doctorName,
    comment: req.body.comment,
  });

  // Save Customer in the database
  Comment.createNew(comment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Patient.",
      });
    else res.send(data);
  });
};

//View Comment Details
exports.viewcommentDetails = (req, res) => {
  console.log("Inside viewCommentDetails:", req.params.commentId);

  Comment.viewcommentDetails(req.params.commentId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Did Not Find Details for ${req.params.commentId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Details with commentId " + req.params.commentId,
        });
      }
    } else res.send(data);
  });
};

exports.viewcommentbyHid = (req, res) => {
  console.log("Inside viewCommentByHid:", req.params.hubspotId);

  Comment.viewcommentbyHid(req.params.hubspotId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Did Not Find Details for ${req.params.hubspotId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Details with hubspotId " + req.params.hubspotId,
        });
      }
    } else res.send(data);
  });
};

exports.viewcommentbyRepId = (req, res) => {
  console.log("Inside viewCommentByRepId:", req.params.repId);

  Comment.viewcommentbyRepId(req.params.repId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Did Not Find Details for ${req.params.repId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Details with repId " + req.params.repId,
        });
      }
    } else res.send(data);
  });
};

exports.viewcommentbyDate = (req, res) => {
  console.log("Inside viewCommentByDate:");

  Comment.viewcommentbyDate(req.params.formattedToday, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Did Not Find Details for ${req.params.formattedToday}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Details with repId " + req.params.formattedToday,
        });
      }
    } else res.send(data);
  });
};
