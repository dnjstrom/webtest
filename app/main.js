var angular = require('angular');

var app = angular.module("app", []);

app.controller("AppCtrl", ($scope) => {
  $scope.name = "Daniel Ström";
});

