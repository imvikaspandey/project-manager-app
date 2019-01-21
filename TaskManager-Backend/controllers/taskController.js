'use strict';


var mongoose = require('mongoose'),
    Task = mongoose.model('Task'),
    Project = mongoose.model('Project');

exports.list_all_task = function (req, res) {
    Task.find({})
        .exec(function (err, tasks) {
            if (err)
                res.send(err);
            else
                res.json(tasks);
        });
};

exports.create_a_task = function (req, res) {
    var new_task = new Task(req.body);
    new_task.save(function (err, task) {
        if (err)
            res.send(err);
        else {
            Project.findById(new_task.projectId, function (err, project) {
                project.tasks.push(new_task._id);
                project.save(function (err) {
                    if (err)
                        res.send(err);
                    else
                        res.json(new_task);
                });
            });
        }
    });
};


exports.read_a_task = function (req, res) {
    Task.findById(req.params.taskId)
        .exec(function (err, task) {
            if (err)
                res.send(err);
            else
                res.json(task);
        });
};

exports.update_a_task = function (req, res) {
    var new_task = new Task(req.body);
    Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, function (err, task) {
        if (err)
            res.send(err);
        else {
            console.log("new_task");
            if (new_task.completed) {
                Project.findById(new_task.projectId, function (err, project) {
                    project.completedTasks.push(new_task._id);
                    project.save(function (err) {
                        if (err)
                            res.send(err);
                        else
                            res.json(task);
                    });
                });
            } else {
                res.json(task);
            }

        }
    });
};

exports.find_parent_tasks = function (req, res) {

    Task.find({ parentTask: "true", completed: "false" }, function (err, task) {
        if (err)
            res.send(err);
        else
            res.json(task);
    });
};
