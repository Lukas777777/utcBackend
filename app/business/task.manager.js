(function ()
{
    'use strict';
    var taskDAO = require('../DAO/taskDAO');
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
                security.USER='admin';
                return security.checkRoles(context.user, security.USER, security.ADMIN).then(function ()
                {
                    query.skip = query.from;
                    query.limit = query.size;
                    delete query.from;
                    delete query.size;
                    return taskDAO.search(query);
                });
            });
        }

        function createNewOrUpdate(task)
        {
            return taskDAO.createNewOrUpdate(task);
        }

        function getDetail(id)
        {
            return taskDAO.getDetail(id);
        }

        function deleteTask(id)
        {
            return taskDAO.deleteTask(id);
        }

        return {
            search: search, createNewOrUpdate: createNewOrUpdate, getDetail: getDetail, deleteTask: deleteTask
        };

    }

    module.exports = {
        create: create
    };
})();