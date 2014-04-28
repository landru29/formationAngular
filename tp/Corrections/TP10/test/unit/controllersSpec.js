'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  var scope;

  var contacts = [
    {"id":0,"lastName":"Wayne","firstName":"Bruce","address":"Gotham city","phone":"555-BATMAN"},
    {"id":1,"lastName":"Parker","firstName":"Peter","address":"New York","phone":"555-SPDRMN"}
  ]

  beforeEach(module('zenContactApp'));

  beforeEach(inject(function($rootScope, $httpBackend) {
  	scope = $rootScope.$new();
  	$httpBackend.expect('GET').respond(contacts)
  }));  

  it('should define the name filter', inject(function($controller) {
    expect(scope.nameFilter).toBeUndefined()

    $controller('ContactListController', {
      $scope: scope
  	})

    expect(angular.isFunction(scope.nameFilter)).toBeTruthy()
  }));

  it('should received 2 mocked contact', inject(function($controller, $httpBackend) {
    expect(scope.contacts).toBeUndefined()

    $controller('ContactListController', {
	    $scope: scope
	  })

	  expect(scope.contacts).toBeDefined()

    $httpBackend.flush()

    expect(scope.contacts.length).toBe(2)
  }));
});
