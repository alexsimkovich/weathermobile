weatherApp.controller('weatherController', function($scope, $http){
    $scope.weathers = [];
    $http.get('http://api.openweathermap.org/data/2.5/weather?q=London,uk').success(function(response) {
        $scope.weathers = response;
        console.log(response);
        $scope.city = response.name;
        /*$scope.temp_min = (response.main['temp_min'] - 32) * 5/9;*/
        $scope.temp_min = Math.round(response.main['temp_min'] - 273.15);
        $scope.temp_max = Math.round(response.main['temp_max'] - 273.15);

    });
});
