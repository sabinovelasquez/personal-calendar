export default ngModule => {
  ngModule.controller('MainCtrl', function MainCtrl($uibModal, BookAPIService) {
    const Calendar = require('calendar').Calendar;
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear('Y');
    const cal = new Calendar(1);
    const weeks = cal.monthDays(year, month);

    this.openModal = () => {
      const modal = $uibModal.open({
        animation: true,
        template: require('./user-modal/user-modal.jade'),
        size: 'lg',
        controllerAs: 'modal',
        controller: function ModalCtrl($uibModalInstance) {
          this.close = () => $uibModalInstance.dismiss();
        },
      });
    };
    this.user = BookAPIService.user;
    this.BookAPIService = BookAPIService;
    this.weeks = weeks;
    this.dotwt = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.getToday = date.getDay();
    this.today =  this.dotwt[ date.getDay() - 1 ];
    BookAPIService
      .getBooked();
  });
};
