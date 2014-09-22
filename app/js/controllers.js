'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', function($scope) {

  }])
  .controller('LoanTypesCtrl', ['$scope', '$anchorScroll', '$location',
      'LoanTypes', 'LoanAspects',
      function($scope, $anchorScroll, $location, LoanTypes, LoanAspects) {
    // Initialization.
    $scope.finished = false;
    $scope.selected = [true, false, false];
    $scope.filterChosen = function(index, done) {
      if (index == 2) $scope.finished = true;
    }

    $scope.types = LoanTypes();

    $scope.capitalFilter = "";
    $scope.creditFilter = "";
    $scope.termsFilter = "";

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

   $scope.scrollTo = function(id) {
        // This scrolling function
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

        var startY = currentYPosition();
        var stopY = elmYPosition(id);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }

        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }

        function elmYPosition(id) {
            var elm = document.getElementById(id);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }
   }

  }])
  .controller('BusinessFormPageCtrl', ['$scope', function($scope) {
  	$scope.cost = 1000;
  }]);
