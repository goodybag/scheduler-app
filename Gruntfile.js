module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      namedModules: {
        files: ['package.json'],
        tasks: ['namedModules'],
        options: {
          spawn: false,
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-named-modules');
  grunt.registerTask( 'default', ['namedModules']);

}
