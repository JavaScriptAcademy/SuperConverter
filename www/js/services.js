angular.module('app.services', [])
.factory('CurrencyService',['$http', '$q', function($http, $q){
  var DAY_TIME_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

  function createPromises($http, period, from, to) {
    var promises = [],
        date = new Date();

    for(var i = 0; i < period; i++) {

      var year = date.getFullYear(),
          month = date.getMonth() + 1,
          day = date.getDate(),
          dateString = year + '-' + month + '-' + day;

      promises.push(createPromise($http, from, to, dateString));

      date = new Date(date.getTime() -　DAY_TIME_IN_MILLISECONDS);
    }

    return promises;
  }

  function createPromise($http, from, to, dateString) {
    return $http({
            method: 'GET',
            url: 'http://api.fixer.io/latest?base=' + from +'&symbols= '+ to + '&date=' + dateString
    });
  }

  return {
    getRatios: function(){
      return $http({
          method: 'GET',
          url: 'http://api.fixer.io/latest'
      });
    },

    getHistoricData: function(period, from, to){
      return $q.all(createPromises($http, period, from, to))
      .then(function(responses) {
          var historyData = [];

          responses.forEach(function(response) {
            var ob = {x : new Date(response.data.date).getTime(), y : response.data.rates[to]};
            historyData.push(ob);
          });

          return historyData;
      });
    }
  }
}]);
