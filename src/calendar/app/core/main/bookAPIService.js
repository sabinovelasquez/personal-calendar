// const moment = require('moment');

export default ngModule => {
  ngModule.service('BookAPIService', function BookAPIService($firebaseObject) {
    const Firebase = require('firebase');
    const __ = require('underscore');
    this.bookedDays = {};
    this.event = {};
    this.user = '';
    this.forecast = [];
    return {
      getBooked: () => {
        const ref = new Firebase(`https://602calendar.firebaseio.com/booked/`);
        const booked = $firebaseObject(ref);
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
        const days = [];
        angular.forEach(this.bookedDays, (value) => {
          days.push(Object.keys(value));
        });
        const flat = __.flatten(days);
        return __.contains(flat, day.toString());
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
