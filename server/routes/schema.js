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

var courses = {
    title         : {type: String},
    description   : {type: String},
    adminID       : {type: String},
    createrID     : {type: String},
    yearOfStudy   : {type: String},
    publish       : {type: Boolean},
    code          : {type: Number},
    rates         : {type: Number},
    comments      : {type: Array},
    createdOn     : {type: Date},
    lastModified  : {type: Date},
    lessons       : {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lessons' }]},
    quizzes       : {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quizzes' }]}
};

var lessons = {
    title         : {type: String},
    courseID      : {type: String},
    description   : {type: String},
    documents     : {type: String},
    videos        : {type: Array},
};

var quizzes = {
    title         : {type: String},
    courseID      : {type: String},
    duration      : {type: String},
    description   : {type: String},
    createdOn     : {type: Date},
    lastModified  : {type: Date},
};
