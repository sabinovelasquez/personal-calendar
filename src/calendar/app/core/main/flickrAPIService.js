export default ngModule => {
  ngModule.service('FlickrAPIService', function FlickrAPIService($http) {
    this.getCover = (id) => {
      return $http({
        method: 'get',
        url: `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=6d578cf191cfbff7d715f5ee286784b8&photo_id=${id}&format=json&nojsoncallback=1`,
      });
    };
    this.getAlbum = (id) => {
      return $http({
        method: 'get',
        url: `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&photoset_id=${id}&per_page=50&page=1&api_key=6d578cf191cfbff7d715f5ee286784b8&format=json&nojsoncallback=1`,
      });
    };
  });
};
