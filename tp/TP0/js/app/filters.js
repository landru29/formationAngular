'use strict';

angular.module('zenContactFilter', []);

angular.module('zenContactFilter').filter('fuzzyFilter', ['$filter',
  function ($filter) {
    return function (contacts, search) {
      if (('undefined' === typeof search) || ('' == search.trim())) {
        return contacts;
      }
      var fuse = new Fuse(contacts, {
        threshold: 0.5,
        keys: ['lastName', 'firstName']
      });
      return $filter('unique')(fuse.search(search), '[id]');
    };

  }
]);