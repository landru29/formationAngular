'use strict';

angular.module('zenContactApp', ['ngRoute', 'zenContactServices']);

angular.module('zenContactApp').config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider
      .when('/list', {
        templateUrl: 'view/index.html',
        controller: 'ContactListController'
      })
      .when('/edit', {
        templateUrl: 'view/edit.html',
        controller: 'ContactEditController',
        title: 'Insert Contact',
        resolve: {
          LoadedContact: ['Contact',
            function (Contact) {
              return new Contact();
            }
          ]
        }
      })
      .when('/edit/:id', {
        templateUrl: 'view/edit.html',
        controller: 'ContactEditController',
        title: 'Edit contact',
        resolve: {
          LoadedContact: ['Contact', '$route',
            function (Contact, $route) {
              return Contact.get({
                id: $route.current.pathParams.id
              }).$promise;
            }
          ]
        }
      })
      .otherwise({
        redirectTo: '/list'
      });
  }
]);