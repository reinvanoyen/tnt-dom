"use strict";

var tnt = require( './TntDomElement.js' );

var body = new tnt( document.body );

for( var i = 0; i < 5; i++ )
{
	var btn = new tnt( '<button>btn ' + i + '</button>' );
	btn.appendTo( body );
}

var btns = new tnt( 'body>button' );

btns.click( function( e ) {

	new tnt( 'body' ).append( '<span>Something</span>' );
	e.preventDefault();
} );