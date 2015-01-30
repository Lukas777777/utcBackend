(function ()
{
    'use strict';
    var Q = require('q');
    var mongoose = require('mongoose');
    var configDB = require('../config/database.js');
    mongoose.createConnection(configDB.url + '/tasks', function (error)
    {
        if (error) {
            console.log(error);
        }
    });
    var Schema = mongoose.Schema;
    var taskSchema = new Schema({
        title: String, description: String, repositoryUrl: String, branchName: String, tags: Array
    });
    var Model = mongoose.model('task', taskSchema);

    function fromMongo(element)
    {
        element._doc.id = element._doc._id;
        delete element._doc._id;
        return element._doc;
    }

    module.exports = {
        search: function (query)
        {
            var defer = Q.defer();
            try {
                var pattern = new RegExp('^.*' + query.query + '.*');
                pattern = query.query ? pattern : '';
                var search = {
                    $or: [{'title': {'$regex': pattern, $options: 'i'}},
                          {'description': {'$regex': pattern, $options: 'i'}},
                          {'tags.text': {'$regex': pattern, $options: 'i'}}]
                };
                var result = Model.find(search).count().exec().then(function (totalCount)
                {
                    return Model.find(search, null, query).exec().then(function (data)
                    {
                        data = data.map(function (element)
                        {
                            return fromMongo(element);
                        });
                        return {results: data, total: totalCount};
                    });
                });
                defer.resolve(result);
            } catch (error) {
                defer.reject(error);
            }
            return defer.promise;
        }, createNewOrUpdate: function (task)
        {
            var defer = Q.defer();
            if (!task.id) {
                try {
                    new Model(task).save(function (error)
                    {
                        if (error) {
                            defer.reject(error);
                        }
                        defer.resolve(task);
                    });
                } catch (e) {
                    defer.reject(e);
                }
                return defer.promise;
            } else {
                try {
                    Model.where('_id').equals(task.id).findOneAndUpdate(task).exec().then(function (result)
                    {
                        defer.resolve(fromMongo(result));
                    });
                } catch (error) {
                    defer.reject(error);
                }
                return defer.promise;
            }
        }, getDetail: function (id)
        {
            var defer = Q.defer();
            try {
                Model.findById(id).exec().then(function (result)
                {
                    defer.resolve(fromMongo(result));
                });
            } catch (e) {
                defer.reject(e);
            }
            return defer.promise;
        }, deleteTask: function (id)
        {
            var defer = Q.defer();
            try {
                Model.findOneAndRemove({_id: id}).exec().then(function ()
                {
                    defer.resolve();
                });
            } catch (error) {
                defer.reject(error);
            }
            return defer.promise;
        }, getBranch: function (url)
        {
            var defer = Q.defer();
            defer.resolve([]);
            return defer.promise;
        }, getTags: function (search)
        {
            var defer = Q.defer();
            defer.resolve([]);
            return defer.promise;
        }
    };
})();