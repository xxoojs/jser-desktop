!(function($){
	function iDrag($el){
		this.render($el);
	}

	iDrag.prototype = {
		constructor: iDrag,

		render: function($el){
			var active = false;
			$el.on('mousedown touchstart', function(downEvt){
				var downX = downEvt.pageX,
					downY = downEvt.pageY;

				active = true;

				var distanceX = downX - parseInt($el.css('left')),
					distanceY = downY - parseInt($el.css('top'));

					// console.log('down:');
					// console.log(downX + ':' + downY);
					// console.log($el.css('left') + ':' + $el.css('top'));

				$(document).on('mousemove touchmove', function(moveEvt){
					if(active){
						var moveX = moveEvt.pageX,
							moveY = moveEvt.pageY;

						var left = moveX - distanceX,
							top = moveY - distanceY,
							maxLeft = document.body.offsetWidth,
							maxTop = document.body.offsetHeight;
						
						// if(left <= 0){
						// 	left = 0;
						// }
						// if((left + parseInt($el.css('width'))) > maxLeft){
						// 	left = maxLeft - parseInt($el.css('width'));
						// }

						// if(top <= 0){
						// 	top = 0;
						// }
						// if((top + parseInt($el.css('height'))) > maxTop){
						// 	top = maxTop - parseInt($el.css('height'));
						// }

						$el.css('left', left + 'px');
						$el.css('top', top + 'px');
					}

					$(document).on('mouseup touchend', function(){
						// $(document).off('mousemove').off('mouseup');
						active = false;
					});
				});
			});
		}
	};

	!(function(){
		var old = $.fn.iDrag;
		$.fn.iDrag = function(){
			this.each(function(){
				new iDrag($(this));
			});
		}
		$.fn.iDrag.defaults = {};
		$.fn.iDrag.noConfict = function(){
			$.fn.iDrag = old;
			return this;
		}
	})();
})(window.jQuery);