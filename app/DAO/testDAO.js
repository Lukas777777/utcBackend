(function ()
{
    'use strict';
    var Q = require('q');
    var mongoose = require('mongoose');
    var configDB = require('../../config/database.js');
    mongoose.createConnection(configDB.url + '/test', function (error)
    {
        if (error) {
            console.log(error);
        }
    });
    var Schema = mongoose.Schema;
    var testSchema = new Schema({
        title: String, description: String, assignedTask: Array
    });
    var Model = mongoose.model('test', testSchema);
    module.exports = {
        search: function (query)
        {
            var defer = Q.defer();
            defer.resolve({
                results: [{
                              id: 1,
                              'title': 'Angular awesome tests',
                              'description': 'Aenean faucibus semper magna. Ut id dictum libero. Etiam viverra diam nec sem pellentesque malesuada. Quisque semper suscipit rutrum. Mauris a mollis purus, sit amet egestas tellus. Nullam vel mauris id metus vestibulum vestibulum non non tortor. Vivamus ut congue sapien, in lobortis orci. ',
                              'assignedTask': ['54ca236274cdf54054242567',
                                               '54ca236274cdf54054242568',
                                               '54ca236274cdf54054242569',
                                               '54ca236274cdf5405424256a',
                                               '54ca236274cdf5405424256b',
                                               '54ca236274cdf5405424256c',
                                               '54ca236274cdf5405424256d',
                                               '54ca236274cdf5405424256e',
                                               '54ca236274cdf5405424256f',
                                               '54ca236274cdf54054242570',
                                               '54ca236274cdf54054242571',
                                               '54ca236274cdf54054242572']
                          }], total: 1
            });
            return defer.promise;
        }, getDetail: function (id)
        {
            var defer = Q.defer();
            defer.resolve({
                id: 1,
                'title': 'Angular awesome tests',
                'description': 'Aenean faucibus semper magna. Ut id dictum libero. Etiam viverra diam nec sem pellentesque malesuada. Quisque semper suscipit rutrum. Mauris a mollis purus, sit amet egestas tellus. Nullam vel mauris id metus vestibulum vestibulum non non tortor. Vivamus ut congue sapien, in lobortis orci. ',
                'assignedTask': ['54ca236274cdf54054242567',
                                 '54ca236274cdf54054242568',
                                 '54ca236274cdf54054242569',
                                 '54ca236274cdf5405424256a',
                                 '54ca236274cdf5405424256b',
                                 '54ca236274cdf5405424256c',
                                 '54ca236274cdf5405424256d',
                                 '54ca236274cdf5405424256e',
                                 '54ca236274cdf5405424256f',
                                 '54ca236274cdf54054242570',
                                 '54ca236274cdf54054242571',
                                 '54ca236274cdf54054242572']
            });
            return defer.promise;
        }, getTask: function (idTask)
        {
            var defer = Q.defer();
            defer.resolve({
                results: [{
                              id: 1, 'title': 'Configure AngularJS routing',
                          }, {
                              id: 2, 'title': 'Bind Posts',
                          }], total: 2
            });
            return defer.promise;
        }, createNew: function (test)
        {
            var defer = Q.defer();
            defer.resolve();
            return defer.promise;
        }
    };
})();