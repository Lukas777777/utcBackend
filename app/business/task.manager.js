(function ()
{
    'use strict';
    var taskDAO = require('../DAO/taskDAO');
    function search(query)
    {
        query.skip = query.from;
        query.limit = query.size;
        delete query.from;
        delete query.size;
        return taskDAO.search(query);
    }

    function createNewOrUpdate(task)
    {
        return taskDAO.createNewOrUpdate(task);
    }

    function getDetail(id)
    {
        return taskDAO.getDetail(id);
    }
    function deleteTask(id){
        return taskDAO.deleteTask(id);
    }

    module.exports = {
        search: search, createNewOrUpdate: createNewOrUpdate, getDetail: getDetail,deleteTask:deleteTask
    };
})();