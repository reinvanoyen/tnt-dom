"use strict";

import util from './util';

export default class tntdom {
	
	constructor( arg ) {

		if( arg instanceof tntdom ) {

			return arg
		}

		if( typeof arg === 'string' ) {

			if( util.isHtmlString( arg ) ) {

				let wrap = document.createElement( 'div' )
				wrap.innerHTML = arg
				return new tntdom( wrap.childNodes )

			} else {

				return new tntdom( document.querySelectorAll( arg ) )
			}
		}

		this.elements = []

		if( arg instanceof HTMLElement ) {

			this.elements.push( arg )

		} else if( arg instanceof HTMLCollection || arg instanceof NodeList ) {

			for( var i = 0; i < arg.length; i++ )
			{
				this.elements.push( arg[ i ] )
			}

		} else {

			throw "Invalid argument for constructor"
		}

		return this
	}

	forEach( cb, getHtmlElement ) {

		this.elements.forEach( e => {

			cb( ( getHtmlElement ? e : new tntdom( e ) ) )
		} )
	}

	length() {

		return this.elements.length
	}

	html( htmlString ) {

		this.forEach( e => {

			e.innerHTML = htmlString
		}, true )

		return this;
	}

	setAttr( attr, v ) {

		this.forEach( e => {

			e.setAttribute( attr, v )
		}, true )

		return this
	}

	removeAttr( attr ) {

		this.forEach( e => {

			e.removeAttribute( attr )
		}, true )

		return this
	}

	addClass( classname ) {

		this.forEach( e => {

			e.classList.add( classname )
		}, true )

		return this
	}

	removeClass( classname ) {

		this.forEach( e => {

			e.classList.remove( classname )
		}, true )

		return this
	}

	css( property, value ) {


		this.forEach( e => {

			e.style[ property ]= value
		}, true )

		return this
	}

	remove() {

		this.forEach( e => {

			e && e.parentNode && e.parentNode.removeChild( e )
		}, true )

		return this
	}

	get( i, getHtmlElement ) {

		if( typeof this.elements[ i ] !== 'undefined' ) {

			return ( getHtmlElement ? this.elements[ i ] : new tntdom( this.elements[ i ] ) )
		}

		throw "Could not get element with index " + i
	}

	getFirst( getHtmlElement ) {

		return this.get( 0, getHtmlElement )
	}

	append( element ) {

		element = new tntdom( element )

		let first = this.get( 0, true )

		element.forEach( e => {

			first.appendChild( e )
		}, true )
	}

	appendTo( element ) {

		let first = element.get( 0, true )

		this.forEach( e => {

			first.appendChild( e )
		}, true )
	}

	copy() {

		let html = ''

		this.forEach( e => {

			html += e.outerHTML
		}, true )

		return new tntdom( html )
	}

	insertBefore( element ) {

		let first = element.get( 0, true )

		this.forEach( e => {

			first.parentNode.insertBefore( e, first )
		}, true )
	}

	wrap( element ) {

		element = new tntdom( element )
		element.insertBefore( this )
		this.appendTo( element )
	}

	click( cb ) {

		return this.bind( 'click', cb )
	}

	bind( eventName, cb ) {

		this.forEach( e => {

			e.addEventListener( eventName, cb )
		}, true )

		return this
	}

	isInViewport() {

		let inViewport = [];

		this.forEach( e => {

			let rect = e.getBoundingClientRect()

			inViewport.push( (
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
				rect.right <= (window.innerWidth || document.documentElement.clientWidth)
			) )

		}, true )

		console.log( inViewport );

		return !inViewport.includes( false );
	}
}