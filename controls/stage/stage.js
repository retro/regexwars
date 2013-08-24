define(['can/util/string', 'mustache!./init', 'models/bullet', 'can/control', 'less!./stage'], function(can, initView, BulletModel){

	return can.Control({
		defaults : {

		}
	},{
		init : function(){
			var self = this;

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
				bullets : this.bullets
			}));

			this.$area  = this.element.find('#area');
			this.$gun   = this.element.find('#gun');

			this.offset = this.$area.offset();

			this.areaWidth(this.$area.width());
			this.areaHeight(this.$area.height());
			
			window.requestAnimationFrame(this.bullets.proxy('move'));
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
				boundingRect;

			if(angle > 0){
				boundingRect = this.$gun[0].getBoundingClientRect();
				leftPos = boundingRect.right - this.offset.left;
			}

			this.bullets.push(new BulletModel({
				regex : 'foo',
				top   : this.bulletOrigin.y,
				left  : leftPos,
				angle : angle,
				maxX  : this.areaWidth()
			}))
		},
		"webkitTransitionEnd" : "removeBullet",
		"oTransitionEnd"      : "removeBullet",
		"transitionend"       : "removeBullet",
		"msTransitionEnd"     : "removeBullet",
		removeBullet : function(el, ev){
			el.data('model').destroy();
		}
	});

})