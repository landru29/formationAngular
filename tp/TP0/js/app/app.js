'use strict';

angular.module('zenContactApp', [
  'ngRoute',
  'zenContactServices',
  'pascalprecht.translate',
  'zenContactFilter',
  'ui.unique',
  'zenContactDirectives',
  'ngCookies'
]);

angular.module('zenContactApp').config(['$routeProvider', '$translateProvider', '$httpProvider',
  function ($routeProvider, $translateProvider, $httpProvider) {
    $routeProvider
      .when('/list', {
        templateUrl: 'view/index.html',
        controller: 'ContactListController'
      })
      .when('/login', {
        templateUrl: 'view/login.html',
        controller: 'LoginController'
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

    $httpProvider.interceptors.push(['$q', '$cookieStore', '$location', 'userService',
      function ($q, $cookieStore, $location, userService) {
        var originRequest;
        return {
          responseError: function (rejection) {
            originRequest = $location.path();
            $location.path('/login');
            return $q.reject(rejection);
          },
          response: function (response) {
            //debugger;
            console.log($location.path());
            var token = response.headers('Auth-Token');
            if (token) {
              $cookieStore.put('token', token);
            }
            if ((response.config.url.match(/^\/rest\/login\/.*$/)) && (originRequest)) {
              $location.path(originRequest);
            }
            return $q.when(response);
          },
          request: function (config) {
            config.headers['Auth-Token'] = userService.getToken();
            return config || $q.when(config);
          }
        }
      }
    ]);
  }
]);


angular.module('zenContactApp').run(['$rootScope', 'userService',
  function ($rootScope, userService) {
    $rootScope.isConnected = function () {
      return userService.isConnected();
    }
  }
]);