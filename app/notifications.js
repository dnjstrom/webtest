angular
  .module('notifications', [])

  .factory('notifier', [function () {
    var notifications = [],
      types = ['error', 'warn', 'info', 'success'],
      notifier = {};

    notifier.notify = function (type, message) {
      console.log(type, ':', message);
      notifications.push({
        type: type,
        message: message
      });
    };

    types.forEach(function (type) {
      notifier[type] = notifier.notify.bind(this, type);
    });

    notifier.clear = function (index) {
      if (typeof index !== 'undefined' && index >= 0 && index < notifications.length) {
        notifications.splice(index, 1);
      } else {
        notifications.length = 0;
      }
    };

    Object.defineProperty(notifier, 'notifications', {
      get: function () { return notifications; }
    });

    return notifier;
  }])

  .directive('notifications', ['notifier', function (notifier) {
    return {
      restrict: 'E',
      scope: true,
      template: '<ul class="notifications"> <li class="notifications__message notifications__message--{{notification.type}}" ng-repeat="notification in notifier.notifications track by $index" ng-click="notifier.clear($index)"><p>{{notification.message}}</p><span class="notifications__message__close">X</span></li></ul>',
      link: function (scope, element, attrs) {
        scope.notifier = notifier;
      }
    };
  }]);
