angular.module('app.routes', [])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('tabsController.currency', {
    url: '/currency',
    views: {
      'tab1': {
        templateUrl: 'templates/currency.html',
        controller: 'currencyCtrl'
      }
    }
  })

  .state('tabsController.length', {
    url: '/length',
    views: {
      'tab5': {
        templateUrl: 'templates/length.html',
        controller: 'lengthCtrl'
      }
    }
  })

  .state('tabsController.weight', {
    url: '/weight',
    views: {
      'tab3': {
        templateUrl: 'templates/weight.html',
        controller: 'weightCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.temperature', {
    url: '/temperature',
    views: {
      'tab2': {
        templateUrl: 'templates/temperature.html',
        controller: 'temperatureCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page1/currency')

});