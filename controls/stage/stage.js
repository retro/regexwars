define(['can/util/string', 'mustache!./init', 'models/bullet', 'models/word', 'models/player', 'can/control', 'less!./stage'], function(can, initView, BulletModel, WordModel, PlayerModel){

	var getRandomInRange = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	return can.Control({
		defaults : {

		}
	},{
		init : function(){
			var self = this;

			this.options.currentWords = new WordModel.List;
			this.options.currentPlayer = PlayerModel.current();
			this.on();

			this.words = new WordModel.List;

			this.areaHeight = can.compute(0);
			this.areaWidth  = can.compute(0);

			this.bullets    = new BulletModel.List;

			this.bulletOrigin = {x: 0, y: 0};

			this.mousePosition = can.compute({
				x: 0,
				y: 0
			});

			this.angle = can.compute(function(){
				var position   = self.mousePosition(),
				center     = (self.areaWidth() / 2),
				isPositive = position.x > center,
				deltaY     = self.areaHeight() - position.y,
				deltaX     = center - position.x,
				angle      = -Math.atan(deltaX / deltaY) * 90;

				return Math.min(Math.max(-67, angle), 67);
			});

			this.element.html(initView({
				angle   : this.angle,
				bullets : this.bullets,
				words   : this.options.currentWords,
				player  : this.options.currentPlayer,
				hpColor : function(){
					var hp = self.options.currentPlayer.attr('hp'),
						color;
					if(hp > 75){
						color = 'green';
					} else if (hp > 50){
						color = 'yellow';
					} else if (hp > 25){
						color = 'orange';
					} else {
						color = 'red';
					}
					return color;
				}
			}));

			this.$area       = this.element.find('#area');
			this.$gun        = this.element.find('#gun');
			this.$trajectory = this.element.find('#trajectory');

			this.offset = this.$area.offset();

			this.areaWidth(this.$area.width());
			this.areaHeight(this.$area.height());

			WordModel.findAll({}, function(data){
				self.words.replace(data);
				self.addWord();
			});
		},
		"#area mousemove" : function(el, ev){
			var position = this.$gun.position()
			this.mousePosition({
				x: ev.pageX - this.offset.left,
				y: ev.pageY - this.offset.top
			});

			this.bulletOrigin.x = position.left;
			this.bulletOrigin.y = position.top;
		},
		"#area click" : function(){
			var leftPos = this.bulletOrigin.x,
				angle   = this.angle(),
				trajectory = this.$trajectory[0].getBoundingClientRect(),
				destinationTop = trajectory.top,
				destinationLeft = trajectory.left,
				boundingRect;

			if(angle > 0){
				boundingRect = this.$gun[0].getBoundingClientRect();
				leftPos = boundingRect.right - this.offset.left;
			}

			if(angle > 0){
				destinationLeft += trajectory.width;
			}

			leftPos -= 8;

			this.bullets.push(new BulletModel({
				regex : 'foo',
				top   : this.bulletOrigin.y,
				left  : leftPos,
				destinationTop : destinationTop - this.offset.top,
				destinationLeft : destinationLeft - this.offset.left,
				angle : angle
			}))
		},
		".bullet webkitTransitionEnd" : "removeBullet",
		".bullet oTransitionEnd"      : "removeBullet",
		".bullet transitionend"       : "removeBullet",
		".bullet msTransitionEnd"     : "removeBullet",
		removeBullet : function(el, ev){
			el.data('model').destroy();
		},
		addWord : function(){
			var word = this.words.getNext()[0];
			word && this.options.currentWords.push(word);
			this._addWordTimeout = setTimeout(this.proxy('addWord'), 2000);
		},
		'{currentWords} add' : function(){
			setTimeout(this.proxy(function(){
				var $word = this.element.find('.word:last'),
					width = $word.outerWidth(),
					left  = getRandomInRange(5, this.areaWidth() - 5 - width);
				$word.css({
					left : left + 'px'
				}).css('left');
				$word.addClass('move-word');
			}), 0)
		},
		".word webkitTransitionEnd" : "damagePlayer",
		".word oTransitionEnd"      : "damagePlayer",
		".word transitionend"       : "damagePlayer",
		".word msTransitionEnd"     : "damagePlayer",
		damagePlayer : function(el, ev){
			var model = el.data('model');
			this.options.currentPlayer.damage(model);
			model.destroy();
		},
		'{currentPlayer} dead' : function(){
			clearTimeout(this._addWordTimeout);
		}
	});

})
