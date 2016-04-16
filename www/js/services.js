'use strict'
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
    },

    getHistoricData: function(from, to/*, callback*/){
      let date = new Date();
      let historyData = {};
      for(let i = 0; i < 30; i++){

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let dateString = year+'-'+month+'-'+day;
        // console.log('this is i: ',i)
        $http({
          method: 'GET',
          url: 'http://api.fixer.io/latest?base='+from+'&symbols='+to+'&date='+dateString
        }).then(function successCallback(response) {
          //console.log('this is i:',i,'this is response',response)
            historyData[dateString] = response.data.rates[to];
            // console.log('this is i:',i)
            if(i == 29){
              // callback(historyData);
              return historyData;
            }

            // this callback will be called asynchronously
            // when the response is available
          }, function errorCallback(response) {
            return 'request error';
            // called asynchronously if an error occurs
            // or server returns response with an error status.
         });
        date = new Date(date.getTime() -　(24*60*60*1000));
      }

    }
  }
}]);

