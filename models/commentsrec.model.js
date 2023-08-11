/*jshint esversion: 6 */

const sql = require("../util/mysql.sync");

//constructor

const Comment = function (comment) {
  this.repId = comment.repId;
  this.hubspotId = comment.hubspotId;
  this.doctorName = comment.doctorName;
  this.comment = comment.comment;
  this.created_at = comment.created_at;

  console.log("Inside patientrec.create Constructor repId:", this.repId);
  console.log(
    "Inside patientrec.create Constructor hubspotId:",
    this.hubspotId
  );
  console.log(
    "Inside patientrec.create Constructor doctorName:",
    this.doctorName
  );
  console.log("Inside patientrec.create Constructor accessRec:", this.ageRange);
  console.log("Inside patientrec.create Constructor accessRec:", this.specPref);
  console.log("Inside patientrec.create Constructor accessRec:", this.comment);

  //this.accessRecJSON=JSON.parse(this.accessRec);
};

console.log("Inside commentrec.create");

//Return All Comments Info
Comment.createNew = (newComment, result) => {
  sql.getConnection(function (err, connection) {
    connection.query(
      "CALL ctx_comment_create(?, ?,?,?,@x_response,@x_error_code); SELECT @x_response AS resp ,@x_error_code as errcode;",
      [
        newComment.repId,
        newComment.hubspotId,
        newComment.doctorName,
        newComment.comment,
      ],
      function (err, res) {
        console.log(res);
        connection.release();
        if (err) {
          result(null, { Error: err });
          return console.error(err);
        }
        //return result;
        result(null, { uid: res[1][0].resp });
      }
    );
  });
};

//Return All Comments By Using CommentId
Comment.viewcommentDetails = (commentId, result) => {
  sql.getConnection(function (err, connection) {
    var sql = `select repId,hubspotId,doctorName,comment,created_at
			from comments_rec
			where REPLACE(uid_text,'-','')=?`;

    connection.query(sql, [commentId], function (err, res) {
      console.log(res);
      connection.release();
      if (err) {
        result(null, { Error: err });
        return console.error(err);
      }
      //return result;
      result(null, { userDetails: res });
    });
  });
};

//Return All Comments By Using HubspotId
Comment.viewcommentbyHid = (hubspotId, result) => {
  sql.getConnection(function (err, connection) {
    var sql = `select repId,hubspotId,doctorName,comment,created_at
			from comments_rec
			where hubspotId=?`;

    connection.query(sql, [hubspotId], function (err, res) {
      console.log(res);
      connection.release();
      if (err) {
        result(null, { Error: err });
        return console.error(err);
      }
      //return result;
      result(null, { userDetails: res });
    });
  });
};

//Return All Comments By Using RepId

Comment.viewcommentbyRepId = (repId, result) => {
  sql.getConnection(function (err, connection) {
    var sql = `select repId,hubspotId,doctorName,comment,created_at
			from comments_rec
			where repId=?`;

    connection.query(sql, [repId], function (err, res) {
      console.log(res);
      connection.release();
      if (err) {
        result(null, { Error: err });
        return console.error(err);
      }
      //return result;
      result(null, { userDetails: res });
    });
  });
};

//Return all Comments By Date

Comment.viewcommentbyDate = (created_at, result) => {
  sql.getConnection(function (err, connection) {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    console.log(formattedToday);
    var sql = `SELECT repId,hubspotId,doctorName,comment,created_at
			from comments_rec
			WHERE DATE(created_at) = ?`;

    connection.query(sql, [formattedToday], function (err, res) {
      console.log(res);
      connection.release();
      if (err) {
        result(null, { Error: err });
        return console.error(err);
      }
      //return result;
      result(null, { userDetails: res });
    });
  });
};

module.exports = Comment;
