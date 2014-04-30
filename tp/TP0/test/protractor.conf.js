// protractor.conf.js

exports.config = {
  seleniumAdress: 'http://localhost:4444/wd/hub',
  capabilities: {
    'browserName': 'chrome'
  },
  specs: [
    'e2e/specs.js',
    'e2e/insert.js'
  ],
  baseUrl: 'http://localhost:8080/'

};