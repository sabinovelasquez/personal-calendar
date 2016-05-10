export default ngModule => {
  require('./week.scss');

  ngModule.directive('singleWeek', function singleWeek($uibModal, BookAPIService) {
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
        this.today = date.getDate();
        this.checkDate = (day) => {
          if (this.today > day) { return true; }
        };
        this.BookAPIService = BookAPIService;
        this.openModal = (day, month, booked, numday) => {
          $uibModal.open({
            animation: true,
            template: require('../user-modal/user-modal.jade'),
            size: 'lg',
            controllerAs: 'modal',
            controller: function ModalCtrl($uibModalInstance) {
              this.numday = numday;
              this.day = day;
              this.month = month;
              this.booked = booked;
              this.checkWeather = (dateinc) => {
                const actualdate = new Date(dateinc);
                const fromdate = new Date(2016, this.month, this.day-1);
                const d1 = actualdate.getDate();
                const d2 = fromdate.getDate();
                if ( (d1 + 8) >= (d2 + 1) && (d2 + 1) >= (d1 + 1) ) {
                  return true;
                }
              };
              this.text = '';
              this.time = '';
              this.confirm = false;
              this.hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
              this.BookAPIService = BookAPIService;
              this.close = () => $uibModalInstance.dismiss();
            },
          });
        };
      },
    };
  });
};
