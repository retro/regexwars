define(['can/util/string', 'can/model'], function(can){

  return can.Model({

    findAll : 'GET /words',
    findOne : 'GET /words/{id}',
    create  : 'POST /words',
    update  : 'PUT /words/{id}',
    destroy : 'DELETE /words/{id}'

  }, {

  });

})