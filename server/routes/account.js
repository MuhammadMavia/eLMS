var express = require("express");
var mongoose = require("mongoose");
var userSchema = require("./schema");
var bcrypt = require("bcrypt-nodejs");
var usersModel = userSchema.usersModel;
var usersSchema = userSchema.usersSchema;
var coursesModel = userSchema.coursesModel;
var account = express.Router();
var user;
var deepPopulate = require('mongoose-deep-populate')(mongoose);
usersSchema.plugin(deepPopulate, {});

// var usersModel = mongoose.model("Users", usersSchema);

/* Get Current User Data*/
account.get('/currentUserData', function (req, res) {
    usersModel.findOne({_id: req.query.userID}, function (error, success) {
        if (success) {
            success.password ? success.password = true : null;
            res.send({code: 1, user: success})
        }
        else {
            res.send({code: 0, msg: error})
        }
    }).populate('joinedCourses createdCourses')
});


/* Get All Users */
account.get('/usersFind', function (req, res) {
    usersModel.find({role: req.query.data}, function (err, success) {
        res.send(err || success);
    }).skip(0).limit(50);
});

/* Update Profile Image */
account.post('/updateProfileImg', function (req, res) {
    usersModel.update({_id: req.body._id}, {$set: req.body}, function (err, success) {
        res.send(err || success);
    });
});

/* Update Profile */
account.post('/updateProfile', function (req, res) {
    usersModel.update({_id: req.body._id}, {$set: req.body}, function (err, success) {
        res.send(err || success);
    });
});

/* Social User Auth*/
account.use('/socialUserAuth', function (req, res, next) {
    var obj = {};
    obj[req.body.provider] = req.body[req.body.provider];
    usersModel.findOne(obj, function (error, success) {
        success ? res.send({code: 1, user: success}) : next();
    });
});
account.post('/socialUserAuth', function (req, res) {
    var user = new usersModel(req.body);
    user.save(function (error, success) {
        error ? res.send({code: 0, msg: error}) : res.send({code: 1, user: success});
    })
});
/* Linked Account */
account.use('/linkedAccount', function (req, res, next) {
    usersModel.findOne(req.body, function (error, success) {
        success ? res.send({code: 0, msg: 'This Account Is Already Linked!'}) : next();
    });
});
account.post('/linkedAccount', function (req, res) {
    usersModel.update({_id: req.query.userID}, {$set: req.body}, function (error, success) {
        res.send(success || error)
    });
});

/* Checking Email Middleware */
account.use("/login", function (req, res, next) {
    usersModel.findOne({email: req.body.email}, function (err, success) {
        user = success;
        success ? next() : next({code: 0, msg: "بريد إلكتروني خاطئ"});
    })
});
/* Checking Password Middleware */
account.use("/login", function (req, res, next) {
    bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
        req.body.password = null;
        isMatch ? next() : next({code: 0, msg: "كلمة مرور خاطئة"});
    });
});
/* Main Login Rout */
account.post("/login", function (req, res) {
    res.send({code: 1, user: user});
    user = null;
});
/* Error Handling Middleware */
account.use("/login", function (err, req, res, next) {
    res.send(err)
});
/* Bcrypt Password Middleware */
account.use("/signup", function (req, res, next) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, null, function (err, hashed) {
            req.body.password = hashed;
            next();
        });
    });
});
/* Main Signup Rout*/
account.post("/signup", function (req, res) {
    var user = new usersModel(req.body);
    user.save(function (err, success) {
        res.send(err || success)
    });
});

/* Update Info */

account.post('/updateInfo', function (req, res) {
    usersModel.update({_id: req.body._id}, {$set: req.body}, function (err, success) {
        res.send(err || success);
    });
});

account.use('/changePassword', function (req, res, next) {
    usersModel.findOne({_id: req.body.userID})
        .exec(function (err, success) {
            if (success) {
                bcrypt.compare(req.body.currentPassword, success.password, function (err, isMatch) {
                    isMatch ? next() : res.send({msg: "Wrong Password!"});
                });
            }
            else {
                res.send({code: 0});
            }
        });
});

account.use('/changePassword', function (req, res, next) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, null, function (err, hashed) {
            req.body.password = hashed;
            next();
        });
    });
});

account.post('/changePassword', function (req, res) {
    usersModel.update({_id: req.body.userID}, {$set: req.body}, function (err, success) {
        res.send(err || success);
    });
});

account.use('/setPassword', function (req, res, next) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, null, function (err, hashed) {
            req.body.password = hashed;
            next();
        });
    });
});

account.post('/setPassword', function (req, res) {
    usersModel.update({_id: req.body.userID}, {$set: req.body}, function (err, success) {
        res.send(err || success);
    });
});

account.post('/changeTheme', function (req, res) {
    usersModel.update({_id: req.body._id}, {$set: req.body}, function (err, success) {
        res.send(err || success);
    });
});


/* Delete Account */
account.use('/deleteAccount', function (req, res, next) {
    usersModel.findOne({_id: req.body.userID}, function (err, success) {
        if (success.password) {
            bcrypt.compare(req.body.password, success.password, function (err, isMatch) {
                req.body.password = null;
                isMatch ? next() : res.send({code: 0, msg: "Wrong Password!"});
            });
        }
        else {
            next()
        }
    })
});
account.post('/deleteAccount', function (req, res) {
    usersModel.findOneAndRemove({_id: req.body.userID}, function (err, success) {
        res.send(err || success)
    })
});

module.exports = account;
