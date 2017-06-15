module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
      babel: {
        options: {
          plugins: ['transform-react-jsx'],
          presets: ['es2015', 'react']
        },
        jsx: {
          files: [{
            expand: true,
            cwd: 'static/components/', // Custom folder
            src: ['*.jsx','empleado-app/*.jsx','empleado-avatar/*.jsx','empleado-list/*.jsx','empleado-row/*.jsx'],
            dest: 'static/js/', // Custom folder
            ext: '.js'
          }]
        }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-babel');


  // Default task(s).
  grunt.registerTask('default', ['babel']);

};
