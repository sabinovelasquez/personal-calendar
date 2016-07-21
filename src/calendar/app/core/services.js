export default ngModule => {
  require('./main/BookAPIService')(ngModule);
  require('./main/weatherAPIService')(ngModule);
  require('./main/DateService')(ngModule);
};
