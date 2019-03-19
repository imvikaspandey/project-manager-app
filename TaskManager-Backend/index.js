var express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();


var User = require('./models/userModel');
var Project = require('./models/projectModel');
var Task = require('./models/taskModel');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/projectManager_database', { useNewUrlParser: true, useCreateIndex: true });
// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;



var routes = require('./routes/appRoutes');
routes(app);

app.listen(3000);


console.log('Project-Manager Server started on : http://localhost:3000 ');
module.exports = app;