export default ngModule => {
  ngModule.controller('MainCtrl', function MainCtrl(BookAPIService, WeatherAPIService, $sce) {
    const Calendar = require('calendar').Calendar;
    const date = new Date();
    const cal = new Calendar(1);
    const moment = require('moment');
    const weekdayNames = Array.apply(null, Array(7)).map( (__, iterate) => {
      return moment.weekdaysShort(iterate + 1);
    });

    this.dates = weekdayNames;
    // console.log('date:' + this.dates);
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
    this.forecast = [];
    this.year = date.getFullYear('Y');
    this.month = date.getMonth();
    this.user = BookAPIService.user;
    this.BookAPIService = BookAPIService;
    this.weeks = this.getWeeks(this.year, this.month);
    this.dotwt = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.dotwtf = weekdayNames;
    this.getToday = date.getDate();
    this.today =  this.dotwt[ date.getDay() ];
    WeatherAPIService
      .getWeather()
      .then(response => {
        BookAPIService.forecast = response.data.forecast.forecastday;
        const icon = response.data.current.condition.icon;
        this.weatherIcon = $sce.trustAsResourceUrl(icon);
        this.weatherIconText = response.data.current.condition.text;
        this.weatherTemp = response.data.current.temp_c;
      });
    BookAPIService
      .getBooked();
  });
};
