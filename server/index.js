var express = require("express");
var cors = require("cors");
var path = require("path");
var mongoose = require("mongoose");
//var connection = mongoose.connect("mongodb://localhost/eLMS");
 var connection = mongoose.connect("mongodb://elms:elms@ds025419.mlab.com:25419/elms");

var bodyParser = require("body-parser");
var app = express();

app.use(cors());
app.use(bodyParser.json({limit: '5000kb'}));
var account = require('./routes/account');
var courses = require('./routes/courses');
var lessons = require('./routes/lessons');
app.use("/account", account);
app.use("/courses", courses);
app.use("/lessons", lessons);
// app.use(express.static(path.join(__dirname,'../youtube')));
app.use(express.static(path.join(__dirname,'../public')));


app.set('port', process.env.PORT || 5000);
var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});
