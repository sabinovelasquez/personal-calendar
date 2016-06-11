export default ngModule => {
  ngModule.controller('MainCtrl', function MainCtrl(DateService, BookAPIService, WeatherAPIService, $sce) {
    
    this.DateService = DateService;

    const __ = require('underscore');
    const moment = require('moment');
    const Calendar = require('calendar').Calendar;
    const cal = new Calendar(1);
    const date = new Date();

    const weekdayNames = Array.apply(null, Array(7)).map( (___, iterate) => {
      return moment.weekdaysShort(iterate + 1);
    });

    this.dotw = weekdayNames;
    this.moty = moment.monthsShort();
    this.todayName =  this.dotw[ date.getDay() - 1 ];

    this.getArray = () => {
      return __.flatten(cal.monthDays(this.DateService.activeYear, this.DateService.activeMonthNum));
    };
    this.daysArray = this.getArray();
    this.nextMonth = () => {
      if (this.DateService.activeMonthNum < 11) {
        this.DateService.activeMonthNum++;
        this.daysArray = this.getArray();
      }
    };
    this.prevMonth = () => {
      if (this.DateService.activeMonthNum > 0) {
        this.DateService.activeMonthNum--;
        this.daysArray = this.getArray();
      }
    };
    // console.log(this.daysArray);

    // moment("2012-02", "YYYY-MM").daysInMonth() 
    // this.monthDays = Array(31);
    // console.log(this.month);

    // console.log('date:' + this.dates);
    // this.currentMonthNum = 0;
    // this.getWeeks = (year, month) => {
    //   return cal.monthDays(year, month);
    // };
    // this.nextMonth = () => {
    //   this.currentMonthNum++;
    //   this.weeks = this.getWeeks(this.year, this.month + this.currentMonthNum);
    // };
    // this.prevMonth = () => {
    //   this.currentMonthNum--;
    //   this.weeks = this.getWeeks(this.year, this.month - this.currentMonthNum);
    // };
    // this.forecast = [];
    // this.year = date.getFullYear('Y');
    // this.month = date.getMonth();
    // this.user = BookAPIService.user;
    // this.BookAPIService = BookAPIService;
    // this.weeks = this.getWeeks(this.year, this.month);
    // this.dotwt = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // 
    // this.getToday = date.getDate();
    // this.today =  this.dotwt[ date.getDay() ];
    // WeatherAPIService
    //   .getWeather()
    //   .then(response => {
    //     BookAPIService.forecast = response.data.forecast.forecastday;
    //     const icon = response.data.current.condition.icon;
    //     this.weatherIcon = $sce.trustAsResourceUrl(icon);
    //     this.weatherIconText = response.data.current.condition.text;
    //     this.weatherTemp = response.data.current.temp_c;
    //   });
    // BookAPIService
    //   .getBooked();
  });
};
