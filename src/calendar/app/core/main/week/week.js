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
        this.today = date.getDay();
        this.BookAPIService = BookAPIService;
        this.openModal = (day, month, booked) => {
          $uibModal.open({
            animation: true,
            template: require('../user-modal/user-modal.jade'),
            size: 'lg',
            controllerAs: 'modal',
            controller: function ModalCtrl($uibModalInstance) {
              this.day = day;
              this.month = month;
              this.booked = booked;
              this.text = '';
              this.BookAPIService = BookAPIService;
              this.close = () => $uibModalInstance.dismiss();
            },
          });
        };
      },
    };
  });
};
