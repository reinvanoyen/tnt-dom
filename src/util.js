"use strict";

var util = {}

util.isHtmlString = function( string ) {

	return /<[a-z][\s\S]*>/i.test( string )
}

export default util