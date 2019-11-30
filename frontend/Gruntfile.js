module.exports = function(grunt) {
    
    // configuration
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'src/css/styles.css': 'src/sass/styles.scss',
                    'src/css/inputs.css': 'src/sass/inputs.scss',
                    'src/css/buttons.css': 'src/sass/buttons.scss',
                    'src/css/modals.css': 'src/sass/modals.scss',
                    'src/css/loader.css': 'src/sass/loader.scss',
                    'src/css/dashboard.css': 'src/sass/dashboard.scss',
                    'src/css/search.css': 'src/sass/search.scss',
                    'src/css/home.css': 'src/sass/home.scss',
                    'src/css/status.css': 'src/sass/status.scss',
                    'src/css/blades.css': 'src/sass/blades.scss',
                }
            }
        },
        watch: {
            css: {
                files: ['src/sass/*.scss'],
                tasks: ['sass:dist']
            }
        }
    });
      

    // load tasks into task manager
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // default task
    grunt.registerTask('default', ['sass']);

};