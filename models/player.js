define(['can/util/string', 'can/model'], function(can){

	return can.Model({

		findAll : 'GET /players',
		findOne : 'GET /players/{id}',
		create  : 'POST /players',
		update  : 'PUT /players/{id}',
		destroy : 'DELETE /players/{id}'
		attributes {

		}
	}, {
		shoot : function(bullet){
			bullet.attr({
				trajectory : 25,
				position : {
					top : 0,
					left : 0
				},
				isTraveling : true
			})
		}
	});

})