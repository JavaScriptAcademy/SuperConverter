angular.module('app.controllers', [])

.controller('currencyCtrl', function($scope) {

})

.controller('lengthCtrl', function($scope) {

  $scope.input={
    fromLength : 'meter',
    toLength : 'km',
    fromvalue : 0,
    tovalue : 0
  };

  var ratios = {
    meter : 1,
    km : 0.001,
    inch : 39.3700787,
    yard : 1.0936133,
    feet : 3.2808399,
    mile : 0.0006214
  };

  $scope.switch = function(){
    let temp = $scope.input.fromLength;
    $scope.input.fromLength = $scope.input.toLength;
    $scope.input.toLength = temp;
    var ratio = getRatio($scope.input.fromLength, $scope.input.toLength);
    $scope.input.tovalue = ratio * $scope.input.fromvalue;
  };

  $scope.convert = function(){
    var ratio = getRatio($scope.input.fromLength, $scope.input.toLength);
    $scope.input.tovalue = ratio * $scope.input.fromvalue;
  };

  function getRatio(from, to){

    return  ratios[to] / ratios[from];
  }

})

.controller('weightCtrl', function($scope) {

})

.controller('temperatureCtrl', function($scope) {

})

