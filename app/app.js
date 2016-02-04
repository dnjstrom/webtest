angular
  .module("app", [
    'ngRoute',
    'bears'
  ])

  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/bears', {
        templateUrl: 'bears/list.html',
        controller: 'BearListCtrl'
      })
      .when('/bears/create', {
        templateUrl: 'bears/edit.html',
        controller: 'BearEditCtrl'
      })
      .when('/bears/:id', {
        templateUrl: 'bears/detail.html',
        controller: 'BearDetailCtrl'
      })
      .when('/bears/:id/edit', {
        templateUrl: 'bears/edit.html',
        controller: 'BearEditCtrl'
      })
      .otherwise({
        redirectTo: '/404'
      });

      $locationProvider.html5Mode(true);
  }])

  .controller("AppCtrl", ($scope) => {
    $scope.author = "Daniel Ström";
  });

