import tntdom from '../src/tntdom'

var body = new tntdom( document.body )

for( var i = 0; i < 5; i++ ) {

	var btn = new tntdom( '<button>btn ' + i + '</button>' )
	btn.appendTo( body )
}

var btns = new tntdom( 'body>button' )

btns.click( function( e ) {

	btns.setAttr( 'disabled', 'disabled' )
	btns.css( 'color', 'red' )

	btns.getFirst().css( 'color', 'blue' )

	new tntdom( 'body' ).append( '<span>' + btns.length() + '</span>' )
	
	setTimeout( function() {
		
		btns.removeAttr( 'disabled' )
	}, 1500 );
	
	e.preventDefault()
} )

var btn = new tntdom( '<button>mybutton 1</button>' )
var btn2 = new tntdom( '<button>mybutton 2</button>' )
btn2.css( 'color', 'red' )

btn.insertBefore( btns )
btn2.insertBefore( btn )

var wrap = new tntdom( '<div class="wrapper"></div>' )
btn2.wrap( wrap )
wrap.wrap( '<div class="another-wrapper"></div>' )
btns.wrap( '<div class="my-button-collection"></div>' )


// Viewport test

var vpt = new tntdom('<div>test</div>')
vpt.css( 'position', 'absolute' )
vpt.css( 'bottom', '-500px' )
vpt.css( 'left', '50px' )
vpt.css( 'height', '50px' )
vpt.css( 'background-color', 'red' )
vpt.css( 'margin-bottom', '100px' )
vpt.appendTo( body )

window.addEventListener( 'scroll', function() {

	if( vpt.isInViewport() ) {

		vpt.css( 'background-color', 'blue' )
	} else {

		vpt.css( 'background-color', 'red' )
	}

} )