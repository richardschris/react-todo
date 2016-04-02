var jsxFileList = ['TodoList.jsx',
'AddItem.jsx',
'TodoItems.jsx',
'Item.jsx',
'Main.jsx'];

var fileList =  ['additem.js',
'todoitems.js',
'todolist.js',
'item.js',
'main.js'];

var appFolder = './app/react/';
var testFolder = './test/compiledjs/';
var tmpFolder = './tmp/';

module.exports = function(grunt) {
  var BabelLoader = require('babel-loader');
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      express: {
          dev: {
              options: {
                  script: './server.js',
                  background: true
              }
            }
      },
      watch: {
          scripts: {
              files: ['./app/react/**.jsx', './server.js'],
              tasks: ['jsxbuild', 'express:dev'],
              options: {
                  spawn: false
              }
          }
      },
      babel: { options: {
          plugins: ['transform-react-jsx'],
          presets: ['es2015', 'react']
        },
        jsx: {
            files:[{
                expand: true,
                cwd: 'app/react',
                src: ['*.jsx'],
                dest: 'tmp',
                ext: '.js'
            }]
      }},
        concat: {
            options: {
                separator: '\n'
            },
            dist: {
                src: (function() {
                    var fList = [];
                    fileList.forEach(function(currentValue) {
                        var a = tmpFolder + currentValue;
                        fList.push(a);
                    });
                    return fList;
                })(),
                dest: './app/main.js'
            },
        },
        file_append: {
            default_options: {
                files: (function() {
                    var appendList = [];
                    jsxFileList.forEach(function(currentValue) {
                        var a = {
                            prepend: 'var React = require("react");\n',
                            append: '\nmodule.exports = ' + currentValue.slice(0,-4) + ';',
                            input: appFolder + currentValue,
                            output: testFolder + currentValue
                        };
                        appendList.push(a);
                    });
                    return appendList;
                })()
            }
        },
        mochaTest: {
            all: {
                options: {
                    require: 'babel-register'
                },
                src: ['test/*.js',]
            }
        }

  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-parallel');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-file-append');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('serve', ['concat:dist', 'babel:jsx', 'express:dev', 'watch:scripts']);
  grunt.registerTask('jsxbuild', ['babel:jsx', 'concat']);
  grunt.registerTask('test', ['file_append', 'mochaTest']);
};
