'use strict';

var globals = require('./globals');

describe('Insert a contact', function () {
  // Let's factorize the go to home page code before each test
  beforeEach(function () {
    browser.get('#/edit');
  });

  it('Insert a contact', function () {

    addContact().then(function (count) {
      expect(count).toEqual(9);
    });
  });


});



function goto(page) {
  browser.get(page ? page : '');
}

function addContact() {
  var deferred = protractor.promise.defer();
  goto('#/edit');
  element(by.model('currentContact.firstName')).sendKeys('Bob');
  element(by.model('currentContact.lastName')).sendKeys('kiki');
  element(by.model('currentContact.address')).sendKeys('Chez moi');
  element(by.model('currentContact.phone')).sendKeys('555-AZERTY');
  element(by.css('input[type="submit"]')).click();

  globals.countContacts().then(function (count) {
    deferred.fulfill(count);
  });

  return deferred.promise;

}