// const moment = require('moment');

export default ngModule => {
  ngModule.service('BookAPIService', function BookAPIService($firebaseArray) {
    const Firebase = require('firebase');
    // const __ = require('underscore');
    this.bookedDays = {};
    this.event = {};
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
      bookedDayPlace: (month, day) => {
        const place = this.bookedDays[`${month}`][`${day}`].place;
        if (place) {return place;}
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
      getEvent: (month, day) => {
        const event = this.bookedDays[`${month}`][`${day}`].event;
        if (event) {return event;}
      },
      getEventTime: (month, day) => {
        const time = this.bookedDays[`${month}`][`${day}`].time;
        if (time) {return time;}
      },
      getEventUser: (month, day) => {
        const userev = this.bookedDays[`${month}`][`${day}`].user;
        if (userev) {return userev;}
      },
      putBook: (day, month, text, time, place) => {
        const ref = new Firebase(`${month}${day}https://602calendar.firebaseio.com/booked/${month}/${day}`);
        ref.set({event: text, user: this.user, time: time, place: place});
      },
      delBook: (day, month) => {
        const ref = new Firebase(`${month}${day}https://602calendar.firebaseio.com/booked/${month}/${day}`);
        ref.remove();
      },
    };
  });
};
