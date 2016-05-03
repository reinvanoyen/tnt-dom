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

			throw 'Invalid argument for constructor';
		}

		return this;
	}

	forEach( cb ) {

		this.elements.forEach( function( e ) {

			cb( e );
		} );
	}

	html( htmlString ) {

		this.forEach( function( e ) {

			e.innerHTML = htmlString;
		} );

		return this;
	}

	addClass( classname ) {

		this.forEach( function( e ) {

			e.classList.add( classname );
		} );

		return this;
	}

	removeClass( classname ) {

		this.forEach( function( e ) {

			e.classList.remove( classname );
		} );

		return this;
	}

	remove() {

		this.forEach( function( e ) {

			e && e.parentNode && e.parentNode.removeChild( e );
		} );

		return this;
	}

	append( element ) {

		this.forEach( function( c ) {

			element.forEach( function( e ) {

				c.appendChild( e );
			} );
		} );

		return this;
	}

	appendTo( element ) {

		element.append( this );
		return this;
	}

	copy() {

		let html = '';

		this.forEach( function( e ) {

			html += e.outerHTML;
		} );

		return new TntDomElement( html );
	}

	click( cb ) {

		return this.bind( 'click', cb );
	}

	bind( eventName, cb ) {

		this.forEach( function( e ) {

			e.addEventListener( eventName, cb );
		} );

		return this;
	}
}

module.exports = TntDomElement;