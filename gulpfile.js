var
	gulp = require('gulp'),
	browserify = require('browserify'),
	watch = require('gulp-watch'),
	source = require('vinyl-source-stream')
;

gulp.task( 'watch', function() {

	watch( 'example/example.js', function() {

		gulp.start( 'build' );
	} )

	watch( 'src/**/*.js', function() {

		gulp.start( 'build' );
	} );
} );

gulp.task( 'build', function() {
	
	return browserify( 'example/example.js' )
		.transform( 'babelify', { presets: ['es2015'] } )
		.bundle()
		.pipe( source( 'example.build.js' ) )
		.pipe( gulp.dest( 'example' ) )
	;
} );

gulp.task( 'default', [ 'watch' ] );