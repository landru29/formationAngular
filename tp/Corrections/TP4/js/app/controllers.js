'use strict';

zenContactApp.controller('ContactListController', ['$scope', 'contactService', function ($scope, contactService) {
    $scope.contacts = contactService.getAllContacts();
}]);

zenContactApp.controller('ContactEditController', ['$scope', 'contactService', '$routeParams', function ($scope, contactService, $routeParams) {
    if ($routeParams.id) {
        $scope.contact = contactService.getContactById($routeParams.id);
    } else {
        $scope.contact = {};
    }
}]);
