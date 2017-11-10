
var app = angular.module('app', ['ngRoute']);


app.config(function($routeProvider) {
  $routeProvider.when('/parabola', {
    templateUrl: 'parabola.html',
    controller: 'ParabolaController as pc'
  }).when('/ellipse', {
    templateUrl: 'ellipse.html',
    controller: 'EllipseController as ec'
  }).when('/matrix', {
    templateUrl: 'matrix.html',
    controller: 'MatrixController as sc'
  });
});
