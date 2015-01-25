(function(){

  'use strict';
  var express=require('express');

  var cors=require('cors');
  var taskManager=require('./REST/taskManager');
  var app = express();

  app.route('/')
      .get(function(request,response){
          response.send('Good');
      });
  app.use(cors());
  app.use('/api/task',taskManager);

  app.listen(3000);
})();
