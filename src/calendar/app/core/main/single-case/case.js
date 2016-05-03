export default ngModule => {
  require('./case.scss');

  ngModule.directive('singleCase', function singleCase(FlickrAPIService) {
    return {
      template: require('./case.jade'),
      scope: {},
      bindToController: {
        case: '=',
      },
      controllerAs: 'case',
      controller: function singleCaseCtrl() {
        this.name = this.case.gsx$nombre.$t;
        this.description = this.case.gsx$descripcion.$t;
        this.flickrid = this.case.gsx$flickrid.$t;
        this.category = this.case.gsx$categoria.$t;
        this.cover = (id) => {
          FlickrAPIService.getCover(id).then(response => {
            this.coverUrl = response.data.sizes.size[10].source;
          });
        };
        FlickrAPIService
          .getAlbum(this.flickrid)
          .then(response => {
            const coverId = response.data.photoset.photo[0].id;
            this.cover(coverId);
          });
      },
    };
  });
};
