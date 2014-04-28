'use strict';

zenContactApp.controller('LoginController', ['$scope', '$http', 'authService', function ($scope, $http, authService) {
    $scope.login = function(user) {
        $http.post("/rest/login/" + user).success(function() { authService.maybeRedirect() });
    }
}]);

zenContactApp.controller('ContactListController', ['$scope', 'contactService', 'Contact', function ($scope, contactService, Contact) {
    $scope.contacts = Contact.query();
    
    $scope.nameFilter = function(contact) {
        if(!$scope.search) {
          return true;
        }
        return contact.firstName.match(new RegExp($scope.search, "i")) || contact.lastName.match(new RegExp($scope.search, "i"));
      }

}]);

zenContactApp.controller('ContactEditController', ['$scope', '$http', 'contactService', '$routeParams', '$location', 'Contact', 'authService', function ($scope, $http, contactService, $routeParams, $location, Contact, authService) {
    if ($routeParams.id) {
        $scope.contact = Contact.get({id:$routeParams.id});
    } else {
        $scope.contact = new Contact();
    }

    $scope.saveContact = function (contact) {
        if (contact.id) {
            contact.$update(function(){
                $location.path("/list");
            });
        } else {
            Contact.save(contact, function(){
                $location.path("/list");
            });
        }
    }

    $scope.deleteContact = function (contact) {
        if (angular.isDefined(contact.id)) {
            $http.defaults.headers.delete = { 'Auth-Token' : authService.token() };
            contact.$delete(function(){
                $location.path("/list");
            });
        }
    }
}]);

