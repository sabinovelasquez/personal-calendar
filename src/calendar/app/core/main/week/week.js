export default ngModule => {
  require('./week.scss');

  ngModule.directive('singleWeek', function singleWeek(BookAPIService) {
    return {
      template: require('./week.jade'),
      scope: {},
      bindToController: {
        weekly: '=',
      },
      controllerAs: 'weekly',
      controller: function weekCtrl() {
        const date = new Date();
        this.month = date.getMonth();
        this.dotw = angular.fromJson(this.weekly);
        this.today = date.getDay();
        this.book = (day) => {
          console.log(day);
        };
        this.BookAPIService = BookAPIService;
      },
    };
  });
};
