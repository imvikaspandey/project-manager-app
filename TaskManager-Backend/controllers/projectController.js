'use strict';


var mongoose = require('mongoose'),
    Project = mongoose.model('Project');

exports.list_all_projects = function (req, res) {
    Project.find({})
        .populate('manager')
        .exec(function (err, project) {
            if (err)
                res.send(err);
            else
                res.json(project);
        });
};

exports.create_a_project = function (req, res) {
    var new_project = new Project(req.body);
    new_project.save(function (err, project) {
        if (err)
            res.send(err);
        else
            res.json(project);
    });
};


exports.read_a_project = function (req, res) {
    Project.findById(req.params.projectId)
        .populate('task')
        .exec(function (err, project) {
            if (err)
                res.send(err);
            else
                res.json(project);
        });
};

exports.update_a_project = function (req, res) {
    Project.findOneAndUpdate({ _id: req.params.projectId }, req.body, { new: true }, function (err, project) {
        if (err)
            res.send(err);
        else
            res.json(project);
    });
};

exports.delete_a_project = function (req, res) {
    Project.deleteOne({
        _id: req.params.projectId
    }, function (err, project) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Project successfully deleted' });
    });
};

