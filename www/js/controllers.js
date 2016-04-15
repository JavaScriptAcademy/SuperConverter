angular.module('app.controllers', [])

.controller('currencyCtrl', function($scope) {

})

.controller('lengthCtrl', function($scope) {

  $scope.input={
    fromname : '',
    toname : '',
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

  var tips = {
    meter : "The metre, or meter (American spelling), (from the Greek noun μέτρον, \"measure\") is the base unit of length in the International System of Units (SI). he metre was originally defined in 1793 as one ten-millionth of the distance from the equator to the North Pole. In 1889, it was redefined in terms of a prototype metre bar (the actual bar used was subsequently changed twice).",
    km : "The kilometre (International spelling as used by the International Bureau of Weights and Measures; SI symbol: km; /ˈkɪləmiːtər/ or /kɪˈlɒmɪtər/) or kilometer (American spelling) is a unit of length in the metric system, equal to one thousand metres (kilo- being the SI prefix for 1000). It is now the measurement unit used officially for expressing distances between geographical places on land in most of the world; notable exceptions are the United States and the road network of the United Kingdom where the statute mile is the official unit used.",
    mile : "The mile is an English unit of length equal to 1,760 yards and standardised as exactly 1,609.344 metres by international agreement in 1959. With qualifiers, \"mile\" is also used to describe or translate a wide range of units derived from or roughly equivalent to the Roman mile, such as the nautical mile (now 1.852 km exactly), the Italian mile (roughly 1.852 km), and the Chinese mile (now 500 m exactly). The Romans divided their mile into 5,000 feet but the greater importance of furlongs in pre-modern England meant that the statute mile was made equivalent to 5,280 feet or 1,760 yards in 1593. ",
    yard : "The yard (abbreviation: yd) is an English unit of length, in both the British imperial and US customary systems of measurement, that comprises 3 feet or 36 inches. It is by international agreement in 1959 standardized as exactly 0.9144 meters. A metal yardstick originally formed the physical standard from which all other units of length were officially derived in both English systems.",
    feet : "A foot (pl. feet; abbreviation: ft; symbol: ′, the prime symbol) is a unit of length in the imperial and US customary systems of measurement. Since 1959, both units have been defined by international agreement as equivalent to 0.3048 meters exactly. In both systems, the foot comprises 12 inches and three feet compose a yard.",
    inch : "An inch (plural: inches; abbreviation or symbol: in or ″ – a double prime) is a unit of length in the imperial and United States customary systems of measurement. Historically an inch was also used in a number of other systems of units. Traditional standards for the exact length of an inch have varied in the past, but since July 1959 when the international yard was defined as 0.9144 metres, the international inch has been exactly 25.4 mm. There are 12 inches in a foot and 36 inches in a yard."
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

.controller('weightCtrl', function($scope) {



})

.controller('temperatureCtrl', function($scope) {

})

