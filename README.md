# tnt-dom
## Super simple DOM library

Designed to be used with [browserify](http://www.browserify.org).

Please note that this DOM library is not yet production ready. So for the moment: use at your own risk.

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
var fromhtmlelement = new tnt( document.body );
```

#### forEach

```javascript
element.forEach( function( el ) {
	console.log( el );
} );
```

#### get

Gets a HTMLElement by index

```javascript
element.get( 0 );
```

#### remove

Removes the element from the DOM.

```javascript
element.remove();
```

#### copy

Makes a new copy of the element(s)

```javascript
element.copy();
```

#### append

Append on or multiple elements to the current element

```javascript
element.append( new tnt( 'body' ) );
```
or
```javascript
element.append( '<button>my button</button>' ) );
```

#### appendTo

Append the current element to an element

```javascript
element.appendTo( new tnt( document.body ) );
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