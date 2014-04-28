'use strict';


if (!String.prototype.contains) {
  String.prototype.contains = function (subStr) {
    return (this.indexOf(subStr) != -1);
  }
}

var ContactListController = function ($scope, $filter, $location) {
  $scope.contacts = [{
    "id": 0,
    "lastName": "Wayne",
    "firstName": "Bruce",
    "address": "Gotham city",
    "phone": "555-BATMAN"
  }, {
    "id": 1,
    "lastName": "Parker",
    "firstName": "Peter",
    "address": "New York",
    "phone": "555-SPDRMN"
  }, {
    "id": 2,
    "lastName": "Storm",
    "firstName": "Jane",
    "address": "Baxter building, New York",
    "phone": "555-INVGRL"
  }, {
    "id": 3,
    "lastName": "Richards",
    "firstName": "Red",
    "address": "Baxter building, New York",
    "phone": "555-MRFANT"
  }, {
    "id": 4,
    "lastName": "Storm",
    "firstName": "Johnny",
    "address": "Baxter building, New York",
    "phone": "555-TORCH"
  }, {
    "id": 5,
    "lastName": "Grimm",
    "firstName": "Benjamin",
    "address": "Baxter building, New York",
    "phone": "555-THING"
  }, {
    "id": 6,
    "lastName": "Murdock",
    "firstName": "Matt",
    "address": "San Francisco",
    "phone": "555-DARDVL"
  }, {
    "id": 7,
    "lastName": "Stark",
    "firstName": "Tony",
    "address": "Stark tower, New York",
    "phone": "555-IRNMAN"
  }];

  $scope.$watch('search', function (newValue, oldValue) {
    $scope.newFilteredContacts = $filter('orderBy')($filter('filter')($scope.contacts, newValue), 'lastName');
  });

  $scope.edit = function (contact) {
    $location.path('/edit/' + contact.id);
  }
};

var ContactEditController = function ($scope, $route) {
  $scope.title = $route.current.title;
};

var NavigationController = function ($scope, $location) {
  $scope.isActive = function (path) {
    return $location.path().contains(path);
  };
};