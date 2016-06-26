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
        this.getDate = (day) => {
          return BookAPIService.bookedDay(day);
        };
        this.openDay = (day, month, year) => {
          const __ = require('underscore');
          $uibModal.open({
            animation: true,
            template: require('../user-modal/user-modal.jade'),
            size: 'lg',
            controllerAs: 'modal',
            controller: function ModalCtrl($uibModalInstance) {
              this.day = day;
              this.month = month;
              this.year = year;
              this.checkWeather = () => {
                const today = moment().format('YYYY-MM-DD');
                const selected = moment([this.year, this.month, this.day]).format('YYYY-MM-DD');
                const inrange = moment(selected).isBetween(today, moment(today).add(7, 'days'), 'days', '[]');
                const todayw = __.find( BookAPIService.forecast, function funddate(findedday) {
                  if (findedday.date === selected) {
                    return findedday.date;
                  }
                });
                if (inrange) {
                  this.todayweather = todayw;
                }
              };
              this.text = '';
              this.time = '';
              // if (!place) {
              //   this.place = 'in';
              // }else {
              //   this.place = place;
              // }
              this.confirm = false;
              this.hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
              this.checkWeather();
              this.close = () => $uibModalInstance.dismiss();
            },
          });
        };
      },
    };
  });
};
