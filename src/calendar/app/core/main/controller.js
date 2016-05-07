export default ngModule => {
  ngModule.controller('MainCtrl', function MainCtrl(BookAPIService) {
    const Calendar = require('calendar').Calendar;
    const date = new Date();
    const cal = new Calendar(1);
    this.moty = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.currentMonthNum = 0;
    this.getWeeks = (year, month) => {
      return cal.monthDays(year, month);
    };
    this.nextMonth = () => {
      this.currentMonthNum++;
      this.weeks = this.getWeeks(this.year, this.month + this.currentMonthNum);
    };
    this.prevMonth = () => {
      this.currentMonthNum--;
      this.weeks = this.getWeeks(this.year, this.month - this.currentMonthNum);
    };

    this.year = date.getFullYear('Y');
    this.month = date.getMonth();
    this.user = BookAPIService.user;
    this.BookAPIService = BookAPIService;
    this.weeks = this.getWeeks(this.year, this.month);
    this.dotwt = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.getToday = date.getDay();
    this.today =  this.dotwt[ date.getDay() - 1 ];
    BookAPIService
      .getBooked();
  });
};
