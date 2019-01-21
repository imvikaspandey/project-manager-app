'use strict';


var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.create_a_user = function (req, res) {
    console.log(req.body);
    var new_user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        employeeID: req.body.employeeID,
    });
    new_user.save(function (err, user) {
        if (err)
            res.status(500).send(err);
        else
            res.json(user);
    });
};

exports.list_all_users = function (req, res) {
    User.find({})
        .exec(function (err, user) {
            if (err)
                res.send(err);
            else
                res.json(user);
        });
};

exports.update_a_user = function (req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId }, // findbyId
        {                                                   //body
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            employeeID: req.body.employeeID,
        },
        { new: true },       // send back the updated json after updating
        function (err, user) {
            if (err)
                res.send(err);
            else
                res.json(user);
        });
};

exports.delete_a_user = function (req, res) {
    User.deleteOne({
        _id: req.params.userId
    }, function (err, user) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'User successfully deleted' });
    });
};

exports.read_a_user = function (req, res) {
    User.findOne({ employeeId: req.params.userId })
        .populate('role_id')
        .exec(function (err, user) {
            if (err)
                res.send(err);
            else
                res.json(user);
        });
};