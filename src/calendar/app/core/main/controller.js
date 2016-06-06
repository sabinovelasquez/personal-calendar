export default ngModule => {
  ngModule.controller('MainCtrl', function MainCtrl(BookAPIService, WeatherAPIService, $sce) {
    const date = new Date();
    const moment = require('moment');
    const weekdayNames = Array.apply(null, Array(7)).map( (__, iterate) => {
      return moment.weekdaysShort(iterate + 1);
    });
    const monthDays = Array.apply(null, Array(31)).map( (__, iterate) => {
      return iterate;
    });

    this.dotw = weekdayNames;
    this.getToday = date.getDate();
    this.today =  this.dotw[ date.getDay() - 1 ];
    this.moty = moment.monthsShort();
    this.month = date.getMonth();
    
    // this.monthDays = Array(31);
    console.log(monthDays);
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
