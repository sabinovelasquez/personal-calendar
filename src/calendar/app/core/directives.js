export default ngModule => {
  require('./main/single-case/case')(ngModule);
  require('./main/week/week')(ngModule);
};
