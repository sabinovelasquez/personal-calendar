export default ngModule => {
  ngModule.controller('MainCtrl', function MainCtrl(DateService, BookAPIService, WeatherAPIService, $sce) {
    this.DateService = DateService;

    const __ = require('underscore');
    const moment = require('moment');
    const Calendar = require('calendar').Calendar;
    const cal = new Calendar(1);

    const weekdayNames = Array.apply(null, Array(7)).map( (___, iterate) => {
      return moment.weekdaysShort(iterate + 1);
    });

    this.dotw = weekdayNames;
    this.moty = moment.monthsShort();
    this.todayName =  moment().format('ddd');
    this.getArray = () => {
      return __.flatten(cal.monthDays(this.DateService.activeYear, this.DateService.activeMonthNum));
    };
    this.daysArray = this.getArray();
    this.nextMonth = () => {
      if (this.DateService.activeMonthNum < 11) {
        this.DateService.activeMonthNum++;
        this.getMonthEvents();
      }
    };
    this.prevMonth = () => {
      if (this.DateService.activeMonthNum > 0) {
        this.DateService.activeMonthNum--;
        this.getMonthEvents();
      }
    };
    this.getMonthEvents = () => {
      this.daysArray = this.getArray();
      BookAPIService.getBooked(this.DateService.activeYear, this.DateService.activeMonthNum);
    };
    this.getMonthEvents();
    WeatherAPIService
      .getWeather()
      .then(response => {
        BookAPIService.forecast = response.data.forecast.forecastday;
        const icon = response.data.current.condition.icon;
        this.weatherIcon = $sce.trustAsResourceUrl(icon);
        this.weatherIconText = response.data.current.condition.text;
        this.weatherTemp = response.data.current.temp_c;
      });
  });
};
