export default ngModule => {
  ngModule.controller('MainCtrl', function MainCtrl(BookAPIService) {
    const Calendar = require('calendar').Calendar;
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear('Y');
    const cal = new Calendar(1);
    const weeks = cal.monthDays(year, month);

    this.weeks = weeks;
    this.dotwt = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.getToday = date.getDay();
    this.today =  this.dotwt[ date.getDay() - 1 ];
    BookAPIService
      .getBooked();
  });
};
