// const moment = require('moment');

export default ngModule => {
  ngModule.service('DateService', function DateService() {
    // const moment = require('moment');
    const date = new Date();

    this.todayNum = date.getDate();
    this.currentMonthNum = date.getMonth();
    this.currentYear = date.getFullYear('Y');
    this.activeMonthNum = this.currentMonthNum;
    this.activeYear = this.currentYear;
  });
};
