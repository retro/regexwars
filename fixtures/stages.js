define(['can/util/string', 'can/util/fixture'], function(can){

  var store = can.fixture.store(100, function(i){
    var id = i + 1; // Make ids 1 based instead of 0 based
    return {
      id   : id,
      name : 'Stage ' + id
    }
  });

  can.fixture({
    'GET /stages'         : store.findAll,
    'GET /stages/{id}'    : store.findOne,
    'POST /stages'        : store.create,
    'PUT /stages/{id}'    : store.update,
    'DELETE /stages/{id}' : store.destroy
  });

  return store;

})