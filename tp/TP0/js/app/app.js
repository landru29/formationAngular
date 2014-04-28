'use strict';

var zenContactApp = angular.module('zenContactApp', ['ngRoute']);

angular.module('zenContactApp').config(function ($routeProvider) {
  $routeProvider
    .when('/list', {
      templateUrl: 'view/index.html',
      controller: 'ContactListController'
    })
    .when('/edit', {
      templateUrl: 'view/edit.html',
      controller: 'ContactEditController',
      title: 'Insert Contact'
    })
    .when('/edit/:id', {
      templateUrl: 'view/edit.html',
      controller: 'ContactEditController',
      title: 'Edit contact'
    })
    .otherwise({
      redirectTo: '/list'
    });
});