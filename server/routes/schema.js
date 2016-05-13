var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var usersSchema = new mongoose.Schema({
    profileImg: {type: String},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, unique: true},
    password: {type: String},
    progress: {type: Array},
    birthDate: {type: String},
    yearOfStudy: {type: String},
    role: {type: Number, default: 1},
    createdOn: {type: Date, default: Date.now()},
    createdCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Courses', unique: true}],
    joinedCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Courses', unique: true}],
    //quizzes: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Quizzes'}]},
    facebookID: {type: String},
    googleID: {type: String}
});
usersSchema.plugin(uniqueValidator);
exports.usersModel = mongoose.model("Users", usersSchema);
exports.usersSchema = usersSchema;


var coursesSchema = new mongoose.Schema({
    creator: {type: String, ref: "Users"},
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