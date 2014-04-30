'use strict';

var zenContactServices = angular.module('zenContactServices', ['ngResource']);


zenContactServices.factory('Contact', ['$resource',
  function ($resource) {
    return $resource('/rest/contacts/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT',
        params: {
          id: '@id'
        }
      }
    });
  }
]);

zenContactServices.factory('contactService', ['Contact', 'userService',

  function (Contact, userService) {

    return {
      getAllContacts: function () {
        return Contact.query();
      },

      getContactById: function (id) {
        return Contact.get({
          id: id
        });
      },

      saveContact: function (contact) {
        if ('undefined' === typeof contact.id) {
          return Contact.save(contact);
        } else {
          return Contact.update(contact);
        }
      },

      deleteContact: function (contact) {
        return Contact.delete({
          id: contact.id
        }).$promise;
      }
    };
  }
]);

zenContactServices.service('userService', ['$cookieStore',

  function ($cookieStore) {

    return {
      isConnected: function () {
        if ($cookieStore.get('token')) {
          return true;
        } else {
          return false;
        }
      },

      disconnect: function () {
        $cookieStore.remove('token');
      },

      connect: function (token) {
        $cookieStore.set('token', token);
      },

      getToken: function () {
        return $cookieStore.get('token');
      }
    }
  }
]);