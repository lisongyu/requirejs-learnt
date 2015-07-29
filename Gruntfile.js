
/*
 * compass demo
 * 三种模式
 * cps：编译一次
 * dev：监测变化,执行编译
 * serve:监测变化，执行编译,刷新页面
 */
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);
    grunt.initConfig({
        watch: {
            dev: {
                files: ["src/sass/{,*/}*.*", "src/*.html"],
                tasks: ["sass"],
                options: {
                    livereload: 5000
                }
            }
        },
        connect: {
            dev: {
                options: {
                    base: ".",
                    "port": "1024",
                    hostname: "*",
                    livereload: 5000,
                    open: {
                        target: "http://127.0.0.1:1024/src/index.html"
                    }
                }
            }
        },
        sass: {
            options: {
                sourceMap: true

            },
            dist: {
                files: {
                    'src/css/main.css': 'src/sass/main.scss'
                }
            }
        },
        cssmin: {
            dist: {

                files: {
                    'src/css/style.min.css': ['src/css/main.css']
                }
            }
        }
    });
    grunt.registerTask("cps", ['sass']); //运行一次执行一次编译
    grunt.registerTask("serve",['sass','connect:dev','watch:dev']);
    grunt.registerTask("css", ['cssmin']);

};

