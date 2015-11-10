module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-create-test-files');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-generate');

    var appFiles = [
            'app/utils/strict.js',
            'app/utils/namespace.js',
            'app/element/**/metadata.js', // old
            'app/config.js',
            'app/utils/**/*.js',
            'app/messaging/**/*.js',
            'app/controls/_base/**/*.js', // old

            'app/new/controls/_base/**/*.js',
            'app/new/controls/**/*.js',

            'app/element/_mixins/*.js',
            'app/element/*.js', // old

            'app/new/elements/_base/**/*.js',
            'app/new/elements/**/*.js',

            'app/**/*.js',

            'extensions/**/*.js',
            'bootstrap_framework/js/*.js',
            '!app/utils/pdf/**/*.js',
            '!app/extensions/**/*.js',
            '!app/utils/exel-builder/*.js',
            '!app/controls/checkBox/**/*.js',
            '!app/element/dataElement/checkBox/**/*.js',
            '!app/element/dataElement/listBox/**/*.js',
            '!app/controls/stackPanel/**/*.js',
            '!app/element/layoutPanel/stackPanel/**/*.js',
            '!app/controls/toggleButton/**/*.js',
            '!app/element/dataElement/toggleButton/**/*.js',
            '!app/element/dataElement/textBox/**/*.*',
            '!app/controls/textBox/**/*.*',
            '!app/element/actionElement/button/**/*.*',
            '!app/controls/button/**/*.*',
            '!app/controls/popupButton/**/*.*',
            '!app/element/actionElement/popupButton/**/*.*',
            '!app/element/actionElement/toolBar/**/*.*',
            '!app/controls/toolBar/**/*.*',
            '!app/controls/imageBox/**/*.*',
            '!app/element/imageBox/**/*.*',
            '!app/element/dataElement/uploadFileBox/**/*.*',
            '!app/controls/uploadFileBox/**/*.*',
            '!app/controls/comboBox/**/*.*',
            '!app/element/dataElement/comboBox/**/*.*',
            '!app/controls/panel/**/*.*',
            '!app/element/layoutPanel/panel/**/*.*'
        ],
        vendorFiles = [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/underscore/underscore.js',
            'bower_components/backbone/backbone.js',
            'bower_components/moment/moment.js',
            'bower_components/moment/lang/ru.js',
            'bower_components/signalr/jquery.signalR.js',
            'bower_components/jstree/dist/jstree.js',
            'bower_components/ulogin/index.js',
            'bower_components/jquery-bootpag/lib/jquery.bootpag.min.js',
            'bower_components/JavaScript-MD5/js/md5.js',
            'app/utils/exel-builder/excel-builder.dist.js',
            'app/utils/pdf/build/pdf.js'
        ],
        appStyleFiles = [
            'app/styles/main.less'
        ],
        vendorCssFiles = [
            'bower_components/jstree-bootstrap-theme/dist/themes/proton/style.css',
            'bower_components/font-awesome/css/font-awesome.min.css'
        ],
        unitTestFiles = ['app/utils/strict.js', 'test/unit/setup.js', 'test/unit/**/*.js'],
        e2eTestFiles = ['test/e2e/setup.js', 'test/e2e/**/*.js'],
        templateFiles = ["app/**/*.tpl.html"],
        outerExtensionScript = '*.Extensions/**/*.js',
        outerExtensionStyle = '*.Extensions/**/*.css',
        outerExtensionLessStyle = '*.Extensions/**/*.less',
        outerExtensionFavicon = '*.Extensions/*.ico';

    grunt.initConfig({
        concat: {
            app: {
                options: {
                    sourceMap: false
                },
                src: appFiles,
                dest: 'out/app.js'
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
                src: [
                    'bower_components/jstree-bootstrap-theme/src/themes/default/throbber.gif',
                    'bower_components/jstree-bootstrap-theme/src/themes/default/30px.png',
                    'bower_components/jstree-bootstrap-theme/src/themes/default/32px.png'
                ],
                dest: 'out/css/'
            },
            favicon:{
                expand: true,
                flatten: true,
                src: [],
                dest: 'out/images/'
            }
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
                src: appStyleFiles,
                dest: 'app/styles/main.css'
            }
        },

        connect: {
            http: {
                options: {
                    open: 'http://localhost:8181/test/unit/',
                    hostname : '*',
                    port: '8181'
                }
            },
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
        },

        clean:{
            default: {
                src: "test/unit/autogeneratedTests/elementAPI/"
            }
        },

        create_test_files: {
            your_target: {
                options: {
                    templateFile: 'test/unit/autogeneratedTests/templateElementApi.test',
                    destinationBasePath: 'test/unit/autogeneratedTests/elementAPI/',
                    sourceBasePath: 'app/element/'
                },
                files: {
                    src: [
                        '**/*.js',          //включить все вложенные .js файлы
                        '!*.js',            //исключить js файлы лежащие в корне sourceBasePath
                        '!**/*Builder.js',  //исключить все билдеры
                        '!_mixins/**'       //исключить все mixin-ы
                    ]
                }
            }
        },

        generate: {

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
        function (extensionPath) {
            if (extensionPath) {
                var tmp = appFiles.slice(0),
                    tmpLess = appStyleFiles.slice(0),
                    tmpFavicon = grunt.config.get('copy.favicon.src').slice(0);

                tmp.push(extensionPath + outerExtensionScript);
                tmpLess.push(extensionPath + outerExtensionStyle);
                tmpLess.push(extensionPath + outerExtensionLessStyle);
                tmpFavicon.push(extensionPath + outerExtensionFavicon);

                grunt.config.set('copy.favicon.src', tmpFavicon);
                grunt.config.set('concat.app.src', tmp);
                grunt.config.set('less.default.src', tmpLess);
            }else{
                grunt.config.set('concat.app.src', appFiles);
                grunt.config.set('less.default.src', appStyleFiles);
            }

            //grunt.log.writeln(extensionPath + outerExtensionScript);
            //grunt.log.writeln(grunt.config().concat.app.src);

            var tasks = [
                'less',
                'force:on',
                'clean:default',
                //'jscs',
                'force:restore',
                'jst',
                'concat',
                'copy'
            ];
            grunt.task.run(tasks);
        }
    );

    grunt.task.registerTask('build with autogen tests',
        [
            'less',
            'force:on',
            //'jscs',
            'force:restore',
            'jst',
            'clean:default',
            'create_test_files',
            'concat',
            'copy'
        ]
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

    grunt.task.registerTask('newElement', function(name){
            name = name.charAt(0).toLowerCase() + name.slice(1);

            grunt.task.run('generate:element:' +name+"@app/element/"+name);
            grunt.task.run('generate:builder:' +name+"Builder"+"@app/element/"+name);
            grunt.task.run('generate:control:' +name+"@app/controls/"+name);
            grunt.task.run('generate:unittest:' +name+"@test/unit/element/"+name);
        }
    );

    grunt.task.registerTask('removeElement', function(name){
            name = name.charAt(0).toLowerCase() + name.slice(1);

            grunt.config('clean.element', ['app/element/'+name,'app/controls/'+name,'test/unit/element/'+name]);
            grunt.task.run('clean:element');
        }
    );

};