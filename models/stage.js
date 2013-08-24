define(['can/util/string', 'can/model'], function(can){

  return can.Model({

    findAll : 'GET /stages',
    findOne : 'GET /stages/{id}',
    create  : 'POST /stages',
    update  : 'PUT /stages/{id}',
    destroy : 'DELETE /stages/{id}'

  }, {

  });

})