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

	btns.css( 'color', 'red' );
		
	new tnt( 'body' ).append( '<span>' + btns.length() + '</span>' );
	e.preventDefault();
} );

var btn = new tnt( '<button>mybutton 1</button>' );
var btn2 = new tnt( '<button>mybutton 2</button>' );
btn2.css( 'color', 'red' );

btn.insertBefore( btns );
btn2.insertBefore( btn );

var wrap = new tnt( '<div class="wrapper"></div>' );
btn2.wrap( wrap );
wrap.wrap( '<div class="another-wrapper"></div>' );
btns.wrap( '<div class="my-button-collection"></div>' );