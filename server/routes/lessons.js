var express = require("express");
var schema = require('./schema');
var lessons = express.Router();
var lessonsModel = schema.lessonsModel;
var coursesModel = schema.coursesModel;
lessons.post('/createLesson', function (req, res) {
    var lesson = new lessonsModel(req.body);
    lesson.save(function (error, success) {
        success ?
            coursesModel.update({_id: req.body.courseID}, {$push: {lessons: success._id}}, function (err, OK) {
                success && OK ? res.send({code: 1, lesson: success}) : res.send(err || error);
            }) : res.send(err || error);
    });
});

lessons.post('/pushVideo', function (req, res) {
    lessonsModel.update({_id: req.body.lessonID}, {$push: {videos: req.body.video}}, function (err, success) {
        success ? res.send({code: 1, success: success}) : res.send(err);
    })
});
module.exports = lessons;