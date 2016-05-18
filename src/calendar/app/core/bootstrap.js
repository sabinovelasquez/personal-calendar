require('./vendor')();

const ngModule = angular.module('app', [
  'duScroll',
  'angularMoment',
  'ngAnimate',
  'firebase',
  'ngResource',
  'ngSanitize',
  'ngTouch',
  'ui.bootstrap',
  'ui.router',
]);

require('./config')(ngModule);
require('./controllers')(ngModule);
require('./directives')(ngModule);
require('./services')(ngModule);

ngModule.run(amMoment => amMoment.changeLocale('es'));

angular.element(document).ready(() => {
  angular.bootstrap(document, ['app'], {
  	//
  });
});
