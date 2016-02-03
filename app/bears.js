angular
  .module('bears', ['ngResource'])

  .factory('bears', ['$resource', function ($resource) {
    return $resource('/api/bears/:bearId', {bearId: '@id'});
  }])

  .controller('BearListCtrl', ['$scope', 'bears',
      function ($scope, bears) {
        $scope.bears = [];
      }])

  .controller('BearDetailCtrl', ['$scope', 'bears',
    function ($scope, bears) {
      $scope.bear = {};
    }]);
