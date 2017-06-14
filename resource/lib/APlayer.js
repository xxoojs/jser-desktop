"use strict";

function _classCallCheck(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}
var _createClass = function() {
		function e(e, t) {
			for (var a = 0; a < t.length; a++) {
				var i = t[a];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
			}
		}
		return function(t, a, i) {
			return a && e(t.prototype, a), i && e(t, i), t
		}
	}();
!
function(e) {
	var t = function() {
			function t(e) {
				var a = this;
				_classCallCheck(this, t), this.isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i), this.isMobile && (e.autoplay = !1);
				var i = {
					element: document.getElementsByClassName("aplayer")[0],
					narrow: !1,
					autoplay: !1,
					mutex: !0,
					showlrc: 0,
					theme: "#b7daff",
					loop: !0
				};
				for (var s in i) i.hasOwnProperty(s) && !e.hasOwnProperty(s) && (e[s] = i[s]);
				this.playIndex = "[object Array]" === Object.prototype.toString.call(e.music) ? 0 : -1, this.option = e, this.audios = [], this.loop = e.loop, this.secondToTime = function(e) {
					var t = function(e) {
							return e < 10 ? "0" + e : "" + e
						},
						a = parseInt(e / 60),
						i = parseInt(e - 60 * a);
					return t(a) + ":" + t(i)
				}, this.parseLrc = function(e) {
					for (var t = [], a = 0; a < e.length; a++) {
						for (var i = e[a].split("\n"), s = [], n = i.length, l = 0; l < n; l++) {
							var o = i[l].match(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g),
								r = i[l].replace(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g, "").replace(/^\s+|\s+$/g, "");
							if (null != o) for (var u = o.length, d = 0; d < u; d++) {
								var p = /\[(\d{2}):(\d{2})\.(\d{2,3})]/.exec(o[d]),
									c = 60 * p[1] + parseInt(p[2]) + parseInt(p[3]) / (2 === (p[3] + "").length ? 100 : 1e3);
								s.push([c, r])
							}
						}
						s.sort(function(e, t) {
							return e[0] - t[0]
						}), t.push(s)
					}
					return t
				}, this.updateBar = function(e, t, i) {
					t = t > 0 ? t : 0, t = t < 1 ? t : 1, a[e + "Bar"].style[i] = 100 * t + "%"
				}, this.updateLrc = function() {
					var e = arguments.length <= 0 || void 0 === arguments[0] ? a.audio.currentTime : arguments[0];
					if (a.lrcIndex > a.lrc.length - 1 || e < a.lrc[a.lrcIndex][0] || !a.lrc[a.lrcIndex + 1] || e >= a.lrc[a.lrcIndex + 1][0]) for (var t = 0; t < a.lrc.length; t++) e >= a.lrc[t][0] && (!a.lrc[t + 1] || e < a.lrc[t + 1][0]) && (a.lrcIndex = t, a.lrcContents.style.transform = "translateY(" + 20 * -a.lrcIndex + "px)", a.lrcContents.style.webkitTransform = "translateY(" + 20 * -a.lrcIndex + "px)", a.lrcContents.getElementsByClassName("aplayer-lrc-current")[0].classList.remove("aplayer-lrc-current"), a.lrcContents.getElementsByTagName("p")[t].classList.add("aplayer-lrc-current"))
				}, this.eventTypes = ["play", "pause", "canplay", "playing", "ended", "error"], this.event = {};
				for (var n = 0; n < this.eventTypes.length; n++) this.event[this.eventTypes[n]] = [];
				this.trigger = function(e) {
					for (var t = 0; t < a.event[e].length; t++) a.event[e][t]()
				}
			}
			return _createClass(t, [{
				key: "init",
				value: function() {
					function t(e) {
						for (var t = e.offsetLeft, a = e.offsetParent, i = void 0; null !== a;) t += a.offsetLeft, a = a.offsetParent;
						return i = document.body.scrollLeft + document.documentElement.scrollLeft, t - i
					}
					function a(e) {
						for (var t = e.offsetTop, a = e.offsetParent, i = void 0; null !== a;) t += a.offsetTop, a = a.offsetParent;
						return i = document.body.scrollTop + document.documentElement.scrollTop, t - i
					}
					var i = this;
					this.element = this.option.element, this.multiple = this.playIndex > -1, this.music = this.multiple ? this.option.music[this.playIndex] : this.option.music;
					var s = void 0;
					if (this.option.showlrc) {
						var n = [];
						if (1 === this.option.showlrc) if (this.multiple) for (s = 0; s < this.option.music.length; s++) n.push(this.option.music[s].lrc);
						else n.push(this.option.music.lrc);
						else if (2 === this.option.showlrc || this.option.showlrc === !0) for (s = 0; s < this.element.getElementsByClassName("aplayer-lrc-content").length; s++) n.push(this.element.getElementsByClassName("aplayer-lrc-content")[s].innerHTML);
						this.lrcs = this.parseLrc(n)
					}
					this.option.showlrc && this.element.classList.add("aplayer-withlrc");
					var l = '\n                <div class="aplayer-pic" ' + (this.music.pic ? "style=\"background-image: url('" + this.music.pic + "');\"" : "") + '>\n                    <div class="aplayer-button aplayer-play">\n                        <i class="demo-icon aplayer-icon-play"></i>\n                    </div>\n                </div>\n                <div class="aplayer-info">\n                    <div class="aplayer-music">\n                        <span class="aplayer-title"></span>\n                        <span class="aplayer-author"></span>\n                    </div>\n                    <div class="aplayer-lrc">\n                        <div class="aplayer-lrc-contents" style="transform: translateY(0); -webkit-transform: translateY(0);"></div>\n                    </div>\n                    <div class="aplayer-controller">\n                        <div class="aplayer-bar-wrap">\n                            <div class="aplayer-bar">\n                                <div class="aplayer-loaded" style="width: 0"></div>\n                                <div class="aplayer-played" style="width: 0; background: ' + this.option.theme + ';">\n                                    <span class="aplayer-thumb" style="border: 1px solid ' + this.option.theme + ';"></span>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="aplayer-time">\n                             - <span class="aplayer-ptime">00:00</span> / <span class="aplayer-dtime">00:00</span>\n                            <div class="aplayer-volume-wrap">\n                                <i class="demo-icon aplayer-icon-volume-down"></i>\n                                <div class="aplayer-volume-bar-wrap">\n                                    <div class="aplayer-volume-bar">\n                                        <div class="aplayer-volume" style="height: 80%; background: ' + this.option.theme + ';"></div>\n                                    </div>\n                                </div>\n                            </div>\n                            <i class="demo-icon aplayer-icon-loop' + (this.loop ? "" : " aplayer-noloop") + '"></i>' + (this.multiple ? '<i class="demo-icon aplayer-icon-menu"></i>' : "") + "\n                        </div>\n                    </div>\n                </div>";
					if (this.multiple) {
						for (l += '\n                <div class="aplayer-list">\n                    <ol>', s = 0; s < this.option.music.length; s++) l += '\n                        <li>\n                            <span class="aplayer-list-cur" style="background: ' + this.option.theme + ';"></span>\n                            <span class="aplayer-list-index">' + (s + 1) + '</span>\n                            <span class="aplayer-list-title">' + this.option.music[s].title + '</span>\n                            <span class="aplayer-list-author">' + this.option.music[s].author + "</span>\n                        </li>";
						l += "\n                    </ol>\n                </div>"
					}
					this.element.innerHTML = l, this.ptime = this.element.getElementsByClassName("aplayer-ptime")[0], this.element.getElementsByClassName("aplayer-info")[0].offsetWidth < 200 && this.element.getElementsByClassName("aplayer-time")[0].classList.add("aplayer-time-narrow"), this.element.getElementsByClassName("aplayer-bar-wrap")[0].style.marginRight = this.element.getElementsByClassName("aplayer-time")[0].offsetWidth + 5 + "px", this.option.narrow && this.element.classList.add("aplayer-narrow"), this.button = this.element.getElementsByClassName("aplayer-button")[0], this.button.addEventListener("click", function(e) {
						i.button.classList.contains("aplayer-play") ? i.play() : i.button.classList.contains("aplayer-pause") && i.pause()
					}), this.multiple && !
					function() {
						for (var e = i.element.getElementsByClassName("aplayer-list")[0].getElementsByTagName("li"), t = function(t) {
								e[t].addEventListener("click", function() {
									var a = parseInt(e[t].getElementsByClassName("aplayer-list-index")[0].innerHTML) - 1;
									a !== i.playIndex && i.setMusic(a), i.isMobile ? i.pause() : i.play()
								})
							}, a = 0; a < i.option.music.length; a++) t(a)
					}(), this.playedBar = this.element.getElementsByClassName("aplayer-played")[0], this.loadedBar = this.element.getElementsByClassName("aplayer-loaded")[0], this.thumb = this.element.getElementsByClassName("aplayer-thumb")[0], this.bar = this.element.getElementsByClassName("aplayer-bar")[0];
					var o = void 0;
					this.bar.addEventListener("click", function(e) {
						var a = e || window.event;
						o = i.bar.clientWidth;
						var s = (a.clientX - t(i.bar)) / o;
						i.updateBar("played", s, "width"), i.element.getElementsByClassName("aplayer-ptime")[0].innerHTML = i.secondToTime(s * i.audio.duration), i.audio.currentTime = parseFloat(i.playedBar.style.width) / 100 * i.audio.duration
					}), this.thumb.addEventListener("mouseover", function() {
						i.thumb.style.background = i.option.theme
					}), this.thumb.addEventListener("mouseout", function() {
						i.thumb.style.background = "#fff"
					});
					var r = function(e) {
							var a = e || window.event,
								s = (a.clientX - t(i.bar)) / o;
							s = s > 0 ? s : 0, s = s < 1 ? s : 1, i.updateBar("played", s, "width"), i.option.showlrc && i.updateLrc(parseFloat(i.playedBar.style.width) / 100 * i.audio.duration), i.element.getElementsByClassName("aplayer-ptime")[0].innerHTML = i.secondToTime(s * i.audio.duration)
						},
						u = function m() {
							document.removeEventListener("mouseup", m), document.removeEventListener("mousemove", r), i.audio.currentTime = parseFloat(i.playedBar.style.width) / 100 * i.audio.duration, i.playedTime = setInterval(function() {
								i.updateBar("played", i.audio.currentTime / i.audio.duration, "width"), i.option.showlrc && i.updateLrc(), i.element.getElementsByClassName("aplayer-ptime")[0].innerHTML = i.secondToTime(i.audio.currentTime), i.trigger("playing")
							}, 100)
						};
					this.thumb.addEventListener("mousedown", function() {
						o = i.bar.clientWidth, clearInterval(i.playedTime), document.addEventListener("mousemove", r), document.addEventListener("mouseup", u)
					}), this.volumeBar = this.element.getElementsByClassName("aplayer-volume")[0];
					var d = this.element.getElementsByClassName("aplayer-volume-bar")[0];
					this.volumeicon = this.element.getElementsByClassName("aplayer-time")[0].getElementsByTagName("i")[0];
					var p = 35;
					this.element.getElementsByClassName("aplayer-volume-bar-wrap")[0].addEventListener("click", function(e) {
						var t = e || window.event,
							s = (p - t.clientY + a(d)) / p;
						s = s > 0 ? s : 0, s = s < 1 ? s : 1, i.volume(s)
					}), this.volumeicon.addEventListener("click", function() {
						i.audio.muted ? (i.audio.muted = !1, i.volumeicon.className = 1 === i.audio.volume ? "demo-icon aplayer-icon-volume-up" : "demo-icon aplayer-icon-volume-down", i.updateBar("volume", i.audio.volume, "height")) : (i.audio.muted = !0, i.volumeicon.className = "demo-icon aplayer-icon-volume-off", i.updateBar("volume", 0, "height"))
					});
					var c = this.element.getElementsByClassName("aplayer-icon-loop")[0];
					c.addEventListener("click", function() {
						i.loop ? (c.classList.add("aplayer-noloop"), i.loop = !1, i.audio.loop = !i.multiple && i.loop) : (c.classList.remove("aplayer-noloop"), i.loop = !0, i.audio.loop = !i.multiple && i.loop)
					}), this.multiple && this.element.getElementsByClassName("aplayer-icon-menu")[0].addEventListener("click", function() {
						var e = i.element.getElementsByClassName("aplayer-list")[0];
						e.classList.contains("aplayer-list-hide") ? e.classList.remove("aplayer-list-hide") : e.classList.add("aplayer-list-hide")
					}), this.setMusic(0), e.push(this)
				}
			}, {
				key: "setMusic",
				value: function(e) {
					var t = this;
					this.multiple && "undefined" != typeof e && (this.playIndex = e);
					var a = this.playIndex;
					if (this.music = this.multiple ? this.option.music[a] : this.option.music, this.music.pic && (this.element.getElementsByClassName("aplayer-pic")[0].style.backgroundImage = "url('" + this.music.pic + "')"), this.element.getElementsByClassName("aplayer-title")[0].innerHTML = this.music.title, this.element.getElementsByClassName("aplayer-author")[0].innerHTML = " - " + this.music.author, this.multiple && (this.element.getElementsByClassName("aplayer-list-light")[0] && this.element.getElementsByClassName("aplayer-list-light")[0].classList.remove("aplayer-list-light"), this.element.getElementsByClassName("aplayer-list")[0].getElementsByTagName("li")[a].classList.add("aplayer-list-light")), this.audio && (this.pause(), this.audio.currentTime = 0), this.multiple && !this.audios[a] || this.playIndex === -1 ? (this.audio = document.createElement("audio"), this.audio.src = this.music.url, this.option.preload ? this.audio.preload = this.option.preload : this.audio.preload = this.isMobile ? "none" : "metadata", this.audio.addEventListener("durationchange", function() {
						1 !== t.audio.duration && (t.element.getElementsByClassName("aplayer-dtime")[0].innerHTML = t.secondToTime(t.audio.duration))
					}), this.audio.addEventListener("progress", function() {
						var e = t.audio.buffered.length ? t.audio.buffered.end(t.audio.buffered.length - 1) / t.audio.duration : 0;
						t.updateBar("loaded", e, "width")
					}), this.audio.addEventListener("error", function() {
						t.element.getElementsByClassName("aplayer-author")[0].innerHTML = " - Error happens 鈺ワ箯鈺�", t.trigger("pause")
					}), this.audio.addEventListener("canplay", function() {
						t.trigger("canplay")
					}), this.ended = !1, this.multiple ? this.audio.addEventListener("ended", function() {
						return t.isMobile ? (t.ended = !0, void t.pause()) : void(0 !== t.audio.currentTime && (t.playIndex < t.option.music.length - 1 ? t.setMusic(++t.playIndex) : t.loop ? t.setMusic(0) : t.loop || (t.ended = !0, t.pause(), t.trigger("ended"))))
					}) : this.audio.addEventListener("ended", function() {
						t.loop || (t.ended = !0, t.pause(), t.trigger("ended"))
					}), this.audio.volume = parseInt(this.element.getElementsByClassName("aplayer-volume")[0].style.height) / 100, this.audio.loop = !this.multiple && this.loop, this.multiple && (this.audios[a] = this.audio)) : (this.audio = this.audios[a], this.audio.volume = parseInt(this.element.getElementsByClassName("aplayer-volume")[0].style.height) / 100, this.audio.currentTime = 0), this.option.showlrc) {
						this.lrc = this.multiple ? this.lrcs[a] : this.lrcs[0];
						var i = "";
						this.lrcContents = this.element.getElementsByClassName("aplayer-lrc-contents")[0];
						for (var s = 0; s < this.lrc.length; s++) i += "<p>" + this.lrc[s][1] + "</p>";
						this.lrcContents.innerHTML = i, this.lrcIndex || (this.lrcIndex = 0), this.lrcContents.getElementsByTagName("p")[0].classList.add("aplayer-lrc-current"), this.lrcContents.style.transform = "translateY(0px)", this.lrcContents.style.webkitTransform = "translateY(0px)"
					}
					1 !== this.audio.duration && (this.element.getElementsByClassName("aplayer-dtime")[0].innerHTML = this.audio.duration ? this.secondToTime(this.audio.duration) : "00:00"), this.option.autoplay && !this.isMobile && this.play(), this.option.autoplay = !0, this.isMobile && this.pause()
				}
			}, {
				key: "play",
				value: function(t) {
					var a = this;
					if ("[object Number]" === Object.prototype.toString.call(t) && (this.audio.currentTime = t), this.audio.paused) {
						if (this.button.classList.remove("aplayer-play"), this.button.classList.add("aplayer-pause"), this.button.innerHTML = "", setTimeout(function() {
							a.button.innerHTML = '<i class="demo-icon aplayer-icon-pause"></i>'
						}, 100), this.option.mutex) for (var i = 0; i < e.length; i++) this != e[i] && e[i].pause();
						console.log(Object.prototype.toString.call(t)), this.audio.play(), this.playedTime && clearInterval(this.playedTime), this.playedTime = setInterval(function() {
							a.updateBar("played", a.audio.currentTime / a.audio.duration, "width"), a.option.showlrc && a.updateLrc(), a.ptime.innerHTML = a.secondToTime(a.audio.currentTime), a.trigger("playing")
						}, 100), this.trigger("play")
					}
				}
			}, {
				key: "pause",
				value: function() {
					var e = this;
					this.audio.paused && !this.ended || (this.ended = !1, this.button.classList.remove("aplayer-pause"), this.button.classList.add("aplayer-play"), this.button.innerHTML = "", setTimeout(function() {
						e.button.innerHTML = '<i class="demo-icon aplayer-icon-play"></i>'
					}, 100), this.audio.pause(), clearInterval(this.playedTime), this.trigger("pause"))
				}
			}, {
				key: "volume",
				value: function(e) {
					this.updateBar("volume", e, "height"), this.audio.volume = e, this.audio.muted && (this.audio.muted = !1), 1 === e ? this.volumeicon.className = "demo-icon aplayer-icon-volume-up" : this.volumeicon.className = "demo-icon aplayer-icon-volume-down"
				}
			}, {
				key: "on",
				value: function(e, t) {
					"function" == typeof t && this.event[e].push(t)
				}
			}]), t
		}();
	
	// "undefined" != typeof module && "undefined" != typeof module.exports ? module.exports = t : window.APlayer = t
	window.APlayer = t;
}([]);
//# sourceMappingURL=APlayer.min.js.map