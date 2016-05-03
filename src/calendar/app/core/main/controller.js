export default ngModule => {
  ngModule.controller('MainCtrl', function MainCtrl(PhotoAPIService) {
    this.cases = [];
    const Calendar = require('calendar').Calendar;
    const d = new Date();
    const n = d.getMonth();
    const y = d.getFullYear('Y');

    const cal = new Calendar(1);
    const weeks = cal.monthDays(y, n);
    this.weeks = weeks;
    PhotoAPIService
      .allPhotos()
      .then(response => {
        this.cases = response.data.feed.entry;
      });
  });
};
