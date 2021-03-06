'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    employeeID: { type: String, unique: true }
});

// Virtual for User's URL
// UserSchema
//     .virtual('url')
//     .get(function () {
//         return '/user/' + this._id;
//     });


//Export model
module.exports = mongoose.model('User', UserSchema);