export default ngModule => {
  ngModule.service('WeatherAPIService', ($http) => {
    const service = {
      getWeather: () => {
        return $http({
          method: 'get',
          url: `http://api.apixu.com/v1/forecast.json?key=6a9b5cfdfb6a4b7aa2e154423160905&q=Santiago`,
        });
      },
    };
    return service;
  });
};