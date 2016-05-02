var
	gulp = require('gulp'),
	browserify = require('browserify'),
	watch = require('gulp-watch'),
	source = require('vinyl-source-stream')
;

gulp.task( 'watch', function() {

	watch( 'src/**/*.js', function() {

		gulp.start( 'build' );
	} );
} );

gulp.task( 'build', function() {
	return browserify( 'src/example.js' )
		.transform( 'babelify', { presets: ['es2015'] } )
		.bundle()
		.pipe( source( 'example.js' ) )
		.pipe( gulp.dest( 'dist' ) )
	;
} );

gulp.task( 'default', [ 'watch' ] );