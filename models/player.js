define(['can/util/string', 'can/model'], function(can){

  return can.Model({

    findAll : 'GET /players',
    findOne : 'GET /players/{id}',
    create  : 'POST /players',
    update  : 'PUT /players/{id}',
    destroy : 'DELETE /players/{id}'

  }, {

  });

})