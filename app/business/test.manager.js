(function ()
{
    'use strict';
    var testDAO = require('../DAO/testDAO');
    var security = require('./security');

    function create(context)
    {
        if (null == context) {
            throw new Error('Context may not be null');
        }
        function search(query)
        {
            return security.isAuthenticated(context).then(function ()
            {
                query.skip = query.from;
                query.limit = query.size;
                delete query.from;
                delete query.size;
                return testDAO.search(query);
            });
        }

        function createNewOrUpdate(task)
        {
            //return taskDAO.createNewOrUpdate(task);
        }

        function getDetail(id)
        {
            return testDAO.getDetail(id);
        }

        function getTask(idTask)
        {
            return testDAO.getTask(idTask);
        }

        function createNewTest(test)
        {
            return testDAO.createNew(test);
        }

        return {
            search: search, createNewOrUpdate: createNewOrUpdate, getDetail: getDetail, createNewTest: createNewTest, getTask: getTask
        };

    }

    module.exports = {
        create: create
    };
})();