'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    projectName: String,
    startDate: String,
    endDate: String,
    priority: String,
    manager: { type: Schema.Types.ObjectId, ref: 'User' },
    completed: Boolean,
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    completedTasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
});

// // Virtual for User's URL
// ProjecctSchema
//     .virtual('url')
//     .get(function () {
//         return '/user/' + this._id;
//     });


//Export model
module.exports = mongoose.model('Project', ProjectSchema);