var express = require("express");
var schema = require('./schema');
var lessons = express.Router();
var lessonsModel = schema.lessonsModel;
var coursesModel = schema.coursesModel;
lessons.post('/createLesson', function (req, res) {
    var lesson = new lessonsModel(req.body);
    lesson.save(function (error, success) {
        coursesModel.update({_id: req.body.courseID}, {$push: {lessons: success._id}}, function (err, OK) {
            success && OK ? res.send({code: 1, lesson: success}) : res.send(err || error);
        });
    });
});


module.exports = lessons;