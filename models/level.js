define(['can/util/string', 'can/model'], function(can){

  return can.Model({

    findAll : 'GET /levels',
    findOne : 'GET /levels/{id}',
    create  : 'POST /levels',
    update  : 'PUT /levels/{id}',
    destroy : 'DELETE /levels/{id}'

  }, {

  });

})