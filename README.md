# tnt-dom
## Super simple DOM utilities

Designed to be used with [browserify](http://www.browserify.org).

### Getting started

Install using npm:

```ssh
$ npm install tnt-dom
```

Add it to your Javascript:
```javascript
	var tnt = require('tnt-dom');
```

### Methods

#### constructor

```javascript
	var fromhtml = new tnt( '<div class="my-class">My element</div>' );
	var fromselector = new tnt( 'div.my-class' );
```

#### forEach

```javascript
	element.forEach( function( el ) {
		console.log( el );
	} );
```

#### remove

Removes the element from the DOM.

```javascript
	element.remove();
```

#### addClass

Adds a class to the element(s)

```javascript
	element.addClass( 'my-class' );
```

#### removeClass

Removes a class from the element(s)

```javascript
	element.removeClas( 'my-class' );
```