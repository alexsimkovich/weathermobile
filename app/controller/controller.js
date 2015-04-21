weatherApp.controller('forecastController', function ($scope, $http) {
    weatherList = [];
    $scope.getPosition = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.sendPosition);
        } else {
            alert('not supported');
        }
    };

    $scope.sendPosition = function (position) {
        $scope.lat = position.coords.latitude;
        $scope.lon = position.coords.longitude;

        $http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + $scope.lat + '&lon=' + $scope.lon + '&APPID=7b94b6edc475a0bb2bee8da350a7fcf2').success(function (data) {
            $scope.city = data.name;

            var date1 = new Date(data.sys.sunrise * 1000);
            var date2 = new Date(data.sys.sunset * 1000);
            var hoursSunrise = date1.getHours();
            var minutesSunrise = "0" + date1.getMinutes();
            var hoursSunset = date2.getHours();
            var minutesSunset = "0" + date2.getMinutes();
            var sunriseTime = hoursSunrise + ':' + minutesSunrise.substr(minutesSunrise.length - 2);
            var sunsetTime = hoursSunset + ':' + minutesSunset.substr(minutesSunset.length - 2);
            $scope.sunrise = sunriseTime;
            $scope.sunset = sunsetTime;
        });

        $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?lat='+ $scope.lat +'&lon='+ $scope.lon +'&cnt=7&mode=json&APPID=7b94b6edc475a0bb2bee8da350a7fcf2').success(function (response) {
            $scope.weatherList = response.list;
            $scope.temp_min = response.list[0].temp.min;
            $scope.temp_max = response.list[0].temp.max;
            $scope.id = response.list[0].weather['0'].id;
            $scope.icon = response.list[0].weather['0'].icon;
            $scope.mainweather = response.list[0].weather[0].main;
            $scope.weatherdesc = response.list[0].weather[0].description;
        });
    };

    $scope.getPosition();
});
