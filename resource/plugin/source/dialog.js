!(function($){
	function iDialog(json){
		this.create(json);
	}

	iDialog.prototype = {
		$el: '',

		tmpl: '',

		create: function(json){
			if(this.tmpl){
				this.$el = $(this.tmpl);
				that.evtBind();
				that.$el.appendTo($('body'));
			}else{
				var that = this;
				$.ajax({
					url: 'resource/tmpl/dialog.html',
					success: function(data){
						that.tmpl = data;
						var tmpl = data.replace('${url}', json.url)
											.replace('${title}', json.title)
												.replace('${icon}', json.icon)
													.replaceAll('${data}', json.data)
														.replace('${tip}', json.tip);
						that.$el = $(tmpl);
						that.evtBind();
						that.$el.appendTo($('body'));
					}
				});
			}
		},

		evtBind: function(){
			var that = this;
			this.$el.find('.close').click(function(){
				that.close();
			});

			this.$el.iDrag();
		},

		open: function(){

		},

		close: function(){
			this.$el.remove();
		}
	};

	!(function(){
		var old = $.iDialog;
		$.iDialog = function(json){
			return new iDialog(json);
		};
		$.iDialog.constructor = iDialog;
		$.iDialog.defaults = {};
		$.iDialog.noConfict = function(){
			$.iDialog = old;
			return this;
		}
	})();
})(window.jQuery);