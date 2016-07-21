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
        this.isPastDate = () => {
          return moment(`${DateService.activeYear} ${DateService.activeMonthNum} ${this.day}`, 'YYYY MM DD').isBefore(moment(`${DateService.currentYear} ${DateService.currentMonthNum} ${DateService.todayNum}`, 'YYYY MM DD'));
        };
        this.isToday = () => {
          return moment(`${DateService.activeYear} ${DateService.activeMonthNum} ${this.day}`, 'YYYY MM DD').isSame(moment(`${DateService.currentYear} ${DateService.currentMonthNum} ${DateService.todayNum}`, 'YYYY MM DD'));
        };
        this.getDate = (day) => {
          return BookAPIService.bookedDay(day);
        };
        this.openDay = (day) => {
          const __ = require('underscore');
          $uibModal.open({
            animation: true,
            template: require('../user-modal/user-modal.jade'),
            size: 'lg',
            controllerAs: 'modal',
            controller: function ModalCtrl($uibModalInstance) {
              this.BookAPIService = BookAPIService;
              this.day = day;
              this.month = DateService.activeMonthNum;
              this.year = DateService.activeYear;
              this.book = {};
              this.book.user = this.BookAPIService.getUser();
              this.event = BookAPIService.getEvent(this.year, this.month, this.day);
              if (!this.book.place) {
                this.book.place = 'in';
              }else {
                this.book.place = this.book.place;
              }
              this.confirm = false;
              this.hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
              this.checkWeather = () => {
                const todayM = moment().format('YYYY-MM-DD');
                const selected = moment([this.year, this.month, this.day]).format('YYYY-MM-DD');
                const inrange = moment(selected).isBetween(todayM, moment(todayM).add(7, 'days'), 'days', '[]');
                const todayw = __.find( BookAPIService.forecast, function funddate(findedday) {
                  if (findedday.date === selected) {
                    return findedday.date;
                  }
                });
                if (inrange) {
                  this.todayweather = todayw;
                }
              };
              this.checkWeather();
              this.close = () => $uibModalInstance.dismiss();
            },
          });
        };
      },
    };
  });
};
