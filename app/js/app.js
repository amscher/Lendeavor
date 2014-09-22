'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/homepage', {templateUrl: 'partials/homepage.html', controller: 'MyCtrl1'});
  $routeProvider.when('/formpage', {templateUrl: 'partials/formpage.html', controller: 'MyCtrl1'});
  $routeProvider.when('/lendtypes', {templateUrl: 'partials/lendtypes.html', controller: 'MyCtrl1'});
  $routeProvider.when('/businesspage', {templateUrl: 'partials/business-formpage.html', controller: 'BusinessFormPageCtrl'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
