export default ngModule => {
  ngModule.service('BookAPIService', ($firebaseObject) => {
    const service = {
      getBooked: () => {
        const ref = new Firebase(`https://602calendar.firebaseio.com/booked/`);
        const syncObject = $firebaseObject(ref);
        return syncObject;
        
      },
      putBook: (day, month) => {
        const ref = new Firebase(`${month}https://602calendar.firebaseio.com/booked/${month}`);
        const fb = $firebaseObject(ref);
        ref.push({day:day}); //push
      },
    };
    return service;
  });
};