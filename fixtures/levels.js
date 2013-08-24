define(['can/util/string', 'can/util/fixture'], function(can){

  var store = can.fixture.store(100, function(i){
    var id = i + 1; // Make ids 1 based instead of 0 based
    return {
      id   : id,
      name : 'Level ' + id
    }
  });

  can.fixture({
    'GET /levels'         : store.findAll,
    'GET /levels/{id}'    : store.findOne,
    'POST /levels'        : store.create,
    'PUT /levels/{id}'    : store.update,
    'DELETE /levels/{id}' : store.destroy
  });

  return store;

})