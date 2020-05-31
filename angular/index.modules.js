angular.module('app', [
  'app.run',
  'app.filters',
  'app.services',
  'app.components',
  'app.routes',
  'app.config',
  'app.partials'
])
angular.module('app.run', [])
angular.module('app.routes', [])
angular.module('app.filters', [])
angular.module('app.services', [])
angular.module('app.config', [])
angular.module('app.components', ['firebase','vcRecaptcha','ngMaterial','ks.ngScrollRepeat',
  'ui.router','xeditable', 'ngMessages', 'angular-loading-bar',
  'restangular', 'ngStorage', 'satellizer','ngAnimate','mdo-angular-cryptography',
  'ui.bootstrap', 'mm.acl', 'datatables','angularMoment','ngIdle',
  'datatables.bootstrap', 'checklist-model','ngFileUpload','ngImgCrop',
  'infinite-scroll','ngDialog','ui.router', 'ui.bootstrap',
  'ui.router.modal','scrollToFixed','matchMedia','toastr','ngTagsInput','ui.select2',
  'matchMedia','angularLazyImg','oc.lazyLoad','ksSwiper','angular.filter','angularGrid',
  'nvd3','ui.scroll'
])