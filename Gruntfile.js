module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-text-replace');


    var appFiles = [
            'app/utils/strict.js',
            'app/utils/namespace.js',
            'app/element/**/metadata.js', // old
            'app/new/elements/**/metadata/*.js',
            'app/element/**/metadata/*.js',
            'app/config.js',
            'app/utils/**/*.js',
            'app/messaging/**/*.js',
            'app/controls/_base/**/*.js', // old

            'app/new/controls/_base/**/*.js',

            'app/new/controls/textBox/**/*.js',

            'app/new/controls/dateTimePicker/**/*.js',
            'app/new/controls/datePicker/**/*.js',
            'app/new/controls/timePicker/**/*.js',

            'app/new/controls/**/*.js',

            'app/element/_mixins/*.js',
            'app/element/*.js', // old
            'app/data/_common/**/*.js',
            'app/new/elements/_base/**/*.js',
            'app/new/elements/listBox/**/*.js',
            'app/new/elements/textBox/**/*.js',

            'app/new/elements/dateTimePicker/**/*.js',
            'app/new/elements/datePicker/**/*.js',
            'app/new/elements/timePicker/**/*.js',

            'app/new/elements/**/*.js',

            'app/actions/*.js',
            'app/actions/**/*.js',

            'app/**/*.js',

            'extensions/**/*.js',

            '!app/utils/pdf/**/*.js',
            '!app/extensions/**/*.js',
            '!app/utils/exel-builder/*.js'
        ],
        vendorFiles = [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/underscore/underscore.js',
            'bower_components/backbone/backbone.js',
            'bower_components/moment/moment.js',
            'bower_components/moment/lang/ru.js',
            'bower_components/signalr/jquery.signalR.js',
            'bower_components/ulogin/index.js',
            'bower_components/jquery-bootpag/lib/jquery.bootpag.min.js',
            'bower_components/JavaScript-MD5/js/md5.js',
            'bower_components/blockUI/jquery.blockUI.js',
            'app/utils/exel-builder/excel-builder.dist.js',
            'app/utils/pdf/build/pdf.js',
            'bower_components/toastr/toastr.js',
            'bootstrap-framework/js/tooltip.js',
            'bower_components/jquery.cookie/jquery.cookie.js',
            'bower_components/hammerjs/hammer.js',
            'bootstrap-framework/js/*.js'
        ],
        appStyleFiles = [
            'app/styles/main.less'
        ],
        vendorCssFiles = [
            'bower_components/font-awesome/css/font-awesome.min.css',
            'bower_components/toastr/toastr.css'
        ],
        unitTestFiles = ['app/utils/strict.js', 'test/unit/setup.js', 'test/unit/**/*.js'],
        e2eTestFiles = ['test/e2e/setup.js', 'test/e2e/**/*.js'],
        templateFiles = ["app/**/*.tpl.html", "extensions/**/*.tpl.html", "app/utils/messageBox/**/*.tpl.html"],
        outerExtensionScript = '*.Extensions/**/*.js',
        outerExtensionStyle = '*.Extensions/**/*.css',
        outerExtensionLessStyle = '*.Extensions/**/*.less',
        outerExtensionFavicon = '*.Extensions/*.ico';
        /* jsoneditor не добавляется в vendor, чтобы можно было его отдельно использовать в editorDialog */
        developmentModeCopy = {
        	jsonEditorJs: {
                expand: true,
                flatten: true,
                src: [
                    'bower_components/jsoneditor/dist/jsoneditor.min.js'
                ],
                dest: 'out/jsonEditor'
            },
            jsonEditorCSS: {
                expand: true,
                flatten: true,
                src: [
                    'bower_components/jsoneditor/dist/jsoneditor.min.css'
                ],
                dest: 'out/jsonEditor/css'
            },
            jsonEditorSVG: {
                expand: true,
                flatten: true,
                src: [
                    'bower_components/jsoneditor/dist/img/jsoneditor-icons.svg'
                ],
                dest: 'out/jsonEditor/css/img'
            },
            jsonEditorDialog: {
            	expand: true,
                flatten: true,
                src: [
                    'developer/jsonEditor/editorDialog/*'
                ],
                dest: 'out/jsonEditor'
            }
        };


    grunt.initConfig({
        concat: {
            app: {
                options: {
                    sourceMap: false,
                    process: function(src, filepath) {
                        return '//####' + filepath + '\n' + src;
                    }
                },
                src: appFiles,
                dest: 'out/platform.js'
            },
            vendor: {
                src: vendorFiles,
                dest: 'out/vendor.js'
            },
            vendor_css: {
                src: vendorCssFiles,
                dest: 'out/css/vendor.css'
            },
            prodApp: {
                src: appFiles,
                dest: 'out/prodApp.js',
                options: {
                    banner: ';(function(){',
                    footer:'})();'
                }
            },
            unit_test: {
                src: unitTestFiles,
                dest: 'out/unitTest.js'
            },
            e2e_test: {
                src: e2eTestFiles,
                dest: 'out/e2eTest.js'
            }
        },

        copy: {
            fonts: {
                cwd: 'bower_components/font-awesome/fonts/',
                src: '*',
                dest: 'out/fonts/',
                expand: true
            },
            fonts1: {
                cwd: 'app/styles/font/',
                src: '*',
                dest: 'out/fonts/',
                expand: true
            },
            css:{
                expand: true,
                flatten: true,
                src: 'app/styles/main.css',
                dest: 'out/css/'
            },
            resources: {
                expand: true,
                flatten: true,
                src: [],
                dest: 'out/css/'
            },
            favicon:{
                expand: true,
                flatten: true,
                src: [],
                dest: 'out/images/'
            }
            //media: {
            //    expand: true,
            //    flatten: true,
            //    src: ['app/styles/media/**/*.*'],
            //    dest: 'out/css/media/'
            //}
            /*images: {
                files: [
                    {
                        cwd: 'bower_components/metronic/assets/global/img/',
                        src: '*',
                        dest: 'out/img/',
                        expand: true
                    },
                    {
                        cwd: 'bower_components/metronic/assets/global/plugins/select2/',
                        src: 'select2.png',
                        dest: 'out/css/',
                        expand: true
                    },
                    {
                        cwd: 'bower_components/metronic/assets/global/plugins/uniform/images',
                        src: '*',
                        dest: 'out/images/',
                        expand: true
                    }
                ]
            }*/
        },

        watch: {
            scripts: {
                files: appFiles.concat(unitTestFiles,e2eTestFiles),
                tasks: ['concat:app', 'concat:unit_test', 'concat:e2e_test']
            },
            templates: {
                files: templateFiles,
                tasks: ['jst']
            }
        },

        jst : {
            templates : {
                options : {
                    namespace : 'InfinniUI.Template',
                    prettify : true,
                    processName : function (filename) {
                        return filename.replace(/^app\//, '');
                    }
                },
                files : {
                    "out/templates.js" : templateFiles
                }
            }
        },

        less : {
            default: {
                options:{
                    modifyVars: {}
                },
                src: appStyleFiles,
                dest: 'app/styles/main.css'
            }
        },

        connect: {
            http: {
                options: {
                    open: 'http://localhost:8181/test/unit/',
                    hostname : '*',
                    port: '8181',
                    keepalive: true
                }
            }
            /*,
            https: {
                options: {
                    open: 'http://localhost:8181/test/unit/',
                    hostname : '*',
                    protocol: 'https',
                    port: '8181',
                    key: grunt.file.read('certificates/server.key').toString(),
                    cert: grunt.file.read('certificates/server.crt').toString(),
                    ca: grunt.file.read('certificates/ca.crt').toString()
                }
            }
            */
        },

        clean:{
            default: {
            	src: "out/"
            }
        },

        replace: {
            default: {
                src: ['out/*.js'],
                dest: 'out/',
                replacements: [{
                    from: /\/\/devblockstart((?!devblock)[\s\S])*\/\/devblockstop/ig,
                    to: ''
                }]
            }
        }

    });

    var previous_force_state = grunt.option("force");
    grunt.registerTask("force",function(set){
        if (set === "on") {
            grunt.option("force",true);
        }
        else if (set === "off") {
            grunt.option("force",false);
        }
        else if (set === "restore") {
            grunt.option("force",previous_force_state);
        }
        console.log(grunt.option('force'));
    });

    grunt.task.registerTask('build',
        function (props) {
        	var tasks = [
                'less',
                'force:on',
                'clean:default',
                'force:restore',
                'jst',
                'concat',
                'copy'               
            ];

            if(typeof props == "string"){
                props = props.replace(/=/g, ':');
            }

            if(typeof props == "string" && props.indexOf('{') == -1){
                props = require(props);
            }

            if(props){
                eval('props = ' + props);

                if(props.override){
                    if(props.override.less){
                        for(var k in props.override.less){
                            grunt.config.set('less.default.options.modifyVars.' + k, props.override.less[k]);
                            grunt.log.writeln('path - ' + k);
                            grunt.log.writeln(grunt.config.get('less.default.options.modifyVars.' + k));
                        }
                    }
                }

                if( props.mode === 'development' ) {
                	var merge = require('merge');

                	var tmpCopy = grunt.config.get('copy');
                	tmpCopy = merge( tmpCopy, developmentModeCopy );
                	grunt.config.set('copy', tmpCopy);

                	appFiles.push('developer/jsonEditor/*.*');

                } else {
                	tasks.push('replace');
                }
            }

            grunt.task.run(tasks);
        }
    );

    grunt.task.registerTask('runTests', function () {
            var tasks = [
                'build',
                'connect'
            ];
            grunt.task.run(tasks);
        }
    );

    grunt.task.registerTask('default', function (protocol) {
            var protocols = ['http', 'https'];
            if (protocols.indexOf(protocol) === -1) {
                protocol = protocols[0];
            }
            var tasks = ['build', 'connect:' + protocol, 'watch'];
            console.log(tasks);
            grunt.task.run(tasks);
        }
    );

    grunt.task.registerTask('removeElement', function(name){
            name = name.charAt(0).toLowerCase() + name.slice(1);

            grunt.config('clean.element', ['app/element/'+name,'app/controls/'+name,'test/unit/element/'+name]);
            grunt.task.run('clean:element');
        }
    );

};