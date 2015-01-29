(function ()
{
    'use strict';
    var Q = require('q');
    var mongoose = require('mongoose');
    var configDB = require('../../config/database.js');
    var Schema = mongoose.Schema;
    var tokenDAO = require('./tokenDAO');
    mongoose.createConnection(configDB.url + '/users', function (error)
    {
        if (error) {
            console.log(error);
        }
    });
    var userSchema = new Schema({
        email: String, password: String
    });
    var ModelUser = mongoose.model('User', userSchema);
    function authenticate(user)
    {
        var defer = Q.defer();
        try {
            ModelUser.findOne({email: user.email, password: user.password}).exec().then(function (data)
            {
                if (data) {
                    tokenDAO.addTokenAndSet(data._id, new Date().getTime()).then(function (result)
                    {
                        return defer.resolve(result);
                    });
                }else{
                    return defer.reject(data);
                }

            });
        } catch (error) {
            defer.reject(error);
        }
        return defer.promise;
    }

    module.exports = {
        authenticate: authenticate
    };
})();