define(['can/util/string', 'can/util/fixture'], function(can){

  var store = can.fixture.store(100, function(i){
    var id = i + 1; // Make ids 1 based instead of 0 based
    return {
      id   : id,
      regex : '[a-z]{1}'
    }
  });

  can.fixture({
    'GET /bullets'         : store.findAll,
    'GET /bullets/{id}'    : store.findOne,
    'POST /bullets'        : store.create,
    'PUT /bullets/{id}'    : store.update,
    'DELETE /bullets/{id}' : store.destroy
  });

  return store;

})