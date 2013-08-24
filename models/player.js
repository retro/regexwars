define(['can/util/string', 'can/model'], function(can){

	var currentPlayer;

	return can.Model({

		findAll : 'GET /players',
		findOne : 'GET /players/{id}',
		create  : 'POST /players',
		update  : 'PUT /players/{id}',
		destroy : 'DELETE /players/{id}',
		current : function(){
			if(!currentPlayer){
				currentPlayer = new this;
			}
			return currentPlayer;
		}
	}, {
		init : function(){
			this.attr('hp', 100);
			this.attr('dead', false);
		},
		damage : function(word){
			this.attr('hp', this.attr('hp') - word.damage());
			if(this.attr('hp') <= 0){
				this.attr('dead', true);
			}
		}
	});

})