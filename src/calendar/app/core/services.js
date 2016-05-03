export default ngModule => {
  require('./main/photoAPIService')(ngModule);
  require('./main/FlickrAPIService')(ngModule);
};
