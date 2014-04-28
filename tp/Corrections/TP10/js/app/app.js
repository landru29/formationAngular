'use strict';

var zenContactApp = angular.module('zenContactApp', ['zenContactServices', 'zenContactFilters', 'zenContactDirectives', 'ngRoute', 'ngCookies']);

zenContactApp.config(function ($routeProvider, $httpProvider) {
    $routeProvider.when('/login',           {templateUrl: 'view/login.html',    controller: 'LoginController'});
    $routeProvider.when('/list',            {templateUrl: 'view/list.html',     controller: 'ContactListController'});
    $routeProvider.when('/edit',            {templateUrl: 'view/edit.html',     controller: 'ContactEditController'});
    $routeProvider.when('/edit/:id',        {templateUrl: 'view/edit.html',     controller: 'ContactEditController'});
    $routeProvider.otherwise({redirectTo: '/list'});

    $httpProvider.interceptors.push(function($q, authService){
        return {
            'response': function(response) {
                authService.storeToken(response);
                return response || $q.when(response);
            },
            'responseError': function (rejection) {
                if(rejection.status === 401) {
                    authService.redirectToLogin();
                }
                return $q.reject(rejection);
            }
        }
    });
});

zenContactApp.run(function ($rootScope, $location, authService) {
    $rootScope.location = $location;
    $rootScope.loggedIn = authService.token;
    $rootScope.logout = authService.logout;
});