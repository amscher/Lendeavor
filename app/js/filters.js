'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('filterByCapital', function() {
    return function(array, size) {
      if (size == "" || size == "I don't know") return array;
      var filteredTypes = [];
      array.forEach(function(type) {
        if (type.aspects.capitalNeedsSize == "" || type.aspects.capitalNeedsSize == size) {
          filteredTypes.push(type);
        }
      });
      return filteredTypes;
    };
  }).
  filter('filterByCredit', function() {
    return function(array, score) {
      if (score == "" || score == "I don't know") return array;
      var filteredTypes = [];
      array.forEach(function(type) {
        if (type.aspects.credit == "" || type.aspects.credit == score) {
          filteredTypes.push(type);
        }
      });
      return filteredTypes;
    };
  }).
  filter('filterByTerm', function() {
    return function(array, term) {
      if (term == "" || term == "I don't know") return array;
      var filteredTypes = [];
      array.forEach(function(type) {
        if (type.aspects.term == "" || type.aspects.term == term) {
          console.log(type.title + ": term = " + type.aspects.term)
          filteredTypes.push(type);
        }
      });
      return filteredTypes;
    };
  });
