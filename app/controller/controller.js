weatherApp.controller('weatherController', function ($scope, $http, geoIP) {
  $scope.weathers = [];
  $scope.home = [];

  geoIP.success(function(data) {
    $scope.home = data;
    $http.get('http://api.openweathermap.org/data/2.5/weather?q='+$scope.home.city+','+$scope.home.country_code+'&APPID=7b94b6edc475a0bb2bee8da350a7fcf2').success(function (response) {
      $scope.weathers = response;
      //console.log(response);
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

weatherApp.controller('forecastController', function ($scope, $http, geoIP) {
  geoIP.success(function(data) {
    $scope.home = data;
    $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q='+$scope.home.city+'&units=metric&cnt=7&APPID=7b94b6edc475a0bb2bee8da350a7fcf2').success(function (response) {
      $scope.forecast = response;
      console.log(response);
      /*Getting week dates*/
      /*var curr = new Date; // get current date
      var first = curr.getDate() - curr.getDay();//to set first day on monday, not on sunday, first+1 :

      var firstday = (new Date(curr.setDate(first+1))).toString();

      for (var i = 1; i < 8; i++) {
        var next = new Date(curr.getTime());
        next.setDate(first + i);
        var goodDate = next.toString().substr(0, 10);
        var dateArray = goodDate.split(' ');
        var perfectDate = dateArray[0] + ', ' + dateArray[1] + ' ' + dateArray[2];
        console.log(perfectDate);
      }*/



     /* $scope.temp_min = Math.round(response.list[0].temp['min'] - 273.15);
      $scope.temp_max = Math.round(response.list[0].temp['max'] - 273.15);*/
      /*Convert unix time to time*/
      $scope.time = function(time, unixtime) {
        var unixtime = response.list[0].dt*1000; // in miliseconds
        var a = new Date(unixtime);
        var date = a.getDate();
        //var dayweek = a.getDay();
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var month = months[a.getMonth()];
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var dayOfWeek = days[a.getDay()];
        var time = dayOfWeek + ', ' + month + ' ' + date;
        return time;
      }

      /*$scope.mainweather = response.weather[0].main;
      $scope.weatherdesc = response.weather[0].description;*/
    });
  });
});