(function ()
{
    'use strict';
    var Q = require('q');
    var mongoose = require('mongoose');
    var configDB = require('../../config/database.js');
    mongoose.createConnection(configDB.url + '/tokens', function (error)
    {
        if (error) {
            console.log(error);
        }
    });
    var Schema = mongoose.Schema;
    var tokenSchema = new Schema({
        userId: String, data: Number
    });
    var Model = mongoose.model('tokens', tokenSchema);

    function addTokenAndSet(userId, data)
    {
        var defer = Q.defer();
        try {
            new Model({userId: userId, data: data}).save(function (error)
            {
                if (error) {
                    defer.reject(error);
                }
                Model.findOne({userId: userId, data: data}).exec().then(function (result)
                {
                    defer.resolve({token: result._id});
                });
            });
        } catch (error) {
            defer.reject(error);
        }
        return defer.promise;
    }

    function getMeOrNull(idToken)
    {
        var defer = Q.defer();
        try {
            var tmp = new Buffer(idToken, 'base64').toString('ascii');
            Model.findById(tmp).exec().then(function (result)
            {
                if (result) {
                    return defer.resolve(idToken);
                } else {
                    return defer.resolve(401);
                }
            });
        } catch (error) {
            defer.reject(error);
        }
        return defer.promise;
    }

    function updateToken(idToken)
    {

    }

    function deleteOldTokens()
    {

    }

    module.exports = {
        addTokenAndSet: addTokenAndSet, getMeOrNull: getMeOrNull, updateToken: updateToken, deleteOldTokens: deleteOldTokens
    };
})();