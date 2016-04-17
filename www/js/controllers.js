angular.module('app.controllers', ['nvd3', 'app.services'])

.controller('currencyCtrl', function($scope, CurrencyService) {
  $scope.input={
    fromname : '',
    toname : '',
    fromvalue : 0,
    tovalue : 0
  };
  /* Chart options */
  $scope.options = { /* JSON data */ };

  /* Chart data */
  $scope.data = { /* JSON data */ };

  var ratios = CurrencyService.getRatios(setNames);
  var tips = {};

  function setNames(rates){
    ratios = rates;
    $scope.names = Object.keys(rates);
  }

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
    if($scope.input.fromname && $scope.input.toname){

      CurrencyService.getHistoricData($scope.input.fromname, $scope.input.toname, drawChart);

    }
  };


  function getRatio(from, to){

    return  ratios[to] / ratios[from];
  }

  function drawChart(data){
    
    var key = $scope.input.fromname + $scope.input.toname; 
    $scope.data = [{values: data.sort(sortBy("x")), key: key, color: "blue"}];
    $scope.options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },
                useInteractiveGuideline: false,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Dates',
                    tickFormat: function(d){
                        return d3.time.format('%x')(new Date(d));
                    },
                    rotateLabels: 10,
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Rates',
                    tickFormat: function(d){
                        return d3.format('.06f')(d);
                    },
                    axisLabelDistance: -10
                },  
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            },
            title: {
                enable: true,
                text: 'Title for Line Chart'
            },
            subtitle: {
                enable: true,
                text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
                css: {
                    'text-align': 'center',
                    'margin': '10px 13px 0px 7px'
                }
            },
            caption: {
                enable: true,
                html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
                css: {
                    'text-align': 'justify',
                    'margin': '10px 13px 0px 7px'
                }
            }
        };
    
  }

  function sortBy(prop){
     return function(a,b){
        if( a[prop] > b[prop]){
            return 1;
        }else if( a[prop] < b[prop] ){
            return -1;
        }
        return 0;
     }
  }

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
