'use strict';
module.exports = function (app) {

    var users = require('../controllers/userController');
    var projects = require('../controllers/projectController');
    var tasks = require('../controllers/taskController');

    app.route('/api/user')
        .get(users.list_all_users)
        .post(users.create_a_user);

    app.route('/api/user/:userId')
        .get(users.read_a_user)
        .put(users.update_a_user)
        .delete(users.delete_a_user);

    app.route('/api/project')
        .get(projects.list_all_projects)
        .post(projects.create_a_project);

    app.route('/api/project/:projectId')
        .get(projects.read_a_project)
        .put(projects.update_a_project);

    app.route('/api/task')
        .get(tasks.list_all_task)
        .post(tasks.create_a_task);

    app.route('/api/task/:taskId')
        .get(tasks.read_a_task)
        .put(tasks.update_a_task);

    app.route('/api/parentTasks')
        .get(tasks.find_parent_tasks);

}