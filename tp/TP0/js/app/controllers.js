'use strict';


if (!String.prototype.contains) {
  String.prototype.contains = function (subStr) {
    return (this.indexOf(subStr) != -1);
  }
}

angular.module('zenContactApp').controller('ContactListController', ['$scope', '$filter', '$location', 'contactService',
  function ($scope, $filter, $location, contactService) {
    contactService.getAllContacts(function (data) {
      $scope.contacts = data;
    });

    $scope.$watch('search', function (newValue, oldValue) {
      $scope.newFilteredContacts = $filter('orderBy')($filter('filter')($scope.contacts, newValue), 'lastName');
    });

    $scope.edit = function (contact) {
      $location.path('/edit/' + contact.id);
    };
  }
]);


angular.module('zenContactApp').controller('ContactEditController', ['$scope', '$route', '$routeParams', 'contactService', '$location',
  function ($scope, $route, $routeParams, contactService, $location) {
    $scope.title = $route.current.title;
    if ('undefined' !== typeof $routeParams.id) {
      contactService.getContactById($routeParams.id, function (data) {
        $scope.currentContact = data;
      });
    } else {
      $scope.currentContact = {
        "lastName": "",
        "firstName": "",
        "address": "",
        "phone": ""
      };
    }

    $scope.backToList = function () {
      $location.path('/list');
    };

    $scope.save = function (contact) {
      contactService.saveContact(contact, function (data) {
        $scope.currentContact = data;
      });
    };
  }
]);

angular.module('zenContactApp').controller('NavigationController', ['$scope', '$location',
  function ($scope, $location) {
    $scope.isActive = function (path) {
      return $location.path().contains(path);
    };
  }
]);