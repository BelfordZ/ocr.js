module.exports = (grunt) ->
    grunt.initConfig(
        watch:
            all:
                files: ['src/lib/**/*', 'src/spec/**/*']
                tasks: ['coffeelint', 'coffee:compile', "browserify", "copy"]

        coffee:
            compile:
                files: [{
                    expand: true
                    flatten: false
                    cwd: 'src/'
                    src: ['**/*.coffee']
                    dest: 'build/'
                    ext: '.js'
                }]

        coffeelint:
            options:
                max_line_length:
                    level: 'ignore'

            lib: ['src/lib/**/*.coffee']
            spec:
                files:
                    src: ['src/spec/**/*.coffee']

        browserify:
            dist:
                files:
                    "ocr.js": ["src/lib/Ocr.coffee"]

                options:
                    standalone: "ocr"
                    transform: ["coffeeify"]
                    postBundleCB: (err, src, next) ->
                        if err instanceof Error
                            return next(err, null)
                        else
                            newSrc = "'use strict'\n#{src}"
                            return next(null, newSrc)

        copy:
            main:
                nonull: true
                src: "ocr.js"
                dest: "examples/simple/public/javascripts/ocr.js"

    )

    grunt.loadNpmTasks('grunt-contrib-coffee')
    grunt.loadNpmTasks('grunt-coffeelint')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-browserify')
    grunt.loadNpmTasks('grunt-contrib-copy')

    grunt.registerTask('default', ['coffeelint'])
    grunt.registerTask("bumpExamples", ["copy"])
