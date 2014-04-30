module.exports = function (config) {
  config.set({
    basePath: '../',

    files: [
      'js/angular/angular.js',
      'js/angular/angular-resource.js',
      'js/angular/angular-route.js',
      'js/angular/angular-cookies.js',
      'js/angular/angular-translate.js',
      'js/angular/angular-translate-loader-static-files.js',
      'js/angular/angular-translate-loader-url.js',
      'test/lib/angular/angular-mocks.js',
      'js/angular-ui/unique.js',
      'js/app/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch: true,

    //singleRun:true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-junit-reporter',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  })
}