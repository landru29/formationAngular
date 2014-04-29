'use strict';

angular.module('zenContactDirectives', []);

angular.module('zenContactDirectives').directive('autoHeight', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attributes) {
      element.css('height', window.innerHeight - attributes.autoHeight + 'px');
      element.css('overflow', 'auto');
      window.onresize = function () {
        element.css('height', window.innerHeight - attributes.autoHeight + 'px');
        element.css('overflow', 'auto');
      };
    }
  };
});