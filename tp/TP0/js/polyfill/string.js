'use strict';

(function () {
  if (!String.prototype.contains) {
    String.prototype.contains = function (subStr) {
      return (this.indexOf(subStr) != -1);
    }
  }
})();