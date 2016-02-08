angular
  .module('bears', ['ngResource', 'ngRoute', 'notifications'])

  .factory('Bear', ['$resource', function ($resource) {
    return $resource('/api/bears/:id', {id: '@_id'}, {
      update: {
        method: 'PUT'
      }
    });
  }])

  .controller('BearListCtrl', ['$scope', '$routeParams', 'Bear',
    function ($scope, $routeParams, Bear) {
      $scope.page = parseInt($routeParams.page) || 1;
      $scope.count = parseInt($routeParams.count) || 100;
      $scope.query = Bear.get({page: $scope.page, count: $scope.count});
    }])

  .controller('BearDetailCtrl', ['$scope', '$routeParams', 'Bear',
    function ($scope, $routeParams, Bear) {
      $scope.bear = Bear.get({id: $routeParams.id});
    }])

  .controller('BearEditCtrl', ['$scope', '$routeParams', '$location', 'notifier', 'Bear',
    function ($scope, $routeParams, $location, notifier, Bear) {
      // Check whether to load an existing bear, or create a new one.
      if ($routeParams.id) {
        $scope.bear = Bear.get({id: $routeParams.id});
      } else {
        $scope.bear = new Bear();
      }

      $scope.save = function (bear) {
        if (bear._id) {
          // This bear already existed.
          bear.$update()
            .then(function (res) {
              $location.path('/bears/' + res._id);
            })
            .catch(function (res) {
              notifier.error('Could not save the bear.');
              ////console.log('Error:', res);
            });
        } else {
          // This bear is new.
          bear.$save()
            .then(function (res) {
              $location.path('/bears/' + res._id);
            })
            .catch(function (res) {
              notifier.error('Could not create the bear.');
              ////console.log('Error:', res);
            });
        }
      }
    }]);
