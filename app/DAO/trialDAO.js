(function ()
{
    'use strict';
    var Q = require('q');
    var mongoose = require('mongoose');
    var configDB = require('../../config/database.js');
    mongoose.createConnection(configDB.url + 'trial', function (error)
    {
        if (error) {
            console.log(error);
        }
    });
    var Schema = mongoose.Schema;
    var testSchema = new Schema({
        title: String, description: String, assignedTask: Array
    });
    var Model = mongoose.model('trial', testSchema);
    module.exports = {
        search: function (query)
        {
            var defer = Q.defer();
            defer.resolve({
                results: [{
                              'test': 'AngularJS Test 1',
                              'student': 'Joe',
                              'createDate': '2014-01-01',
                              'submitDate': '2014-01-02',
                              'startDate': '2014-01-01',
                              'status': 'open'
                          }], total: 1
            });
            return defer.promise;
        }
    };
})();