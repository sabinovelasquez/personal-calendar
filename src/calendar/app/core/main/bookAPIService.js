export default ngModule => {
  ngModule.service('BookAPIService', function BookAPIService($firebaseObject) {
    const Firebase = require('firebase');
    const __ = require('underscore');
    this.bookedDays = {};
    return {
      getBooked: () => {
        const ref = new Firebase(`https://602calendar.firebaseio.com/booked/`);
        const booked = $firebaseObject(ref);
        booked.$loaded().then( (data) => {
          this.bookedDays = data;
          this.empty = Object.keys(this.bookedDays).length;
        });
      },
      bookedDay: (day) => {
        const days = [];
        angular.forEach(this.bookedDays, (value) => {
          days.push(Object.keys(value));
        });
        const flat = __.flatten(days);
        return __.contains(flat, day.toString());
      },
      putBook: (day, month) => {
        const ref = new Firebase(`${month}${day}https://602calendar.firebaseio.com/booked/${month}/${day}`);
        ref.set({event: 'test'});
      },
      delBook: (day, month) => {
        const ref = new Firebase(`${month}${day}https://602calendar.firebaseio.com/booked/${month}/${day}`);
        ref.remove();
      },
    };
  });
};
