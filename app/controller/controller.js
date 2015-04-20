weatherApp.controller('weatherController', function ($scope, $http, geoIP) {
  $scope.weathers = [];
  $scope.home = [];

  geoIP.success(function(data) {
    $scope.home = data;
    $http.get('http://api.openweathermap.org/data/2.5/weather?q='+$scope.home.city+','+$scope.home.country_code+'&APPID=7b94b6edc475a0bb2bee8da350a7fcf2').success(function (response) {
      $scope.weathers = response;
      console.log(response);
      $scope.city = response.name;
      $scope.temp_min = Math.round(response.main['temp_min'] - 273.15);
      $scope.temp_max = Math.round(response.main['temp_max'] - 273.15);
      /*Convert unix time to time*/
      var date1 = new Date(response.sys.sunrise*1000);
      var date2 = new Date(response.sys.sunset*1000);
      var hoursSunrise = date1.getHours();
      var minutesSunrise = "0" + date1.getMinutes();
      var hoursSunset = date2.getHours();
      var minutesSunset = "0" + date2.getMinutes();
      var sunriseTime = hoursSunrise + ':' + minutesSunrise.substr(minutesSunrise.length-2);
      var sunsetTime = hoursSunset + ':' + minutesSunset.substr(minutesSunset.length-2);
      $scope.sunrise = sunriseTime;
      $scope.sunset = sunsetTime;
      $scope.mainweather = response.weather[0].main;
      $scope.weatherdesc = response.weather[0].description;
    });
  });
});