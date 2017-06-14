!(function($){
	function iGuide(){
		this.render();
	}

	iGuide.prototype = {
		constructor: iGuide,

		defaults: {
			step: 0
		},

		render: function(){
			var that = this;
			$.ajax({
				url: 'resource/tmpl/guide.html',
				success: function(data){
					that.$el = $(data);

					that.evtBind();
					that.$el.appendTo($('body'));
				}
			});
		},

		evtBind: function(){
			var that = this;
			this.$el.click(function(e){
				var target = e.target;

				if(target.nodeName == 'LI'){
					var siblings = target.parentNode.childNodes;
					for(var i=0; i<siblings.length; i++){
						var child = siblings[i];
						if(child.nodeName == 'LI'){
							child.className = '';
						}
					}

					target.className = 'active';

					var guideEl = $('.guide');
					guideEl.addClass('guide-animation');
					setTimeout(function(){
						guideEl.removeClass('guide-animation');
					},350);

					var idx = that.defaults.step = target.getAttribute('data-idx'),
						$preEl = that.$el.find('.previous'),
						$nextEl = $preEl.siblings('.next'),
						$doneEl = $preEl.siblings('.done'),
						$content = that.$el.find('.content');

					$content[0].style.background = 'url(resource/images/step'+idx+'.png)';

					$preEl[idx > 0 ? 'show':'hide']();
					$nextEl[idx < 1 ? 'show':'hide']();
					$doneEl[idx == 1 ? 'show':'hide']();
				}

				if(target.className.indexOf('close') != '-1'){
					that.$el.remove();
				}
				
				if(target.className.indexOf('previous') != '-1'){
					that.$el.find('li:eq('+ (--that.defaults.step) +')').trigger('click');
				}

				if(target.className.indexOf('next') != '-1'){
					that.$el.find('li:eq('+ (++that.defaults.step) +')').trigger('click');
				}

				if(target.className.indexOf('done') != '-1'){
					that.$el.remove();
				}

				e.stopPropagation();
			});

			// this.$el.iDrag();
		},

		unEvtBind: function(){

		}
	};

	!(function(){
		var old = $.iGuide;
		$.iGuide = function(){
			return new iGuide();
		};
		$.iGuide.defaults = {};
		$.iGuide.noConfict = function(){
			$.iGuide = old;
			return this;
		}
	})();
})(window.jQuery);