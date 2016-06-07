export default ngModule => {
  require('./day.scss');

  ngModule.directive('singleDay', function singleDay($uibModal, DateService, BookAPIService) {
    return {
      template: require('./day.jade'),
      scope: {},
      bindToController: {
        day: '='
      },
      controllerAs: 'day',
      controller: function dayCtrl() {
        const moment = require('moment');
        this.DateService = DateService;
        this.checkPastDate = (datecom) => {
          return false;
        };
        
      },
    };
  });
};
