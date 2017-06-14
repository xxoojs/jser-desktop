console.log(jQuery);
!(function($){
	console.log($);
	function iRotate($el, callback){
		this.render($el, callback);
	}

	iRotate.prototype = {
		constructor: iRotate,

		render: function($el, callback){
			var elRect = $el[0].getBoundingClientRect(),
				initY = elRect.bottom;

			$el.mousedown(function(downevent){
				var downX = downevent.pageX,
					downY = downevent.pageY;
				$(document).mousemove(function(moveevent){
					var moveX = moveevent.pageX,
						moveY = moveevent.pageY;

					var angle = -(moveY - initY);

					$el.css('transform', 'rotateZ(' + (angle > 55 ? 55 : (angle < -10 ? -10 : angle)) + 'deg)');
					callback && callback();

					$(document).mouseup(function(upevent){
						$(document).off('mousemove').off('mouseup');
					});
				});
			});
		}
	};

	!(function () {
        var old = $.fn.iRotate;
        $.fn.iRotate = function (callback) {
            return this.each(function () {
                var $this = $(this);

                new iRotate($this, callback);
            });
        }
        $.fn.iRotate.constructor = iRotate;
        $.fn.iRotate.defaults = {};
        $.fn.iRotate.noConflict = function () {
            $.fn.iRotate = old;
            return this;
        }
    })();
})(window.jQuery);