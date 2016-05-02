"use strict";

class Element {

	constructor( element ) {

		this.el = ( typeof element === 'string' ? document.createElement( element ) : element );

		return this;
	}

	html( htmlString ) {

		this.el.innerHTML = htmlString;
		return this;
	}

	addClass( classname ) {

		this.el.classList.add( classname );
		return this;
	}

	removeClass( classname ) {

		this.el.classList.remove( classname );
		return this;
	}

	remove() {

		this.el && this.el.parentNode && this.el.parentNode.removeChild( this.el );
	}

	append( element ) {

		this.el.appendChild( element.el );
		return this;
	}

	appendTo( element ) {

		element.el.appendChild( this.el );
		return this;
	}

	click( cb ) {

		this.bind( 'click', cb );
		return this;
	}

	bind( eventName, cb ) {

		this.el.addEventListener( eventName, cb );
	}
}

module.exports = Element;