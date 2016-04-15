angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.factory('CurrencyService',['$http',function($http){
  return {
    getRatios: function(callback){
      $http({
          method: 'GET',
          url: 'http://api.fixer.io/latest'
        }).then(function successCallback(response) {

            var rates = response.data.rates;
            rates.EUR = 1;

            callback(rates);
           /* return rates;*/
            // this callback will be called asynchronously
            // when the response is available
          }, function errorCallback(response) {
            return 'request error';
            // called asynchronously if an error occurs
            // or server returns response with an error status.
      });
    }
  }
}]);

