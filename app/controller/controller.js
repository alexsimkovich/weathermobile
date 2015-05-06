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
        var url1 = 'https://api.forecast.io/forecast/fc1cdc0262c76a0691d8c292d5c91b49/'+$scope.lat+','+$scope.lon+'&callback=JSON_CALLBACK';
        $http.jsonp(url1).success(function (data) {
            console.log(data);
            $scope.city = data.name;
        });

        var cityUrl = 'http://api.openweathermap.org/data/2.5/find?lat=' + $scope.lat + '&lon=' + $scope.lon + '&cnt=5&callback=JSON_CALLBACK';
        $http.jsonp(cityUrl).success(function (rsp) {
          $scope.rsp = rsp.list;
        });

        var dailyUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + $scope.lat + '&lon=' + $scope.lon + '&mode=json&callback=JSON_CALLBACK';
        $http.jsonp(dailyUrl).success(function (data) {
            $scope.dailyRsp = data;
        });

        var forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat='+ $scope.lat +'&lon='+ $scope.lon +'&cnt=7&mode=json&callback=JSON_CALLBACK';
        $http.jsonp(forecastUrl).success(function (response) {
            $scope.forecastRsp = response.list;
        });
    };

    $scope.getPosition();
});
