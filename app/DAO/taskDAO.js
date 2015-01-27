(function ()
{
    'use strict';
    var q = require('q');
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var taskSchema = new Schema({
        _id: false, id: Number, title: String, description: String, repositoryUrl: String, branchName: String, assignTo: Array, tags: Array
    });
    var Model = mongoose.model('task', taskSchema);
    module.exports = {
        search: function (query)
        {
            var defer = q.defer();
            try {
                var pattern = new RegExp('^.*' + query.query + '.*');
                pattern = query.query ? pattern : '';

                var result = Model.find({
                    $or: [{'title': {'$regex': pattern, $options: 'i'}}, {'description': {'$regex': pattern, $options: 'i'}}]
                }).count().exec().then(function (totalCount)
                {
                    return Model.find({
                        $or: [{'title': {'$regex': pattern, $options: 'i'}}, {'description': {'$regex': pattern, $options: 'i'}}]
                    }, null, query).exec().then(function (data)
                    {
                        return {results: data, total: totalCount};
                    });
                });
                defer.resolve(result);
            } catch (e) {
                defer.reject(e);
            }
            return defer.promise;
        }, createNewOrUpdate: function (task)
        {
            var defer = q.defer();
            if (!task.id) {
                try {
                    Model.count().exec().then(function (allTasks)
                    {
                        task._id = allTasks;
                        task.id = allTasks + 1;
                        return task;
                    }).then(function (newTask)
                    {
                        return new Model(newTask).save(function (error)
                        {
                            if (error) {
                                defer.reject(error);
                                //    Maybe here add throw error??
                            }
                        });
                    }).then(function (save)
                    {
                        defer.resolve(save);
                    });
                } catch (e) {
                    defer.reject(e);
                }
                return defer.promise;
            } else {
                try {

                    var update = {
                        id: task.id,
                        title: task.title,
                        description: task.description,
                        repositoryUrl: task.repositoryUrl,
                        branchName: task.repositoryUrl,
                        assignTo: task.assignTo,
                        tags: task.assignTo
                    };
                    Model.where('_id', task._id).findOneAndUpdate(update).exec().then(function (result)
                    {
                        defer.resolve(result);
                    });
                } catch (error) {
                    defer.reject(error);
                }
                return defer.promise;
            }
        }, getDetail: function (id)
        {
            var defer = q.defer();
            try {
                Model.findById(id - 1).exec().then(function (result)
                {
                    defer.resolve(result);
                });
            } catch (e) {
                defer.reject(e);
            }
            return defer.promise;
        }
    };
})();