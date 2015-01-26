(function(){
    'use strict';
    var mongoose=require('mongoose');
    var Schema=mongoose.Schema;
    var taskSchema = new Schema({
        _id: false, title: String, description: String, tags: Array
    });
    module.exports=mongoose.model('task', taskSchema);
})();