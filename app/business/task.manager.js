(function ()
{
    'use strict';
    var taskDAO = require('../DAO/taskDAO.js');
    var Task = require('../DAO/taskDAO.js');
    var mongoose = require('mongoose');
    var configDB = require('../../config/database.js');
    mongoose.createConnection(configDB.url + '/tasks', function (error)
    {
        if (error) {
            console.log(error);
        }
    });
    //function toThatRoleView(task) {
    //    return {
    //        id:task.id,
    //        name:task.name
    //    };
    //}
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

    module.exports = {
        search: search, createNewOrUpdate: createNewOrUpdate, getDetail: getDetail
    };
})();