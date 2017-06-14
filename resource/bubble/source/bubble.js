(function () {
	window.context = document.getElementById("myCanvas").getContext("2d");

	CanvasRenderingContext2D.prototype.draw = function (x, y, radius) {
		this.beginPath();
		this.arc(x, y, radius, 0, Math.PI * 2, false);
		this.closePath();
		this.fill();
	}

	function BezierEllipse2(ctx, x, y, a, b) {
		let k = .5522848,
		ox = a * k, // 水平控制点偏移量
		oy = b * k; // 垂直控制点偏移量

		ctx.beginPath();
		//左端点开始,顺时针
		ctx.moveTo(x - a, y);
		ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
		ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
		ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
		ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
		ctx.fill();
	}

	function impactDetection(obj){
		let border_top = 0,
		border_left = 0,
		border_right = bubbleInstance.canvas.width,
		border_bottom = bubbleInstance.canvas.height;
		let reduce =  - bubbleInstance.config.lose

		for (let i = 0; i < bubbleInstance.asteroids.length; i++) {
			let tag = bubbleInstance.asteroids[i];
			if (tag.name == obj.name)
				continue;
			let dx = Math.pow(obj.x - tag.x, 2);
			let dy = Math.pow(obj.y - tag.y, 2);
			let d = Math.pow(obj.radius + tag.radius, 2);
			if (bubbleInstance.Math.distance(obj, tag) <= 0.1) {
				obj.vX = obj.vX * reduce;
				obj.vY = obj.vY * reduce;
				if (obj.x - tag.x > 0) {
					obj.x = Math.abs(Math.sqrt(d - dy) + tag.x) + 2;
				} else {
					obj.x = tag.x - Math.abs(Math.sqrt(d - dy)) - 2;
				}

				tag.vX = tag.vX * reduce;
				tag.vY = tag.vY * reduce;
			}
		}

		//============================================
		//上下
		let totop = (obj.y - obj.radius),
		tobottom = (obj.y + obj.radius);
		if (totop < border_top) {
			obj.y = obj.radius;
			obj.vY = obj.vY * reduce;
		} else if (tobottom > border_bottom) {
			obj.y = border_bottom - obj.radius;
			obj.vY = obj.vY * reduce;
		}
		//左右
		let toleft = (obj.x - obj.radius),
		toright = (obj.x + obj.radius);
		if (toleft < border_left) {
			obj.x = obj.radius;
			obj.vX = obj.vX * reduce;
		} else if (toright > border_right) {
			obj.x = border_right - obj.radius;
			obj.vX = obj.vX * reduce;
		}

	}

	function Color(){
		return {
			mode: "RGB",
			instance: function(){
				return 'rgba(255, 255, 255, .9)';
			},
			update: function(){}
		};
	}

	//global varibles
	var bubbleInstance = {
		canvas : document.getElementById("myCanvas"),

		context : window.context,

		// Math : new MathUtil(),

		config : {
			number : 10,
			speed : 10,
			lose :.8,
			size : 100 
		}
	}

	bubbleInstance.bubble = class {
		constructor(x, y, radius, vX, vY) {
			this.x = x;
			this.y = y;
			this.radius = radius;
			this.vX = vX;
			this.vY = vY;
			this.color = new Color();
		}
	}
	bubbleInstance.draw = function (x, y, r, context, color) {
		context.save();
		context.font = '40px Arial';
		context.fillStyle = 'rgba(255, 255, 255, .8)';
		context.fillText('music', x-50, y+10);
		context.restore();

		//内部椭圆
		let grident = context.createRadialGradient(x, y - 15, r, x, y, r / 2 + 10);
		grident.addColorStop(0, "rgba(197,197,197,.15)");
		grident.addColorStop(1, "rgba(214,211,231,0)");
		context.fillStyle = grident;
		BezierEllipse2(context, x, y - 15, r - 40, r - 40);

		//外切球体
		context.save();
		grident = context.createRadialGradient(x, y, r, x, y, r-30);
		grident.addColorStop(0, 'rgba(255, 255, 255, .9)');
		//此颜色和背景颜色相同
		// grident.addColorStop(1, "rgba(4,78,140,0)");
		grident.addColorStop(1, "rgba(255, 255, 255, 0)");
		context.fillStyle = grident;
		context.strokeStyle = "#ffffff";
		context.shadowBlur = 0;
		context.shadowOffsetX = 0;
		context.shadowOffsetY = 0;
		context.shadowColor = "#f79be7";
		context.globalCompositeOperation = "destination-over";
		context.draw(x, y, r - 20);
		context.restore();

		//小光圈
		context.save();
		context.shadowBlur = 20; //模糊的距离
		context.shadowOffsetX = 0; //x轴偏移量
		context.shadowOffsetY = 0; //y轴偏移量
		// context.shadowColor = "#ffffff"; // 阴影颜色
		// context.fillStyle = "rgba(222,222,222,.3)"

		grident = context.createRadialGradient(x, y, r, x, y, r - 30);
		grident.addColorStop(0, color.instance());
		//此颜色和背景颜色相同
		grident.addColorStop(1, "rgba(4,78,140,0)");
		context.fillStyle = grident;
		// context.fillStyle = "rgba(255,255,255,.6)"
		context.globalCompositeOperation = "source-over";
		context.transform(1, 0, 0, 1, x - 40, y - 50);
		context.rotate(-Math.PI / 4);
		BezierEllipse2(context, 0, 0, 20, 7);
		context.restore();
	}
	bubbleInstance.loop = function () {
		bubbleInstance.clear.call();
		let asteroidsLength = bubbleInstance.asteroids.length;
		for (let i = 0; i < asteroidsLength; i++) {
			let tmpAsteroid = bubbleInstance.asteroids[i];
			tmpAsteroid.x += tmpAsteroid.vX;
			tmpAsteroid.y += tmpAsteroid.vY;

			tmpAsteroid.color.update();
			bubbleInstance.draw(tmpAsteroid.x, tmpAsteroid.y, tmpAsteroid.radius, bubbleInstance.context, tmpAsteroid.color);

			impactDetection(tmpAsteroid);
		};
		requestAnimationFrame(arguments.callee);

	}
	bubbleInstance.init = function (param) {
		bubbleInstance.resize.call(bubbleInstance, null).configure(param);
		bubbleInstance.asteroids = new Array();
		for (let i = 0; i < bubbleInstance.config.number; i++) {
			const radius = bubbleInstance.config.size
				let x = Math.random() * (bubbleInstance.canvas.width - 2 * radius) + radius;
			let y = Math.random() * (bubbleInstance.canvas.height - 2 * radius) + radius;
			let vX = (Math.random() * 2 - 1) * bubbleInstance.config.speed;
			let vY = (Math.random() * 2 - 1) * bubbleInstance.config.speed;

			bubbleInstance.asteroids.push(new bubbleInstance.bubble(x, y, radius, vX, vY));

			bubbleInstance.loop.call()
		};
	}
	bubbleInstance.clear = function () {
		bubbleInstance.context.clearRect(0, 0, bubbleInstance.canvas.width, bubbleInstance.canvas.height);
	}
	bubbleInstance.resize = function () {
		bubbleInstance.canvas.width = window.innerWidth;
		bubbleInstance.canvas.height = window.innerHeight;
		return this
	}
	bubbleInstance.configure = function (...para) {
		return (function () {
			bubbleInstance.config = Object.assign(bubbleInstance.config, para[0]);
		})()

	}

	window.onresize = bubbleInstance.resize
	window.bubbleInstance = bubbleInstance;

	bubbleInstance.init({
		number : 1, //球个数
		speed : 10,	//初始速度
		lose : .8,	//能量损失
		size : 100	//球半径(不可用)
	});

	$('#myCanvas').click(function(e){
		debugger;
	});
}());