weatherApp.controller('weatherController', function ($scope, $http, geoIP) {
  $scope.weathers = [];
  $scope.home = [];

  geoIP.success(function(data) {
    $scope.home = data;
    $http.get('http://api.openweathermap.org/data/2.5/weather?q='+$scope.home.city+','+$scope.home.country_code+'').success(function (response) {
      $scope.weathers = response;
      //console.log(response);
      $scope.city = response.name;
      $scope.temp_min = Math.round(response.main['temp_min'] - 273.15);
      $scope.temp_max = Math.round(response.main['temp_max'] - 273.15);
    });
  });
});