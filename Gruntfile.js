module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-targethtml');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // Configuration de Grunt
    grunt.initConfig({
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 3,
                    svgoPlugins: [{
                        removeViewBox: false
                    }]
                },
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/images'
                }]
            }
        },
        uglify: {
            options: {
                separator: ';'
            },
            compile: {
                src: [
                    'js/jquery.js',
                    'js/modernizr.custom.js',
                    'js/royal_preloader.min.js',
                    'js/classie.js',
                    'js/tweetie.min.js',
                    'js/cbpAnimatedHeader.min.js',
                    'js/retina-1.1.0.min.js',
                    'js/jquery.localize.min.js',
                    'js/jquery.particleground.min.js',
                    'js/jquery.parallax-1.1.3.js',
                    'js/jquery.localscroll-1.2.7-min.js',
                    'js/jquery.onepage-scroll.js',
                    'js/jquery.scrollTo-1.4.2-min.js',
                    'js/jquery.easing.js',
                    'js/jquery.bxslider.min.js',
                    'js/jquery.colorbox.js',
                    'js/contact.js',
                    'js/jquery.detect.js',
                    'js/jquery.nicescroll.min.js',
                    'js/waypoints.min.js',
                    'js/jquery.fs.tipper.min.js',
                    'js/jquery.counterup.min.js',
                    'js/scrollReveal.js',
                    'js/jquery.isotope.min.js',
                    'js/jquery.ba-hashchange.min.js',
                    'js/fastclick.js',
                    'js/template.js'
                ],
                dest: "dist/js/app.min.js"
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: true,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/css/base.min.css': ['css/base.css',
                        'css/skeleton.css',
                        'css/layout.css',
                        'css/portfolio.css',
                        'css/retina.css',
                        'css/font-awesome.css',
                        'css/colorbox.css'
                    ]
                }
            }
        },
        targethtml: {
          dist: {
            options: {
                curlyTags: {
                    rlsdate: '<%= grunt.template.today("yyyymmdd") %>'
                }
            },
            files: {
              'dist/index.html': 'index.html',
              'dist/projects/project-1.html': 'projects/project-1.html',
              'dist/projects/project-2.html': 'projects/project-2.html',
              'dist/projects/project-3.html': 'projects/project-3.html',
              'dist/projects/project-4.html': 'projects/project-4.html',
              'dist/projects/project-5.html': 'projects/project-5.html',
              'dist/projects/project-6.html': 'projects/project-6.html',
              'dist/projects/project-7.html': 'projects/project-7.html',
              'dist/projects/project-8.html': 'projects/project-8.html',
              'dist/projects/project-9.html': 'projects/project-9.html',
              'dist/projects/project-10.html': 'projects/project-10.html',
              'dist/projects/project-11.html': 'projects/project-11.html'
            }
          }
        },
          htmlmin: {                                     // Task
            dist: {                                      // Target
              options: {                                 // Target options
                removeComments: true,
                collapseWhitespace: true
              },
              files: {                                   // Dictionary of files
                'dist/index.html': 'dist/index.html',
              'dist/projects/project-1.html': 'dist/projects/project-1.html',
              'dist/projects/project-2.html': 'dist/projects/project-2.html',
              'dist/projects/project-3.html': 'dist/projects/project-3.html',
              'dist/projects/project-4.html': 'dist/projects/project-4.html',
              'dist/projects/project-5.html': 'dist/projects/project-5.html',
              'dist/projects/project-6.html': 'dist/projects/project-6.html',
              'dist/projects/project-7.html': 'dist/projects/project-7.html',
              'dist/projects/project-8.html': 'dist/projects/project-8.html',
              'dist/projects/project-9.html': 'dist/projects/project-9.html',
              'dist/projects/project-10.html': 'dist/projects/project-10.html',
              'dist/projects/project-11.html': 'dist/projects/project-11.html'
              }
            }
          },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: ['pdf/**'],
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        src: ['js/api/**'],
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        src: ['css/font/**'],
                        dest: 'dist/'
                    },
                     {
                        expand: true,
                        src: ['js/lang-en.json','js/lang-fr.json'],
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        src: ['mail-it.php',
                            'apple-touch-icon-114x114.png',
                            'apple-touch-icon-72x72.png',
                            'apple-touch-icon.png',
                            'favicon.png'
                            ],
                        dest: 'dist/'
                    }
                ],
            },
        }
    })


    // dist
    grunt.registerTask('styles:dist', ['cssmin'])
    grunt.registerTask('img:dist', ['imagemin:dynamic'])
    grunt.registerTask('scripts:dist', ['uglify:compile'])
    grunt.registerTask('files:dist', ['copy:main'])
    grunt.registerTask('html:dist', ['targethtml:dist'])
    grunt.registerTask('htmlmini:dist', ['htmlmin:dist'])
    grunt.registerTask('dist', ['files:dist','styles:dist', 'scripts:dist', 'img:dist','html:dist','htmlmini:dist'])

}
