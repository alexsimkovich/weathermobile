weatherApp.factory('geoIP', function ($http) {
  return $http.get('https://freegeoip.net/json/');
});