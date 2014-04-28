'use strict';

var zenContactServices = angular.module('zenContactServices', []);


zenContactServices.factory('contactService', function () {
  var service = {
    contacts: [{
      "id": 0,
      "lastName": "Wayne",
      "firstName": "Bruce",
      "address": "Gotham city",
      "phone": "555-BATMAN"
    }, {
      "id": 1,
      "lastName": "Parker",
      "firstName": "Peter",
      "address": "New York",
      "phone": "555-SPDRMN"
    }, {
      "id": 2,
      "lastName": "Storm",
      "firstName": "Jane",
      "address": "Baxter building, New York",
      "phone": "555-INVGRL"
    }, {
      "id": 3,
      "lastName": "Richards",
      "firstName": "Red",
      "address": "Baxter building, New York",
      "phone": "555-MRFANT"
    }, {
      "id": 4,
      "lastName": "Storm",
      "firstName": "Johnny",
      "address": "Baxter building, New York",
      "phone": "555-TORCH"
    }, {
      "id": 5,
      "lastName": "Grimm",
      "firstName": "Benjamin",
      "address": "Baxter building, New York",
      "phone": "555-THING"
    }, {
      "id": 6,
      "lastName": "Murdock",
      "firstName": "Matt",
      "address": "San Francisco",
      "phone": "555-DARDVL"
    }, {
      "id": 7,
      "lastName": "Stark",
      "firstName": "Tony",
      "address": "Stark tower, New York",
      "phone": "555-IRNMAN"
    }],

    getAllContacts: function () {
      return this.contacts;
    },

    getContactById: function (id) {
      for (var index in this.contacts) {
        if (this.contacts[index].id == id) {
          return this.contacts[index];
        }
      }
      return null;
    },

    saveContact: function (contact) {
      for (var index in this.contacts) {
        if (this.contacts[index].id == contact.id) {
          var indexToSave = index;
        }
      }

      if ('undefined' === typeof indexToSave) {
        this.contacts.push(JSON.parse(JSON.stringify(contact)));
      } else {
        this.contacts[indexToSave] = JSON.parse(JSON.stringify(contact));
      }
    }
  };

  return service;
});