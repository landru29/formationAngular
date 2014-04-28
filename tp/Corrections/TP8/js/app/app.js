'use strict';

var zenContactApp = angular.module('zenContactApp', ['zenContactServices', 'zenContactFilters', 'zenContactDirectives', 'ngRoute']);

zenContactApp.config(function ($routeProvider) {
    $routeProvider.when('/login',           {templateUrl: 'view/login.html',    controller: 'LoginController'});
    $routeProvider.when('/list',            {templateUrl: 'view/list.html',     controller: 'ContactListController'});
    $routeProvider.when('/edit',            {templateUrl: 'view/edit.html',     controller: 'ContactEditController'});
    $routeProvider.when('/edit/:id',        {templateUrl: 'view/edit.html',     controller: 'ContactEditController'});
    $routeProvider.otherwise({redirectTo: '/list'});
});

zenContactApp.run(function ($rootScope, $location) {
    $rootScope.location = $location;
});
