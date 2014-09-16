'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'myApp.factories',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/homepage', {templateUrl: 'partials/homepage.html', controller: 'MyCtrl1'});
  $routeProvider.when('/formpage', {templateUrl: 'partials/formpage.html', controller: 'MyCtrl1'});
  $routeProvider.when('/loantypes', {templateUrl: 'partials/loantypes.html', controller: 'LoanTypesCtrl'});
  $routeProvider.when('/businesspage', {templateUrl: 'partials/business-formpage.html', controller: 'MyCtrl1'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
