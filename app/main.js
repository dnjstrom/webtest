angular
  .module("app", [
    'ngRoute',
    'bears'
  ])

  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('bears', {
        templateUrl: 'bears/list.html',
        controller: 'BearListCtrl'
      })
      .when('bears/:bearId', {
        templateUrl: 'bears/detail.html',
        controller: 'BearDetailCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode(true);
  }])

  .controller("AppCtrl", ($scope) => {
    $scope.author = "Daniel Ström";
  });

