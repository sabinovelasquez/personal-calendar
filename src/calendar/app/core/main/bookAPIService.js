export default ngModule => {
  ngModule.service('BookAPIService', function BookAPIService($firebaseObject, $q) {
    return {
      getBooked: () => {
        const ref = new Firebase(`https://602calendar.firebaseio.com/booked/`);
        const booked = $firebaseObject(ref);
        const defer = $q.defer();
        booked.$loaded().then( (data) => {
          // console.log("loaded record:", obj);
          // angular.forEach(obj, function(value, key) {
          //   console.log(key, value);
          // });
          defer.resolve(data);
          this.booked = data;
          return data;
        });
      },
      putBook: (day, month) => {
        const ref = new Firebase(`${month}https://602calendar.firebaseio.com/booked/${month}`);
        const fb = $firebaseObject(ref);
        ref.push({day:day}); //push
      },
    };
  });
};