angular.module('app.controllers', [])
  
.controller('currencyCtrl', function($scope) {

})
   
.controller('lengthCtrl', function($scope) {

})
   
.controller('weightCtrl', function($scope) {
	$scope.input={
    fromname : '',
    toname : '',
    fromvalue : 0,
    tovalue : 0
  };

  var ratios = {
  	g : 1,
  	kg : 0.001,
  	pound: 0.00220462,
  	ounce : 0.035274,
  	ton : 0.00001,
  };

  $scope.names = Object.keys(ratios);

  $scope.switch = function(){
    var temp = $scope.input.fromname;
    $scope.input.fromname = $scope.input.toname;
    $scope.input.toname = temp;
    var ratio = getRatio($scope.input.fromname, $scope.input.toname);
    $scope.input.tovalue = ratio * $scope.input.fromvalue;
  };

  $scope.convert = function(){
    var ratio = getRatio($scope.input.fromname, $scope.input.toname);
    $scope.input.tovalue = ratio * $scope.input.fromvalue;
  };

   $scope.convertAndShow = function(){
    var ratio = getRatio($scope.input.fromname, $scope.input.toname);
    $scope.input.tovalue = ratio * $scope.input.fromvalue;
    $scope.tip = tips[$scope.input.fromname];
  };

  function getRatio(from, to){

    return  ratios[to] / ratios[from];
  }

})
      
.controller('temperatureCtrl', function($scope) {

})
 