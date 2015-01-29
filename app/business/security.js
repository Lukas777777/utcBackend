(function(){
    'use strict';
    var Q=require('q');
    function isAuthenticated(context){
        var defer= Q.defer();
        if(!context||!context.user){
            defer.reject();
        }else{
            defer.resolve();
        }
        return defer.promise;
    }
    function checkRoles(user){
        var defer= Q.defer();
        for(var i=1;i<arguments.length;i++){
          for(var j=0;j<user.role.length;j++){
              if(user.role[j]===arguments[i]){
                  defer.resolve();
              }
          }
        }
        defer.reject();
        return defer.promise;
    }
    module.exports={
        isAuthenticated:isAuthenticated,
        checkRoles:checkRoles
    };
})();

/*
* checkRolls user, dowolna ilosc
* */