export default ngModule => {
  require('./week.scss');

  ngModule.directive('singleWeek', function singleWeek() {
    return {
      template: require('./week.jade'),
      scope: {},
      bindToController: {
        weekly: '=',
      },
      controllerAs: 'weekly',
      controller: function weekCtrl() {
        // this.currentW = this.week;
        // console.log(this.currentW);
      },
    };
  });
};
