!(function($){
	var $axis = $('#axis'),
		$icon = $('#icon'),
		$light = $('#light'),
		$shadow = $('#shadow'),
		aPlayer;

	$axis.iRotate(function(){
		clearTimeout(window.rotateTimeout);
		window.rotateTimeout = setTimeout(function(){
			console.log(ishit($('#icon')[0], $('#axis')[0]));
			if( ishit(document.getElementById('shadow'), document.getElementById('axis')) ){
				jukeboxStart();

				initRipple();

				$(window).resize(function(){
					clearTimeout(window.resizeTimeout);
					window.resizeTimeout = setTimeout(function(){
						destroyRipple();
						initRipple();
					},100);
				});
				
				aPlayer.play();
			}else{
				jukeboxEnd();
				destroyRipple();

				aPlayer.pause();
			}
		},500);
	});

	//音波
	function initRipple(){
		if(!window.interval){
			var $shadow = $('#shadow');
			if($shadow.length){
				var position = $shadow[0].getBoundingClientRect(),
					colors = ['#457c69','#74c393','#8f8c6d','#e5bf80','#e9d78d','#e2975d','#f29671','#e26553','#c94a53','#be5168','#a44974','#98376a','#65377f','#4e2372','#e279a1','#df598b','#7b9faf','#529ac0','#9cbe8c'],
					idx = 0;

				window.interval = setInterval(function(){
					var color = colors[idx++ >= colors.length ? [idx=0,0] : idx];

					var $section = $('<section class="ripple" style="position:absolute;left:' + 
						position.left + 'px;top:' + 
						position.top + 'px;box-shadow:4px -4px 4px' +
						color + ';z-index:-1"></section');

					$(document.body).append($section);

					(function(){
						setTimeout(function(){
							$section.remove();
						}, 5000);
					})($section);
				}, 1000);
			}else{
				console.log('没有找到唱片！');
			}
		}
	}

	function destroyRipple(){
		clearInterval(window.interval);
		delete window.interval;
	}

	function jukeboxStart(){
		if($icon.css('animation').indexOf('none')){
			$icon.removeClass('pauseWalk').addClass('goWalk');
			$shadow.removeClass('pauseWalk').addClass('goWalk');
		}else{
			$icon.css('animation', 'icon-animation 5s linear 0s infinite');
			$shadow.css('animation', 'shadow-animation 5s linear 0s infinite');
		}
	}

	function jukeboxEnd(){
		$icon.removeClass('goWalk').addClass('pauseWalk');
		$shadow.removeClass('goWalk').addClass('pauseWalk');
	}

	initMusic();
	function initMusic(){
		aPlayer = new APlayer({
		    element: document.getElementById('audio'),
		    narrow: false,
		    autoplay: false,
		    showlrc: false,
		    music: {
		        title: 'Preparation',
		        author: 'Hans Zimmer/Richard Harvey',
		        url: 'http://m10.music.126.net/20170530220744/d7d8b15b7e21574ce44b953035544669/ymusic/2ea1/32fb/f88c/e459bed1cdc8282ebe6f69864d8a20a0.mp3', 
		        // pic: 'http://7xifn9.com1.z0.glb.clouddn.com/Preparation.jpg'
		    }
		});
		
		aPlayer.init();
	}

	evtBind();
	function evtBind(){
		$(document).click(function(e){
			var $el = $(e.target);

			if($el.hasClass('fa-lg')){
				$.iDialog(index_mock[$el.index()]);
			}
		});

		var videoEl = window.getEl('#main-video');
		if(videoEl.onloadeddata){
			videoEl.onloadeddata = clearLoading;
		}else{
			clearLoading()
		}
	}

	loadingStart();
	function loadingStart(){
		var text = 'loading',
			idx = 0;
		window.loadingInterval = setInterval(function(){
			if(idx < 4){
				var html = text;
				for(var i=0; i<idx; i++){
					html += '.';
				}
				$('.loading > .tip').html(html);

				idx++;
			}else{
				idx = 0;
			}
		},200);
	}

	function clearLoading(){
		$('.loading').fadeOut();
		clearInterval(window.loadingInterval);
	}

	guide();
	function guide(){
		if(!getCookie('isGuide')){
			setCookie("isGuide","true","d2");
			$.iGuide();
		}
	}
})(jQuery);