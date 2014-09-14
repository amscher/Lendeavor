'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', function($scope) {

  }])
  .controller('LoanTypesCtrl', ['$scope', 'LoanTypes', 'LoanAspects', function($scope, LoanTypes, LoanAspects) {
    $scope.types = LoanTypes();

    $scope.capitalFilter = "";
    $scope.creditFilter = "";
    $scope.termsFilter = "";



    $scope.selectType = function(event, dimension, type) {
      dimension.filter = type;

    }

    $scope.select = function(filter, dimension) {
      if (filter == dimension) {
        filter = "";
        return;
      }
      filter = dimension;
    };

    $scope.filterDimensions =
        [{
          "type" : LoanAspects.CapitalValues,
          "prompt" : "How much capital do you need?",
          "filter" : ""
        }, {
          "type" : LoanAspects.CreditValues,
          "prompt" : "How does your credit feel?",
          "filter" : ""
        }, {
          "type" : LoanAspects.TermsValues,
          "prompt" : "What loan terms are you looking for?",
          "filter" : ""
        }];
  }]);
