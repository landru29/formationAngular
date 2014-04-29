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

angular.module('zenContactDirectives').directive('autoPopup', ['$http',
  function ($http) {
    return {
      restrict: 'A',
      link: function (scope, element, attributes) {
        element.click(function () {
          console.log('coucou');
          $http({
            method: 'GET',
            url: 'view/about.html'
          }).success(function (data) {
            $(data).modal('show');
          });
        });
      }
    };
  }
]);

angular.module('zenContactDirectives').directive('markdown', ['$sce',

  function ($sce) {
    return {
      restrict: 'A',
      template: '<div class="control-group"><label class="control-label">Markdown</label><div class="controls"><div style="background:white" ng-bind-html="outputMarkdown"></div></div></div>',
      link: function (scope, element, attributes) {
        scope.$watch(attributes.markdown, function (value) {
          scope.outputMarkdown = $sce.trustAsHtml(markdown.toHTML(('undefined' === typeof value) ? '' : value));
        });
      }
    };
  }
]);