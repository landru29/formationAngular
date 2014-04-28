'use strict';

var zenContactServices = angular.module('zenContactServices', []);


zenContactServices.factory('contactService', ['$http',
  function ($http) {
    var service = {

      getAllContacts: function (callback) {
        $http({
          url: '/rest/contacts',
          method: 'GET'
        }).success(function (data) {
          callback(data);
        }).error(function () {
          console.log('error');
        });
      },

      getContactById: function (id, callback) {
        $http({
          url: '/rest/contacts/' + id,
          method: 'GET'
        }).success(function (data) {
          callback(data);
        }).error(function () {
          console.log('error');
        });
      },

      saveContact: function (contact, callback) {
        if ('undefined' === typeof contact.id) {
          $http({
            url: '/rest/contacts/',
            method: 'POST',
            data: contact
          }).success(function (data) {
            callback(data);
          }).error(function () {
            console.log('error');
          });
        } else {
          $http({
            url: '/rest/contacts/' + contact.id,
            method: 'PUT',
            data: contact
          }).success(function (data) {
            callback(data);
          }).error(function () {
            console.log('error during');
          });
        }
      },
    };

    return service;
  }
]);