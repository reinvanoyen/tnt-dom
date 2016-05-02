var util = {};

util.isHtmlString = function( string ) {

	return /<[a-z][\s\S]*>/i.test( string );
};

module.exports = util;