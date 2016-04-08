/*
 var users = {
 firstName     : {type: String},
 lastName      : {type: String},
 email         : {type: String},
 theme         : {type: String},
 //yearOfStudy   : {type: String},
 password      : {type: String},
 progress      : {type: String},
 sex           : {type: Number},
 tel           : {type: Number},
 role          : {type: Number},
 createdOn     : {type: Date},
 courses       : {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Courses' }]},
 quizzes       : {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quizzes' }]}
 };
 */
/*

 var courses = {
 title         : {type: String},
 description   : {type: String},
 adminID       : {type: String},
 creatorID     : {type: String},
 yearOfStudy   : {type: Number},
 publish       : {type: Boolean},
 code          : {type: Number},
 rates         : {type: Array},
 comments      : {type: Array},
 createdOn     : {type: Date},
 lastModified  : {type: Date},
 lessons       : {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lessons' }]},
 quizzes       : {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quizzes' }]}
 };
 */


var quizzes = {
    title: {type: String},
    courseID: {type: String},
    duration: {type: String},
    description: {type: String},
    createdOn: {type: Date},
    lastModified: {type: Date}
};


var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
var usersSchema = new mongoose.Schema({
    profileImg: {type: String},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, unique: true},
    password: {type: String},
    progress: {type: Array},
    sex: {type: Number},
    tel: {type: Number},
    role: {type: Number, default: 1},
    theme: {type: String, default: 1},
    createdOn: {type: Date, default: Date.now()},
    courses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Courses', unique: true}],
    quizzes: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Quizzes'}]},
    userID: {type: String},
    link: {type: String}

});
exports.usersModel = mongoose.model("Users", usersSchema);


var coursesSchema = new mongoose.Schema({
    // _creator: {type: String, ref: "Users"},
    title: {type: String, required: true},
    description: {type: String, required: true},
    creatorID: {type: String, required: true},
    category: {type: String, required: true},
    yearOfStudy: {type: Number, required: true},
    publish: {type: Boolean, default: true},
    code: {type: Number, default: Date.now()},
    createdOn: {type: Date, default: Date.now()},
    rates: {type: Array},
    comments: {type: Array},
    lastModified: {type: Date},
    lessons: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Lessons'}]},
    students: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Users', unique: true}]},
    quizzes: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Quizzes'}]}
});
usersSchema.plugin(uniqueValidator);
coursesSchema.plugin(uniqueValidator);
exports.coursesModel = mongoose.model("Courses", coursesSchema);


var lessonsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    courseID: {type: String, required: true},
    creatorID: {type: String, required: true},
    description: {type: String, required: true},
    createdOn: {type: Date, default: Date.now()},
    documents: {type: Array},
    videos: {type: Array}
});
exports.lessonsModel = mongoose.model("Lessons", lessonsSchema);