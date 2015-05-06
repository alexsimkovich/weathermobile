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

weatherApp.controller('chartController', ['$scope','$http','$filter', function ($scope, $http, $filter) {
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

        var hourlyUrl = 'https://api.forecast.io/forecast/fc1cdc0262c76a0691d8c292d5c91b49/' + $scope.lat + ',' + $scope.lon + '?callback=JSON_CALLBACK';
        $http.jsonp(hourlyUrl).success(function (hourdata) {
            $scope.hourdata = hourdata.hourly.data;
            //console.log($scope.hourdata);

            var labels = [];
            var data = [];
            angular.forEach($scope.hourdata, function(value, key){
                if ((key % 2 == 0) && (key < 24)) {
                    labels.push($filter('date')( value.time*1000, 'HH:mm'));
                    data.push((value.temperature-30)/2);
                }

            }, labels, data);

            $scope.labels = labels;
            $scope.data = [data];
            $scope.series = ['Hourly temperature'];
            $scope.options = {
                scaleGridLineWidth : 0,
                scaleShowGridLines : false,
                scaleGridLineColor : "rgba(0,0,0,.6)",
                //Boolean - Whether to show horizontal lines (except X axis)
                scaleShowHorizontalLines: false,

                //Boolean - Whether to show vertical lines (except Y axis)
                scaleShowVerticalLines: false
                };
            console.log($scope.options);



            Chart.defaults.global.scaleFontColor = "#fff";
            Chart.defaults.global.responsive = true;
            Chart.defaults.global.scaleFontFamily = "'Roboto', sans-serif";
            Chart.defaults.global.tooltipTitleFontFamily = "'Roboto', sans-serif";
            Chart.defaults.global.scaleLineColor = "rgba(255,255,255,.9)";
            Chart.defaults.global.colours[0] = "#FFFFFF";
        });
    };

    $scope.getPosition();

}]);