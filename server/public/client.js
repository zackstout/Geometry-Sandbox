
var app = angular.module('app', ['ngRoute']);


app.config(function($routeProvider) {
  $routeProvider.when('/parabola', {
    templateUrl: 'templates/parabola.html',
    controller: 'ParabolaController as pc'
  }).when('/ellipse', {
    templateUrl: 'templates/ellipse.html',
    controller: 'EllipseController as ec'
  }).when('/matrix', {
    templateUrl: 'templates/matrix.html',
    controller: 'MatrixController as sc'
  }).when('/ellipse_shifter', {
    templateUrl: 'templates/ellipse_shifter.html',
    controller: 'EllipseShifterController as esc'
  }).when('/parab_shooter', {
    templateUrl: 'templates/parab_shooter.html',
    controller: 'ParabShooterController as psc'
  }).when('/parab_shifter', {
    templateUrl: 'templates/parab_shifter.html',
    controller: 'ParabShifterController as psc'
  });
});
