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


angular.module('zenContactApp').controller('ContactEditController', ['$scope', '$route', '$routeParams', 'contactService', '$location', 'Contact', 'LoadedContact',
  function ($scope, $route, $routeParams, contactService, $location, Contact, LoadedContact) {
    $scope.title = $route.current.title;
    $scope.currentContact = LoadedContact;
    /*if ('undefined' !== typeof $routeParams.id) {
      $scope.currentContact = contactService.getContactById($routeParams.id);
    } else {
      $scope.currentContact = new Contact();
    }*/

    $scope.backToList = function () {
      $location.path('/list');
    };

    $scope.save = function (contact) {
      $scope.currentContact = contactService.saveContact(contact);
      $location.path('/list');
    };
  }
]);

angular.module('zenContactApp').controller('NavigationController', ['$scope', '$location', '$translate',
  function ($scope, $location, $translate) {
    $scope.isActive = function (path) {
      return $location.path().contains(path);
    };

    $scope.changeLang = function (lang) {
      $translate.use(lang);
    }
  }
]);