define(['can/util/string', 'can/util/fixture'], function(can){

  var words = ['abandon','abandoned','ability','able','about','above','abroad','absence','absent','absolute','absolutely','absorb','abuse','academic','accent','acceptable','accept','access','accident','accidental','accommodation','accompany','according', 'to','account','accurate','accuse','achieve','achievement','acid','acknowledge','acquire','across','act','action','active','activity','actor','actress','actual','actually','ad','adapt','add','addition','additional','address','adequate','adjust','admiration','admire','admit','adopt','adult','advance', 'anal (as requested by @gperetin)']


  var store = can.fixture.store(words.length - 1, function(i){
    var id = i + 1; // Make ids 1 based instead of 0 based
    return {
      id   : id,
      word : words[i]
    }
  });

  can.fixture({
    'GET /words'         : store.findAll,
    'GET /words/{id}'    : store.findOne,
    'POST /words'        : store.create,
    'PUT /words/{id}'    : store.update,
    'DELETE /words/{id}' : store.destroy
  });

  return store;

})