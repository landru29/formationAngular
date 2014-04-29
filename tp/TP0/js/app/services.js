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

zenContactServices.factory('contactService', ['Contact',

  function (Contact) {

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
    };
  }
]);