export default ngModule => {
  require('./day.scss');

  ngModule.directive('singleDay', function singleDay($uibModal, DateService, BookAPIService) {
    return {
      template: require('./day.jade'),
      scope: {},
      bindToController: {
        day: '=',
      },
      controllerAs: 'day',
      controller: function dayCtrl() {
        const moment = require('moment');
        this.DateService = DateService;
        this.isPastDate = () => {
          return moment(`${this.DateService.activeYear}-${this.DateService.activeMonthNum}-${this.day}`).isBefore(`${this.DateService.currentYear}-${this.DateService.currentMonthNum}-${this.DateService.todayNum}`);
        };
        this.isToday = () => {
          return moment(`${this.DateService.activeYear}-${this.DateService.activeMonthNum}-${this.day}`).isSame(`${this.DateService.currentYear}-${this.DateService.currentMonthNum}-${this.DateService.todayNum}`);
        };
      },
    };
  });
};
