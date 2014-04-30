'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function () {
  var scope;
  var controller;
  var httpBackend;

  beforeEach(module('zenContactApp'));

  beforeEach(inject(function ($rootScope, $httpBackend, $controller) {
    scope = $rootScope.$new();
    controller = $controller;
    $httpBackend.expect('GET', '/rest/contacts').respond('[ { "id": 0, "lastName": "Wayne", "firstName": "Bruce", "address": "Gotham city", "phone": "555-BATMAN" },' + '{ "id": 1, "lastName": "Parker", "firstName": "Peter", "address": "New York", "phone": "555-SPDRMN" },' + '{ "id": 2, "lastName": "Storm", "firstName": "Jane", "address": "Baxter building, New York", "phone": "555-INVGRL" },' + '{ "id": 3, "lastName": "Richards", "firstName": "Red", "address": "Baxter building, New York", "phone": "555-MRFANT" },' + '{ "id": 4, "lastName": "Storm", "firstName": "Johnny", "address": "Baxter building, New York", "phone": "555-TORCH" },' + '{ "id": 5, "lastName": "Grimm", "firstName": "Benjamin", "address": "Baxter building, New York", "phone": "555-THING" },' + '{ "id": 6, "lastName": "Murdock", "firstName": "Matt", "address": "San Francisco", "phone": "555-DARDVL" },' + '{ "id": 7, "lastName": "Stark", "firstName": "Tony", "address": "Stark tower, New York", "phone": "555-IRNMAN" } ]');
    //$httpBackend.when('GET', '/languages/en.json').respond('[]');
    httpBackend = $httpBackend;
  }));


  it('Should not find nameFilter', function () {
    expect(scope.nameFilter).toBeUndefined();
  });


  it('Should find nameFilter', function () {
    controller('ContactListController', {
      '$scope': scope
    });
    expect(scope.nameFilter).toBeDefined();
  });

  it('Should find contacts', function () {
    controller('ContactListController', {
      '$scope': scope
    });
    expect(scope.contacts).toBeDefined();
  });

  it('Should load 8 contacts', function () {
    controller('ContactListController', {
      '$scope': scope
    });
    httpBackend.flush();
    expect(scope.contacts.length).toBe(8);
  });

  /*it('should ....', inject(function () {
    //spec body
  }));*/
});