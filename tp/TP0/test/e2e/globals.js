'use strict';

exports.countContacts = function () {
  var items = element.all(by.css('div.well ul.unstyled li'));
  return items.count();
}