/* global
   grunt
*/
require('load-grunt-tasks')(grunt);

module.exports = grunt => {
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'public/**/*.js', 'app/**/*.js'],
      options: {
        globals: {
          jQuery: true,
        },
      },
    },
    eslint: {
      target: ['file.js'],
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint'],
    },
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['jshint', 'eslint']);
};
