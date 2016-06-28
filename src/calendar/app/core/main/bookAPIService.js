// const moment = require('moment');

export default ngModule => {
  ngModule.service('BookAPIService', function BookAPIService($firebaseArray, $firebaseObject, DateService) {
    const Firebase = require('firebase');
    this.bookedDays = {};
    this.user = '';
    this.forecast = [];

    return {
      getBooked: (year, month) => {
        const ref = new Firebase(`https://602calendar.firebaseio.com/booked/${year}/${month}`);
        const booked = $firebaseArray(ref);
        booked.$loaded().then( (data) => {
          this.bookedDays = data;
        });
      },
      changeUser: (name) => {
        this.user = name;
      },
      getUser: () => {
        return this.user;
      },
      bookedDay: (day) => {
        this.checkDate = false;
        angular.forEach(this.bookedDays, (value) => {
          if (day.toString() === value.$id) {
            this.checkDate = true;
          }
        });
        return this.checkDate;
      },
      getEvent: (year, month, day) => {
        const ref = new Firebase(`https://602calendar.firebaseio.com/booked/${year}/${month}/${day}`);
        const booked = $firebaseObject(ref);
        return booked;
      },
      putBook: (book, day) => {
        const ref = new Firebase(`https://602calendar.firebaseio.com/booked/${DateService.activeYear}/${DateService.activeMonthNum}/${day}`);
        ref.set(book);
      },
      delBook: (day) => {
        const ref = new Firebase(`https://602calendar.firebaseio.com/booked/${DateService.activeYear}/${DateService.activeMonthNum}/${day}`);
        ref.remove();
      },
    };
  });
};
