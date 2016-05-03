export default ngModule => {
  ngModule.service('PhotoAPIService', ($http) => {
    const service = {
      allPhotos: () => {
        return $http({
          method: 'get',
          url: `https://spreadsheets.google.com/feeds/list/1oojR3DLLsh6qOmn5Nm_Xl7yzSiPBAaFpccsx8E6Ez-8/od6/public/values?alt=json`,
        });
      },
    };
    return service;
  });
};
