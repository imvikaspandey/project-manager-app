const request = require('supertest');
const app = require('../index');
global.user_id = null;
global.project_id = null;
global.parent_id = null;
global.child_id = null;

describe('Test Users API', function () {

    it('POST /api/user - should add a new user', (done) => {
        let user = {
            firstName: "Testing",
            lastName: "User",
            employeeId: "901"
        }
        request(app)
            .post('/api/user')
            .send(user)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                global.user_id = res.body._id;
                // console.log(global.user_id)
                done();
            });
    });

    it('PUT /api/user/:userId - should update a existing user', (done) => {
        let user = {
            firstName: "Testing",
            lastName: "User",
            employeeId: "902"
        }
        request(app)
            .put('/api/user/' + global.user_id)
            .send(user)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('GET /api/user - should get all users', (done) => {
        request(app)
            .get('/api/user')
            .expect(200, done)
    });

    it('GET /api/user/:userId - should search perticular user', (done) => {
        request(app)
            .get('/api/user/' + global.user_id)
            .expect(200, done)
    });

    it('DELETE /api/user/:userId - should delete perticular user', (done) => {
        request(app)
            .delete('/api/user/' + global.user_id)
            .expect(200, done)
    });

});


describe('Test Project Endpoint', function () {

    it('POST /api/project - should add a project', (done) => {
        let project = {
            endDate: "2020-05-11T00:00:00.000Z",
            priority: 20,
            projectName: "Demo Project",
            startDate: "2020-02-10T00:00:00.000Z",
            manager: global.user_id,
        }
        request(app)
            .post('/api/project/')
            .send(project)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                global.project_id = res.body._id;
                done();
            });
    });

    it('PUT /api/project/:projectId - should update a project', (done) => {
        let project = {
            endDate: "2020-05-11T00:00:00.000Z",
            priority: 23,
            projectName: "Demo Project",
            startDate: "2020-02-10T00:00:00.000Z",
            manager: global.user_id,
        }
        request(app)
            .put('/api/project/' + global.project_id)
            .send(project)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('GET /api/project - should get all projects', (done) => {
        request(app)
            .get('/api/project')
            .expect(200, done)
    });

    it('GET /api/project/:projectId - should search the project', (done) => {
        request(app)
            .get('/api/project/' + global.project_id)
            .expect(200, done)
    });

    it('DELETE /api/project/:projectId - should delete the project', (done) => {
        request(app)
            .delete('/api/project/' + global.project_id)
            .expect(200, done)
    });

});

describe('Test Tasks API', function () {

    it('POST /api/project - should add a project', (done) => {
        let project = {
            endDate: "2020-05-11T00:00:00.000Z",
            priority: 20,
            projectName: "Demo Project",
            startDate: "2020-02-10T00:00:00.000Z",
            manager: global.user_id,
        }
        request(app)
            .post('/api/project/')
            .send(project)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                global.project_id = res.body._id;
                done();
            });
    });

    it('POST /api/task - should add a task', (done) => {
        let task = {
            projectId: global.project_id,
            taskName: "Demo Task",
            parentTask: true,
            priority: 0,
            parentTaskId: null,
            startDate: "2020-02-10T00:00:00.000Z",
            endDate: "2020-05-11T00:00:00.000Z",
            user: null,
            completed: false
        }
        request(app)
            .post('/api/task/')
            .send(task)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                global.task_id = res.body._id;
                done();
            });
    });

    it('PUT /api/task/:taskId - should update a task', (done) => {
        let task = {
            projectId: global.project_id,
            taskName: "Demo Task",
            parentTask: true,
            priority: 0,
            parentTaskId: null,
            startDate: "2020-02-10T00:00:00.000Z",
            endDate: "2020-05-11T00:00:00.000Z",
            user: null,
            completed: false
        }
        request(app)
            .put('/api/task/' + global.task_id)
            .send(task)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('PUT /api/task/:taskId - should update a task with status as completed', (done) => {
        let task = {
            projectId: global.project_id,
            taskName: "Demo Task",
            parentTask: true,
            priority: 0,
            parentTaskId: null,
            startDate: "2020-02-10T00:00:00.000Z",
            endDate: "2020-05-11T00:00:00.000Z",
            user: null,
            completed: true
        }
        request(app)
            .put('/api/task/' + global.task_id)
            .send(task)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('GET /api/task - should get all task', (done) => {
        request(app)
            .get('/api/task')
            .expect(200, done)
    });

    it('GET /api/task/:taskId - should search the task', (done) => {
        request(app)
            .get('/api/task/' + global.task_id)
            .expect(200, done)
    });

    it('GET /api/parentTasks/ - should search the task', (done) => {
        request(app)
            .get('/api/parentTasks/')
            .expect(200, done)
    });

    it('DELETE /api/task/:taskId - should delete the task', (done) => {
        request(app)
            .delete('/api/task/' + global.task_id)
            .expect(200, done)
    });

    it('DELETE /api/project/:projectId - should delete the project', (done) => {
        request(app)
            .delete('/api/project/' + global.project_id)
            .expect(200, done)
    });

});

