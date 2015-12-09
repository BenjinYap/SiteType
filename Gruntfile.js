module.exports = function (grunt) {
	grunt.initConfig ({
		watch:{
			concat:{
				files:['src/js/*.js'],
				tasks:['concat'],
			},

			sass:{
				files:['**/*.scss'],
				tasks:['sass'],
			},
		},

		concat:{
			dist:{
				src:['src/js/*'],
				dest:'dist/textbadtypegood.js',
			},
		},

		sass:{
			dist:{
				files:{
					'css/app.css':'css/app.scss',
				}
			},
		},
	});

	grunt.loadNpmTasks ('grunt-contrib-concat');
	grunt.loadNpmTasks ('grunt-contrib-sass');
	grunt.loadNpmTasks ('grunt-contrib-watch');

	grunt.registerTask ('default', ['sass']);
};