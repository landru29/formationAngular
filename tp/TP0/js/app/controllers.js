'use strict';



angular.module('zenContactApp').controller('ContactListController', ['$scope', '$filter', '$location', 'contactService',
  function ($scope, $filter, $location, contactService) {
    $scope.contacts = contactService.getAllContacts();

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
      $scope.currentContact = contactService.getContactById($routeParams.id);
    } else {
      $scope.currentContact = {
        lastName: '',
        firstName: '',
        address: '',
        phone: ''
      };
    }

    $scope.backToList = function () {
      $location.path('/list');
    };

    $scope.save = function (contact) {
      $scope.currentContact = contactService.saveContact(contact);
      $location.path('/list');
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