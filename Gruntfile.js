/* global module:false */
module.exports = function(grunt) {

  // Load Dependencies
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner:
      '/*!\n' +
      ' * Sebastiaan porfolio <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
      ' * Copyright (C) 2016 Sebastiaan van Arkens, http://sebastiaanvanarkens.nl\n' +
      ' */'
    },

    jshint: {
      options: {
        curly: true, //This option requires you to always put curly braces around blocks in loops and conditionals.
        eqeqeq: true, //This options prohibits the use of == and != in favor of === and !==
        immed: true, //This option prohibits the use of immediate function invocations without wrapping them in parentheses
        indent: false, //This option enforces specific tab width for your code
        latedef: true, //This option prohibits the use of a variable before it was defined.
        sub: true, //This option suppresses warnings about using [] notation when it can be expressed in dot notation: person['name'] vs. person.name.
        undef: false, //This option prohibits the use of explicitly undeclared variables. This option is very useful for spotting leaking and mistyped variables.
        eqnull: true, //This option suppresses warnings about == null comparisons. Such comparisons are often useful when you want to check if a variable is null or undefined.
        browser: true, //This option defines globals exposed by modern browsers: all the way from good old document and navigator to the HTML5 FileReader and other new developments in the browser world.
        globals: {
          head: false,
          module: false,
          console: false
        },
        jquery: false, // because we define $ in our JS file
        devel:true // This allows to work with alerts and console logs
      },
      files: [ 'Gruntfile.js', 'js/src/**.js']
    },

    uglify: {
      options: {
        banner: '<%= meta.banner %>\n'
      },
      buildJsFiles: {
        files: {
          //'js/scripts.min.js': [
          //  'js/src/*.js'
          //],
          //PLUGINS
          //'js/plugins/collapse.min.js': [ 'js/plugins/src/collapse.js' ],
          //'js/plugins/transitions.min.js': [ 'js/plugins/src/transitions.js' ]
        }
      }
    },

    sass: {
      options: {
        style: 'compressed',
        banner: '<%= meta.banner %>\n'
      },
      buildSassFiles: {
        files: {
          'css/styles.min.css': [
            'css/src/base.scss'
          ]
        }
      }
    },

    zip: {
      'portfolio.zip': [
        'css/**',
        '!css/src/**',
        '!css/img/*.psd',
        '!css/*.map',
        'images/**',
        'js/**',
        '!js/src/**',
        '!js/plugins/src/**',
        'languages/**',
        'partials/**',
        'package.json',
        '*.php',
        'screenshot.gif',
        'screenshot.png',
        'style.css'
      ]
    },

    watch: {
      css: {
        files: ['css/src/**/*.scss', 'css/src/**/**/*.scss','Gruntfile.js'],
        tasks: ['sass']
      },
      js: {
        files: ['js/src/*.js','Gruntfile.js'],
        tasks: ['jshint','uglify']
      }
    },

    shell: {
      bumpVersion: {
        command: 'npm version patch'
      }
    }

  });

  // Package presentation to archive
  grunt.registerTask( 'deploy', ['jshint','sass:buildSassFiles','uglify:buildJsFiles','shell:bumpVersion','zip'] );
};