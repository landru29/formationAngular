'use strict';

var globals = require('./globals');

describe('The adress book', function () {
  // Let's factorize the go to home page code before each test
  beforeEach(function () {
    browser.get('');
  });

  it('Should display no content', function () {
    element(by.model('search')).sendKeys('anything');
    globals.countContacts().then(function (count) {
      expect(count).toEqual(0);
    });
  });

  it('Should display 2 elements containing "B"', function () {
    element(by.model('search')).sendKeys('B');
    globals.countContacts().then(function (count) {
      expect(count).toEqual(2);
    });
  });

});