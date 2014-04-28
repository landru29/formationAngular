'use strict';

var zenContactDirectives = angular.module('zenContactDirectives', []);

zenContactDirectives.directive('autoHeight', function () {
  return function (scope, element, attributes) {
    element.css('overflow', 'auto');

    function changeHeight() {
      var height = window.innerHeight - attributes.autoHeight;
      element.height(height);
    }

    $(window).resize(changeHeight);
    changeHeight();
  };
});

zenContactDirectives.directive('autoPopup', function ($http) {
  var modal = $('<div class="modal hide fade" tabindex="-1"><div class="modal-body"></div></div>');
  var modelContent = modal.find('.modal-body');

  return function (scope, element, attributes) {
    element.click(function () {
      $http.get(attributes.autoPopup).success(function (content) {
        modelContent.html(content);
        modal.modal('show');
      });
    });
  };
});

zenContactDirectives.directive('markdown', function ($sce) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div>' +
      '<textarea ng-model="source"></textarea>' +
      '<div>result : <div ng-bind-html="markdown"></div></div>' +
      '</div>',
    scope: {
      source: '=ngModel'
    },
    link: function (scope, element, attributes) {
      scope.$watch('source', function (newValue) {
        if (newValue) {
          scope.markdown = $sce.trustAsHtml(markdown.toHTML(newValue));
        } else {
          scope.markdown = '';
        }
      });
    }
  };
});