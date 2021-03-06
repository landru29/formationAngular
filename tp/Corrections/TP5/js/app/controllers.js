'use strict';

zenContactApp.controller('ContactListController', ['$scope', 'contactService', function ($scope, contactService) {
    $scope.contacts = contactService.getAllContacts();
}]);

zenContactApp.controller('ContactEditController', ['$scope', 'contactService', '$routeParams', '$location', function ($scope, contactService, $routeParams, $location) {
    if ($routeParams.id) {
        $scope.contact = contactService.getContactById($routeParams.id);
    } else {
        $scope.contact = {};
    }
    $scope.saveContact = function(contact) {
        contactService.saveContact(contact);
        $location.path("/list");
    }
}]);
