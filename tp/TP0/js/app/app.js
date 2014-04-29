'use strict';

angular.module('zenContactApp', [
  'ngRoute', 'zenContactServices', 'pascalprecht.translate', 'zenContactFilter', 'ui.unique', 'zenContactDirectives'
]);

angular.module('zenContactApp').config(['$routeProvider', '$translateProvider',
  function ($routeProvider, $translateProvider) {
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

    $translateProvider.useStaticFilesLoader({
      prefix: '/languages/',
      suffix: '.json'
    });

    //$translateProvider.userUrlLoader('/rest/l10n');
    // will request /rest/l10n?lang=en

    $translateProvider.preferredLanguage('en');
  }
]);