"use strict";

var util = require( './util' );

class TntDomElement {

	constructor( elements ) {

		this.elements = [];

		if( elements instanceof HTMLElement )
		{
			this.elements.push( elements );
		} else if( elements instanceof HTMLCollection || elements instanceof NodeList ) {

			for( var i = 0; i < elements.length; i++ )
			{
				this.elements.push( elements[ i ] );
			}

		} else if( typeof elements === 'string' ) {

			if( util.isHtmlString( elements ) ) {

				let wrap = document.createElement( 'div' );
				wrap.innerHTML = elements;
				return new TntDomElement( wrap.childNodes );

			} else {

				return new TntDomElement( document.querySelectorAll( elements ) );
			}

		} else {

			throw "Invalid argument for constructor";
		}

		return this;
	}

	forEach( cb ) {

		this.elements.forEach( e => {

			cb( e );
		} );
	}

	html( htmlString ) {

		this.forEach( e => {

			e.innerHTML = htmlString;
		} );

		return this;
	}

	addClass( classname ) {

		this.forEach( e => {

			e.classList.add( classname );
		} );

		return this;
	}

	removeClass( classname ) {

		this.forEach( e => {

			e.classList.remove( classname );
		} );

		return this;
	}

	remove() {

		this.forEach( e => {

			e && e.parentNode && e.parentNode.removeChild( e );
		} );

		return this;
	}

	get( i ) {

		if( typeof this.elements[ i ] !== 'undefined' ) {

			return this.elements[ i ];
		}

		throw "Could not get element with index " + i;
	}

	append( element ) {

		let first = this.get( 0 );

		element.forEach( e => {

			first.appendChild( e );
		} );
	}

	appendTo( element ) {

		let first = element.get( 0 );

		this.forEach( e => {

			first.appendChild( e );
		} );
	}

	copy() {

		let html = '';

		this.forEach( e => {

			html += e.outerHTML;
		} );

		return new TntDomElement( html );
	}

	click( cb ) {

		return this.bind( 'click', cb );
	}

	bind( eventName, cb ) {

		this.forEach( e => {

			e.addEventListener( eventName, cb );
		} );

		return this;
	}
}

module.exports = TntDomElement;