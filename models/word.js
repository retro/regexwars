define(['can/util/string', 'can/model', 'can/construct/super'], function(can){


	var getKillerIndices(word){
		var indices      = [],
			length       = word.length,
			isOpen       = false,
			currentIndex = 0,
			letter;

		for(var i = 0; i < length; i++){
			letter = word[i];
			if(letter === '['){
				isOpen = true;
				continue;
			}
			if(letter === ']'){
				isOpen = false;
				continue;
			}
			if(isOpen){
				indices.push(currentIndex);
			}
			currentIndex++;
		}

		return indices;
	}


	return can.Model({

		findAll : 'GET /words',
		findOne : 'GET /words/{id}',
		create  : 'POST /words',
		update  : 'PUT /words/{id}',
		destroy : 'DELETE /words/{id}',
		model : function(data, req){
			data.winningState  = data.word.replace(/\[[a-z]+]/gi, ' ');
			data.originalWord  = data.word;
			data.killerIndices = getKillerIndices(data.word);
			data.cleanWord     = data.word.replace(/\[|\]/gi, '');
			data.preparedWord  = data.word.replace(/]/gi, '<b>').replace(/[/gi, '</b>');
			return this._super.apply(this, arguments);
		}
	}, {
		isDestroyed : function(){
			return this.attr('word') === this.attr('winningState');
		},
		shoot : function(r){
			var regex = new RegExp(r, 'gi');
			this.attr('word', this.attr('word').replace(regex, ' '));
			if(this.isDestroyed()){
				this.destroy();
			}
		},
		damage : function(){
			var length = this.attr('cleanWord').length,
				damage = 1,
				coefficient, aliveKillers;
		}
	});

})