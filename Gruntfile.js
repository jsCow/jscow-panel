module.exports = function(grunt) {
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		
		clean: {
			clean: [
				"dist"
			]
		},
		
		copy: {
			main: {
				files: [
					{
						expand: true, 
						cwd: 'src/jscow/components', 
						src: '**/*.js',
						dest: 'dist/jscow/components'
					},
					{
	                    expand: true,
	                    //dot: true,
	                    cwd: 'src/less',
	                    src: ['**'],
	                    dest: 'dist/less'
					}
				]
			}
		},
		
		uglify: {
			options: {
				mangle: {
					except:	['jQuery']
				}
			},
			my_target: {
				options: {
					mangle: false
				},
				files: [
					{
						'dist/jscow/components/panel.min.js': ['src/jscow/components/panel.js']
					}
				]
			}
		},

		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				maxparams: 4,
				notypeof: true,
				globals: {
					jQuery: true
				}
			},
			all: ['src/jscow/**/*.js']
		}
		
	});
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	
	// Default task(s).
	grunt.registerTask('default', [
		'jshint',
		'clean',
		'copy',
		'uglify'
	]);

};
