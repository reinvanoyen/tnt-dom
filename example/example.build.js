(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _tntdom = require('../src/tntdom');

var _tntdom2 = _interopRequireDefault(_tntdom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var body = new _tntdom2.default(document.body);

for (var i = 0; i < 5; i++) {

	var btn = new _tntdom2.default('<button>btn ' + i + '</button>');
	btn.appendTo(body);
}

var btns = new _tntdom2.default('body>button');

btns.click(function (e) {

	btns.setAttr('disabled', 'disabled');
	btns.css('color', 'red');

	btns.getFirst().css('color', 'blue');

	new _tntdom2.default('body').append('<span>' + btns.length() + '</span>');

	setTimeout(function () {

		btns.removeAttr('disabled');
	}, 1500);

	e.preventDefault();
});

var btn = new _tntdom2.default('<button>mybutton 1</button>');
var btn2 = new _tntdom2.default('<button>mybutton 2</button>');
btn2.css('color', 'red');

btn.insertBefore(btns);
btn2.insertBefore(btn);

var wrap = new _tntdom2.default('<div class="wrapper"></div>');
btn2.wrap(wrap);
wrap.wrap('<div class="another-wrapper"></div>');
btns.wrap('<div class="my-button-collection"></div>');

// Viewport test

var vpt = new _tntdom2.default('<div>test</div>');
vpt.css('position', 'absolute');
vpt.css('bottom', '-500px');
vpt.css('left', '50px');
vpt.css('height', '50px');
vpt.css('background-color', 'red');
vpt.css('margin-bottom', '100px');
vpt.appendTo(body);

window.addEventListener('scroll', function () {

	if (vpt.isInViewport()) {

		vpt.css('background-color', 'blue');
	} else {

		vpt.css('background-color', 'red');
	}
});

},{"../src/tntdom":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tntdom = function () {
	function tntdom(arg) {
		_classCallCheck(this, tntdom);

		if (arg instanceof tntdom) {

			return arg;
		}

		if (typeof arg === 'string') {

			if (_util2.default.isHtmlString(arg)) {

				var wrap = document.createElement('div');
				wrap.innerHTML = arg;
				return new tntdom(wrap.childNodes);
			} else {

				return new tntdom(document.querySelectorAll(arg));
			}
		}

		this.elements = [];

		if (arg instanceof HTMLElement) {

			this.elements.push(arg);
		} else if (arg instanceof HTMLCollection || arg instanceof NodeList) {

			for (var i = 0; i < arg.length; i++) {
				this.elements.push(arg[i]);
			}
		} else {

			throw "Invalid argument for constructor";
		}

		return this;
	}

	_createClass(tntdom, [{
		key: 'forEach',
		value: function forEach(cb, getHtmlElement) {

			this.elements.forEach(function (e) {

				cb(getHtmlElement ? e : new tntdom(e));
			});
		}
	}, {
		key: 'length',
		value: function length() {

			return this.elements.length;
		}
	}, {
		key: 'html',
		value: function html(htmlString) {

			this.forEach(function (e) {

				e.innerHTML = htmlString;
			}, true);

			return this;
		}
	}, {
		key: 'setAttr',
		value: function setAttr(attr, v) {

			this.forEach(function (e) {

				e.setAttribute(attr, v);
			}, true);

			return this;
		}
	}, {
		key: 'removeAttr',
		value: function removeAttr(attr) {

			this.forEach(function (e) {

				e.removeAttribute(attr);
			}, true);

			return this;
		}
	}, {
		key: 'addClass',
		value: function addClass(classname) {

			this.forEach(function (e) {

				e.classList.add(classname);
			}, true);

			return this;
		}
	}, {
		key: 'removeClass',
		value: function removeClass(classname) {

			this.forEach(function (e) {

				e.classList.remove(classname);
			}, true);

			return this;
		}
	}, {
		key: 'css',
		value: function css(property, value) {

			this.forEach(function (e) {

				e.style[property] = value;
			}, true);

			return this;
		}
	}, {
		key: 'remove',
		value: function remove() {

			this.forEach(function (e) {

				e && e.parentNode && e.parentNode.removeChild(e);
			}, true);

			return this;
		}
	}, {
		key: 'get',
		value: function get(i, getHtmlElement) {

			if (typeof this.elements[i] !== 'undefined') {

				return getHtmlElement ? this.elements[i] : new tntdom(this.elements[i]);
			}

			throw "Could not get element with index " + i;
		}
	}, {
		key: 'getFirst',
		value: function getFirst(getHtmlElement) {

			return this.get(0, getHtmlElement);
		}
	}, {
		key: 'append',
		value: function append(element) {

			element = new tntdom(element);

			var first = this.get(0, true);

			element.forEach(function (e) {

				first.appendChild(e);
			}, true);
		}
	}, {
		key: 'appendTo',
		value: function appendTo(element) {

			var first = element.get(0, true);

			this.forEach(function (e) {

				first.appendChild(e);
			}, true);
		}
	}, {
		key: 'copy',
		value: function copy() {

			var html = '';

			this.forEach(function (e) {

				html += e.outerHTML;
			}, true);

			return new tntdom(html);
		}
	}, {
		key: 'insertBefore',
		value: function insertBefore(element) {

			var first = element.get(0, true);

			this.forEach(function (e) {

				first.parentNode.insertBefore(e, first);
			}, true);
		}
	}, {
		key: 'wrap',
		value: function wrap(element) {

			element = new tntdom(element);
			element.insertBefore(this);
			this.appendTo(element);
		}
	}, {
		key: 'click',
		value: function click(cb) {

			return this.bind('click', cb);
		}
	}, {
		key: 'bind',
		value: function bind(eventName, cb) {

			this.forEach(function (e) {

				e.addEventListener(eventName, cb);
			}, true);

			return this;
		}
	}, {
		key: 'isInViewport',
		value: function isInViewport() {

			var inViewport = [];

			this.forEach(function (e) {

				var rect = e.getBoundingClientRect();

				inViewport.push(rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth));
			}, true);

			console.log(inViewport);

			return !inViewport.includes(false);
		}
	}]);

	return tntdom;
}();

exports.default = tntdom;

},{"./util":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var util = {};

util.isHtmlString = function (string) {

	return (/<[a-z][\s\S]*>/i.test(string)
	);
};

exports.default = util;

},{}]},{},[1]);
