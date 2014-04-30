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



angular.module('zenContactDirectives').directive('zenRepeat', ['$parse',
  function ($parse) {
    return {
      restrict: 'A',
      transclude: 'element',
      link: function (scope, element, attributes, controller, transclude) {
        var match = (/(\w*)\sin\s([\w\.]*)/i).exec(attributes.zenRepeat);
        var collectionName = match[2];
        var iteree = match[1];
        scope.$watchCollection(collectionName, function (newCollection) {

          // remove all children and scopes from the parent
          angular.forEach(element.parent().children(), function (myElement) {
            // destroy the scope
            angular.element(myElement).scope().$destroy();
            // remove the element
            myElement.remove();
          });

          angular.forEach(newCollection, function (myElement) {
            // Create the scope and append the element data
            var newScope = scope.$new();
            newScope[iteree] = myElement;
            // Clone the dom and add the scope to the parent
            transclude(newScope, function (clone) {
              element.parent().append(clone);
            })
          });

        });
      }
    };
  }
]);