angular
  .module('bears', ['ngResource', 'ngRoute'])

  .factory('Bear', ['$resource', function ($resource) {
    return $resource('/api/bears/:id', {id: '@_id'}, {
      update: {
        method: 'PUT'
      }
    });
  }])

  .controller('BearListCtrl', ['$scope', 'Bear',
    function ($scope, Bear) {
      $scope.bears = Bear.query();
    }])

  .controller('BearDetailCtrl', ['$scope', '$routeParams', 'Bear',
    function ($scope, $routeParams, Bear) {
      $scope.bear = Bear.get({id: $routeParams.id});
    }])

  .controller('BearEditCtrl', ['$scope', '$routeParams', 'Bear',
    function ($scope, $routeParams, Bear) {
      $scope.bear = Bear.get({id: $routeParams.id});
      $scope.save = function () {
        $scope.bear.$update()
          .then(function (res) {
            //console.log('Success:', res);
          })
          .catch(function (res) {
            ////console.log('Error:', res);
          });
      }
    }]);
