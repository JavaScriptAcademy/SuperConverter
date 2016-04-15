angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
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