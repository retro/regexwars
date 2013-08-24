define(['can/util/string', 'can/model', 'can/construct/proxy'], function(can){

	var Model = can.Model({

		findAll : 'GET /bullets',
		findOne : 'GET /bullets/{id}',
		create  : 'POST /bullets',
		update  : 'PUT /bullets/{id}',
		destroy : 'DELETE /bullets/{id}'

	}, {
		move : function(){

		},
		bulletAngle : function(){
			var angle = this.attr('angle');
			return angle > 0 ? angle - 90 : angle + 90;
		}
	});

	Model.List = can.Model.List({
		move : function(){
			this.map(function(b){
				b.move();
			})
		}
	})

	return Model;

})