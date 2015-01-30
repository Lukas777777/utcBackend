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
                query.skip = query.from;
                query.limit = query.size;
                delete query.from;
                delete query.size;
                return taskDAO.search(query);
            });
        }

        function createNewOrUpdate(task)
        {

            return security.isAuthenticated(context).then(function ()
            {
                return taskDAO.createNewOrUpdate(task);
            });
        }

        function getDetail(id)
        {
            return security.isAuthenticated(context).then(function ()
            {
                return taskDAO.getDetail(id);
            });
        }

        function deleteTask(id)
        {

            return security.isAuthenticated(context).then(function ()
            {
                return taskDAO.deleteTask(id);
            });
        }

        function getBranch(url)
        {
            return taskDAO.getBranch(url);
        }

        function getTags(query)
        {

            return security.isAuthenticated(context).then(function ()
            {
                return taskDAO.getTags(query);
            });
        }

        return {
            search: search, createNewOrUpdate: createNewOrUpdate, getDetail: getDetail, deleteTask: deleteTask, getBranch: getBranch, getTags: getTags
        };

    }

    module.exports = {
        create: create
    };
})();