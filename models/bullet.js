define(['can/util/string', 'can/model', 'can/construct/proxy'], function(can){

	var Model = can.Model({

		findAll : 'GET /bullets',
		findOne : 'GET /bullets/{id}',
		create  : 'POST /bullets',
		update  : 'PUT /bullets/{id}',
		destroy : 'DELETE /bullets/{id}'

	}, {
		init: function() {
			//izracun

			window.setTimeout(this.proxy('setDestination'), 0);
		},

		setDestination: function() {
			// debugger
			/*var deltaHeight = 50;
			//stage height + delta height
			var finalTop = this.attr('maxY') + deltaHeight;
			// pixels per animation frame
			var bulletSpeed = 200;
			var trajectoryLength = Math.abs(finalTop/Math.cos(this.attr('angle')));
			var buletTravelTime = trajectoryLength/bulletSpeed;
			var finalLeft = Math.sqrt(Math.pow(trajectoryLength,2)-Math.pow(finalTop,2));*/
			this.attr('animationTime', '1');
			this.attr('top',  this.destinationTop);
			this.attr('left', this.destinationLeft);
		},

 		bulletAngle : function(){
			var angle = this.attr('angle');
			return angle > 0 ? angle - 90 : angle + 90;
		}
	});

	Model.List = can.Model.List({
		
	})

	return Model;

})
