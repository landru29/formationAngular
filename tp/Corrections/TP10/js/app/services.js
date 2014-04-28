'use strict';

var zenContactServices = angular.module('zenContactServices', ['ngResource']);

zenContactServices.service('contactService', function ($http) {
    this.getAllContacts = function (callback) {
        $http.get('/rest/contacts').success(function (contacts) {
            callback(contacts);
        });
    };

    this.getContactById = function (id, callback) {
        $http.get('/rest/contacts/' + id)
            .success(function (contact) {
                callback(contact);
            }).error(function () {
                callback({});
            });
    };

    this.saveContact = function (contact, callback) {
        if (contact.id) {
            $http.put('/rest/contacts/' + contact.id, contact)
                .success(function () {
                    callback(null);
                }).error(function () {
                    callback("Error");
                });
        } else {
            $http.post('/rest/contacts', contact)
                .success(function () {
                    callback(null);
                }).error(function () {
                    callback("Error");
                });
        }
    };
});

zenContactServices.factory('Contact', function($resource) {
    return $resource('/rest/contacts/:id', {id:'@id'}, {update: {method:'PUT', params:{id:'@id'}}});
});

zenContactServices.factory('authService', function($location, $cookieStore) {
    var redirectUrl;
    return {
        maybeRedirect: function(){ $location.path(redirectUrl ? redirectUrl : "/list") },
        logout: function(){ $cookieStore.remove('Auth-Token') },
        token: function(){ return $cookieStore.get('Auth-Token') },
        redirectToLogin: function(){
            redirectUrl = $location.path();
            $location.path('/login');
        },
        storeToken: function(response){
            var token = response.headers('Auth-Token');
            if (token) {
                $cookieStore.put('Auth-Token', token);
            }
        }
    };
});

