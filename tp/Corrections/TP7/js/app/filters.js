'use strict';

var zenContactFilters = angular.module('zenContactFilters', ['ui.unique']);

zenContactFilters.filter('fuzzyFilter', function () {
  return function (contacts, search, threshold) {
    if (!search) {
      return contacts;
    }

    var fuse = new Fuse(contacts, {
    	keys: ['firstName', 'lastName'],
      	threshold: threshold
    });
    
    return fuse.search(search);
  }
});




