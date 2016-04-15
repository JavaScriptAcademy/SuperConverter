angular.module('app.controllers', [])

.controller('currencyCtrl', function($scope) {

})

.controller('lengthCtrl', function($scope) {

})

.controller('weightCtrl', function($scope) {

})

.controller('temperatureCtrl', function($scope) {
  $scope.temperatureOptions = ['CELSIUS', 'FAHENHEIT', 'KELVIN', 'RANKINE', 'REAUMUR'];

  $scope.input={
    fromname : '',
    toname : '',
    fromvalue : 0,
    tovalue : 0
  };

  var ratios = {
    CELSIUS: 1,
    FAHENHEIT: 33.8,
    KELVIN: 274.15,
    RANKINE: 493.47,
    REAUMUR: 0.8
  };

  var tips = {
    CELSIUS: 'Celsius, historically known as centigrade is a scale and unit of measurement for temperature. As an SI derived unit, it is used by most countries in the world. It is named after the Swedish astronomer Anders Celsius (1701–1744), who developed a similar temperature scale. The degree Celsius (°C) can refer to a specific temperature on the Celsius scale as well as a unit to indicate a temperature interval, a difference between two temperatures or an uncertainty. Before being renamed to honour Anders Celsius in 1948, the unit was called centigrade, from the Latin centum, which means 100, and gradus, which means steps.',
    FAHENHEIT: 'Fahrenheit is a temperature scale based on one proposed in 1724 by the German physicist Daniel Gabriel Fahrenheit (1686–1736), after whom the scale is named. It uses the degree Fahrenheit (symbol °F) as the unit. There exist several accounts of how he originally defined his scale. The lower defining point, 0 degrees, was established as the temperature of a solution of brine made from equal parts of ice and salt. Further limits were established as the melting point of ice (32 degrees) and his best estimate of the average human body temperature (96 degrees, about 2.5 degrees less than modern measurements).',
    KELVIN: 'The kelvin is a unit of measure for temperature based upon an absolute scale. It is one of the seven base units in the International System of Units (SI) and is assigned the unit symbol K.',
    RANKINE: 'Rankine is a thermodynamic temperature based on an absolute scale named after the Glasgow University engineer and physicist William John Macquorn Rankine, who proposed it in 1859.',
    REAUMUR: 'The Réaumur scale French: [ʁe.o.myːʁ] (°Ré, °Re, °R), also known as the "octogesimal division",is a temperature scale in which the freezing and boiling points of water are set to 0 and 80 degrees respectively. The scale is named after René Antoine Ferchault de Réaumur, who first proposed a similar scale in 1730.'

  };

  $scope.names = Object.keys(ratios);

  $scope.convert = function(){
    var ratio = getRatio($scope.input.fromname, $scope.input.toname);
    $scope.input.tovalue = ratio * $scope.input.fromvalue;
  };

  $scope.switch = function(){
    var temp = $scope.input.fromname;
    $scope.input.fromname = $scope.input.toname;
    $scope.input.toname = temp;
    var ratio = getRatio($scope.input.fromname, $scope.input.toname);
    $scope.input.tovalue = ratio * $scope.input.fromvalue;
    $scope.tip = tips[$scope.input.fromname];
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
