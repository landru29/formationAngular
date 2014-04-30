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

    $scope.nameFilter = function (contact) {
      if (('undefined' === typeof contact) || ('undefined' === typeof $scope.search) || ('' === $scope.search.trim())) {
        return true;
      }
      var searchRef =
        (('undefined' !== typeof contact.firstName) ? contact.firstName.toLowerCase() : '') +
        (('undefined' !== typeof contact.lastName) ? contact.lastName.toLowerCase() : '');
      return searchRef.trim().match(new RegExp($scope.search.trim(), 'i'));
    };
  }
]);


angular.module('zenContactApp').controller('ContactEditController', [
  '$scope', '$route', '$routeParams', 'contactService', '$location', 'Contact', 'LoadedContact',
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

    $scope.delete = function (contact) {
      contactService.deleteContact(contact).then(function () {
        $location.path('/list');
      });
    };
  }
]);

angular.module('zenContactApp').controller('NavigationController', [
  '$scope', '$location', '$translate', 'userService',

  function ($scope, $location, $translate, userService) {
    $scope.isActive = function (path) {
      return $location.path().contains(path);
    };

    $scope.changeLang = function (lang) {
      $translate.use(lang);
    };

    $scope.logout = function () {
      userService.disconnect();
    }
  }
]);

angular.module('zenContactApp').controller('LoginController', ['$scope', '$location', '$http',

  function ($scope, $location, $http) {
    $scope.backToList = function () {
      $location.path('/list');
    }

    $scope.login = function () {
      $http.post('/rest/login/' + $scope.user.username, {})
        .success(function () {}).error(function () {
          $scope.username = '';
          $scope.password = '';
        });
    }
  }
]);