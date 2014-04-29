'use strict';

var zenContactServices = angular.module('zenContactServices', ['ngResource']);


zenContactServices.factory('contactService', ['$http', '$resource',

  function ($http, $resource) {
    var Contact = $resource('/rest/contacts/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT',
        params: {
          id: '@id'
        }
      }
    });
    var service = {

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
    };

    return service;
  }
]);