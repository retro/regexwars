define(['can/util/string', 'can/util/fixture'], function(can){

  var store = can.fixture.store(100, function(i){
    var id = i + 1; // Make ids 1 based instead of 0 based
    return {
      id   : id,
      name : 'Player ' + id
    }
  });

  can.fixture({
    'GET /players'         : store.findAll,
    'GET /players/{id}'    : store.findOne,
    'POST /players'        : store.create,
    'PUT /players/{id}'    : store.update,
    'DELETE /players/{id}' : store.destroy
  });

  return store;

})