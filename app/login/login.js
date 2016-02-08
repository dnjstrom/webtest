angular
  .module('app.login', [])

  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(['$injector', function ($injector) {
      return $injector.get('AuthInterceptor');
    }]);
  }])

  .factory('AuthInterceptor', ['$q', '$location', function ($q, $location) {
    return {
      responseError: function (response) {

        switch (response.status) {
          // Same logic for all the following codes, using fallthrough.
          case 401:
          case 403:
          case 419:
          case 440:
            $location.path('/login');
            break;
        }

        return $q.reject(response);
      }
    };
  }])

  .controller('LoginCtrl', [ '$scope', function ($scope) {
    var user = {};
  }]);
