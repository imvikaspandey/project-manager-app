'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    taskName: String,
    priority: String,
    startDate: String,
    endDate: String,
    parentTask: Boolean,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    completed: Boolean,
    parentTaskId: { type: Schema.Types.ObjectId, ref: 'Task' },
});

// // Virtual for User's URL
// ProjecctSchema
//     .virtual('url')
//     .get(function () {
//         return '/user/' + this._id;
//     });


//Export model
module.exports = mongoose.model('Task', TaskSchema);