var breakpoints = require('./breakpoints-test.json'),
  versions = Object.keys(breakpoints),
  testCssRegression = {},
  concatObj = {},
  execObj = {},
  execArray = [],
  concatArray = [];

for (var i = 0, len = versions.length; i < len; i++) {
  var ver = versions[i],
    breakpoint = breakpoints[ver];
  testCssRegression[ver] = {
    options: {
      viewportSize: breakpoint,
      mismatchTolerance: 1,
      phantomjsArgs: [
        '--web-security=false'
      ]
    },
    src: ['<%= meta.testingLayouts %>' + ver + '/layout-test.js']
  };
  concatObj[ver] = {
    src: ['<%= meta.testingLayouts %>shared/**/*.js', '<%= meta.testingLayouts %>' + ver + '/blocks/**/*.js'],
    dest: '<%= meta.testingLayouts %>/' + ver + '/layout-test.js'
  };
  execObj[ver] = 'grunt phantomcss:' + ver + ' --force';
  execArray.push('exec:' + ver);
  concatArray.push('concat:' + ver);
};
module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - built on <%= grunt.template.today("dd-mm-yyyy") %> */\n',
      views: 'app/views/',
      styles: 'app/styles/',
      scripts: 'app/scripts/',
      assets: 'app/assets/',
      build: 'static/',
      doc: 'doc/',
      testingLayouts: 'test/layouts/'
    },
    pug: {
      compile: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: '<%= meta.views %>',
          src: ['**/*.pug', '!blocks/**', '!layouts/**', '!mixins/**'],
          dest: '<%= meta.build %>',
          ext: '.html'
        }]
      }
    },
    less: {
      dev: {
        options: {
          compress: false
        },
        files: [{
          '<%= meta.build %>style/libs.css': '<%= meta.styles %>libs/libs.less',
          '<%= meta.build %>style/print.css': '<%= meta.styles %>print.less',
          '<%= meta.build %>style/style.css': '<%= meta.styles %>style.less'
        }]
      }
    },
    concat: Object.assign({}, {
      dist: {
        files: [{
          '<%= meta.build %>js/modernizr.js': ['<%= meta.scripts %>libs/modernizr.2.8.3.js', '<%= meta.scripts %>libs/detectizr.js'],
          '<%= meta.build %>js/libs.js': ['<%= meta.scripts %>libs/jquery-2.1.4.js', '<%= meta.scripts %>libs/handlebars-v4.0.5.js', '<%= meta.scripts %>libs/plugins/*.js'],
          '<%= meta.build %>js/l10n.js': '<%= meta.scripts %>l10n.js',
          '<%= meta.build %>js/script.js': ['<%= meta.scripts %>site.js', '<%= meta.scripts %>plugins/*.js']
        }]
      },
      css: {
        files: [{
          '<%= meta.build %>css/style.css': ['<%= meta.build %>style/libs.css', '<%= meta.build %>style/style.css', '<%= meta.build %>style/print.css']
        }]
      }
    }, concatObj),
    copy: {
      data: {
        files: [{
          expand: true,
          cwd: '<%= meta.views %>data/',
          src: ['**', '!*.pug'],
          dest: '<%= meta.build %>data/'
        }]
      },
      fonts: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>fonts/',
          src: '**',
          dest: '<%= meta.build %>fonts/'
        }]
      },
      icons: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>icons/',
          src: '**',
          dest: '<%= meta.build %>'
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>images/',
          src: '**',
          dest: '<%= meta.build %>images/'
        }]
      },
      media: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>media/',
          src: '**',
          dest: '<%= meta.build %>media/'
        }]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['<%= meta.scripts %>plugins/*.js']
    },
    lesslint: {
      options: {
        imports: [
          '<%= meta.styles %>**/*.less',
          '!<%= meta.styles %>mixin.less',
          '!<%= meta.styles %>iconfonts.less'
        ],
        csslint: {
          csslintrc: '.csslintrc'
        }
      },
      files: ['<%= meta.styles %>style.less']
    },
    htmlhint: {
      options: {
        htmlhintrc: '.htmlhintrc'
      },
      files: ['<%= meta.build %>*.html']
    },
    puglint: {
      options: {
        config: '.pug-lintrc'
      },
      files: ['<%= meta.views %>**/*.pug']
    },
    watch: {
      options: {
        spawn: false,
        interrupt: false,
        livereload: true
      },
      iconfont: {
        files: ['<%= meta.assets %>iconfonts/*.svg'],
        tasks: ['exec:gulp_iconfont']
      },
      js: {
        files: ['<%= meta.scripts %>plugins/*.js', '<%= meta.scripts %>*.js'],
        tasks: ['jshint', 'concat:dist']
      },
      pug: {
        files: ['<%= meta.views %>**/*.pug'],
        tasks: ['puglint']
      },
      data: {
        files: ['<%= meta.views %>data/**'],
        tasks: ['copy:data']
      },
      less: {
        files: ['<%= meta.styles %>**/*.less'],
        tasks: ['lesslint', 'less', 'autoprefixer']
      },
      fonts: {
        files: ['<%= meta.assets %>fonts/**'],
        tasks: ['copy:fonts']
      },
      icons: {
        files: ['<%= meta.assets %>icons/**'],
        tasks: ['copy:icons']
      },
      images: {
        files: ['<%= meta.assets %>images/**'],
        tasks: ['copy:images']
      },
      media: {
        files: ['<%= meta.assets %>media/**'],
        tasks: ['copy:media']
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%= meta.build %>images/',
          src: '**/*.{png,jpg,gif}',
          dest: '<%= meta.build %>images/'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          '<%= meta.build %>/index.html': '<%= meta.build %>/index.html'
        }
      }
    },
    cssmin: {
      options: {
        advanced: false,
        keepBreaks: false,
        keepSpecialComments: 0
      },
      compress: {
        files: [{
          '<%= meta.build %>css/style.css': '<%= meta.build %>css/style.css'
        }]
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        compress: true,
        beautify: false,
        preserveComments: false
      },
      dist: {
        files: [{
          '<%= meta.build %>js/modernizr.js': ['<%= meta.scripts %>libs/modernizr.2.8.3.js', '<%= meta.scripts %>libs/detectizr.js'],
          '<%= meta.build %>js/script.js': ['<%= meta.scripts %>l10n.js', '<%= meta.scripts %>libs/jquery-2.1.4.js', '<%= meta.scripts %>libs/handlebars-v4.0.5.js', '<%= meta.scripts %>libs/plugins/*.js', '<%= meta.scripts %>site.js', '<%= meta.scripts %>plugins/*.js']
        }]
      }
    },
    usemin: {
      html: '<%= meta.build %>/**/*.html'
    },
    autoprefixer: {
      options: {
        browsers: [
          'last 2 Chrome versions',
          'Firefox ESR',
          'Explorer >= 10',
          'iOS >= 9',
          'Safari >= 9',
          'Android >= 4.4'
        ]
      },
      files: {
        expand: true,
        src: '<%= meta.build %>style/*.css'
      }
    },
    markdownpdf: {
      files: {
        src: ['<%= meta.doc %>/*.md'],
        dest: '<%= meta.doc %>'
      }
    },
    nodemon: {
      dev: {
        options: {
          ignore: ['node_modules/**', '<%= meta.scripts %>**'],
          ext: 'js',
          watch: ['server'],
          delay: 1
        },
        script: 'server/index.js'
      }
    },
    concurrent: {
      options: {
        limit: 2
      },
      dev: {
        options: {
          logConcurrentOutput: true
        },
        tasks: ['nodemon', 'watch']
      }
    },
    qunit: {
      all: ['test/qunit/**/*.html']
    },
    clean: {
      options: {
        force: true
      },
      build: ['static'],
      cssTemp: ['static/style'],
      jsTemp: ['static/js'],
      screenshots: ['screenshots/']
    },
    phantomcss: testCssRegression,
    'gh-pages': {
      options: {
        base: '<%= meta.build %>'
      },
      src: ['**']
    },
    exec: Object.assign({}, {
      gulp_iconfont: {
        cmd: 'gulp iconfont'
      }
    }, execObj)
  });
  grunt.file.expand('./node_modules/grunt-*/tasks').forEach(grunt.loadTasks);
  require('time-grunt')(grunt);
  grunt.registerTask('build', ['clean', 'exec:gulp_iconfont', 'concat:dist', 'lesslint', 'less', 'copy', 'autoprefixer', 'jshint']);
  grunt.registerTask('buildRelease', ['build', 'puglint', 'pug', 'htmlhint', 'concat:css', 'clean:cssTemp', 'clean:jsTemp']);
  grunt.registerTask('default', ['build', 'concurrent']);
  grunt.registerTask('qunittest', ['jshint', 'qunit']);
  /**
	 * Testing layout tasks
	 * For only desktop: layouts:desktop
	 * For only tablet: layouts:tablet
	 * For only mobile: layouts:mobile
	 * For all: layouts:all
	 */
  grunt.registerTask('layouts', function (version) {
    var tasks = ['clean:screenshots'];

    if (version === 'desktop' || version === 'tablet' || version === 'mobile') {
      tasks.push('concat:' + version, 'phantomcss:' + version);
    } else if (version === 'all' || 0 === arguments.length) {
      Array.prototype.push.apply(tasks, concatArray);
      Array.prototype.push.apply(tasks, execArray);
    }

    grunt.task.run(tasks);
  });
  grunt.registerTask('doc', ['markdownpdf']);
  grunt.registerTask('release', ['buildRelease', 'imagemin', 'usemin', 'uglify', 'cssmin']);
  grunt.registerTask('deploy', ['release', 'gh-pages']);
};
