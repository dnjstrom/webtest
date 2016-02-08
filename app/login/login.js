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

        if (response.status >= 400 && response.status < 500) {
          $location.path('/login');
        }

        return $q.reject(response);
      }
    };
  }])

  .controller('LoginCtrl', [ '$scope', function ($scope) {
    var user = {};
  }]);
