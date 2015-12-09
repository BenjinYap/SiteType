module.exports = function (grunt) {
	grunt.initConfig ({
		watch:{
			concat:{
				files:['js/*.js'],
				tasks:['concat'],
			},

			sass:{
				files:['**/*.scss'],
				tasks:['sass'],
			},
		},

		concat:{
			dist:{
				src:['js/*.js'],
				dest:'js/app.js',
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