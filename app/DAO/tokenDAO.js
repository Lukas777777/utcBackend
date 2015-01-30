(function ()
{
    'use strict';
    var Q = require('q');
    var mongoose = require('mongoose');
    var configDB = require('../config/database.js');

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

    function authenticate(userId, data)
    {
        var defer = Q.defer();
        try {
            Model.findOne({userId: userId}).exec().then(function (result)
            {
                if (result && 0 !== result.length) {
                    result.data = new Date().getTime();
                    Model.findByIdAndUpdate({_id: result._id}, {data: result.data}).exec().then(function (result)
                    {
                        defer.resolve({token: result._id.valueOf()});
                    });
                } else {
                    new Model({userId: userId, data: data}).save(function (error)
                    {
                        if (error) {
                            defer.reject(error);
                        }
                        Model.findOne({userId: userId, data: data}).exec().then(function (result)
                        {
                            defer.resolve({token: result._id.valueOf()});
                        });
                    });
                }
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
            var tmp;
            if (idToken) {
                idToken = idToken.slice(6);
                tmp = new Buffer(idToken, 'base64').toString('ascii');
            }
            Model.findById(tmp,function(error){
               if(error){
                   defer.reject(error);
               }
            }).exec().then(function (result)
            {
                if (result) {
                    return defer.resolve(result.userId.valueOf());
                } else {
                    return defer.reject('NOT_FOUND');
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
        addTokenAndSet: authenticate, getMeOrNull: getMeOrNull, updateToken: updateToken, deleteOldTokens: deleteOldTokens
    };
})();