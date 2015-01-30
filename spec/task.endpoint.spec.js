(function ()
{
    'use strict';
    var taskEndpoint = require('../app/REST/task.endpoint');
    var supertest = require('supertest');

    describe('GET /api/task', function ()
    {


        describe('when user NOT authorized', function ()
        {
            it('should response 401', function (done)
            {
                supertest(taskEndpoint).get('/api/task').expect({}).expect(401).end(done);
            });
        });
        describe('when user is authorized', function ()
        {
            describe('when token exist in DB', function ()
            {
                it('should response data', function (done)
                {
                    supertest(taskEndpoint).get('/api/task').set({authorization: 'Token NTRjYjM0MjM3NzE4MjUyMjI5YmExMGY5'}).expect(200).expect({
                        'results': [{
                                        'tags': [],
                                        '__v': 0,
                                        'assignTo': [],
                                        'branchName': 'http://localhost:9000/#/task/create',
                                        'repositoryUrl': 'http://localhost:9000/#/task/create',
                                        'description': '12312',
                                        'title': 'some',
                                        'id': '54c8e4f50d0a79531afeea99'
                                    },
                                    {
                                        'tags': [],
                                        '__v': 0,
                                        'branchName': 'http://localhost:3001/#/task/create',
                                        'repositoryUrl': 'http://localhost:3001/#/task/create',
                                        'description': 'asdsad',
                                        'title': 'gone',
                                        'id': '54cb4f4a06908dda3da12772'
                                    }], 'total': 2
                    }).end(done);
                });
            });
            describe('when token is NOT exist in DB', function ()
            {
                it('should response 401', function (done)
                {
                    supertest(taskEndpoint).get('/api/task').set({authorization: 'Token iAmSimpleToken'}).expect(401).expect('').end(done);
                });

            });
        });
        describe('POST /api/task', function ()
        {

        });
    });
    describe('GET /api/task/:id', function ()
    {
        describe('when get first task', function ()
        {
            describe('when user is NOT authorized', function ()
            {
                it('should respond 401', function (done)
                {
                    supertest(taskEndpoint).get('/api/task/54c8e4f50d0a79531afeea99').expect(500).expect('').end(done);
                });

            });
        });

    });
})();