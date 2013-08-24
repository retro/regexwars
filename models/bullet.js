define(['can/util/string', 'can/model'], function(can){

	return can.Model({

		findAll : 'GET /bullets',
		findOne : 'GET /bullets/{id}',
		create  : 'POST /bullets',
		update  : 'PUT /bullets/{id}',
		destroy : 'DELETE /bullets/{id}'

	}, {
		
	});

})