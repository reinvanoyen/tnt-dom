(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = require('./util');

var TntDomElement = function () {
	function TntDomElement(elements) {
		_classCallCheck(this, TntDomElement);

		this.elements = [];

		if (elements instanceof HTMLElement) {
			this.elements.push(elements);
		} else if (elements instanceof HTMLCollection || elements instanceof NodeList) {

			for (var i = 0; i < elements.length; i++) {
				this.elements.push(elements[i]);
			}
		} else if (typeof elements === 'string') {

			if (util.isHtmlString(elements)) {

				var wrap = document.createElement('div');
				wrap.innerHTML = elements;
				return new TntDomElement(wrap.childNodes);
			} else {

				return new TntDomElement(document.querySelectorAll(elements));
			}
		} else {

			throw "Invalid argument for constructor";
		}

		return this;
	}

	_createClass(TntDomElement, [{
		key: 'forEach',
		value: function forEach(cb) {

			this.elements.forEach(function (e) {

				cb(e);
			});
		}
	}, {
		key: 'html',
		value: function html(htmlString) {

			this.forEach(function (e) {

				e.innerHTML = htmlString;
			});

			return this;
		}
	}, {
		key: 'addClass',
		value: function addClass(classname) {

			this.forEach(function (e) {

				e.classList.add(classname);
			});

			return this;
		}
	}, {
		key: 'removeClass',
		value: function removeClass(classname) {

			this.forEach(function (e) {

				e.classList.remove(classname);
			});

			return this;
		}
	}, {
		key: 'remove',
		value: function remove() {

			this.forEach(function (e) {

				e && e.parentNode && e.parentNode.removeChild(e);
			});

			return this;
		}
	}, {
		key: 'get',
		value: function get(i) {

			if (typeof this.elements[i] !== 'undefined') {

				return this.elements[i];
			}

			throw "Could not get element with index " + i;
		}
	}, {
		key: 'append',
		value: function append(element) {

			var first = this.get(0);

			element.forEach(function (e) {

				first.appendChild(e);
			});
		}
	}, {
		key: 'appendTo',
		value: function appendTo(element) {

			var first = element.get(0);

			this.forEach(function (e) {

				first.appendChild(e);
			});
		}
	}, {
		key: 'copy',
		value: function copy() {

			var html = '';

			this.forEach(function (e) {

				html += e.outerHTML;
			});

			return new TntDomElement(html);
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
			});

			return this;
		}
	}]);

	return TntDomElement;
}();

module.exports = TntDomElement;

},{"./util":3}],2:[function(require,module,exports){
"use strict";

var tnt = require('./TntDomElement.js');

var body = new tnt(document.body);

for (var i = 0; i < 5; i++) {
	var btn = new tnt('<button>btn ' + i + '</button>');
	btn.appendTo(body);
}

var btns = new tnt('body>button');

btns.click(function (e) {

	console.log('clicked a button!');
	e.preventDefault();
});

},{"./TntDomElement.js":1}],3:[function(require,module,exports){
"use strict";

var util = {};

util.isHtmlString = function (string) {

	return (/<[a-z][\s\S]*>/i.test(string)
	);
};

module.exports = util;

},{}]},{},[2]);
