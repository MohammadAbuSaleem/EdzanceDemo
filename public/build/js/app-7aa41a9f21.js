/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(2);

	__webpack_require__(4);

	__webpack_require__(9);

	__webpack_require__(18);

	__webpack_require__(196);

	__webpack_require__(229);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	angular.module('app', ['app.run', 'app.filters', 'app.services', 'app.components', 'app.routes', 'app.config', 'app.partials']);
	angular.module('app.run', []);
	angular.module('app.routes', []);
	angular.module('app.filters', []);
	angular.module('app.services', []);
	angular.module('app.config', []);
	angular.module('app.components', ['firebase', 'vcRecaptcha', 'ngMaterial', 'ks.ngScrollRepeat', 'ui.router', 'xeditable', 'ngMessages', 'angular-loading-bar', 'restangular', 'ngStorage', 'satellizer', 'ngAnimate', 'mdo-angular-cryptography', 'ui.bootstrap', 'mm.acl', 'datatables', 'angularMoment', 'ngIdle', 'datatables.bootstrap', 'checklist-model', 'ngFileUpload', 'ngImgCrop', 'infinite-scroll', 'ngDialog', 'ui.router', 'ui.bootstrap', 'ui.router.modal', 'scrollToFixed', 'matchMedia', 'toastr', 'ngTagsInput', 'ui.select2', 'matchMedia', 'angularLazyImg', 'oc.lazyLoad', 'ksSwiper', 'angular.filter', 'angularGrid', 'nvd3', 'ui.scroll']);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _routes = __webpack_require__(3);

	//import { EditableRun } from './run/editable.run'

	angular.module('app.run').run(_routes.RoutesRun)
	// .run(EditableRun)
	.run(["editableOptions", function (editableOptions) {
	  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
	}]).run(["Idle", function (Idle) {
	  // start watching when the app runs. also starts the Keepalive service by default.
	  Idle.watch();
	}]).run(["amMoment", function (amMoment) {
	  amMoment.changeLocale('ar-sa');
	}]);

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	RoutesRun.$inject = ["$rootScope", "$state", "$auth", "AclService", "$timeout", "API", "ContextService"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RoutesRun = RoutesRun;
	function RoutesRun($rootScope, $state, $auth, AclService, $timeout, API, ContextService) {
	  'ngInject';

	  AclService.resume();

	  /*eslint-disable */
	  var deregisterationCallback = $rootScope.$on('$stateChangeStart', function (event, toState) {

	    if ($auth.isAuthenticated()) {
	      if (!$rootScope.me) {
	        ContextService.getContext().then(function (response) {
	          response = response.plain();
	          $rootScope.me = response.data;
	        });
	      }
	    }
	    if (toState.data && toState.data.auth) {
	      if (!$auth.isAuthenticated()) {
	        event.preventDefault();
	        return $state.go('logins.login.index');
	      }
	    }
	    $rootScope.bodyClass = 'hold-transition';
	  });

	  function stateChange() {
	    $timeout(function () {
	      // fix sidebar
	      var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
	      var window_height = $(window).height();
	      var sidebar_height = $('.sidebar').height();

	      if ($('body').hasClass('fixed')) {
	        $('.content-wrapper, .right-side').css('min-height', window_height - $('.main-footer').outerHeight());
	      } else {
	        if (window_height >= sidebar_height) {
	          $('.content-wrapper, .right-side').css('min-height', window_height - neg);
	        } else {
	          $('.content-wrapper, .right-side').css('min-height', sidebar_height);
	        }
	      }

	      // get user current context
	    });
	  }
	  $rootScope.$on('$destroy', deregisterationCallback);
	  $rootScope.$on('$stateChangeSuccess', stateChange);

	  /*eslint-enable */
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _acl = __webpack_require__(5);

	var _routes = __webpack_require__(6);

	var _loading_bar = __webpack_require__(7);

	var _satellizer = __webpack_require__(8);

	angular.module('app.config').config(_acl.AclConfig).config(_routes.RoutesConfig).config(_loading_bar.LoadingBarConfig).config(_satellizer.SatellizerConfig).config(["$mdThemingProvider", function ($mdThemingProvider) {}]).config(["toastrConfig", function (toastrConfig) {
	  angular.extend(toastrConfig, {
	    autoDismiss: true,
	    containerId: 'toast-container',
	    maxOpened: 0,
	    newestOnTop: true,
	    positionClass: 'toast-bottom-left',
	    preventDuplicates: false,
	    preventOpenDuplicates: false,
	    target: 'body',
	    progressBar: true
	  });
	}]).config(['$cryptoProvider', function ($cryptoProvider) {
	  $cryptoProvider.setCryptographyKey('fckgwrhqq2yxrkt8tg6w2b7q8');
	}]).config(["IdleProvider", "KeepaliveProvider", "TitleProvider", function (IdleProvider, KeepaliveProvider, TitleProvider) {
	  // configure Idle settings
	  IdleProvider.idle(5); // in seconds
	  IdleProvider.timeout(0); // in seconds
	  KeepaliveProvider.interval(2); // in seconds
	  TitleProvider.enabled(false); // it is enabled by default
	}]).config(["$sceDelegateProvider", "$locationProvider", function ($sceDelegateProvider, $locationProvider) {
	  $locationProvider.html5Mode(true);
	  $sceDelegateProvider.resourceUrlWhitelist([
	  // Allow same origin resource loads.
	  'self',
	  // Allow loading from outer templates domain.
	  'https://www.youtube.com/**']);
	}]);

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	AclConfig.$inject = ["AclServiceProvider"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.AclConfig = AclConfig;
	function AclConfig(AclServiceProvider) {
	  'ngInject';

	  var myConfig = {
	    storage: 'localStorage',
	    storageKey: 'AppAcl'
	  };

	  /*eslint-disable */
	  AclServiceProvider.config(myConfig);
	  /*eslint-enable */
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RoutesConfig = RoutesConfig;
	function RoutesConfig($stateProvider, $urlRouterProvider) {
	  'ngInject';

	  var getView = function getView(viewName) {
	    return './views/app/pages/' + viewName + '/' + viewName + '.page.html';
	  };

	  var getLayout = function getLayout(layout) {
	    return './views/app/pages/layout/' + layout + '.page.html';
	  };

	  $urlRouterProvider.otherwise('/404');
	  $stateProvider
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  /////////////////////////  Main pages     /////////////////////////
	  /////////////////////////    routes       /////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  .state('app', {
	    abstract: true,
	    views: {
	      'layout': {
	        templateUrl: getLayout('layout')
	      },
	      'header@app': {
	        templateUrl: getView('nav')
	      },
	      'footer@app': {
	        template: '<foot></foot>'
	      },
	      main: {}
	    },
	    data: {
	      bodyClass: 'hold-transition sw-toggled'
	    },
	    resolve: {
	      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	        return $ocLazyLoad.load({
	          files: ['vendors/sweet-alert/sweet-alert.min.css', 'vendors/material-icons/material-design-iconic-font.min.css', 'css/emojionearea.min.css', 'vendors/socicon/socicon.min.css', 'vendors/light-gallery/lightGallery.min.css', 'css/angular-datatables.css', 'css/app.min.1.css', 'css/app.min.2.css', 'css/app.min.3.css']
	        });
	      }]
	    }
	  }).state('app.otherwise', {
	    url: '/404',
	    data: {
	      auth: false
	    },
	    views: {
	      'main@app': {
	        template: '<otherwise></otherwise>'
	      }
	    }
	  }).state('app.landing', {
	    url: '/',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        templateUrl: getView('home')
	      },
	      'post@app.landing': {
	        templateUrl: '../../pages/post/post.html'
	      }
	    }
	  }).state('logins', {
	    abstract: true,
	    views: {
	      'layout': {
	        templateUrl: getLayout('loginslayout')
	      },
	      'main@logins': {
	        template: getView('login')
	      }
	    },
	    data: {
	      bodyClass: 'hold-transition'
	    },
	    params: {
	      registerSuccess: null,
	      successMsg: null,
	      user: {
	        name: null,
	        email: null,
	        password: null
	      }
	    },
	    resolve: {
	      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	        return $ocLazyLoad.load({
	          files: ['vendors/material-icons/material-design-iconic-font.min.css', 'vendors/socicon/socicon.min.css', 'css/app.min.1.css', 'css/app.min.2.css', 'css/app.min.3.css']
	        });
	      }]
	    }
	  }).state('app.notifications', {
	    url: '/notifications',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        templateUrl: getView('notifications')
	      },
	      data: {
	        bodyClass: 'hold-transition  sw-toggled'
	      }
	    }
	  }).state('app.search', {
	    url: '/search/?=:value',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        templateUrl: getView('search')
	      }, 'search@app.search': {
	        templateUrl: '../../pages/misc/search.html'
	      }
	    }
	  })
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ////////////////////// courses pages   ////////////////////////////
	  /////////////////////////    routes       /////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  .state('app.courses', {
	    url: '/courses',
	    views: {
	      'main@app': {
	        template: '<courses></courses>'
	      },
	      data: {
	        auth: true,
	        bodyClass: 'hold-transition sw-toggled'
	      },
	      params: {
	        groupcategory: null
	      }
	    }
	  }).state('app.course', {
	    url: '/course',
	    //url: '/course-:coursesid',
	    params: {
	      groupid: null
	    },
	    views: {
	      'main@app': {
	        template: '<course></course>'
	      },
	      data: {
	        bodyClass: 'hold-transition sw-toggled'
	      }
	    }
	  })
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ////////////////////// booksbank pages   //////////////////////////
	  /////////////////////////    routes       /////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  .state('app.booksbank', {
	    url: '/booksbank',
	    views: {
	      'main@app': {
	        template: '<booksbank></booksbank>'
	      }, 'booksbank@app.booksbank': {
	        templateUrl: '../../pages/misc/booksbank.html'
	      },
	      data: {
	        auth: true,
	        bodyClass: 'hold-transition sw-toggled'
	      },
	      params: {
	        groupcategory: null
	      }
	    }
	  }).state('app.mybooks', {
	    url: '/mybooks',
	    views: {
	      'main@app': {
	        template: '<booksbank-mybooks></booksbank-mybooks>'
	      }, 'booksbank@app.mybooks': {
	        templateUrl: '../../pages/misc/booksbank.html'
	      },
	      data: {
	        auth: true,
	        bodyClass: 'hold-transition sw-toggled'
	      },
	      params: {
	        groupcategory: null
	      }
	    }
	  }).state('app.book', {
	    url: '/book-:bookId',
	    views: {
	      'main@app': {
	        template: '<bookbank-about></bookbank-about>'
	      },
	      data: {
	        bodyClass: 'hold-transition sw-toggled'
	      }
	    }
	  }).state('app.jobs', {
	    url: '/jobs',
	    views: {
	      'main@app': {
	        template: '<jobs></jobs>'
	      }, 'jobs@app.jobs': {
	        templateUrl: '../../pages/misc/jobs.html'
	      },
	      data: {
	        auth: true,
	        bodyClass: 'hold-transition sw-toggled'
	      },
	      params: {
	        groupcategory: null
	      }
	    }
	  })
	  // .state('app.course', {
	  //   url: '/course',
	  //   //url: '/course-:coursesid',
	  //   params: {
	  //     groupid:null
	  //   },
	  //   views: {
	  //     'main@app': {
	  //       template: '<course></course>'
	  //     },
	  //   data: {
	  //     bodyClass: 'hold-transition sw-toggled'
	  //   }
	  // }
	  // })
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ////////////////////// institute pages   //////////////////////////
	  /////////////////////////    routes       /////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  .state('institutelogin', {
	    url: '/instituteName/login',
	    views: {
	      'layout': {
	        templateUrl: getLayout('layout-institution')
	      },
	      'header@institutelogin': {
	        template: '<institutelogin-header></institutelogin-header>'
	      },
	      'main@institutelogin': {
	        template: '<institutelogin-body></institutelogin-body>'
	      },
	      'footer@institutelogin': {
	        template: '<institutelogin-footer></institutelogin-footer>'
	      }
	    },
	    data: {
	      bodyClass: 'institutelogin-body'
	    },
	    resolve: {
	      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	        return $ocLazyLoad.load({
	          files: ['vendors/material-icons/material-design-iconic-font.min.css', 'vendors/socicon/socicon.min.css', 'css/app.min.1.css', 'css/app.min.2.css', 'css/app.min.3.css']
	        });
	      }]
	    }
	  }).state('institution', {
	    url: '/institution',
	    views: {
	      'layout': {
	        templateUrl: getLayout('layout-institution')
	      },
	      'header@institution': {
	        template: '<header-institutions></header-institutions>'
	      }
	    },
	    data: {
	      bodyClass: 'institution-body'
	    },
	    resolve: {
	      loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	        return $ocLazyLoad.load({
	          files: ['vendors/sweet-alert/sweet-alert.min.css', 'vendors/material-icons/material-design-iconic-font.min.css', 'vendors/socicon/socicon.min.css', 'css/app.min.1.css', 'css/app.min.2.css', 'css/app.min.3.css']
	        });
	      }]
	    }
	  }).state('institution.index', {
	    url: '/index',
	    views: {
	      'main@institution': {
	        template: '<educational-institutions></educational-institutions>'
	      },
	      'footer@institution': {
	        template: '<footer-institutions></footer-institutions>'
	      }
	    }
	  }).state('institution.adding', {
	    url: '/create',
	    views: {
	      'main@institution': {
	        template: '<adding-institutions></adding-institutions>'
	      }
	    }
	  })
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ////////////////////// specialization pages   /////////////////////
	  /////////////////////////    routes       /////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  .state('app.specialization', {
	    url: '/specialization',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        templateUrl: getView('specialization')
	      },
	      data: {
	        bodyClass: 'hold-transition  sw-toggled'
	      }
	    }
	  }).state('app.specialization.discussion', {
	    url: '/discussion',
	    template: '<specialization-discussion></specialization-discussion>'
	  }).state('app.specialization.materials', {
	    url: '/materials',
	    template: '<specialization-materials></specialization-materials>'
	  }).state('app.specialization.attachments.homework', {
	    url: '/homework',
	    template: '<specialization-homework></specialization-homework>'
	  }).state('app.specialization.students', {
	    url: '/students',
	    template: '<specialization-students></specialization-students>'
	  }).state('app.specialization.instructors', {
	    url: '/instructors',
	    template: '<specialization-instructors></specialization-instructors>'
	  }).state('app.specialization.attachments.files', {
	    url: '/files',
	    template: '<specialization-files></specialization-files>'
	  }).state('app.specialization.attachments.videos', {
	    url: '/videos',
	    template: '<specialization-videos></specialization-videos>'
	  }).state('app.specialization.attachments.photos', {
	    url: '/photos',
	    template: '<specialization-photos></specialization-photos>'
	  }).state('app.specialization.groups', {
	    url: '/groups',
	    template: '<specialization-groups></specialization-groups>'
	  }).state('app.specialization.attachments', {
	    url: '/attachments',
	    template: '<specialization-attachments></specialization-attachments>'
	  })
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  /////////////////////////  results pages   ////////////////////////
	  /////////////////////////    routes       /////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  .state('app.results', {
	    abstract: true,
	    url: '/results',
	    params: {
	      resultsid: null
	    },
	    data: {
	      auth: true,
	      bodyClass: 'hold-transition sw-toggled'
	    },
	    views: {
	      'main@app': {
	        templateUrl: getView('results')
	      }
	    }
	  }).state('app.results.post', {
	    url: '/post/:resultsid',
	    views: {
	      'post@app.results.post': {
	        templateUrl: '../../pages/post/post.html'
	      },
	      'results': {
	        template: '<results-post></results-post>'
	      }
	    }
	  }).state('app.results.classpost', {
	    url: '/classpost/:resultsid',
	    views: {
	      'post@app.results.classpost': {
	        templateUrl: '../../pages/post/post.html'
	      },
	      'results': {
	        template: '<results-classpost></results-classpost>'
	      }
	    }
	  }).state('app.results.classfile', {
	    url: '/classfile/:resultsid',
	    views: {
	      'file@app.results.classfile': {
	        templateUrl: '../../pages/post/file.html'
	      },
	      'results': {
	        template: '<results-classfile></results-classfile>'
	      }
	    }
	  }).state('app.results.classexam', {
	    url: '/classexam/:resultsid',
	    views: {
	      'exam@app.results.classexam': {
	        templateUrl: '../../pages/post/exam.html'
	      },
	      'results': {
	        template: '<results-classexam></results-classexam>'
	      }
	    }
	  }).state('app.results.classhomework', {
	    url: '/classhomework/:resultsid',
	    views: {
	      'homework@app.results.classhomework': {
	        templateUrl: '../../pages/post/homework.html'
	      },
	      'results': {
	        template: '<results-classhomework></results-classhomework>'
	      }
	    }
	  })
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////// register pages   ////////////////////////
	  /////////////////////////    routes       /////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  .state('logins.login.register', {
	    // abstract: true,
	    url: '/register',
	    template: '<register></register>',
	    data: {
	      //  bodyClass: 'hold-transition'
	    },
	    params: {
	      from: null,
	      to: null,
	      files: null,
	      id: null,
	      agree: null,
	      logtype: null,
	      university: null,
	      type: null,
	      back: null,
	      name: null,
	      phone: null,
	      email: null,
	      password: null,
	      next: null
	    }
	  }).state('logins.login.register.main', {
	    url: '/register-main',
	    template: '<register-main></register-main>',
	    data: {
	      bodyClass: 'hold-transition'
	    },
	    params: {
	      id: null,
	      logtype: null,
	      type: null,
	      back: null,
	      name: null,
	      phone: null,
	      email: null,
	      password: null,
	      next: null
	    }
	  }).state('logins.login.register.goreg', {
	    url: '/goreg/:id',
	    template: '<profile-following></profile-following>',
	    data: {
	      bodyClass: 'hold-transition'
	    },
	    params: {
	      logtype: 'social',
	      id: null,
	      type: null,
	      back: null,
	      name: null,
	      phone: null,
	      email: null,
	      password: null,
	      next: null
	    }
	  }).state('logins.login.register.confirm', {
	    url: '/register-confirm',
	    template: '<register-confirm></register-confirm>',
	    data: {
	      bodyClass: 'hold-transition'
	    },
	    params: {}
	  }).state('logins.login.register.mail', {
	    url: '/register-mail',
	    template: '<register-mail></register-mail>',
	    data: {
	      bodyClass: 'hold-transition'
	    },
	    params: {}
	  }).state('logins.login.register.information', {
	    url: '/register-information',
	    template: '<register-information></register-information>',
	    data: {
	      bodyClass: 'hold-transition'
	    },
	    params: {}
	  }).state('logins.login.register.loader', {
	    url: '/register-information',
	    template: '<register-loader></register-loader>',
	    data: {
	      bodyClass: 'hold-transition'
	    },
	    params: {}
	  }).state('logins.login.register.error', {
	    url: '/register-error',
	    template: '<register-error></register-error>',
	    data: {
	      bodyClass: 'hold-transition'
	    },
	    params: {}
	  }).state('logins.login.register.class', {
	    url: '/register-class',
	    template: '<register-class></register-class>',
	    data: {
	      bodyClass: 'hold-transition'
	    },
	    params: {
	      type: null,
	      back: null,
	      next: null
	    }
	  })

	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  /////////////////////////  login pages     ////////////////////////
	  /////////////////////////    routes       /////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  .state('logins.login', {
	    abstract: true,
	    //url: '/login',
	    views: {
	      'main@logins': { templateUrl: getView('login') },
	      'footer@logins': { templateUrl: getView('login-footer') }
	    },
	    data: {
	      htmlClass: 'homepage-background reg-mobile',
	      bodyClass: 'login-background'
	    },
	    params: {
	      registerSuccess: null,
	      successMsg: null
	    }
	  }).state('logins.login.retry', {
	    url: '/login-retry',
	    views: {
	      'main@logins': { templateUrl: getView('retry') }
	    },
	    data: {
	      htmlClass: 'homepage-background reg-mobile',
	      bodyClass: 'login-background'
	    }
	  }).state('logins.login.privacy', {
	    url: '/privacy',
	    views: {
	      'main@logins': { templateUrl: getView('privacy') }
	    },
	    data: {
	      htmlClass: 'privacy-background reg-mobile',
	      bodyClass: 'login-background'
	    }
	  }).state('app.privacy-login', {
	    url: '/privacy-login',
	    views: {
	      'main@app': {
	        templateUrl: getView('privacy-login')
	      }
	    },
	    data: {
	      auth: true
	    }
	  }).state('logins.registration-education', {
	    url: '/registration-education',
	    views: {
	      'header@logins': {
	        templateUrl: getView('login-header')
	      },
	      'main@logins': {
	        template: '<registration-education></registration-education>'
	      }
	    },
	    data: {
	      htmlClass: 'edu-background reg-mobile',
	      bodyClass: 'login-background'
	    },
	    params: {
	      registerSuccess: null,
	      successMsg: null,
	      user: {
	        name: null,
	        email: null,
	        password: null
	      }
	    }
	  }).state('logins.login.index', {
	    url: '/login',
	    views: {
	      'main@logins': { templateUrl: getView('login') } },
	    data: {
	      htmlClass: 'homepage-background reg-mobile',
	      bodyClass: 'login-background'
	    },
	    params: {
	      registerSuccess: null,
	      successMsg: null,
	      user: {
	        name: null,
	        email: null,
	        password: null
	      }
	    }
	  }).state('logins.login.redirect', {
	    url: '/go/:url',
	    views: {
	      'main@logins': { templateUrl: getView('login2') },
	      'footer@logins': { templateUrl: getView('login-footer') }
	    },
	    data: {
	      bodyClass: 'hold-transition'
	    },
	    params: {
	      registerSuccess: null,
	      successMsg: null
	    }
	  }).state('logins.loginloader', {
	    url: '/login-loader',
	    views: {
	      'main@logins': { templateUrl: getView('login-loader') }

	    },
	    data: {
	      bodyClass: 'hold-transition '
	    }
	  }).state('loginloader', {
	    url: '/login-loader',
	    views: {
	      'layout': {
	        templateUrl: getView('login-loader')
	      },
	      'header@app': {},
	      'footer@app': {}
	    },
	    data: {
	      bodyClass: 'hold-transition'
	    }
	  }).state('logins.userverification', {
	    url: '/userverification/:status',
	    views: {
	      'main@logins': {
	        templateUrl: getView('user-verification')
	      }
	    },
	    data: {
	      bodyClass: 'hold-transition'
	    },
	    params: {
	      status: null
	    }
	  }).state('logins.forgot_password', {
	    url: '/forgot-password',
	    views: {
	      'main@logins': {
	        templateUrl: getView('forgot-password')
	      },
	      'header@logins': {},
	      'footer@logins': {}
	    },
	    data: {
	      htmlClass: 'homepage-background reg-mobile',
	      bodyClass: 'login-background'
	    }
	  }).state('logins.reset_password', {
	    url: '/reset-password/:email/:token',
	    views: {
	      'main@logins': {
	        templateUrl: getView('reset-password')
	      },
	      'header@app': {},
	      'footer@app': {}
	    },
	    data: {
	      htmlClass: 'privacy-background reg-mobile',
	      bodyClass: 'login-background'
	    }
	  }).state('logins.university-information', {
	    url: '/university-information',
	    views: {
	      'main@logins': {
	        templateUrl: getView('reset-password')
	      },
	      'header@app': {},
	      'footer@app': {}
	    },
	    data: {
	      bodyClass: 'hold-transition',
	      id: '',
	      user: '',
	      email: '',
	      password: ''

	    }
	  })
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  /////////////////////////  profile pages  /////////////////////////
	  /////////////////////////    routes       /////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  .state('app.profile', {
	    abstract: true,
	    url: '/profile-:id',
	    data: {
	      auth: true,
	      template: 'post'
	    },
	    views: {
	      'main@app': {
	        templateUrl: getView('profile')
	      },
	      data: {
	        bodyClass: 'hold-transition  sw-toggled'
	      }
	    }
	  }).state('app.profile.about', {
	    url: '/about',
	    views: {
	      'pro': {
	        template: '<profile-about></profile-about>'
	      }
	    }
	  }).state('app.profile.connection', {
	    url: '/connection',
	    views: {
	      'pro': {
	        template: '<profile-connection></profile-connection>'
	      }
	    }
	  }).state('app.profile.connection.following', {
	    url: '/following',
	    views: {
	      'connection': {
	        template: '<profile-following></profile-following>'
	      }
	    }
	  }).state('app.profile.connection.follower', {
	    url: '/follower',
	    views: {
	      'connection': {
	        template: '<profile-follower></profile-follower>'
	      }
	    }
	  }).state('app.profile.timeline', {
	    url: '/timeline',
	    views: {
	      'post@app.profile.timeline': {
	        templateUrl: '../../pages/post/post.html'
	      },
	      'pro': {
	        template: '<profile-timeline></profile-timeline>'
	      }
	    }
	  }).state('app.profile.photo', {
	    url: '/media',
	    views: {
	      'pro': {
	        template: '<profile-media></profile-media>'
	      }
	    }
	  }).state('app.profile.photo.photo', {
	    url: '/photo',
	    views: {
	      'media': {
	        template: '<profile-photo></profile-photo>'
	      }
	    }
	  }).state('app.profile.photo.video', {
	    url: '/video',
	    views: {
	      'media': {
	        template: '<profile-video></profile-video>'
	      }
	    }
	  }).state('app.profile.schedule', {
	    url: '/schedule',
	    views: {
	      'pro': {
	        template: '<profile-schedule></profile-schedule>'
	      }
	    }
	  })

	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ////////////////////////virtualclass pages/////////////////////////
	  /////////////////////////    routes       /////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  .state('app.virtualclasses', {
	    url: '/virtualclasses',
	    views: {
	      'main@app': {
	        template: '<virtualclasses></virtualclasses>'
	      }
	    }
	  }).state('app.virtualclasses.archived', {
	    url: '/archived',
	    views: {
	      'main@app': {
	        template: '<virtualclasses-archived></virtualclasses-archived>'
	      }
	    }
	  }).state('app.virtualclass', {
	    abstract: true,
	    url: '/vc-:classid',
	    data: {
	      auth: true,
	      bodyClass: 'hold-transition  sw-toggled'
	    },
	    views: {
	      'main@app': {
	        templateUrl: getView('virtualclass')
	      }
	    }
	  }).state('app.virtualclass.discussion', {
	    url: '/discussion',
	    data: {
	      auth: true,
	      template: 'post'
	    }, params: {
	      classid: null
	    },
	    views: {
	      'post@app.virtualclass.discussion': {
	        templateUrl: '../../pages/post/post.html'
	      },
	      'vc': {
	        template: '<virtualclass-discussion></virtualclass-discussion>'
	      }
	    }
	  }).state('app.virtualclass.files', {
	    url: '/files',
	    params: {
	      classid: null
	    },
	    views: {
	      'file@app.virtualclass.files': {
	        templateUrl: '../../pages/post/file.html'
	      },
	      'vc': {
	        template: '<virtualclass-files></virtualclass-files>'
	      }
	    }
	  }).state('app.virtualclass.homework', {
	    url: '/homework',
	    params: {
	      classid: null
	    },
	    views: {
	      'homework@app.virtualclass.homework': {
	        templateUrl: '../../pages/post/homework.html'
	      },
	      'vc': {
	        template: '<virtualclass-homework></virtualclass-homework>'
	      }
	    }
	  }).state('app.virtualclass.chat', {
	    url: '/chat',
	    params: {
	      classid: null
	    },
	    views: {
	      'vc': {
	        template: '<virtualclass-chat></virtualclass-chat>'
	      }
	    }
	  }).state('app.virtualclass.exam', {
	    url: '/exam',
	    views: {
	      'exam@app.virtualclass.exam': {
	        templateUrl: '../../pages/post/exam.html'
	      },
	      'vc': {
	        template: '<virtualclass-exam></virtualclass-exam>'
	      }
	    }
	  }).state('app.virtualclass.student', {
	    url: '/student',
	    views: {
	      'vc': {
	        template: '<virtualclass-student></virtualclass-student>'
	      }
	    },
	    params: {
	      classid: null
	    }
	  }).state('app.virtualclass.options', {
	    url: '/options',
	    views: {
	      'vc': {
	        template: '<virtualclass-options></virtualclass-options>'
	      }
	    }
	  }).state('app.virtualclass.information', {
	    url: '/information',
	    views: {
	      'vc': {
	        template: '<virtualclass-information></virtualclass-information>'
	      }
	    }
	  }).state('app.virtualclass.instructions', {
	    url: '/instructions',
	    views: {
	      'vc': {
	        template: '<virtualclass-instructions></virtualclass-instructions>'
	      }
	    }
	  }).state('app.virtualclass.marks', {
	    url: '/marks',
	    views: {
	      'vc': {
	        template: '<virtualclass-marks></virtualclass-marks>'
	      }
	    }
	  }).state('app.virtualclass.attendance', {
	    url: '/attendance',
	    views: {
	      'vc': {
	        template: '<virtualclass-attendance></virtualclass-attendance>'
	      }
	    }
	  }).state('app.unauthorized', {
	    url: '/unauthorized',
	    views: {
	      'main@app': {
	        template: '<virtualclass-unauthorized></virtualclass-unauthorized>'
	      }
	    }
	  })

	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ////////////////////////institute pages/////////////////////////
	  /////////////////////////    routes       /////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  .state('app.institutes', {
	    url: '/institutes',
	    data: {
	      auth: true,
	      bodyClass: 'hold-transition sw-toggled'
	    },
	    views: {
	      'main@app': {
	        template: '<institutes></institutes>'
	      }
	    }
	  }).state('app.institute', {
	    url: '/institute-:instituteid',
	    data: {
	      auth: true,
	      bodyClass: 'hold-transition  sw-toggled'
	    },
	    views: {
	      'main@app': {
	        templateUrl: getView('institute')
	      }
	    }
	  }).state('app.institute.timeline', {
	    url: '/timeline',
	    views: {
	      'post@app.institute.timeline': {
	        templateUrl: '../../pages/post/post.html'
	      },
	      'ins': {
	        template: '<institute-timeline></institute-timeline>'
	      }
	    }
	  }).state('app.institute.about', {
	    url: '/about',
	    views: {
	      'ins': {
	        template: '<institute-about></institute-about>'
	      }
	    }
	  }).state('app.institute.attachments', {
	    url: '/attachments',
	    views: {
	      'ins': {
	        template: '<institute-attachments></institute-attachments>'
	      }
	    }
	  }).state('app.institute.attachments.photos', {
	    url: '/photos',
	    views: {
	      'ins': {
	        template: '<institute-photos></institute-photos>'
	      }
	    }
	  }).state('app.institute.attachments.videos', {
	    url: '/videos',
	    views: {
	      'ins': {
	        template: '<institute-videos></institute-videos>'
	      }
	    }
	  }).state('app.institute.colleges', {
	    url: '/colleges',
	    views: {
	      'ins': {
	        template: '<institute-colleges></institute-colleges>'
	      }
	    }
	  }).state('app.institute.department', {
	    url: '/department',
	    views: {
	      'ins': {
	        template: '<institute-department></institute-department>'
	      }
	    }
	  }).state('app.institute.specialties', {
	    url: '/specialties',
	    views: {
	      'ins': {
	        template: '<institute-specialties></institute-specialties>'
	      }
	    }
	  }).state('app.institute.members', {
	    url: '/members',
	    views: {
	      'ins': {
	        template: '<institute-members></institute-members>'
	      }
	    }
	  }).state('app.institute.events', {
	    url: '/events',
	    views: {
	      'ins': {
	        template: '<institute-events></institute-events>'
	      }
	    }
	  }).state('app.institute.volunteering', {
	    url: '/volunteering',
	    views: {
	      'ins': {
	        template: '<institute-volunteering></institute-volunteering>'
	      }
	    }
	  }).state('app.institute.statistics', {
	    url: '/statistics',
	    views: {
	      'ins': {
	        template: '<institute-statistics></institute-statistics>'
	      }
	    }
	  }).state('app.institute.messages', {
	    url: '/messages',
	    views: {
	      'ins': {
	        template: '<institute-messages></institute-messages>'
	      }
	    }
	  }).state('app.institute.jobs', {
	    url: '/jobs',
	    views: {
	      'ins': {
	        template: '<institute-jobs></institute-jobs>'
	      }
	    }
	  }).state('app.institute.grant', {
	    url: '/grant',
	    views: {
	      'ins': {
	        template: '<institute-grant></institute-grant>'
	      }
	    }
	  }).state('app.institute.vacations', {
	    url: '/vacations',
	    views: {
	      'ins': {
	        template: '<institute-vacations></institute-vacations>'
	      }
	    }
	  }).state('app.institute.groups', {
	    url: '/groups',
	    views: {
	      'ins': {
	        template: '<institute-groups></institute-groups>'
	      }
	    }
	  }).state('app.institute.achievements', {
	    url: '/achievements',
	    views: {
	      'ins': {
	        template: '<institute-achievements></institute-achievements>'
	      }
	    }
	  }).state('app.institute.parents', {
	    url: '/parents',
	    views: {
	      'ins': {
	        template: '<institute-parents></institute-parents>'
	      }
	    }
	  }).state('app.institute.settings', {
	    url: '/settings',
	    views: {
	      'ins': {
	        template: '<institute-settings></institute-settings>'
	      }
	    }
	  }).state('app.institute.marks', {
	    url: '/marks',
	    views: {
	      'ins': {
	        template: '<institute-marks></institute-marks>'
	      }
	    }
	  }).state('app.institute.courses', {
	    url: '/courses',
	    views: {
	      'ins': {
	        template: '<institute-courses></institute-courses>'
	      }
	    }
	  }).state('app.institute.virtualclass', {
	    url: '/virtualclass',
	    views: {
	      'ins': {
	        template: '<institute-virtualclass></institute-virtualclass>'
	      }
	    }
	  })
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ////////////////////////  companies pages /////////////////////////
	  /////////////////////////    routes       /////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  .state('app.companies', {
	    url: '/companies',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        templateUrl: getView('companies')
	      },
	      data: {
	        bodyClass: 'hold-transition  sw-toggled'
	      }
	    }
	  }).state('app.companies.timeline', {
	    url: '/timeline',
	    template: '<companies-timeline></companies-timeline>'
	  }).state('app.companies.about', {
	    url: '/about',
	    template: '<companies-about></companies-about>'
	  }).state('app.companies.photos', {
	    url: '/photos',
	    template: '<companies-photos></companies-photos>'
	  }).state('app.companies.videos', {
	    url: '/videos',
	    template: '<companies-videos></companies-videos>'
	  })
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////Miscellaneous pages/////////////////////////
	  /////////////////////////    routes       /////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////

	  .state('app.message', {
	    abstract: true,
	    data: {
	      auth: true,
	      bodyClass: 'hold-transition sw-toggled message-body'
	    },
	    views: {
	      'main@app': {
	        template: '<message></message>'
	      }
	    }
	  }).state('app.message.room', {
	    url: '/message:Room?',
	    template: '<message-room></message-room>'
	  }).state('app.suggestionsfriends', {
	    url: '/suggestionsfriends',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        templateUrl: getView('suggestionsfriends')

	      },
	      'suggestionsfriends@app.suggestionsfriends': {
	        templateUrl: '../../pages/misc/suggestionsfriends.html'
	      }
	    }
	  }).state('app.friendsrequests', {
	    url: '/friendsrequests',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        templateUrl: getView('friendsrequests')

	      },
	      'friendsrequests@app.friendsrequests': {
	        templateUrl: '../../pages/misc/friendsrequests.html'
	      }
	    }
	  }).state('app.widgets', {
	    url: '/widgets',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        template: '<widgets></widgets>'
	      }, 'support@app.support': {
	        templateUrl: '../../pages/misc/support.html'
	      }
	    }
	  }).state('app.support', {
	    url: '/support',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        templateUrl: getView('support')
	      }, 'support@app.support': {
	        templateUrl: '../../pages/misc/support.html'
	      }
	    }
	  })
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ////////////////////////    groups pages  /////////////////////////
	  /////////////////////////    routes       /////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////

	  .state('app.groups', {
	    url: '/groups',
	    views: {
	      'main@app': {
	        templateUrl: getView('groups')
	      },
	      data: {
	        auth: true,
	        bodyClass: 'hold-transition sw-toggled'
	      },
	      params: {
	        groupcategory: null
	      }
	    }
	  }).state('app.groups.index', {
	    url: '/all',
	    params: {
	      groupcategory: null
	    },
	    views: {
	      'group@app.groups.index': {
	        templateUrl: '../../pages/misc/group.html'
	      },
	      'gro': {
	        template: '<groups-index></groups-index>'
	      }
	    }
	  }).state('app.groups.all', {
	    url: '/all-:groupcategory',
	    params: {
	      groupcategory: null
	    },
	    views: {
	      'group@app.groups.all': {
	        templateUrl: '../../pages/misc/group.html'
	      },
	      'gro': {
	        template: '<group-all></group-all>'
	      }
	    }
	  }).state('app.groups.Invitations', {
	    url: '/Invitations',
	    views: {
	      'group@app.groups.Invitations': {
	        templateUrl: '../../pages/misc/group.html'
	      },
	      'gro': {
	        template: '<groups-Invitations></groups-Invitations>'
	      }
	    }
	  }).state('app.group', {
	    url: '/group-:groupid',
	    params: {
	      groupid: null
	    },
	    views: {
	      'main@app': {
	        templateUrl: getView('group')
	      },
	      data: {
	        bodyClass: 'hold-transition sw-toggled'
	      }
	    }
	  }).state('app.group.discussion', {
	    url: '/discussion',
	    data: {
	      auth: true
	    }, params: {
	      groupid: null
	    },
	    views: {
	      'post@app.group.discussion': {
	        templateUrl: '../../pages/post/post.html'
	      },
	      'group': {
	        template: '<group-discussion></group-discussion>'
	      }
	    }
	  }).state('app.group.chat', {
	    url: '/chat',
	    params: {
	      classid: null
	    },
	    views: {
	      'group': {
	        template: '<group-chat></group-chat>'
	      }
	    }
	  }).state('app.group.information', {
	    url: '/information',
	    params: {
	      classid: null
	    },
	    views: {
	      'group': {
	        template: '<group-information></group-information>'
	      }
	    }
	  }).state('app.group.members', {
	    url: '/members',
	    params: {
	      classid: null
	    },
	    views: {
	      'group': {
	        template: '<group-members></group-members>'
	      }
	    }
	  }).state('app.group.members-requests', {
	    url: '/members-requests',
	    params: {
	      classid: null
	    },
	    views: {
	      'group': {
	        template: '<group-members-requests></group-members-requests>'
	      }
	    }
	  }).state('app.group.options', {
	    url: '/options',
	    template: '<group-options></group-options>',
	    params: {
	      classid: null
	    }
	  }).state('app.group.attachments', {
	    url: '/attachments',
	    params: {
	      classid: null
	    },
	    views: {
	      'group': {
	        template: '<group-attachments></group-attachments>'
	      }
	    }
	  }).state('app.group.attachments.photos', {
	    url: '/photos',
	    params: {
	      classid: null
	    },
	    template: '<group-attachments-photos></group-attachments-photos>'
	  }).state('app.group.attachments.videos', {
	    url: '/videos',
	    params: {
	      classid: null
	    },
	    template: '<group-attachments-videos></group-attachments-videos>'
	  }).state('app.group.attachments.files', {
	    url: '/files',
	    params: {
	      classid: null
	    },
	    template: '<group-attachments-files></group-attachments-files>'
	  }).state('app.group.redirect', {
	    url: '/group-redirect',
	    template: '<group-redirect></group-redirect>'
	  }).state('app.logout', {
	    url: '/logout',
	    views: {
	      'main@app': {
	        controller: ["chatMessages", "$rootScope", "$scope", "$auth", "$state", "AclService", "API", function controller(chatMessages, $rootScope, $scope, $auth, $state, AclService, API) {
	          $auth.logout().then(function () {
	            delete $rootScope.me;
	            AclService.flushRoles();
	            AclService.setAbilities({});
	            chatMessages.signOut();
	            API.all('auth/logout').get('').then(function (response) {
	              window.location.href = "/";
	            });
	          });
	        }]
	      }
	    }
	  }).state('login', {
	    url: '/log-in',
	    views: {
	      'main@app': {
	        controller: ["$state", function controller($state) {
	          $state.go('logins.login.index');
	        }]
	      }
	    }
	  }).state('app.test', {
	    url: '/ahmad-test',
	    views: {
	      'main@app': {
	        template: '<ahmad-test></ahmad-test>'
	      }
	    }
	  }).state('app.test2', {
	    url: '/test2',
	    views: {
	      'main@app': {
	        template: '<coming-soon></coming-soon>'
	      }
	    }
	  });
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	LoadingBarConfig.$inject = ["cfpLoadingBarProvider"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LoadingBarConfig = LoadingBarConfig;
	function LoadingBarConfig(cfpLoadingBarProvider) {
	  'ngInject';

	  cfpLoadingBarProvider.includeSpinner = true;
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	SatellizerConfig.$inject = ["$authProvider"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SatellizerConfig = SatellizerConfig;
	function SatellizerConfig($authProvider) {
	  'ngInject';

	  $authProvider.httpInterceptor = function () {
	    return true;
	  };

	  $authProvider.loginUrl = '/api/auth/login';
	  $authProvider.signupUrl = '/api/auth/register';
	  $authProvider.tokenRoot = 'data'; // compensates success response macro
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _date_millis = __webpack_require__(10);

	var _capitalize = __webpack_require__(11);

	var _human_readable = __webpack_require__(12);

	var _truncate_characters = __webpack_require__(13);

	var _truncate_words = __webpack_require__(14);

	var _trust_html = __webpack_require__(15);

	var _trustAsResourceUrl = __webpack_require__(16);

	var _ucfirst = __webpack_require__(17);

	angular.module('app.filters').filter('datemillis', _date_millis.DateMillisFilter).filter('capitalize', _capitalize.CapitalizeFilter).filter('humanreadable', _human_readable.HumanReadableFilter).filter('truncateCharacters', _truncate_characters.TruncatCharactersFilter).filter('truncateWords', _truncate_words.TruncateWordsFilter).filter('trustHtml', _trust_html.TrustHtmlFilter).filter('trustAsResourceUrl', _trustAsResourceUrl.TrustAsResourceUrlFilter).filter('ucfirst', _ucfirst.UcFirstFilter);

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DateMillisFilter = DateMillisFilter;
	function DateMillisFilter() {
	  'ngInject';

	  return function (input) {
	    return Date.parse(input);
	  };
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CapitalizeFilter = CapitalizeFilter;
	function CapitalizeFilter() {
	  return function (input) {
	    return input ? input.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
	      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	    }) : '';
	  };
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.HumanReadableFilter = HumanReadableFilter;
	function HumanReadableFilter() {
	  return function humanize(str) {
	    if (!str) {
	      return '';
	    }
	    var frags = str.split('_');
	    for (var i = 0; i < frags.length; i++) {
	      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
	    }
	    return frags.join(' ');
	  };
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TruncatCharactersFilter = TruncatCharactersFilter;
	function TruncatCharactersFilter() {
	  return function (input, chars, breakOnWord) {
	    if (isNaN(chars)) {
	      return input;
	    }
	    if (chars <= 0) {
	      return '';
	    }
	    if (input && input.length > chars) {
	      input = input.substring(0, chars);

	      if (!breakOnWord) {
	        var lastspace = input.lastIndexOf(' ');
	        // Get last space
	        if (lastspace !== -1) {
	          input = input.substr(0, lastspace);
	        }
	      } else {
	        while (input.charAt(input.length - 1) === ' ') {
	          input = input.substr(0, input.length - 1);
	        }
	      }
	      return input + '...';
	    }
	    return input;
	  };
	}

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TruncateWordsFilter = TruncateWordsFilter;
	function TruncateWordsFilter() {
	  return function (input, words) {
	    if (isNaN(words)) {
	      return input;
	    }
	    if (words <= 0) {
	      return '';
	    }
	    if (input) {
	      var inputWords = input.split(/\s+/);
	      if (inputWords.length > words) {
	        input = inputWords.slice(0, words).join(' ') + '...';
	      }
	    }
	    return input;
	  };
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TrustHtmlFilter = TrustHtmlFilter;
	function TrustHtmlFilter($sce) {
	  return function (html) {
	    return $sce.trustAsHtml(html);
	  };
	}

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TrustAsResourceUrlFilter = TrustAsResourceUrlFilter;
	function TrustAsResourceUrlFilter($sce) {
	  return function (val) {
	    return $sce.trustAsResourceUrl(val);
	  };
	}

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UcFirstFilter = UcFirstFilter;
	function UcFirstFilter() {
	  return function (input) {
	    if (!input) {
	      return null;
	    }
	    return input.substring(0, 1).toUpperCase() + input.substring(1);
	  };
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _friendsrequests = __webpack_require__(19);

	var _virtualclassesArchived = __webpack_require__(20);

	var _virtualclasses = __webpack_require__(21);

	var _bookbankAbout = __webpack_require__(22);

	var _booksbankMybooks = __webpack_require__(23);

	var _jobs = __webpack_require__(24);

	var _virtualclassAttendance = __webpack_require__(25);

	var _virtualclassMarks = __webpack_require__(26);

	var _instituteStatistics = __webpack_require__(27);

	var _instituteVirtualclass = __webpack_require__(28);

	var _instituteCourses = __webpack_require__(29);

	var _instituteSettings = __webpack_require__(30);

	var _instituteParents = __webpack_require__(31);

	var _instituteAchievements = __webpack_require__(32);

	var _instituteGroups = __webpack_require__(33);

	var _instituteVacations = __webpack_require__(34);

	var _instituteGrant = __webpack_require__(35);

	var _instituteJobs = __webpack_require__(36);

	var _instituteMessages = __webpack_require__(37);

	var _instituteVolunteering = __webpack_require__(38);

	var _instituteEvents = __webpack_require__(39);

	var _booksbank = __webpack_require__(40);

	var _course = __webpack_require__(41);

	var _courses = __webpack_require__(42);

	var _instituteloginBody = __webpack_require__(43);

	var _instituteloginFooter = __webpack_require__(44);

	var _instituteloginHeader = __webpack_require__(45);

	var _instituteSpecializations = __webpack_require__(46);

	var _instituteDepartment = __webpack_require__(47);

	var _institutes = __webpack_require__(48);

	var _addingInstitutions = __webpack_require__(49);

	var _footerInstitutions = __webpack_require__(50);

	var _headerInstitutions = __webpack_require__(51);

	var _educationalInstitutions = __webpack_require__(52);

	var _instituteMembers = __webpack_require__(53);

	var _instituteAttachments = __webpack_require__(54);

	var _messageRoom = __webpack_require__(55);

	var _groupChat = __webpack_require__(56);

	var _ahmadTest = __webpack_require__(57);

	var _groupsInvitations = __webpack_require__(58);

	var _groupMembersRequests = __webpack_require__(59);

	var _membersRequests = __webpack_require__(60);

	var _groupsIndex = __webpack_require__(61);

	var _groupAll = __webpack_require__(62);

	var _groupRedirect = __webpack_require__(63);

	var _resultsClassexam = __webpack_require__(64);

	var _resultsClasshomework = __webpack_require__(65);

	var _resultsClasspost = __webpack_require__(66);

	var _resultsClassfile = __webpack_require__(67);

	var _virtualclassInstructions = __webpack_require__(68);

	var _otherwise = __webpack_require__(69);

	var _registrationEducation = __webpack_require__(70);

	var _specializationAttachmentsHomework = __webpack_require__(71);

	var _specializationAttachmentsPhotos = __webpack_require__(72);

	var _specializationAttachmentsVideos = __webpack_require__(73);

	var _specializationAttachmentsFiles = __webpack_require__(74);

	var _specializationAttachments = __webpack_require__(75);

	var _specializationAttachment = __webpack_require__(76);

	var _resultsPost = __webpack_require__(77);

	var _results = __webpack_require__(78);

	var _groupAttachmentsVideos = __webpack_require__(79);

	var _groupAttachmentsPhotos = __webpack_require__(80);

	var _groupAttachmentsPhoto = __webpack_require__(81);

	var _groupAttachmentsFiles = __webpack_require__(82);

	var _groupAttachments = __webpack_require__(83);

	var _support = __webpack_require__(84);

	var _registrationBox = __webpack_require__(85);

	var _loginBox = __webpack_require__(86);

	var _specializationInstructors = __webpack_require__(87);

	var _specializationGroups = __webpack_require__(88);

	var _specializationPhotos = __webpack_require__(89);

	var _specializationVideos = __webpack_require__(90);

	var _specializationFiles = __webpack_require__(91);

	var _specializationStudents = __webpack_require__(92);

	var _specializationHomework = __webpack_require__(93);

	var _specializationMaterials = __webpack_require__(94);

	var _specializationDiscussion = __webpack_require__(95);

	var _specialization = __webpack_require__(96);

	var _search = __webpack_require__(97);

	var _notifications = __webpack_require__(98);

	var _groupOptions = __webpack_require__(99);

	var _groupMembers = __webpack_require__(100);

	var _groupInformation = __webpack_require__(101);

	var _groupFiles = __webpack_require__(102);

	var _groupDiscussion = __webpack_require__(103);

	var _groups = __webpack_require__(104);

	var _group = __webpack_require__(105);

	var _virtualclassUnauthorized = __webpack_require__(106);

	var _virtualclassInformation = __webpack_require__(107);

	var _profileSchedule = __webpack_require__(108);

	var _post = __webpack_require__(109);

	var _comment = __webpack_require__(110);

	var _loginRedirect = __webpack_require__(111);

	var _loginIndex = __webpack_require__(112);

	var _login = __webpack_require__(113);

	var _registerLoader = __webpack_require__(114);

	var _registerMail = __webpack_require__(115);

	var _registerError = __webpack_require__(116);

	var _register = __webpack_require__(117);

	var _registerConfirm = __webpack_require__(118);

	var _registerClass = __webpack_require__(119);

	var _registerInformation = __webpack_require__(120);

	var _registerMain = __webpack_require__(121);

	var _registerType = __webpack_require__(122);

	var _companies = __webpack_require__(123);

	var _companiesVideos = __webpack_require__(124);

	var _companiesPhotos = __webpack_require__(125);

	var _companiesAbout = __webpack_require__(126);

	var _companiesTimeline = __webpack_require__(127);

	var _profileVideo = __webpack_require__(128);

	var _profileMedia = __webpack_require__(129);

	var _profileFollower = __webpack_require__(130);

	var _profileFollowing = __webpack_require__(131);

	var _instituteColleges = __webpack_require__(132);

	var _instituteSpecialties = __webpack_require__(133);

	var _instituteVideos = __webpack_require__(134);

	var _institutePhotos = __webpack_require__(135);

	var _instituteTimeline = __webpack_require__(136);

	var _timeline = __webpack_require__(137);

	var _instituteAbout = __webpack_require__(138);

	var _institute = __webpack_require__(139);

	var _loginUniversitySocial = __webpack_require__(140);

	var _loginConfirmdata = __webpack_require__(141);

	var _loginUniversity = __webpack_require__(142);

	var _virtualclassOptions = __webpack_require__(143);

	var _virtualclassStudent = __webpack_require__(144);

	var _virtualclassExam = __webpack_require__(145);

	var _virtualclassChat = __webpack_require__(146);

	var _virtualclassHomework = __webpack_require__(147);

	var _virtualclassFiles = __webpack_require__(148);

	var _virtualclassDiscussion = __webpack_require__(149);

	var _virtualclass = __webpack_require__(150);

	var _suggestionsfriends = __webpack_require__(151);

	var _message = __webpack_require__(152);

	var _myEnter = __webpack_require__(153);

	var _profile = __webpack_require__(154);

	var _profileConnection = __webpack_require__(155);

	var _profilePhoto = __webpack_require__(156);

	var _profileAbout = __webpack_require__(157);

	var _profileTimeline = __webpack_require__(158);

	var _logHead = __webpack_require__(159);

	var _foot = __webpack_require__(160);

	var _notification = __webpack_require__(161);

	var _nav = __webpack_require__(162);

	var _sidebar = __webpack_require__(163);

	var _chat = __webpack_require__(164);

	var _home = __webpack_require__(165);

	var _login2 = __webpack_require__(166);

	var _loginMain = __webpack_require__(167);

	var _loginFooter = __webpack_require__(168);

	var _loginHeader = __webpack_require__(169);

	var _uiModal = __webpack_require__(170);

	var _uiTimeline = __webpack_require__(171);

	var _uiButtons = __webpack_require__(172);

	var _uiIcons = __webpack_require__(173);

	var _uiGeneral = __webpack_require__(174);

	var _formsGeneral = __webpack_require__(175);

	var _chartsChartjs = __webpack_require__(176);

	var _widgets = __webpack_require__(177);

	var _userProfile = __webpack_require__(178);

	var _userVerification = __webpack_require__(179);

	var _comingSoon = __webpack_require__(180);

	var _userEdit = __webpack_require__(181);

	var _userPermissionsEdit = __webpack_require__(182);

	var _userPermissionsAdd = __webpack_require__(183);

	var _userPermissions = __webpack_require__(184);

	var _userRolesEdit = __webpack_require__(185);

	var _userRolesAdd = __webpack_require__(186);

	var _userRoles = __webpack_require__(187);

	var _userLists = __webpack_require__(188);

	var _dashboard = __webpack_require__(189);

	var _navSidebar = __webpack_require__(190);

	var _navHeader = __webpack_require__(191);

	var _loginLoader = __webpack_require__(192);

	var _resetPassword = __webpack_require__(193);

	var _forgotPassword = __webpack_require__(194);

	var _loginForm = __webpack_require__(195);

	angular.module('app.components').component('friendsrequests', _friendsrequests.FriendsrequestsComponent).component('virtualclassesArchived', _virtualclassesArchived.VirtualclassesArchivedComponent).component('virtualclasses', _virtualclasses.VirtualclassesComponent).component('bookbankAbout', _bookbankAbout.BookbankAboutComponent).component('booksbankMybooks', _booksbankMybooks.BooksbankMybooksComponent).component('jobs', _jobs.JobsComponent).component('virtualclassAttendance', _virtualclassAttendance.VirtualclassAttendanceComponent).component('virtualclassMarks', _virtualclassMarks.VirtualclassMarksComponent).component('instituteStatistics', _instituteStatistics.InstituteStatisticsComponent).component('instituteVirtualclass', _instituteVirtualclass.InstituteVirtualclassComponent).component('instituteCourses', _instituteCourses.InstituteCoursesComponent).component('instituteSettings', _instituteSettings.InstituteSettingsComponent).component('instituteParents', _instituteParents.InstituteParentsComponent).component('instituteAchievements', _instituteAchievements.InstituteAchievementsComponent).component('instituteGroups', _instituteGroups.InstituteGroupsComponent).component('instituteVacations', _instituteVacations.InstituteVacationsComponent).component('instituteGrant', _instituteGrant.InstituteGrantComponent).component('instituteJobs', _instituteJobs.InstituteJobsComponent).component('instituteMessages', _instituteMessages.InstituteMessagesComponent).component('instituteVolunteering', _instituteVolunteering.InstituteVolunteeringComponent).component('instituteEvents', _instituteEvents.InstituteEventsComponent).component('booksbank', _booksbank.BooksbankComponent).component('course', _course.CourseComponent).component('courses', _courses.CoursesComponent).component('instituteloginBody', _instituteloginBody.InstituteloginBodyComponent).component('instituteloginFooter', _instituteloginFooter.InstituteloginFooterComponent).component('instituteloginHeader', _instituteloginHeader.InstituteloginHeaderComponent).component('instituteSpecializations', _instituteSpecializations.InstituteSpecializationsComponent).component('instituteDepartment', _instituteDepartment.InstituteDepartmentComponent).component('institutes', _institutes.InstitutesComponent).component('addingInstitutions', _addingInstitutions.AddingInstitutionsComponent).component('footerInstitutions', _footerInstitutions.FooterInstitutionsComponent).component('headerInstitutions', _headerInstitutions.HeaderInstitutionsComponent).component('educationalInstitutions', _educationalInstitutions.EducationalInstitutionsComponent).component('instituteMembers', _instituteMembers.InstituteMembersComponent).component('instituteAttachments', _instituteAttachments.InstituteAttachmentsComponent).component('messageRoom', _messageRoom.MessageRoomComponent).component('groupChat', _groupChat.GroupChatComponent).component('ahmadTest', _ahmadTest.AhmadTestComponent).component('groupsInvitations', _groupsInvitations.GroupsInvitationsComponent).component('groupMembersRequests', _groupMembersRequests.GroupMembersRequestsComponent).component('membersRequests', _membersRequests.MembersRequestsComponent).component('groupsIndex', _groupsIndex.GroupsIndexComponent).component('groupAll', _groupAll.GroupAllComponent).component('groupRedirect', _groupRedirect.GroupRedirectComponent).component('virtualclassInstructions', _virtualclassInstructions.VirtualclassInstructionsComponent).component('otherwise', _otherwise.OtherwiseComponent).component('registrationEducation', _registrationEducation.RegistrationEducationComponent).component('specializationAttachmentsHomework', _specializationAttachmentsHomework.SpecializationAttachmentsHomeworkComponent).component('specializationAttachmentsPhotos', _specializationAttachmentsPhotos.SpecializationAttachmentsPhotosComponent).component('specializationAttachmentsVideos', _specializationAttachmentsVideos.SpecializationAttachmentsVideosComponent).component('specializationAttachmentsFiles', _specializationAttachmentsFiles.SpecializationAttachmentsFilesComponent).component('specializationAttachments', _specializationAttachments.SpecializationAttachmentsComponent).component('specializationAttachment', _specializationAttachment.SpecializationAttachmentComponent).component('resultsClassexam', _resultsClassexam.ResultsClassexamComponent).component('resultsClasshomework', _resultsClasshomework.ResultsClasshomeworkComponent).component('resultsClasspost', _resultsClasspost.ResultsClasspostComponent).component('resultsClassfile', _resultsClassfile.ResultsClassfileComponent).component('resultsPost', _resultsPost.ResultsPostComponent).component('results', _results.ResultsComponent).component('groupAttachmentsVideos', _groupAttachmentsVideos.GroupAttachmentsVideosComponent).component('groupAttachmentsPhotos', _groupAttachmentsPhotos.GroupAttachmentsPhotosComponent).component('groupAttachmentsPhoto', _groupAttachmentsPhoto.GroupAttachmentsPhotoComponent).component('groupAttachmentsFiles', _groupAttachmentsFiles.GroupAttachmentsFilesComponent).component('groupAttachments', _groupAttachments.GroupAttachmentsComponent).component('support', _support.SupportComponent).component('registrationBox', _registrationBox.RegistrationBoxComponent).component('loginBox', _loginBox.LoginBoxComponent).component('specializationInstructors', _specializationInstructors.SpecializationInstructorsComponent).component('specializationGroups', _specializationGroups.SpecializationGroupsComponent).component('specializationPhotos', _specializationPhotos.SpecializationPhotosComponent).component('specializationVideos', _specializationVideos.SpecializationVideosComponent).component('specializationFiles', _specializationFiles.SpecializationFilesComponent).component('specializationStudents', _specializationStudents.SpecializationStudentsComponent).component('specializationHomework', _specializationHomework.SpecializationHomeworkComponent).component('specializationMaterials', _specializationMaterials.SpecializationMaterialsComponent).component('specializationDiscussion', _specializationDiscussion.SpecializationDiscussionComponent).component('specialization', _specialization.SpecializationComponent).component('search', _search.SearchComponent).component('notifications', _notifications.NotificationsComponent).component('groupOptions', _groupOptions.GroupOptionsComponent).component('groupMembers', _groupMembers.GroupMembersComponent).component('groupInformation', _groupInformation.GroupInformationComponent).component('groupFiles', _groupFiles.GroupFilesComponent).component('groupDiscussion', _groupDiscussion.GroupDiscussionComponent).component('groups', _groups.GroupsComponent).component('group', _group.GroupComponent).component('virtualclassUnauthorized', _virtualclassUnauthorized.VirtualclassUnauthorizedComponent).component('virtualclassInformation', _virtualclassInformation.VirtualclassInformationComponent).component('profileSchedule', _profileSchedule.ProfileScheduleComponent).component('post', _post.PostComponent).component('comment', _comment.CommentComponent).component('loginRedirect', _loginRedirect.LoginRedirectComponent).component('loginIndex', _loginIndex.LoginIndexComponent).component('login3', _login.Login3Component).component('registerLoader', _registerLoader.RegisterLoaderComponent).component('registerMail', _registerMail.RegisterMailComponent).component('registerError', _registerError.RegisterErrorComponent).component('register', _register.RegisterComponent).component('registerConfirm', _registerConfirm.RegisterConfirmComponent).component('registerClass', _registerClass.RegisterClassComponent).component('registerInformation', _registerInformation.RegisterInformationComponent).component('registerMain', _registerMain.RegisterMainComponent).component('registerType', _registerType.RegisterTypeComponent).component('companies', _companies.CompaniesComponent).component('companiesVideos', _companiesVideos.CompaniesVideosComponent).component('companiesPhotos', _companiesPhotos.CompaniesPhotosComponent).component('companiesAbout', _companiesAbout.CompaniesAboutComponent).component('companiesTimeline', _companiesTimeline.CompaniesTimelineComponent).component('profileVideo', _profileVideo.ProfileVideoComponent).component('profileMedia', _profileMedia.ProfileMediaComponent).component('profileFollower', _profileFollower.ProfileFollowerComponent).component('profileFollowing', _profileFollowing.ProfileFollowingComponent).component('instituteColleges', _instituteColleges.instituteCollegesComponent).component('instituteSpecialties', _instituteSpecialties.instituteSpecialtiesComponent).component('instituteVideos', _instituteVideos.instituteVideosComponent).component('institutePhotos', _institutePhotos.institutePhotosComponent).component('instituteTimeline', _instituteTimeline.instituteTimelineComponent).component('timeline', _timeline.TimelineComponent).component('instituteAbout', _instituteAbout.instituteAboutComponent).component('institute', _institute.instituteComponent).component('loginUniversitySocial', _loginUniversitySocial.LoginUniversitySocialComponent).component('loginConfirmdata', _loginConfirmdata.LoginConfirmdataComponent).component('loginUniversity', _loginUniversity.LoginUniversityComponent).component('virtualclassOptions', _virtualclassOptions.VirtualclassOptionsComponent).component('virtualclassStudent', _virtualclassStudent.VirtualclassStudentComponent).component('virtualclassExam', _virtualclassExam.VirtualclassExamComponent).component('virtualclassChat', _virtualclassChat.VirtualclassChatComponent).component('virtualclassHomework', _virtualclassHomework.VirtualclassHomeworkComponent).component('virtualclassFiles', _virtualclassFiles.VirtualclassFilesComponent).component('virtualclassDiscussion', _virtualclassDiscussion.VirtualclassDiscussionComponent).component('virtualclass', _virtualclass.VirtualclassComponent).component('suggestionsfriends', _suggestionsfriends.SuggestionsfriendsComponent).component('message', _message.MessageComponent).component('myEnter', _myEnter.MyEnterComponent).component('profile', _profile.ProfileComponent).component('profileConnection', _profileConnection.ProfileConnectionComponent).component('profilePhoto', _profilePhoto.ProfilePhotoComponent).component('profileAbout', _profileAbout.ProfileAboutComponent).component('profileTimeline', _profileTimeline.ProfileTimelineComponent).component('logHead', _logHead.LogHeadComponent).component('foot', _foot.FootComponent).component('notification', _notification.NotificationComponent).component('nav', _nav.NavComponent).component('sidebar', _sidebar.SidebarComponent).component('chat', _chat.ChatComponent).component('home', _home.HomeComponent).component('login2', _login2.Login2Component).component('loginMain', _loginMain.LoginMainComponent).component('loginFooter', _loginFooter.LoginFooterComponent).component('loginHeader', _loginHeader.LoginHeaderComponent).component('uiModal', _uiModal.UiModalComponent).component('uiTimeline', _uiTimeline.UiTimelineComponent).component('uiButtons', _uiButtons.UiButtonsComponent).component('uiIcons', _uiIcons.UiIconsComponent).component('uiGeneral', _uiGeneral.UiGeneralComponent).component('formsGeneral', _formsGeneral.FormsGeneralComponent).component('chartsChartjs', _chartsChartjs.ChartsChartjsComponent).component('widgets', _widgets.WidgetsComponent).component('userProfile', _userProfile.UserProfileComponent).component('userVerification', _userVerification.UserVerificationComponent).component('comingSoon', _comingSoon.ComingSoonComponent).component('userEdit', _userEdit.UserEditComponent).component('userPermissionsEdit', _userPermissionsEdit.UserPermissionsEditComponent).component('userPermissionsAdd', _userPermissionsAdd.UserPermissionsAddComponent).component('userPermissions', _userPermissions.UserPermissionsComponent).component('userRolesEdit', _userRolesEdit.UserRolesEditComponent).component('userRolesAdd', _userRolesAdd.UserRolesAddComponent).component('userRoles', _userRoles.UserRolesComponent).component('userLists', _userLists.UserListsComponent).component('dashboard', _dashboard.DashboardComponent).component('navSidebar', _navSidebar.NavSidebarComponent).component('navHeader', _navHeader.NavHeaderComponent).component('loginLoader', _loginLoader.LoginLoaderComponent).component('resetPassword', _resetPassword.ResetPasswordComponent).component('forgotPassword', _forgotPassword.ForgotPasswordComponent).component('loginForm', _loginForm.LoginFormComponent);

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FriendsrequestsController = function () {
	    FriendsrequestsController.$inject = ["API", "Post", "$rootScope", "$timeout", "moment", "Upload", "$log", "$scope"];
	    function FriendsrequestsController(API, Post, $rootScope, $timeout, moment, Upload, $log, $scope) {
	        'ngInject';

	        _classCallCheck(this, FriendsrequestsController);

	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	        this.API = API;
	        var Post = this.Post;
	        this.Post.seturl('api/home/friend-requests');
	        this.Post.setediturl('me/post-update');
	        this.Post.settype('friend');
	        this.Post.setskip(0);
	        this.Post.settake(6);
	        this.Post.getPost().then(function (response) {
	            $scope.dat = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	            $rootScope.busy = false;
	        });
	        $scope.getPost = function () {
	            Post.getPost().then(function (response) {
	                $scope.dat = Post.getPostat();
	                $scope.nopost = Post.getnopost();
	                $rootScope.busy = false;
	            });
	        };
	        // $scope.friend = [
	        //     {
	        //       avatar: 'img/icons/infinity.svg',
	        //       id: 100158,
	        //       name: "Hamzeh Alnatsheh",
	        //       created_at: "2018-02-08 13:03:08"
	        //     },
	        //     {
	        //       avatar: 'img/icons/infinity.svg',
	        //       id: 100158,
	        //       name: "Hamzeh Alnatsheh",
	        //       created_at: "2018-02-08 13:03:08"  
	        //     }
	        // ];
	        // 
	    }

	    _createClass(FriendsrequestsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return FriendsrequestsController;
	}();

	var FriendsrequestsComponent = exports.FriendsrequestsComponent = {
	    templateUrl: './views/app/components/friendsrequests/friendsrequests.component.html',
	    controller: FriendsrequestsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VirtualclassesArchivedController = function () {
	    VirtualclassesArchivedController.$inject = ["$scope", "$rootScope", "API", "$stateParams", "Post", "$timeout", "moment", "Upload", "$log"];
	    function VirtualclassesArchivedController($scope, $rootScope, API, $stateParams, Post, $timeout, moment, Upload, $log) {
	        'ngInject';
	        //

	        _classCallCheck(this, VirtualclassesArchivedController);

	        $rootScope.pageTitle = 'المواد الدراسية';
	        angular.element('meta[name=Keywords]').attr('content', 'المواد الدراسية ادزنس');
	        angular.element('meta[name=Description]').attr('content', 'تواصل مع مدرسيك وزملائك , احصل على ملفاتك الدراسية و على تنبيهات امتحانات , شارك الطلاب الجامعيين آرائك ونقاشاتك .');
	        angular.element('html').scrollTop(0);
	        this.$scope = $scope;
	        this.$rootScope = $rootScope;
	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	        var Post = this.Post;
	        this.Post.seturl('home/archived');
	        this.Post.setskip(0);
	        this.Post.settake(4);
	        angular.element('html').scrollTop(0);
	        this.Post.getPost().then(function (response) {
	            $scope.archived = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	            $rootScope.busy = false;
	        });
	        this.$scope = $scope;
	        //this.$scope.dat=this.Post.getPostat();
	        this.$scope = $scope;
	        $scope.getPost = function () {
	            Post.getPost().then(function (response) {
	                $scope.archived = Post.getPostat();
	                $scope.nopost = Post.getnopost();
	                $rootScope.busy = false;
	            });
	        };
	        $scope.callback = function () {
	            $scope.nopost = Post.getnopost();
	        };
	    }

	    _createClass(VirtualclassesArchivedController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return VirtualclassesArchivedController;
	}();

	var VirtualclassesArchivedComponent = exports.VirtualclassesArchivedComponent = {
	    templateUrl: './views/app/components/virtualclasses-archived/virtualclasses-archived.component.html',
	    controller: VirtualclassesArchivedController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VirtualclassesController = function () {
	    VirtualclassesController.$inject = ["$rootScope", "$state", "$scope", "moment", "API", "toastr", "$stateParams"];
	    function VirtualclassesController($rootScope, $state, $scope, moment, API, toastr, $stateParams) {
	        'ngInject';

	        _classCallCheck(this, VirtualclassesController);

	        this.$scope = $scope;
	        this.$scope.moment = moment;
	        this.$rootScope = $rootScope;
	        this.API = API;
	        this.toastr = toastr;
	        this.classEnabled = true;
	        this.newclass = false;
	        this.newuserclass = false;
	        this.newcoursecode = '';
	        this.classsubmit = false;
	        this.sclasssubmit = false;
	        $rootScope.pageTitle = 'المواد الدراسية';
	        angular.element('meta[name=Keywords]').attr('content', 'المواد الدراسية ادزنس');
	        angular.element('meta[name=Description]').attr('content', 'تواصل مع مدرسيك وزملائك , احصل على ملفاتك الدراسية و على تنبيهات امتحانات , شارك الطلاب الجامعيين آرائك ونقاشاتك .');
	        angular.element('html').scrollTop(0);
	        // 
	        $scope.fromtime = new Date();
	        $scope.totime = new Date();
	        this.vday = false;

	        this.$scope.fromtime = $scope.fromtime;
	        this.$scope.totime = $scope.totime;
	        $scope.fromtime.setHours(0);
	        $scope.fromtime.setMinutes(0);
	        $scope.totime.setHours(0);
	        $scope.totime.setMinutes(0);
	        API.all('home/classes').get('').then(function (response) {
	            $scope.owened = response.data.owened;
	            $scope.entered = response.data.entered;
	            $scope.loader = 1;
	        });
	        $scope.fromChanged = function (fromtime) {
	            $scope.fromtime.setHours(fromtime.getHours());
	            $scope.fromtime.setMinutes(fromtime.getMinutes());
	        };
	        $scope.totimeChanged = function (totime) {
	            $scope.totime.setHours(totime.getHours());
	            $scope.totime.setMinutes(totime.getMinutes());
	        };
	        $scope.fromMembership = function (fromtime) {
	            $scope.membership.from.setHours(fromtime.getHours());
	            $scope.membership.from.setMinutes(fromtime.getMinutes());
	        };
	        $scope.totimeMembership = function (totime) {
	            $scope.membership.to.setHours(totime.getHours());
	            $scope.membership.to.setMinutes(totime.getMinutes());
	        };
	    }

	    _createClass(VirtualclassesController, [{
	        key: 'addclass',
	        value: function addclass(isValid, _self) {
	            var _this = this;

	            this.vday = this.checkdays();
	            if (isValid && !this.vday) {
	                if (this.classEnabled == true) {
	                    this.classEnabled = false;
	                    var fromtime = this.toTimeZone(_self.$scope.fromtime);
	                    var totime = this.toTimeZone(_self.$scope.totime);
	                    var mynewclass = {
	                        name: this.name,
	                        specialition_id: this.$rootScope.me.specialition_id,
	                        description: this.description,
	                        class_number: this.class_number,
	                        class_hall: this.class_hall,
	                        Hours: this.Hours,
	                        season: this.season,
	                        privacy: this.privacy,
	                        sat: this.sat,
	                        sun: this.sun,
	                        mon: this.mon,
	                        tus: this.tus,
	                        wed: this.wed,
	                        thu: this.thu,
	                        date: this.date,
	                        from: fromtime,
	                        to: totime,
	                        permission: this.permission
	                    };
	                    this.API.all('home/addclass').post(mynewclass).then(function (response) {
	                        _this.$scope.owened.push(response.data);
	                        _this.classEnabled = true;
	                        _this.newclass = true;
	                        _this.newcoursecode = response.data.class_code;
	                        _this.newname = response.data.name;
	                        _this.name = '';
	                        _this.description = '';
	                        _this.Hours = '';
	                        _this.season = '';
	                        _this.privacy = '';
	                        _this.class_number = '';
	                        _this.class_hall = '';
	                        _this.sat = '';
	                        _this.sun = '';
	                        _this.mon = '';
	                        _this.tus = '';
	                        _this.wed = '';
	                        _this.thu = '';
	                        _this.minutes1 = '';
	                        _this.hours1 = '';
	                        _this.dn1 = '';
	                        _this.hours2 = '';
	                        _this.dn2 = '';
	                    }, function (response) {
	                        _this.classEnabled = true;
	                    });
	                }
	            } else {
	                this.classsubmit = true;
	            }
	        }
	    }, {
	        key: 'addclasses',
	        value: function addclasses(isValid) {
	            var _this2 = this;

	            if (isValid) {
	                if (this.classEnabled == true) {
	                    this.classEnabled = false;
	                    var mynewclass = {
	                        code: this.code
	                    };
	                    this.API.all('home/enterclass').post(mynewclass).then(function (response) {
	                        if (response.data.sucess == false) {
	                            _this2.toastr.error(response.data.message);
	                            _this2.classEnabled = true;
	                        } else {
	                            if (response.data.toPush == true) {
	                                _this2.$scope.entered.push(response.data.result);
	                            }
	                            _this2.$scope.sucessMsg = response.data.message;
	                            _this2.newuserclass = true;
	                            _this2.classEnabled = true;
	                        }
	                    }, function (response) {
	                        _this2.classEnabled = true;
	                        // this.newuserclass = true
	                    });
	                }
	            } else {
	                this.sclasssubmit = true;
	            }
	        }
	    }, {
	        key: 'checkdays',
	        value: function checkdays() {
	            if (this.sat == false || this.sat == undefined) var sat = false;else var sat = true;
	            if (this.sun == false || this.sun == undefined) var sun = false;else var sun = true;
	            if (this.mon == false || this.mon == undefined) var mon = false;else var mon = true;
	            if (this.tus == false || this.tus == undefined) var tus = false;else var tus = true;
	            if (this.wed == false || this.wed == undefined) var wed = false;else var wed = true;
	            if (this.thu == false || this.thu == undefined) var thu = false;else var thu = true;
	            if (sat || sun || mon || tus || wed || thu) return false;else return true;
	        }
	    }, {
	        key: 'toTimeZone',
	        value: function toTimeZone(time) {
	            //moment.parseZone('2016-05-03T22:15:01+02:00').local().format()
	            return this.$scope.moment.parseZone(time).add(2, 'h');
	        }
	    }, {
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return VirtualclassesController;
	}();

	var VirtualclassesComponent = exports.VirtualclassesComponent = {
	    templateUrl: './views/app/components/virtualclasses/virtualclasses.component.html',
	    controller: VirtualclassesController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BookbankAboutController = function () {
	    BookbankAboutController.$inject = ["$stateParams", "$scope", "$rootScope", "API"];
	    function BookbankAboutController($stateParams, $scope, $rootScope, API) {
	        'ngInject';

	        _classCallCheck(this, BookbankAboutController);

	        this.$scope = $scope;
	        this.$rootScope = $rootScope;
	        this.$stateParams = $stateParams;
	        //console.log($stateParams.bookId);
	    }

	    _createClass(BookbankAboutController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return BookbankAboutController;
	}();

	var BookbankAboutComponent = exports.BookbankAboutComponent = {
	    templateUrl: './views/app/components/bookbank-about/bookbank-about.component.html',
	    controller: BookbankAboutController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BooksbankMybooksController = function () {
	    BooksbankMybooksController.$inject = ["Post", "moment", "$rootScope", "API", "$uibModal", "$scope", "$log", "$timeout", "Upload", "$state"];
	    function BooksbankMybooksController(Post, moment, $rootScope, API, $uibModal, $scope, $log, $timeout, Upload, $state) {
	        'ngInject';

	        _classCallCheck(this, BooksbankMybooksController);

	        this.$uibModal = $uibModal;
	        this.$scope = $scope;
	        this.$log = $log;
	        this.$scope.$state = $state;
	        this.items = ['item1', 'item2', 'item3'];
	        this.$rootScope = $rootScope;
	        this.API = API;
	        this.$scope.moment = moment;
	        this.classEnabled = true;
	        this.$rootScope.pageTitle = "بنك الكتب";
	        angular.element('meta[name=Keywords]').attr('content', 'بنك الكتب,بنك الكتب ادزانس,Edzance book bank');
	        angular.element('meta[name=Description]').attr('content', 'تواصل مع مدرسيك وزملائك , احصل على ملفاتك الدراسية و على تنبيهات امتحانات , شارك الطلاب الجامعيين آرائك ونقاشاتك .');
	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	        var Post = this.Post;
	        this.Post.seturl('books/get/' + $rootScope.me.id);
	        this.Post.setskip(0);
	        this.Post.settype('books');
	        this.Post.setSection('books');
	        this.Post.settake(2);
	        this.Post.setdeleteurl('books/delete');
	        //this.Post.getPost();
	        $rootScope.books = "";
	        this.Post.getPost().then(function (response) {
	            $rootScope.books = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	            $rootScope.busy = false;
	        });
	        this.Post.settake(5);
	        this.$scope = $scope;
	        $scope.getPost = function () {
	            Post.getPost().then(function (response) {
	                $rootScope.books = Post.getPostat();
	                $scope.nopost = Post.getnopost();
	                $rootScope.busy = false;
	            });
	        };
	        $scope.status = function (status) {
	            switch (status) {
	                case 'sale':
	                    return "للبيع";
	                    break;
	                case 'swap':
	                    return "تبادل";
	                    break;
	                case 'borrow':
	                    return "استعاره";
	                    break;
	                case 'gift':
	                    return "دون مقابل";
	                    break;
	            }
	        };
	        $scope.deleteNode = function (node, deleteType) {
	            Post.deleteNode(node, deleteType, $scope.callback);
	            $rootScope.books = Post.getPostat();
	        };
	        $scope.callback = function () {
	            $scope.nopost = Post.getnopost();
	        };
	        var scope = this.$scope;
	    }

	    _createClass(BooksbankMybooksController, [{
	        key: 'modalOpen',
	        value: function modalOpen(size) {
	            var $uibModal = this.$uibModal;
	            var $scope = this.$scope;
	            var $log = this.$log;
	            var _items = this.items;
	            var modalInstance = $uibModal.open({
	                animation: true,
	                templateUrl: 'newBook.html',
	                controller: this.modalcontroller,
	                controllerAs: 'mvm',
	                size: size,
	                windowClass: 'small-modal',
	                resolve: {
	                    items: function items() {
	                        return _items;
	                    }
	                }
	            });

	            modalInstance.result.then(function (selectedItem) {
	                $scope.selected = selectedItem;
	            }, function () {
	                $log.info('Modal dismissed at: ' + new Date());
	            });
	        }
	    }, {
	        key: 'modalcontroller',
	        value: ["$rootScope", "$scope", "$uibModalInstance", "items", "API", "Upload", function modalcontroller($rootScope, $scope, $uibModalInstance, items, API, Upload) {
	            'ngInject';

	            var _this = this;

	            this.$rootScope = $rootScope;
	            this.$scope = $scope;
	            this.Upload = Upload;
	            //console.log(this.scope);
	            this.items = items;
	            this.API = API;
	            var self = this;

	            this.classEnabled = true;
	            this.addNewBook = function (form, files) {
	                //console.log(sc);
	                _this.files = files;
	                if (form.$valid) {
	                    if (_this.classEnabled == true) {
	                        _this.classEnabled = false;
	                        var mynewbook = {
	                            book_name: _this.$rootScope.newBook.name,
	                            description: _this.$rootScope.newBook.description,
	                            price: _this.$rootScope.newBook.price,
	                            tags: _this.$rootScope.newBook.tags,
	                            type: _this.$rootScope.newBook.type,
	                            contact: _this.$rootScope.newBook.contact
	                            //book_image: this.files
	                        };

	                        _this.$rootScope.newBook.name = '';
	                        _this.$rootScope.newBook.description = '';
	                        _this.$rootScope.newBook.type = '';
	                        _this.$rootScope.newBook.price = '';
	                        _this.$rootScope.newBook.tags = '';
	                        _this.$rootScope.newBook.contact = '';
	                        _this.cancel();
	                        self.Upload.upload({
	                            url: '/api/books/set',
	                            method: 'POST',
	                            data: mynewbook,
	                            file: files
	                        }).then(function (resp) {
	                            self.$rootScope.books.push(resp.data.data);
	                        });
	                    }
	                }
	            };
	            this.ok = function () {
	                $uibModalInstance.close($scope.selected.item);
	            };

	            this.cancel = function () {
	                $uibModalInstance.dismiss('cancel');
	            };
	        }]
	    }, {
	        key: 'cancel',
	        value: function cancel() {
	            this.dismiss({ $value: 'cancel' });
	        }
	    }, {
	        key: 'toggleModalAnimation',
	        value: function toggleModalAnimation() {
	            this.animationsEnabled = !this.animationsEnabled;
	        }
	    }, {
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return BooksbankMybooksController;
	}();

	var BooksbankMybooksComponent = exports.BooksbankMybooksComponent = {
	    templateUrl: './views/app/components/booksbank-mybooks/booksbank-mybooks.component.html',
	    controller: BooksbankMybooksController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var JobsController = function () {
	    JobsController.$inject = ["Post", "moment", "$scope", "$rootScope", "API", "$log", "$timeout", "Upload"];
	    function JobsController(Post, moment, $scope, $rootScope, API, $log, $timeout, Upload) {
	        'ngInject';

	        _classCallCheck(this, JobsController);

	        this.$scope = $scope;
	        this.rootScope = $rootScope;
	        this.API = API;
	        this.$scope.moment = moment;
	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	        var Post = this.Post;
	        this.Post.seturl('jobs/get/all');
	        this.Post.setskip(0);
	        this.Post.settype('jobs');
	        this.Post.settake(2);
	        //this.Post.getPost();
	        this.Post.getPost().then(function (response) {
	            $scope.dat = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	            $rootScope.busy = false;
	        });
	        this.Post.settake(5);
	        this.$scope = $scope;
	        $scope.getPost = function () {
	            Post.getPost().then(function (response) {
	                $scope.dat = Post.getPostat();
	                $scope.nopost = Post.getnopost();
	                $rootScope.busy = false;
	            });
	        };
	    }

	    _createClass(JobsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return JobsController;
	}();

	var JobsComponent = exports.JobsComponent = {
	    templateUrl: './views/app/components/jobs/jobs.component.html',
	    controller: JobsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VirtualclassAttendanceController = function () {
	    VirtualclassAttendanceController.$inject = ["$scope", "API", "$stateParams", "$state", "$rootScope"];
	    function VirtualclassAttendanceController($scope, API, $stateParams, $state, $rootScope) {
	        'ngInject';

	        _classCallCheck(this, VirtualclassAttendanceController);

	        this.$scope = $scope;
	        this.API = API;
	        this.$stateParams = $stateParams;
	        this.$rootScope = $rootScope;
	        this.$scope.openEdit = 0;
	        this.$scope.allAttendanceDate = Date.now();
	        angular.element('meta[name=Keywords]').attr('content', 'الحضور والغياب');
	        angular.element('meta[name=Description]').attr('content', '');

	        API.all('class/attendance/' + $stateParams.classid + '/get').post('').then(function (response) {
	            $scope.attendanceAll = response.data;
	        });
	        $scope.type = [{
	            value: 'absence',
	            text: 'غياب'
	        }, {
	            value: 'excuse',
	            text: 'غياب بعذر'
	        }, {
	            value: 'delay',
	            text: 'تأخير'
	        }];
	        $scope.getType = function (type) {
	            switch (type) {
	                case 'absence':
	                    return "غياب";
	                    break;
	                case 'excuse':
	                    return "غياب بعذر";
	                    break;
	                case 'delay':
	                    return "تأخير";
	                    break;
	            }
	        };
	        $scope.getAttendance = function (id, name) {
	            $scope.student = {};
	            $scope.student.id = id;
	            $scope.student.name = name;
	            API.all('class/attendance/' + $stateParams.classid + '/details/' + id).post('').then(function (response) {
	                $scope.attendance = response.data;
	            });
	        };
	        $scope.addAttendance = function () {
	            $scope.att = {
	                id: 0,
	                type: 'absence',
	                attendanceDate: Date.now(),
	                openEdit: 1
	            };
	            $scope.attendance.push($scope.att);
	        };
	        $scope.saveAttendance = function (att, index) {
	            console.log(att);
	            var data = [{
	                'uid': $scope.student.id,
	                'type': att.type,
	                'attendanceDate': att.attendanceDate / 1000
	            }];
	            var url;
	            if (att.id == 0) {
	                url = 'class/attendance/' + $stateParams.classid + '/edit';
	            } else {
	                url = 'class/attendance/' + $stateParams.classid + '/add';
	            }
	            API.all(url).post(data).then(function (response) {
	                $scope.attendance[index] = response.data;
	            });
	        };
	        $scope.saveAllAttendance = function (att, index) {
	            console.log(att);

	            // API.all().post(data)
	            //     .then((response) => {
	            //     $scope.attendance[index] = response.data;
	            // });
	        };
	        $scope.changeStatus = function (stat, id) {
	            var data = {
	                'uid': id,
	                'stat': stat
	            };
	            API.all('class/attendance/' + $stateParams.classid + '/editUserStatus').post(data).then(function (response) {
	                $scope.attendanceAll = response.data;
	            });
	        };
	        $scope.deleteAttendance = function (id, index) {
	            console.log(id);
	            var data = {
	                'id': id
	            };
	            if (id == 0) {
	                $scope.attendance.splice(index, 1);
	            } else {
	                API.all('class/attendance/' + $stateParams.classid + '/delete').post(data).then(function (response) {
	                    $scope.attendance.splice(index, 1);
	                });
	            }
	        };
	    }

	    _createClass(VirtualclassAttendanceController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return VirtualclassAttendanceController;
	}();

	var VirtualclassAttendanceComponent = exports.VirtualclassAttendanceComponent = {
	    templateUrl: './views/app/components/virtualclass-attendance/virtualclass-attendance.component.html',
	    controller: VirtualclassAttendanceController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VirtualclassMarksController = function () {
	    VirtualclassMarksController.$inject = ["$scope", "$filter", "$http", "$q", "API", "$stateParams", "$state", "DTOptionsBuilder", "DTColumnDefBuilder"];
	    function VirtualclassMarksController($scope, $filter, $http, $q, API, $stateParams, $state, DTOptionsBuilder, DTColumnDefBuilder) {
	        'ngInject';

	        _classCallCheck(this, VirtualclassMarksController);

	        this.$scope = $scope;
	        this.$state = $state;
	        this.API = API;
	        this.$stateParams = $stateParams;
	        this.$scope.status = false;
	        this.$scope.DTOptionsBuilder = DTOptionsBuilder;
	        this.$scope.DTColumnDefBuilder = DTColumnDefBuilder;
	        this.$scope.dtOptions = this.$scope.DTOptionsBuilder.newOptions().withLanguage({
	            "sProcessing": "جارٍ التحميل...",
	            "sLengthMenu": "أظهر _MENU_ مدخلات",
	            "sZeroRecords": "لم يعثر على أية نتائج",
	            "sInfo": "إظهار _START_ إلى _END_ من أصل _TOTAL_ مدخل",
	            "sInfoEmpty": "يعرض 0 إلى 0 من أصل 0 سجل",
	            "sInfoFiltered": "(منتقاة من مجموع _MAX_ مُدخل)",
	            "sInfoPostFix": "",
	            "sSearch": "ابحث:",
	            "sUrl": "",
	            "oPaginate": {
	                "sFirst": "الأول",
	                "sPrevious": "السابق",
	                "sNext": "التالي",
	                "sLast": "الأخير"
	            }
	        });
	        $scope.dtColumnDefs = [$scope.DTColumnDefBuilder.newColumnDef(0), $scope.DTColumnDefBuilder.newColumnDef(1).notVisible(), $scope.DTColumnDefBuilder.newColumnDef(2).notSortable()];
	        $scope.users = [{ id: 1,
	            name: 'أحمد عدنان',
	            marks: { 1: { mark: '1', assessments_id: 1, exam_name: 'ds' },
	                2: { mark: '2', assessments_id: 2, exam_name: 'rs' },
	                3: { mark: '3', assessments_id: 3, exam_name: 'tg' }
	            }
	        }, { id: 2,
	            name: 'حمزه النتشة',
	            marks: { 1: { mark: '4', assessments_id: 1, exam_name: 'ds' },
	                2: { mark: '5', assessments_id: 2, exam_name: 'rs' },
	                3: { mark: '6', assessments_id: 3, exam_name: 'tg' }
	            }
	        }, { id: 3,
	            name: 'محمد محمود',
	            marks: { 1: { mark: '7', assessments_id: 1, exam_name: 'ds' },
	                2: { mark: '8', assessments_id: 2, exam_name: 'rs' },
	                3: { mark: '9', assessments_id: 3, exam_name: 'tg' }
	            }
	        }];
	        API.all('class/get/' + $stateParams.classid + '/mark').get('').then(function (response) {
	            $scope.users = response.data;
	        });
	        $scope.addNewMark = function () {
	            var size = Object.keys($scope.users[0].marks).length;
	            angular.forEach($scope.users, function (value, key) {
	                value.marks[size + 1] = { mark: '0', assessments_id: 0, exam_name: 'علامه' + (size + 1) };
	            });
	        };
	        $scope.saveColumn = function (index) {
	            var mark = [];
	            angular.forEach($scope.users, function (value, key) {
	                value.marks[index]['id'] = key;
	                mark.push(value.marks[index]);
	            });
	            angular.element('.e' + index).addClass('enable');
	            angular.element('.edit' + index).removeClass('hidden');
	            angular.element('.save' + index).addClass('hidden');
	        };
	        $scope.showColumn = function (status, index) {
	            if (status) {
	                angular.element('.e' + index).removeClass('enable');
	                angular.element('.edit' + index).addClass('hidden');
	                angular.element('.save' + index).removeClass('hidden');
	            } else {
	                angular.element('.e' + index).addClass('enable');
	                angular.element('.edit' + index).removeClass('hidden');
	                angular.element('.save' + index).addClass('hidden');
	            }
	        };
	    }

	    _createClass(VirtualclassMarksController, [{
	        key: "$onInit",
	        value: function $onInit() {}
	    }]);

	    return VirtualclassMarksController;
	}();

	var VirtualclassMarksComponent = exports.VirtualclassMarksComponent = {
	    templateUrl: './views/app/components/virtualclass-marks/virtualclass-marks.component.html',
	    controller: VirtualclassMarksController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InstituteStatisticsController = function () {
	    InstituteStatisticsController.$inject = ["$scope"];
	    function InstituteStatisticsController($scope) {
	        'ngInject';

	        _classCallCheck(this, InstituteStatisticsController);

	        $scope.options1 = {
	            chart: {
	                type: 'discreteBarChart',
	                height: 450,
	                margin: {
	                    top: 20,
	                    right: 20,
	                    bottom: 60,
	                    left: 55
	                },
	                x: function x(d) {
	                    return d.label;
	                },
	                y: function y(d) {
	                    return d.value;
	                },
	                showValues: true,
	                valueFormat: function valueFormat(d) {
	                    return d3.format(',.4f')(d);
	                },
	                transitionDuration: 500,
	                xAxis: {
	                    axisLabel: 'الصفوف الدراسية'
	                },
	                yAxis: {
	                    axisLabel: 'Y Axis',
	                    axisLabelDistance: 30
	                }
	            }
	        };
	        $scope.data1 = [{
	            key: "Cumulative Return",
	            values: [{ "label": "الاول", "value": 10 }, { "label": "الثاني", "value": 5 }, { "label": "الثالث", "value": 4 }, { "label": "الرابع", "value": 12 }, { "label": "الخامس", "value": 14 }, { "label": "السادس", "value": 6 }, { "label": "السابع", "value": 16 }, { "label": "الثامن", "value": 4 }]
	        }];
	        $scope.options = {
	            chart: {
	                type: 'pieChart',
	                height: 500,
	                x: function x(d) {
	                    return d.key;
	                },
	                y: function y(d) {
	                    return d.y;
	                },
	                showLabels: true,
	                duration: 500,
	                labelThreshold: 0.01,
	                labelSunbeamLayout: true,
	                legend: {
	                    margin: {
	                        top: 5,
	                        right: 35,
	                        bottom: 5,
	                        left: 0
	                    }
	                }
	            }
	        };

	        $scope.data = [{
	            key: "One",
	            y: 5
	        }, {
	            key: "Two",
	            y: 2
	        }, {
	            key: "Three",
	            y: 9
	        }, {
	            key: "Four",
	            y: 7
	        }, {
	            key: "Five",
	            y: 4
	        }, {
	            key: "Six",
	            y: 3
	        }, {
	            key: "Seven",
	            y: 1.5
	        }];
	    }

	    _createClass(InstituteStatisticsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return InstituteStatisticsController;
	}();

	var InstituteStatisticsComponent = exports.InstituteStatisticsComponent = {
	    templateUrl: './views/app/components/institute-statistics/institute-statistics.component.html',
	    controller: InstituteStatisticsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InstituteVirtualclassController = function () {
	    function InstituteVirtualclassController() {
	        'ngInject';

	        //

	        _classCallCheck(this, InstituteVirtualclassController);
	    }

	    _createClass(InstituteVirtualclassController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return InstituteVirtualclassController;
	}();

	var InstituteVirtualclassComponent = exports.InstituteVirtualclassComponent = {
	    templateUrl: './views/app/components/institute-virtualclass/institute-virtualclass.component.html',
	    controller: InstituteVirtualclassController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InstituteCoursesController = function () {
	    function InstituteCoursesController() {
	        'ngInject';

	        //

	        _classCallCheck(this, InstituteCoursesController);
	    }

	    _createClass(InstituteCoursesController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return InstituteCoursesController;
	}();

	var InstituteCoursesComponent = exports.InstituteCoursesComponent = {
	    templateUrl: './views/app/components/institute-courses/institute-courses.component.html',
	    controller: InstituteCoursesController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InstituteSettingsController = function () {
	    function InstituteSettingsController() {
	        'ngInject';

	        //

	        _classCallCheck(this, InstituteSettingsController);
	    }

	    _createClass(InstituteSettingsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return InstituteSettingsController;
	}();

	var InstituteSettingsComponent = exports.InstituteSettingsComponent = {
	    templateUrl: './views/app/components/institute-settings/institute-settings.component.html',
	    controller: InstituteSettingsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InstituteParentsController = function () {
	    function InstituteParentsController() {
	        'ngInject';

	        //

	        _classCallCheck(this, InstituteParentsController);
	    }

	    _createClass(InstituteParentsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return InstituteParentsController;
	}();

	var InstituteParentsComponent = exports.InstituteParentsComponent = {
	    templateUrl: './views/app/components/institute-parents/institute-parents.component.html',
	    controller: InstituteParentsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InstituteAchievementsController = function () {
	    function InstituteAchievementsController() {
	        'ngInject';

	        //

	        _classCallCheck(this, InstituteAchievementsController);
	    }

	    _createClass(InstituteAchievementsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return InstituteAchievementsController;
	}();

	var InstituteAchievementsComponent = exports.InstituteAchievementsComponent = {
	    templateUrl: './views/app/components/institute-achievements/institute-achievements.component.html',
	    controller: InstituteAchievementsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InstituteGroupsController = function () {
	    function InstituteGroupsController() {
	        'ngInject';

	        //

	        _classCallCheck(this, InstituteGroupsController);
	    }

	    _createClass(InstituteGroupsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return InstituteGroupsController;
	}();

	var InstituteGroupsComponent = exports.InstituteGroupsComponent = {
	    templateUrl: './views/app/components/institute-groups/institute-groups.component.html',
	    controller: InstituteGroupsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InstituteVacationsController = function () {
	    function InstituteVacationsController() {
	        'ngInject';

	        //

	        _classCallCheck(this, InstituteVacationsController);
	    }

	    _createClass(InstituteVacationsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return InstituteVacationsController;
	}();

	var InstituteVacationsComponent = exports.InstituteVacationsComponent = {
	    templateUrl: './views/app/components/institute-vacations/institute-vacations.component.html',
	    controller: InstituteVacationsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InstituteGrantController = function () {
	    function InstituteGrantController() {
	        'ngInject';

	        //

	        _classCallCheck(this, InstituteGrantController);
	    }

	    _createClass(InstituteGrantController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return InstituteGrantController;
	}();

	var InstituteGrantComponent = exports.InstituteGrantComponent = {
	    templateUrl: './views/app/components/institute-grant/institute-grant.component.html',
	    controller: InstituteGrantController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InstituteJobsController = function () {
	    function InstituteJobsController() {
	        'ngInject';

	        //

	        _classCallCheck(this, InstituteJobsController);
	    }

	    _createClass(InstituteJobsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return InstituteJobsController;
	}();

	var InstituteJobsComponent = exports.InstituteJobsComponent = {
	    templateUrl: './views/app/components/institute-jobs/institute-jobs.component.html',
	    controller: InstituteJobsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InstituteMessagesController = function () {
	    function InstituteMessagesController() {
	        'ngInject';

	        //

	        _classCallCheck(this, InstituteMessagesController);
	    }

	    _createClass(InstituteMessagesController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return InstituteMessagesController;
	}();

	var InstituteMessagesComponent = exports.InstituteMessagesComponent = {
	    templateUrl: './views/app/components/institute-messages/institute-messages.component.html',
	    controller: InstituteMessagesController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InstituteVolunteeringController = function () {
	    function InstituteVolunteeringController() {
	        'ngInject';

	        //

	        _classCallCheck(this, InstituteVolunteeringController);
	    }

	    _createClass(InstituteVolunteeringController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return InstituteVolunteeringController;
	}();

	var InstituteVolunteeringComponent = exports.InstituteVolunteeringComponent = {
	    templateUrl: './views/app/components/institute-volunteering/institute-volunteering.component.html',
	    controller: InstituteVolunteeringController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InstituteEventsController = function () {
	    function InstituteEventsController() {
	        'ngInject';

	        //

	        _classCallCheck(this, InstituteEventsController);
	    }

	    _createClass(InstituteEventsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return InstituteEventsController;
	}();

	var InstituteEventsComponent = exports.InstituteEventsComponent = {
	    templateUrl: './views/app/components/institute-events/institute-events.component.html',
	    controller: InstituteEventsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BooksbankController = function () {
	    BooksbankController.$inject = ["Post", "moment", "$rootScope", "API", "$uibModal", "$scope", "$log", "$timeout", "Upload", "$state"];
	    function BooksbankController(Post, moment, $rootScope, API, $uibModal, $scope, $log, $timeout, Upload, $state) {
	        'ngInject';

	        _classCallCheck(this, BooksbankController);

	        this.$uibModal = $uibModal;
	        this.$scope = $scope;
	        //this.$scope.$state = $state
	        this.$log = $log;
	        this.$scope.$state = $state;
	        this.items = ['item1', 'item2', 'item3'];
	        this.$rootScope = $rootScope;
	        this.API = API;
	        this.$scope.moment = moment;
	        this.classEnabled = true;
	        this.$rootScope.pageTitle = "بنك الكتب";
	        angular.element('meta[name=Keywords]').attr('content', 'بنك الكتب,بنك الكتب ادزانس,Edzance book bank');
	        angular.element('meta[name=Description]').attr('content', 'تواصل مع مدرسيك وزملائك , احصل على ملفاتك الدراسية و على تنبيهات امتحانات , شارك الطلاب الجامعيين آرائك ونقاشاتك .');
	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	        var Post = this.Post;
	        this.Post.seturl('books/get/all');
	        this.Post.setskip(0);
	        this.Post.settype('jobs');
	        this.Post.settake(7);
	        //this.Post.getPost();
	        $rootScope.books = "";
	        this.Post.getPost().then(function (response) {
	            $rootScope.books = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	            $rootScope.busy = false;
	        });
	        this.Post.settake(4);
	        this.$scope = $scope;
	        $scope.getPost = function () {
	            Post.getPost().then(function (response) {
	                $rootScope.books = Post.getPostat();
	                $scope.nopost = Post.getnopost();
	                $rootScope.busy = false;
	            });
	        };
	        $scope.status = function (status) {
	            switch (status) {
	                case 'sale':
	                    return "للبيع";
	                    break;
	                case 'swap':
	                    return "تبادل";
	                    break;
	                case 'borrow':
	                    return "استعاره";
	                    break;
	                case 'gift':
	                    return "دون مقابل";
	                    break;
	            }
	        };
	        var scope = this.$scope;
	    }

	    _createClass(BooksbankController, [{
	        key: 'modalOpen',
	        value: function modalOpen(size) {
	            var $uibModal = this.$uibModal;
	            var $scope = this.$scope;
	            var $log = this.$log;
	            var _items = this.items;
	            var modalInstance = $uibModal.open({
	                animation: true,
	                templateUrl: 'newBook.html',
	                controller: this.modalcontroller,
	                controllerAs: 'mvm',
	                size: size,
	                windowClass: 'small-modal',
	                resolve: {
	                    items: function items() {
	                        return _items;
	                    }
	                }
	            });

	            modalInstance.result.then(function (selectedItem) {
	                $scope.selected = selectedItem;
	            }, function () {
	                $log.info('Modal dismissed at: ' + new Date());
	            });
	        }
	    }, {
	        key: 'modalcontroller',
	        value: ["$rootScope", "$scope", "$uibModalInstance", "items", "API", "Upload", function modalcontroller($rootScope, $scope, $uibModalInstance, items, API, Upload) {
	            'ngInject';

	            var _this = this;

	            this.$rootScope = $rootScope;
	            this.$scope = $scope;
	            this.Upload = Upload;
	            //console.log(this.scope);
	            this.items = items;
	            this.API = API;
	            var self = this;

	            this.classEnabled = true;
	            this.addNewBook = function (form, files) {
	                //console.log(sc);
	                _this.files = files;
	                if (form.$valid) {
	                    if (_this.classEnabled == true) {
	                        _this.classEnabled = false;
	                        var mynewbook = {
	                            book_name: _this.$rootScope.newBook.name,
	                            description: _this.$rootScope.newBook.description,
	                            price: _this.$rootScope.newBook.price,
	                            tags: _this.$rootScope.newBook.tags,
	                            type: _this.$rootScope.newBook.type,
	                            contact: _this.$rootScope.newBook.contact
	                            //book_image: this.files
	                        };

	                        _this.$rootScope.newBook.name = '';
	                        _this.$rootScope.newBook.description = '';
	                        _this.$rootScope.newBook.type = '';
	                        _this.$rootScope.newBook.price = 0;
	                        _this.$rootScope.newBook.tags = '';
	                        _this.$rootScope.newBook.contact = '';
	                        _this.cancel();
	                        self.Upload.upload({
	                            url: '/api/books/set',
	                            method: 'POST',
	                            data: mynewbook,
	                            file: files
	                        }).then(function (resp) {
	                            self.$rootScope.books.push(resp.data.data);
	                        });
	                    }
	                }
	            };
	            this.ok = function () {
	                $uibModalInstance.close($scope.selected.item);
	            };

	            this.cancel = function () {
	                $uibModalInstance.dismiss('cancel');
	            };
	        }]
	    }, {
	        key: 'cancel',
	        value: function cancel() {
	            this.dismiss({ $value: 'cancel' });
	        }
	    }, {
	        key: 'toggleModalAnimation',
	        value: function toggleModalAnimation() {
	            this.animationsEnabled = !this.animationsEnabled;
	        }
	    }, {
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return BooksbankController;
	}();

	var BooksbankComponent = exports.BooksbankComponent = {
	    templateUrl: './views/app/components/booksbank/booksbank.component.html',
	    controller: BooksbankController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CourseController = function () {
	    function CourseController() {
	        'ngInject';

	        //

	        _classCallCheck(this, CourseController);
	    }

	    _createClass(CourseController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return CourseController;
	}();

	var CourseComponent = exports.CourseComponent = {
	    templateUrl: './views/app/components/course/course.component.html',
	    controller: CourseController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CoursesController = function () {
	    function CoursesController() {
	        'ngInject';

	        //

	        _classCallCheck(this, CoursesController);
	    }

	    _createClass(CoursesController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return CoursesController;
	}();

	var CoursesComponent = exports.CoursesComponent = {
	    templateUrl: './views/app/components/courses/courses.component.html',
	    controller: CoursesController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InstituteloginBodyController = function () {
	    function InstituteloginBodyController() {
	        'ngInject';

	        //

	        _classCallCheck(this, InstituteloginBodyController);
	    }

	    _createClass(InstituteloginBodyController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return InstituteloginBodyController;
	}();

	var InstituteloginBodyComponent = exports.InstituteloginBodyComponent = {
	    templateUrl: './views/app/components/institutelogin-body/institutelogin-body.component.html',
	    controller: InstituteloginBodyController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InstituteloginFooterController = function () {
	    function InstituteloginFooterController() {
	        'ngInject';

	        //

	        _classCallCheck(this, InstituteloginFooterController);
	    }

	    _createClass(InstituteloginFooterController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return InstituteloginFooterController;
	}();

	var InstituteloginFooterComponent = exports.InstituteloginFooterComponent = {
	    templateUrl: './views/app/components/institutelogin-footer/institutelogin-footer.component.html',
	    controller: InstituteloginFooterController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InstituteloginHeaderController = function () {
	    function InstituteloginHeaderController() {
	        'ngInject';

	        //

	        _classCallCheck(this, InstituteloginHeaderController);
	    }

	    _createClass(InstituteloginHeaderController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return InstituteloginHeaderController;
	}();

	var InstituteloginHeaderComponent = exports.InstituteloginHeaderComponent = {
	    templateUrl: './views/app/components/institutelogin-header/institutelogin-header.component.html',
	    controller: InstituteloginHeaderController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InstituteSpecializationsController = function () {
	    function InstituteSpecializationsController() {
	        'ngInject';

	        //

	        _classCallCheck(this, InstituteSpecializationsController);
	    }

	    _createClass(InstituteSpecializationsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return InstituteSpecializationsController;
	}();

	var InstituteSpecializationsComponent = exports.InstituteSpecializationsComponent = {
	    templateUrl: './views/app/components/institute-specializations/institute-specializations.component.html',
	    controller: InstituteSpecializationsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InstituteDepartmentController = function () {
	    function InstituteDepartmentController() {
	        'ngInject';

	        //

	        _classCallCheck(this, InstituteDepartmentController);
	    }

	    _createClass(InstituteDepartmentController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return InstituteDepartmentController;
	}();

	var InstituteDepartmentComponent = exports.InstituteDepartmentComponent = {
	    templateUrl: './views/app/components/institute-department/institute-department.component.html',
	    controller: InstituteDepartmentController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InstitutesController = function () {
	    function InstitutesController() {
	        'ngInject';

	        //

	        _classCallCheck(this, InstitutesController);
	    }

	    _createClass(InstitutesController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return InstitutesController;
	}();

	var InstitutesComponent = exports.InstitutesComponent = {
	    templateUrl: './views/app/components/institutes/institutes.component.html',
	    controller: InstitutesController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 49 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AddingInstitutionsController = function () {
	    function AddingInstitutionsController() {
	        'ngInject';

	        _classCallCheck(this, AddingInstitutionsController);

	        angular.element('html').scrollTop(0);
	        //
	    }

	    _createClass(AddingInstitutionsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return AddingInstitutionsController;
	}();

	var AddingInstitutionsComponent = exports.AddingInstitutionsComponent = {
	    templateUrl: './views/app/components/adding-institutions/adding-institutions.component.html',
	    controller: AddingInstitutionsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 50 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FooterInstitutionsController = function () {
	    function FooterInstitutionsController() {
	        'ngInject';

	        //

	        _classCallCheck(this, FooterInstitutionsController);
	    }

	    _createClass(FooterInstitutionsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return FooterInstitutionsController;
	}();

	var FooterInstitutionsComponent = exports.FooterInstitutionsComponent = {
	    templateUrl: './views/app/components/footer-institutions/footer-institutions.component.html',
	    controller: FooterInstitutionsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 51 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HeaderInstitutionsController = function () {
	    function HeaderInstitutionsController() {
	        'ngInject';

	        //

	        _classCallCheck(this, HeaderInstitutionsController);
	    }

	    _createClass(HeaderInstitutionsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return HeaderInstitutionsController;
	}();

	var HeaderInstitutionsComponent = exports.HeaderInstitutionsComponent = {
	    templateUrl: './views/app/components/header-institutions/header-institutions.component.html',
	    controller: HeaderInstitutionsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EducationalInstitutionsController = function () {
	    function EducationalInstitutionsController() {
	        'ngInject';

	        _classCallCheck(this, EducationalInstitutionsController);

	        angular.element('html').scrollTop(0);
	        //
	    }

	    _createClass(EducationalInstitutionsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return EducationalInstitutionsController;
	}();

	var EducationalInstitutionsComponent = exports.EducationalInstitutionsComponent = {
	    templateUrl: './views/app/components/educational-institutions/educational-institutions.component.html',
	    controller: EducationalInstitutionsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InstituteMembersController = function () {
	    function InstituteMembersController() {
	        'ngInject';

	        //

	        _classCallCheck(this, InstituteMembersController);
	    }

	    _createClass(InstituteMembersController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return InstituteMembersController;
	}();

	var InstituteMembersComponent = exports.InstituteMembersComponent = {
	    templateUrl: './views/app/components/institute-members/institute-members.component.html',
	    controller: InstituteMembersController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InstituteAttachmentsController = function () {
	    function InstituteAttachmentsController() {
	        'ngInject';

	        //

	        _classCallCheck(this, InstituteAttachmentsController);
	    }

	    _createClass(InstituteAttachmentsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return InstituteAttachmentsController;
	}();

	var InstituteAttachmentsComponent = exports.InstituteAttachmentsComponent = {
	    templateUrl: './views/app/components/institute-attachments/institute-attachments.component.html',
	    controller: InstituteAttachmentsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MessageRoomController = function () {
	    MessageRoomController.$inject = ["$stateParams", "$state", "chatMessages", "$rootScope", "$scope", "$crypto", "$firebaseArray", "moment"];
	    function MessageRoomController($stateParams, $state, chatMessages, $rootScope, $scope, $crypto, $firebaseArray, moment) {
	        'ngInject';

	        _classCallCheck(this, MessageRoomController);

	        var ctrl = this;
	        this.stateParams = $stateParams;
	        this.$state = $state;
	        this.$scope = $scope;
	        this.$scope.moment = moment;
	        this.$scope.$crypto = $crypto;
	        this.$rootScope = $rootScope;
	        this.$firebaseArray = $firebaseArray;
	        this.$rootScope.$firebaseArray = $firebaseArray;
	        this.$scope.from = 0;
	        this.$scope.to = 0;
	        this.$scope.chatLoader = false;
	        $scope.loadmore = false;
	        $scope.loaded = false;
	        this.$scope.mCount = 0;
	        this.$scope.roomName = '';
	        $scope.selected = -1;
	        var self = this;
	        self.$rootScope.pageTitle = "الرسائل";
	        angular.element('meta[name=Keywords]').attr('content', 'الرسائل,الرسائل ادزانس,Edzance Message');
	        angular.element('meta[name=Description]').attr('content', 'تواصل مع مدرسيك وزملائك , احصل على ملفاتك الدراسية و على تنبيهات امتحانات , شارك الطلاب الجامعيين آرائك ونقاشاتك .');
	        this.RoomNow = null;
	        this.$scope.hasRoom = 0;
	        $rootScope.$watch('messaging_enabled', function () {
	            if ($rootScope.messaging_enabled == true) {
	                self.$scope.messages_showed = true;
	                self.$rootScope.messages[self.RoomNow] = [];
	                var FirstRoom = chatMessages.FirstRoom(self.stateParams.Room);
	                FirstRoom.then(function (data) {
	                    self.$scope.limit = chatMessages.getMessageCount(data.FirstRoom) - 20;
	                    var getRoom = chatMessages.getRoom(data.FirstRoom, 10);
	                    Promise.all([FirstRoom, getRoom]).then(function (values) {
	                        self.RoomNow = data.FirstRoom;
	                        self.$scope.roomName = data.roomName;
	                        self.$scope.selected = data.selected;
	                        var Room = values[1];
	                        self.$rootScope.messages[self.RoomNow] = Room;
	                        Room.$loaded().then(function (x) {
	                            // x.forEach(function(value, key) {
	                            //     self.$rootScope.messages[self.RoomNow].push(value);
	                            // });
	                        });
	                        self.$scope.roomName = $rootScope.Rooms.$getRecord(data.FirstRoom).display;
	                    });
	                });
	                $scope.addMessage = function (message, id) {
	                    self.$scope.first_limit++;
	                    chatMessages.addMessage($rootScope.me.id, $rootScope.me.name, message, self.RoomNow);
	                    self.$scope.mCount = self.$scope.mCount + 1;
	                };
	            }
	        });
	        $scope.infiniteScroll = function () {
	            return new Promise(function (success, error) {
	                if ($scope.loadmore != true) {
	                    $scope.loadmore = true;
	                    if (self.RoomNow) {
	                        var count = chatMessages.getMessageCount(self.RoomNow);
	                        // console.log("rootScope.messages.length:"+$rootScope.messages[self.RoomNow].length)
	                        if ($rootScope.messages[self.RoomNow].length >= count - chatMessages.RoomData[self.RoomNow]) return;
	                        if (count >= 10 && $scope.limit >= 0) {
	                            chatMessages.infiniteScroll(self.RoomNow, $scope.limit, false).then(function (moreMessages) {
	                                var exist_message = $rootScope.messages[self.RoomNow].length;
	                                var new_message = moreMessages.length;
	                                moreMessages.splice(new_message - exist_message, exist_message);
	                                moreMessages.reverse();
	                                moreMessages.forEach(function (value, key) {
	                                    $rootScope.messages[self.RoomNow].unshift(value);
	                                });
	                                $scope.loadmore = false;
	                                if ($scope.limit >= chatMessages.RoomData[self.RoomNow]) {
	                                    $scope.limit = $scope.limit - moreMessages.length;
	                                } else {
	                                    $scope.limit = -1;
	                                }
	                                success(670);
	                            });
	                        }
	                    }
	                }
	            });
	        };
	        $scope.deleteRoom = function () {
	            chatMessages.deleteRoom($rootScope.RoomNow, $scope.mCount, $rootScope.messages[self.RoomNow]);
	            $scope.messages = [];
	        };
	    }

	    _createClass(MessageRoomController, [{
	        key: 'GetRoom',
	        value: function GetRoom($id, self, index, display) {
	            self.$scope.loadmore = false;
	            self.$scope.mCount = 0;
	            self.$scope.messages = [];
	            self.RoomNow = $id;
	            self.$scope.roomName = display;
	            var ref = firebase.database().ref().child('chat').child($id).child('data');
	            self.$scope.chatLoader = true;
	            if (self.$scope.chatLoader == true) {
	                self.$rootScope.chatMessages.getRoom($id, 10).then(function (Room) {
	                    self.$scope.messages.$loaded().then(function (x) {
	                        self.$rootScope.messages[self.RoomNow] = Room;
	                        // self.$scope.messages = Room;
	                        //angular.element('.lv-body').scrollTop(angular.element('.lv-body').prop('scrollHeight'));
	                    });
	                }).catch(function (Room) {});
	                ref.on('value', function (childSnapshot) {
	                    //angular.element('.lv-body').scrollTop(angular.element('.lv-body').prop('scrollHeight'));
	                });
	                ref.on('child_added', function (childSnapshot, prevChildKey) {
	                    //angular.element('.lv-body').scrollTop(angular.element('.lv-body').prop('scrollHeight'));
	                });
	                this.$scope.chatLoader = false;
	            }
	            var a = self.$rootScope.chatMessages.RoomUsers[$id];
	        }
	    }, {
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return MessageRoomController;
	}();

	var MessageRoomComponent = exports.MessageRoomComponent = {
	    templateUrl: './views/app/components/message-room/message-room.component.html',
	    controller: MessageRoomController,
	    controllerAs: 'mc',
	    bindings: {}
	};

/***/ },
/* 56 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GroupChatController = function () {
	    GroupChatController.$inject = ["$stateParams", "$state", "chatMessages", "$rootScope", "$scope", "$crypto", "$firebaseArray", "moment"];
	    function GroupChatController($stateParams, $state, chatMessages, $rootScope, $scope, $crypto, $firebaseArray, moment) {
	        'ngInject';

	        _classCallCheck(this, GroupChatController);

	        var ctrl = this;
	        this.stateParams = $stateParams;
	        this.$state = $state;
	        this.$scope = $scope;
	        this.$scope.moment = moment;
	        this.$scope.$crypto = $crypto;
	        this.$rootScope = $rootScope;
	        this.$firebaseArray = $firebaseArray;
	        this.$rootScope.$firebaseArray = $firebaseArray;
	        this.$scope.from = 0;
	        this.$scope.to = 0;
	        this.$scope.chatLoader = false;
	        $scope.loadmore = false;
	        $scope.loaded = false;
	        this.$scope.mCount = 0;
	        this.$scope.roomName = '';
	        $scope.selected = -1;
	        var self = this;
	        self.$rootScope.pageTitle = "الرسائل";
	        angular.element('meta[name=Keywords]').attr('content', 'الرسائل,الرسائل ادزانس,Edzance Message');
	        angular.element('meta[name=Description]').attr('content', 'تواصل مع مدرسيك وزملائك , احصل على ملفاتك الدراسية و على تنبيهات امتحانات , شارك الطلاب الجامعيين آرائك ونقاشاتك .');
	        this.RoomNow = null;
	        this.$scope.hasRoom = 0;
	        $rootScope.$watch('messaging_enabled', function () {
	            if ($rootScope.messaging_enabled == true) {
	                self.$scope.messages_showed = true;
	                self.$scope.messages = [];
	                $rootScope.req.then(function (response) {
	                    self.RoomNow = $rootScope.groupObj.data.Fire_Base_Chat_Room_name;
	                    self.$rootScope.RoomNow = $rootScope.groupObj.data.Fire_Base_Chat_Room_name;
	                    chatMessages.getRoom(self.RoomNow, 10).then(function (Room) {
	                        Room.$loaded().then(function (x) {
	                            $scope.messages = x;
	                        });
	                        self.$scope.roomName = $rootScope.Rooms.$getRecord(self.RoomNow).display;
	                    });
	                });
	                $scope.addMessage = function (message, id) {
	                    self.$scope.first_limit++;
	                    chatMessages.addMessage($rootScope.me.id, $rootScope.me.name, message, self.RoomNow);
	                    self.$scope.mCount = self.$scope.mCount + 1;
	                };
	            }
	        });
	        $scope.infiniteScroll = function () {
	            return new Promise(function (success, error) {
	                if ($scope.loadmore != true) {
	                    $scope.loadmore = true;
	                    if (self.RoomNow) {
	                        var count = chatMessages.getMessageCount(self.RoomNow);
	                        $scope.from = $scope.from == 0 ? count - 10 : $scope.to;
	                        $scope.to = $scope.from <= 0 ? 0 : $scope.from - 10;
	                        if (count >= 10 && $scope.to != 0) {
	                            chatMessages.infiniteScroll(self.RoomNow, $scope.to, $scope.from - 1, true).then(function (moreMessages) {
	                                if (chatMessages.enabler) {
	                                    $scope.messages = moreMessages;
	                                }
	                                $scope.loadmore = false;
	                                success($scope.messages);
	                            });
	                        }
	                    }
	                }
	            });
	        };
	        $scope.deleteRoom = function () {
	            chatMessages.deleteRoom($rootScope.RoomNow, $scope.mCount, $scope.messages);
	            $scope.messages = [];
	        };
	    }

	    _createClass(GroupChatController, [{
	        key: 'GetRoom',
	        value: function GetRoom($id, self, index, display) {
	            self.$scope.loadmore = false;
	            self.$scope.mCount = 0;
	            self.$scope.messages = [];
	            self.RoomNow = $id;
	            self.$scope.roomName = display;
	            var ref = firebase.database().ref().child('chat').child($id).child('data');
	            self.$scope.chatLoader = true;
	            if (self.$scope.chatLoader == true) {
	                self.$rootScope.chatMessages.getRoom($id, 10).then(function (Room) {
	                    self.$scope.messages.$loaded().then(function (x) {
	                        self.$scope.messages = Room;
	                        //angular.element('.lv-body').scrollTop(angular.element('.lv-body').prop('scrollHeight'));
	                    });
	                }).catch(function (Room) {});
	                ref.on('value', function (childSnapshot) {
	                    //angular.element('.lv-body').scrollTop(angular.element('.lv-body').prop('scrollHeight'));
	                });
	                ref.on('child_added', function (childSnapshot, prevChildKey) {
	                    //angular.element('.lv-body').scrollTop(angular.element('.lv-body').prop('scrollHeight'));
	                });
	                this.$scope.chatLoader = false;
	            }
	            var a = self.$rootScope.chatMessages.RoomUsers[$id];
	        }
	    }, {
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return GroupChatController;
	}();

	var GroupChatComponent = exports.GroupChatComponent = {
	    templateUrl: './views/app/components/group-chat/group-chat.component.html',
	    controller: GroupChatController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 57 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AhmadTestController = function () {
	    AhmadTestController.$inject = ["$scope", "$firebaseObject", "$firebaseAuth", "$firebaseArray", "$firebaseStorage", "$timeout", "$rootScope", "$crypto", "API", "Idle"];
	    function AhmadTestController($scope, $firebaseObject, $firebaseAuth, $firebaseArray, $firebaseStorage, $timeout, $rootScope, $crypto, API, Idle) {
	        'ngInject';

	        _classCallCheck(this, AhmadTestController);

	        this.API = API;
	        this.enabled = false;
	        this.$rootScope = $rootScope;
	        var auth = $firebaseAuth();
	        this.chatter = [];
	        this.$scope = $scope;
	        this.chatter.email;
	        this.chatter.password;
	        this.$rootScope = $rootScope;
	        this.$firebaseStorage = $firebaseStorage;
	        this.$firebaseAuth = $firebaseAuth;
	        this.$firebaseArray = $firebaseArray;
	        this.$firebaseObject = $firebaseObject;
	        $scope.users = [];
	        $scope.skip = 0;
	        $scope.take = 10;
	        $scope.counter = 0;
	        $scope.enabled = true;
	        this.API.all('ahmad').get('').then(function (response) {
	            cosole.log(response);
	        });
	        //
	    }

	    _createClass(AhmadTestController, [{
	        key: 'stop',
	        value: function stop() {
	            this.$scope.enabled = false;
	        }
	    }, {
	        key: 'Register',
	        value: function Register() {
	            var self = this;
	            self.API.all('talk/set-all-uid').post({ skip: parseInt(self.$scope.skip), take: parseInt(self.$scope.take) }).then(function (response) {
	                self.$scope.users = response.users;
	                self.$scope.counter = response.users.length - 1;
	                console.log(self.signOut());
	                console.log(self.$scope.counter);
	                self.signUp(response.users[self.$scope.counter].email, response.users[self.$scope.counter].password, self.$scope.counter);
	                // self.$scope.skip=parseInt(self.$scope.skip)+parseInt(self.$scope.take);
	                // Object.keys(response.users).map(function(objectKey, index) {
	                //     var value = response.users[objectKey];
	                // });
	            }).catch(function (error) {
	                console.log(error);
	            });
	        }
	    }, {
	        key: 'signUp',
	        value: function signUp(user, pass, key) {
	            var self = this;
	            var $firebaseAuth = self.$firebaseAuth();
	            // var API = self.API;
	            console.log('registering user :' + user);
	            $firebaseAuth.$createUserWithEmailAndPassword(user, pass).then(function (user) {
	                console.log('signUp successfully with' + user.uid);
	                self.$scope.users[key].new_uid = user.uid;
	                self.API.all('talk/set-uid/' + self.$scope.users[key].id + '/' + user.uid).get('').then(function (response) {
	                    if (self.$scope.counter >= 0 && self.$scope.enabled == true) self.signUp(self.$scope.users[self.$scope.counter].email, self.$scope.users[self.$scope.counter].password, self.$scope.counter);
	                    self.$scope.enabled = true;
	                });
	                // self.signIn(); 
	                self.$scope.users[self.$scope.counter].counter = self.$scope.counter;
	                self.$scope.counter--;
	                self.$scope.skip++;

	                // return user;
	            }).catch(function (error) {
	                // self.signIn(); 
	                console.log(error);
	                if (error.code == 'auth/email-already-in-use') {
	                    console.log('already registered :(');
	                    if (self.$scope.counter >= 0 && self.$scope.enabled == true) self.signIn(self.$scope.users[self.$scope.counter].email, self.$scope.users[self.$scope.counter].password, self.$scope.counter);
	                    self.$scope.enabled = true;
	                }
	            });
	        }
	    }, {
	        key: 'signOut',
	        value: function signOut() {
	            var $firebaseAuth = this.$firebaseAuth();
	            $firebaseAuth.$signOut();
	            return 'sign Out successfully';
	        }
	    }, {
	        key: 'signIn',
	        value: function signIn(user, pass, key) {
	            var self = this;
	            var $firebaseAuth = self.$firebaseAuth();
	            $firebaseAuth.$signInWithEmailAndPassword(user, pass).then(function (user) {
	                self.$scope.users[key].new_uid = user.uid;
	                self.API.all('talk/set-uid/' + self.$scope.users[key].id + '/' + user.uid).get('').then(function (response) {
	                    // console.log('signIn successfully')
	                    console.log(self.$scope.counter);
	                    console.log(self.signOut());
	                    if (self.$scope.counter >= 0 && self.$scope.enabled == true) self.signUp(self.$scope.users[self.$scope.counter].email, self.$scope.users[self.$scope.counter].password, self.$scope.counter);
	                });
	                self.$scope.users[self.$scope.counter].counter = self.$scope.counter;
	                self.$scope.counter--;
	                self.$scope.skip++;
	            }).catch(function (error) {
	                console.log(error);
	            });
	        }
	    }, {
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return AhmadTestController;
	}();

	var AhmadTestComponent = exports.AhmadTestComponent = {
	    templateUrl: './views/app/components/ahmad-test/ahmad-test.component.html',
	    controller: AhmadTestController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 58 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GroupsInvitationsController = function () {
	    GroupsInvitationsController.$inject = ["Post", "moment", "$state", "$sce", "$scope", "$stateParams", "$rootScope", "API", "$log", "$timeout", "Upload"];
	    function GroupsInvitationsController(Post, moment, $state, $sce, $scope, $stateParams, $rootScope, API, $log, $timeout, Upload) {
	        'ngInject';

	        _classCallCheck(this, GroupsInvitationsController);

	        this.$state = $state;
	        this.scope = $scope;
	        this.stateParams = $stateParams;
	        this.rootScope = $rootScope;
	        this.API = API;
	        this.sce = $sce;
	        this.log = $log;
	        this.timeout = $timeout;
	        this.Upload = Upload;
	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	        var Post = this.Post;
	        var userID = 0;

	        this.Post.seturl('gr/users-invites/' + $rootScope.me.id);
	        this.Post.setskip(0);
	        this.Post.settype('group');
	        this.Post.settake(2);
	        //this.Post.getPost();
	        this.Post.getPost().then(function (response) {
	            $scope.dat = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	            $rootScope.busy = false;
	        });
	        this.Post.settake(5);
	        this.scope = $scope;
	        $scope.getPost = function () {
	            Post.getPost().then(function (response) {
	                $scope.dat = Post.getPostat();
	                $scope.nopost = Post.getnopost();
	                $rootScope.busy = false;
	            });
	        };
	    }

	    _createClass(GroupsInvitationsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return GroupsInvitationsController;
	}();

	var GroupsInvitationsComponent = exports.GroupsInvitationsComponent = {
	    templateUrl: './views/app/components/groups-Invitations/groups-Invitations.component.html',
	    controller: GroupsInvitationsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 59 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GroupMembersRequestsController = function () {
	    GroupMembersRequestsController.$inject = ["$scope", "$stateParams", "$rootScope", "API", "$state"];
	    function GroupMembersRequestsController($scope, $stateParams, $rootScope, API, $state) {
	        'ngInject';

	        var _this = this;

	        _classCallCheck(this, GroupMembersRequestsController);

	        this.$scope = $scope;
	        this.stateParams = $stateParams;
	        this.rootScope = $rootScope;
	        this.API = API;
	        this.$state = $state;
	        //
	        API.all('gr/users-waiting/' + this.stateParams.groupid).get('').then(function (response) {
	            _this.$scope.waiting = response.data;
	        });
	        $scope.join = function (userId, status) {
	            $scope.member = [];
	            $scope.waiting.map(function (item, key) {
	                $scope.member[item.id] = key;
	            });
	            API.all('gr/add-to-group/' + $stateParams.groupid + '/' + userId + '/' + status).get('').then(function (response) {
	                $scope.waiting.splice($scope.member[userId], 1);
	            });
	        };
	    }

	    _createClass(GroupMembersRequestsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return GroupMembersRequestsController;
	}();

	var GroupMembersRequestsComponent = exports.GroupMembersRequestsComponent = {
	    templateUrl: './views/app/components/group-members-requests/group-members-requests.component.html',
	    controller: GroupMembersRequestsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 60 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MembersRequestsController = function () {
	    function MembersRequestsController() {
	        'ngInject';

	        //

	        _classCallCheck(this, MembersRequestsController);
	    }

	    _createClass(MembersRequestsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return MembersRequestsController;
	}();

	var MembersRequestsComponent = exports.MembersRequestsComponent = {
	    templateUrl: './views/app/components/members-requests/members-requests.component.html',
	    controller: MembersRequestsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 61 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GroupsIndexController = function () {
	  GroupsIndexController.$inject = ["$rootScope", "API", "$uibModal", "$scope", "$log"];
	  function GroupsIndexController($rootScope, API, $uibModal, $scope, $log) {
	    'ngInject';

	    var _this = this;

	    _classCallCheck(this, GroupsIndexController);

	    this.rootScope = $rootScope;
	    this.rootScope.pageTitle = "المجموعات";
	    angular.element('meta[name=Keywords]').attr('content', 'المجموعات,مجموعات ادزانس,Edzance Groups');
	    angular.element('meta[name=Description]').attr('content', 'تواصل مع مدرسيك وزملائك , احصل على ملفاتك الدراسية و على تنبيهات امتحانات , شارك الطلاب الجامعيين آرائك ونقاشاتك .');
	    angular.element('html').scrollTop(0);
	    this.classEnabled = true;
	    this.API = API;
	    this.$scope = $scope;
	    this.$uibModal = $uibModal;
	    this.$log = $log;
	    this.items = ['item1', 'item2', 'item3'];
	    //
	    this.$scope.megroups = [];

	    var self = this;
	    API.all('gr/me').get('').then(function (response) {
	      _this.rootScope.megroups = response.data;
	    }, function (response) {});
	    API.all('gr/entered').get('').then(function (response) {
	      _this.$scope.engroups = response.data;
	    }, function (response) {});
	    API.all('gr/suggested').get('').then(function (response) {
	      _this.$scope.sggroups = response.data;
	    }, function (response) {});
	  }

	  _createClass(GroupsIndexController, [{
	    key: 'modalOpen',
	    value: function modalOpen(size) {
	      var $uibModal = this.$uibModal;
	      var $scope = this.$scope;
	      var $log = this.$log;
	      var _items = this.items;
	      var modalInstance = $uibModal.open({
	        animation: true,
	        templateUrl: 'newGroup.html',
	        controller: this.modalcontroller,
	        controllerAs: 'mvm',
	        windowClass: 'small-modal',
	        size: size,
	        resolve: {
	          items: function items() {
	            return _items;
	          }
	        }
	      });

	      modalInstance.result.then(function (selectedItem) {
	        $scope.selected = selectedItem;
	      }, function () {
	        $log.info('Modal dismissed at: ' + new Date());
	      });
	    }
	  }, {
	    key: 'modalcontroller',
	    value: ["$rootScope", "$scope", "$uibModalInstance", "items", "API", function modalcontroller($rootScope, $scope, $uibModalInstance, items, API) {
	      'ngInject';

	      var _this2 = this;

	      this.rootScope = $rootScope;
	      this.scope = $scope;
	      //console.log(this.scope);
	      this.items = items;
	      this.API = API;
	      var self = this;

	      this.classEnabled = true;
	      $scope.selected = {
	        item: items[0]
	      };

	      this.addNewGroup = function (form) {

	        if (form.$valid) {
	          if (_this2.classEnabled == true) {
	            _this2.classEnabled = false;
	            var mynewclass = {
	              name: _this2.rootScope.newPost.name,
	              description: _this2.rootScope.newPost.description,
	              permission: _this2.rootScope.newPost.permission,
	              tags: _this2.rootScope.newPost.type,
	              auth: _this2.rootScope.newPost.auth
	            };
	            _this2.rootScope.newPost.name = '';
	            _this2.rootScope.newPost.description = '';
	            _this2.rootScope.newPost.permission = '';
	            _this2.rootScope.newPost.type = '';
	            _this2.rootScope.newPost.auth = '';
	            _this2.cancel();
	            _this2.API.all('gr/addgroup').post(mynewclass).then(function (response) {
	              self.rootScope.megroups.push(response.data);
	              // self.scope.$parent.megroups.push(response.data);
	              self.classEnabled = true;
	            }, function (response) {
	              self.classEnabled = true;
	            });
	          }
	        }
	      };
	      this.ok = function () {
	        $uibModalInstance.close($scope.selected.item);
	      };

	      this.cancel = function () {
	        $uibModalInstance.dismiss('cancel');
	      };
	    }]
	  }, {
	    key: 'cancel',
	    value: function cancel() {
	      this.dismiss({ $value: 'cancel' });
	    }
	  }, {
	    key: 'toggleModalAnimation',
	    value: function toggleModalAnimation() {
	      this.animationsEnabled = !this.animationsEnabled;
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return GroupsIndexController;
	}();

	var GroupsIndexComponent = exports.GroupsIndexComponent = {
	  templateUrl: './views/app/components/groups-index/groups-index.component.html',
	  controller: GroupsIndexController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 62 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GroupAllController = function () {
	    GroupAllController.$inject = ["Post", "moment", "$state", "$sce", "$scope", "$stateParams", "$rootScope", "API", "$log", "$timeout", "Upload"];
	    function GroupAllController(Post, moment, $state, $sce, $scope, $stateParams, $rootScope, API, $log, $timeout, Upload) {
	        'ngInject';

	        _classCallCheck(this, GroupAllController);

	        this.$state = $state;
	        this.scope = $scope;
	        this.stateParams = $stateParams;
	        this.rootScope = $rootScope;
	        this.API = API;
	        this.sce = $sce;
	        this.log = $log;
	        this.timeout = $timeout;
	        this.Upload = Upload;
	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	        var Post = this.Post;
	        this.Post.seturl('gr/all-' + this.stateParams.groupcategory);
	        this.Post.setskip(0);
	        this.Post.settype('group');
	        this.Post.settake(2);
	        //this.Post.getPost();
	        this.Post.getPost().then(function (response) {
	            $scope.dat = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	            $rootScope.busy = false;
	        });
	        this.Post.settake(5);
	        this.scope = $scope;
	        //$scope.dat=this.Post.getPostat();

	        $scope.getPost = function () {
	            Post.getPost().then(function (response) {
	                $scope.dat = Post.getPostat();
	                $scope.nopost = Post.getnopost();
	                $rootScope.busy = false;
	            });
	        };
	        //
	    }

	    _createClass(GroupAllController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return GroupAllController;
	}();

	var GroupAllComponent = exports.GroupAllComponent = {
	    templateUrl: './views/app/components/group-all/group-all.component.html',
	    controller: GroupAllController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 63 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GroupRedirectController = function () {
	    function GroupRedirectController() {
	        'ngInject';

	        //

	        _classCallCheck(this, GroupRedirectController);
	    }

	    _createClass(GroupRedirectController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return GroupRedirectController;
	}();

	var GroupRedirectComponent = exports.GroupRedirectComponent = {
	    templateUrl: './views/app/components/group-redirect/group-redirect.component.html',
	    controller: GroupRedirectController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 64 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ResultsClassexamController = function () {
	    ResultsClassexamController.$inject = ["Post", "moment", "$stateParams", "$scope", "$rootScope", "API", "$log", "Upload", "$timeout", "$state"];
	    function ResultsClassexamController(Post, moment, $stateParams, $scope, $rootScope, API, $log, Upload, $timeout, $state) {
	        'ngInject';

	        _classCallCheck(this, ResultsClassexamController);

	        this.$scope = $scope;
	        this.$scope.moment = moment;
	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	        var Post = this.Post;
	        this.Post.seturl('solo/exam/' + $stateParams.resultsid);
	        this.Post.setediturl('vc/editexam');
	        this.Post.setsubmiturl('wvc/exam');
	        this.Post.setdeleteurl('class/delete/' + $stateParams.resultsid + '/exam');
	        this.Post.setCommentDeleteUrl('social/delete/vc/comment');
	        this.Post.setskip(0);
	        this.Post.settype('exam');
	        this.Post.setSection('vc');
	        this.Post.settake(1);
	        this.Post.getPost().then(function (response) {
	            $scope.dat = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	            $rootScope.busy = false;
	        });
	        this.scope = $scope;

	        $scope.getPost = function () {
	            if ($scope.dat.length == 0) {
	                Post.getPost().then(function (response) {
	                    $scope.dat = Post.getPostat();
	                    $scope.nopost = Post.getnopost();
	                    $rootScope.busy = false;
	                    $scope.dat.map(function (item) {
	                        item.exam_date = new Date(item.exam_date);
	                        item.exam_time = new Date(item.exam_date);
	                    });
	                    if ($scope.nopost == 3) {
	                        $state.go('app.otherwise');
	                    }
	                });
	            }
	        };
	        $scope.deleteNode = function (node, deleteType) {
	            Post.deleteNode(node, deleteType, $scope.callback);
	            // $scope.dat = Post.getPostat();
	        };
	        $scope.permission = function (post) {
	            return $rootScope.me.permission.social.indexOf(post) >= 0;
	        };
	        $scope.postPermission = function (permission, post, me) {
	            return $rootScope.me.permission.social.indexOf(permission) >= 0 && post == me;
	        };
	        $scope.commentPermission = function (permission, comment, me, post) {
	            return $rootScope.me.permission.social.indexOf(permission) >= 0 && (comment == me || post == me);
	        };
	        $scope.submitComment = function ($id, $index, $body, place) {
	            Post.submitComment($id, $index, this, $body, 'exams');
	        };
	        $scope.updateData = function (data, id) {
	            Post.updateData(data, id);
	        };
	        //
	    }

	    _createClass(ResultsClassexamController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return ResultsClassexamController;
	}();

	var ResultsClassexamComponent = exports.ResultsClassexamComponent = {
	    templateUrl: './views/app/components/results-classexam/results-classexam.component.html',
	    controller: ResultsClassexamController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 65 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ResultsClasshomeworkController = function () {
	    ResultsClasshomeworkController.$inject = ["Post", "moment", "$stateParams", "$scope", "$rootScope", "API", "$log", "Upload", "$timeout", "$state"];
	    function ResultsClasshomeworkController(Post, moment, $stateParams, $scope, $rootScope, API, $log, Upload, $timeout, $state) {
	        'ngInject';

	        _classCallCheck(this, ResultsClasshomeworkController);

	        this.$scope = $scope;
	        this.$scope.moment = moment;
	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	        var Post = this.Post;
	        this.Post.seturl('solo/homework/' + $stateParams.resultsid);
	        this.Post.setediturl('vc/edithomework');
	        this.Post.setdeleteurl('class/delete/' + $stateParams.resultsid + '/homeWork');
	        this.Post.setCommentDeleteUrl('social/delete/vc/comment');
	        this.Post.setskip(0);
	        this.Post.setSection('vc');
	        this.Post.settype('homework');
	        this.Post.settake(1);
	        this.Post.getPost().then(function (response) {
	            $scope.dat = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	            $rootScope.busy = false;
	        });
	        this.scope = $scope;
	        $scope.getPost = function () {
	            if ($scope.dat.length == 0) {
	                Post.getPost().then(function (response) {
	                    $scope.dat = Post.getPostat();
	                    $scope.nopost = Post.getnopost();
	                    $rootScope.busy = false;
	                    $scope.dat.map(function (item) {
	                        item.handover = new Date(item.handover);
	                    });
	                    if ($scope.nopost == 3) {
	                        $state.go('app.otherwise');
	                    }
	                });
	            }
	        };
	        $scope.deleteNode = function (node, deleteType) {
	            Post.deleteNode(node, deleteType, $scope.callback);
	            // $scope.dat = Post.getPostat();
	        };
	        $scope.permission = function (post) {
	            return $rootScope.me.permission.social.indexOf(post) >= 0;
	        };
	        $scope.postPermission = function (permission, post, me) {
	            return $rootScope.me.permission.social.indexOf(permission) >= 0 && post == me;
	        };
	        $scope.commentPermission = function (permission, comment, me, post) {
	            return $rootScope.me.permission.social.indexOf(permission) >= 0 && (comment == me || post == me);
	        };
	        $scope.submitComment = function ($id, $index, $body, place) {
	            Post.submitComment($id, $index, this, $body, place);
	            this.comment[$id] = "";
	            if (this.comment2 != undefined) this.comment2[$id] = "";
	            // $scope.dat = Post.getPostat();
	        };
	        $scope.updateData = function (data, id) {
	            Post.updateData(data, id);
	        };
	        //
	    }

	    _createClass(ResultsClasshomeworkController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return ResultsClasshomeworkController;
	}();

	var ResultsClasshomeworkComponent = exports.ResultsClasshomeworkComponent = {
	    templateUrl: './views/app/components/results-classhomework/results-classhomework.component.html',
	    controller: ResultsClasshomeworkController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 66 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ResultsClasspostController = function () {
	    ResultsClasspostController.$inject = ["$scope", "$stateParams", "moment", "API", "Post", "$rootScope", "$timeout", "Upload", "$log", "$state"];
	    function ResultsClasspostController($scope, $stateParams, moment, API, Post, $rootScope, $timeout, Upload, $log, $state) {
	        'ngInject';

	        _classCallCheck(this, ResultsClasspostController);

	        this.$scope = $scope;
	        this.$scope.moment = moment;

	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	        var Post = this.Post;
	        this.Post.seturl('solo/classpost/' + $stateParams.resultsid);
	        this.Post.setediturl('me/post-update');
	        this.Post.setdeleteurl('class/delete/' + $stateParams.resultsid + '/post');
	        this.Post.setCommentDeleteUrl('social/delete/vc/comment');
	        this.Post.settype('post');
	        this.Post.setSection('vc');
	        this.Post.setskip(0);
	        this.Post.settake(1);
	        this.Post.getPost().then(function (response) {
	            $scope.dat = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	            $rootScope.busy = false;
	        });
	        this.$scope = $scope;
	        $rootScope.type = 'classpost';
	        $scope.getPost = function () {
	            if ($scope.dat.length == 0) {
	                Post.getPost().then(function (response) {
	                    $scope.dat = Post.getPostat();
	                    $scope.nopost = Post.getnopost();
	                    $rootScope.busy = false;
	                    if ($scope.nopost == 3) {
	                        $state.go('app.otherwise');
	                    }
	                });
	            }
	        };
	        $scope.exprissionUser = function ($index, liker) {
	            // Post.getPost();
	            $rootScope.happyexp = 0;
	            $rootScope.normalexp = 0;
	            $rootScope.sadexp = 0;
	            Post.exprissionUser($index, liker);
	            $scope.exprissions = Post.getExprissions();
	            //console.log($rootScope.exprissions);
	            $timeout(function () {
	                $scope.exprissions = Post.getExprissions();
	            }, 1000);
	        };
	        $scope.exprission = function ($post, $exp) {
	            Post.exprission($post, $exp);
	            //$scope.dat = Post.getPostat();
	        };
	        $scope.deleteNode = function (node, deleteType) {
	            Post.deleteNode(node, deleteType, $scope.callback);
	            //$scope.dat = Post.getPostat();
	        };
	        $scope.callback = function () {
	            $scope.nopost = Post.getnopost();
	        };
	        $scope.permission = function (post) {
	            return $rootScope.me.permission.social.indexOf(post) >= 0;
	        };
	        $scope.postPermission = function (permission, post, me) {
	            return $rootScope.me.permission.social.indexOf(permission) >= 0 && post == me;
	        };
	        $scope.commentPermission = function (permission, comment, me, post) {
	            return $rootScope.me.permission.social.indexOf(permission) >= 0 && (comment == me || post == me);
	        };
	        $scope.submitComment = function ($id, $index, $body, place) {
	            Post.submitComment($id, $index, this, $body, place);
	            this.comment[$id] = "";
	            if (this.comment2 != undefined) this.comment2[$id] = "";
	            //$scope.dat = Post.getPostat();
	        };
	        $scope.updateData = function (data, id) {
	            Post.updateData(data, id);
	        };
	        //
	    }

	    _createClass(ResultsClasspostController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return ResultsClasspostController;
	}();

	var ResultsClasspostComponent = exports.ResultsClasspostComponent = {
	    templateUrl: './views/app/components/results-classpost/results-classpost.component.html',
	    controller: ResultsClasspostController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 67 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ResultsClassfileController = function () {
	    ResultsClassfileController.$inject = ["Post", "moment", "$stateParams", "$scope", "$rootScope", "ContextService", "API", "$interval", "$uibModal", "$log", "Upload", "$timeout", "$document", "$state"];
	    function ResultsClassfileController(Post, moment, $stateParams, $scope, $rootScope, ContextService, API, $interval, $uibModal, $log, Upload, $timeout, $document, $state) {
	        'ngInject';

	        _classCallCheck(this, ResultsClassfileController);

	        this.$scope = $scope;
	        this.$scope.moment = moment;
	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	        var Post = this.Post;
	        this.Post.seturl('solo/files/' + $stateParams.resultsid);
	        this.Post.setediturl('wvc/editfile');
	        this.Post.setsubmiturl('wvc/files');
	        this.Post.setuploadurl('api/me/upload-file/vc_file');
	        this.Post.setdeleteurl('class/delete/' + $stateParams.resultsid + '/files');
	        this.Post.setCommentDeleteUrl('social/delete/vc/comment');
	        this.Post.setskip(0);
	        this.Post.setSection('vc');
	        this.Post.settype('files');
	        this.Post.settake(1);
	        this.Post.getPost().then(function (response) {
	            $scope.dat = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	            $rootScope.busy = false;
	        });
	        this.scope = $scope;
	        // 
	        $scope.getPost = function () {
	            if ($scope.dat.length == 0) {
	                //$scope.nopost = 1;
	                Post.getPost().then(function (response) {
	                    $scope.dat = Post.getPostat();
	                    $scope.nopost = Post.getnopost();
	                    $rootScope.busy = false;
	                    if ($scope.nopost == 3) {
	                        $state.go('app.otherwise');
	                    }
	                });
	            }
	        };
	        $scope.deleteNode = function (node, parent, deleteType) {
	            Post.deleteNode(node, deleteType, $scope.correct);
	            // $scope.dat = Post.getPostat();
	        };
	        $scope.permission = function (post) {
	            return $rootScope.me.permission.social.indexOf(post) >= 0;
	        };
	        $scope.postPermission = function (permission, post, me) {
	            return $rootScope.me.permission.social.indexOf(permission) >= 0 && post == me;
	        };
	        $scope.commentPermission = function (permission, comment, me, post) {
	            return $rootScope.me.permission.social.indexOf(permission) >= 0 && (comment == me || post == me);
	        };
	        $scope.submitComment = function ($id, $index, $body, place) {
	            Post.submitComment($id, $index, this, $body, place);
	            this.comment[$id] = "";
	            if (this.comment2 != undefined) this.comment2[$id] = "";
	            // $scope.dat = Post.getPostat();
	        };
	        $scope.updateData = function (data, id) {
	            Post.updateData(data, id);
	        };
	    }

	    _createClass(ResultsClassfileController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return ResultsClassfileController;
	}();

	var ResultsClassfileComponent = exports.ResultsClassfileComponent = {
	    templateUrl: './views/app/components/results-classfile/results-classfile.component.html',
	    controller: ResultsClassfileController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 68 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VirtualclassInstructionsController = function () {
	    function VirtualclassInstructionsController() {
	        'ngInject';

	        //

	        _classCallCheck(this, VirtualclassInstructionsController);
	    }

	    _createClass(VirtualclassInstructionsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return VirtualclassInstructionsController;
	}();

	var VirtualclassInstructionsComponent = exports.VirtualclassInstructionsComponent = {
	    templateUrl: './views/app/components/virtualclass-instructions/virtualclass-instructions.component.html',
	    controller: VirtualclassInstructionsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 69 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var OtherwiseController = function () {
	    function OtherwiseController() {
	        'ngInject';

	        //

	        _classCallCheck(this, OtherwiseController);
	    }

	    _createClass(OtherwiseController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return OtherwiseController;
	}();

	var OtherwiseComponent = exports.OtherwiseComponent = {
	    templateUrl: './views/app/components/otherwise/otherwise.component.html',
	    controller: OtherwiseController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 70 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RegistrationEducationController = function () {
	    RegistrationEducationController.$inject = ["chatMessages", "moment", "$http", "AclService", "API", "$auth", "$stateParams", "$rootScope", "$scope", "$state", "Upload", "$timeout"];
	    function RegistrationEducationController(chatMessages, moment, $http, AclService, API, $auth, $stateParams, $rootScope, $scope, $state, Upload, $timeout) {
	        'ngInject';

	        _classCallCheck(this, RegistrationEducationController);

	        this.$state = $state;
	        this.rootScope = $rootScope;
	        this.$auth = $auth;
	        this.$stateParams = $stateParams;
	        this.scope = $scope;
	        this.scope.fromtime = new Date();
	        this.scope.totime = new Date();
	        this.Upload = Upload;
	        this.timeout = $timeout;
	        this.regsubmit = false;
	        this.$http = $http;
	        this.chatMessages = chatMessages;
	        $scope.fromtime.setHours(0);
	        $scope.fromtime.setMinutes(0);
	        $scope.totime.setHours(0);
	        $scope.totime.setMinutes(0);
	        $scope.unvcountries = [];
	        this.files = [];
	        this.scope.fileErrorFlag = false;
	        this.scope.timeErrorFlag = false;
	        if (this.rootScope.user == undefined) {
	            $state.go('logins.login.index');
	        }
	        $scope.fromChanged = function (fromtime, files) {
	            $scope.fromtime.setHours($scope.fromtime.getHours());
	            $scope.fromtime.setMinutes($scope.fromtime.getMinutes());
	            this.doctorValid(files);
	        };
	        $scope.totimeChanged = function (totime, files) {
	            $scope.totime.setHours($scope.totime.getHours());
	            $scope.totime.setMinutes($scope.totime.getMinutes());
	            this.doctorValid(files);
	        };
	        // Retrieve Firebase Messaging object.
	        var messaging = firebase.messaging();
	        messaging.requestPermission().then(function () {
	            console.log('Notification permission granted.');
	            // console.log(messaging.getToken());
	            return messaging.getToken();
	        }).then(function (Token) {
	            // console.log(Token);
	            $rootScope.token = Token;
	        }).catch(function (err) {
	            console.log('Unable to get permission to notify.', err);
	        });
	        // $scope.getUniversity = function() {
	        //      console.log(2222);
	        //     var counId = $rootScope.user.countries;
	        //     return $http.get('/api/auth/university-by-name/'+counId, {
	        //     }).then(function(response){
	        //       return response.data.data.universities.map(function(item){
	        //         return item;
	        //       });
	        //     });
	        // };
	        //  $scope.getCollages  = function() {
	        //     var unvId = $rootScope.user.university.university_id;
	        //     if(unvId){
	        //         return $http.get('/api/auth/colleges-by-university/'+unvId, {
	        //         }).then(function(response){
	        //             console.log(response);
	        //           // return response.data.data.specialitions.map(function(item){
	        //           //   return item;
	        //           // });
	        //         });
	        //     }
	        // };
	        // $scope.getSpecialization = function() {
	        //     var unvId = $rootScope.user.university.university_id;
	        //     if(unvId){
	        //         return $http.get('/api/auth/specialition-by-name/'+unvId, {
	        //         }).then(function(response){
	        //           return response.data.data.specialitions.map(function(item){
	        //             return item;
	        //           });
	        //         });
	        //     }
	        // };

	        $http.get('/api/auth/get-countries-list', {}).then(function (response) {
	            $scope.unvcountries = response.data.data;
	        });
	        $scope.doctorValid = function (files) {
	            var self = this;

	            if (!files) {
	                self.fileErrorFlag = true;
	            } else {
	                self.fileErrorFlag = false;
	            }
	            if (self.fromtime.getTime() == self.totime.getTime()) {
	                self.timeErrorFlag = true;
	            } else {
	                self.timeErrorFlag = false;
	            }
	            if (self.fileErrorFlag && self.timeErrorFlag) {
	                return false;
	            } else {
	                return true;
	            }
	        };
	        // $scope.$on('$locationChangeStart', function( event , to, params) {
	        //     console.log(event);
	        //     console.log(to);
	        //     console.log(params);
	        //     if(next != current) {
	        //         var answer = confirm("هل انتا متاكد هذا الصفحة?")
	        //         if (!answer) {
	        //             event.preventDefault();
	        //         }
	        //     }
	        // });
	    }
	    // toTimeZone(time) {
	    //     //moment.parseZone('2016-05-03T22:15:01+02:00').local().format()
	    //     return this.scope.moment.parseZone(time).add(2,'h');
	    // }     

	    _createClass(RegistrationEducationController, [{
	        key: 'eduRegister',
	        value: function eduRegister(isValid, files, _self) {
	            var self = this;
	            if (self.rootScope.user.status == 2) {
	                var doctorValid = false;
	                doctorValid = this.scope.doctorValid(files);
	                isValid = doctorValid;
	            }
	            if (isValid) {
	                //_self.fileUrl = '';
	                if (self.rootScope.user.status == 2) {
	                    var from = new Date();
	                    from.setHours(self.scope.fromtime.getHours() + 2);
	                    from.setMinutes(self.scope.fromtime.getMinutes());
	                    var to = new Date();
	                    to.setHours(self.scope.totime.getHours() + 2);
	                    to.setMinutes(self.scope.totime.getMinutes());
	                    // console.log(from);
	                    // console.log(to);
	                    if (files) {
	                        var file = files;
	                        if (!file.$error) {
	                            this.Upload.upload({
	                                url: 'api/auth/upload-file/doctor_cv',
	                                method: 'POST',
	                                file: file
	                            }).then(function (resp) {
	                                // console.log(resp.data.data);
	                                var fileUrl = resp.data.data.file_name;
	                                var user = {
	                                    name: self.rootScope.user.name,
	                                    email: self.rootScope.user.email,
	                                    password: self.rootScope.user.password,
	                                    account_type: self.rootScope.user.status,
	                                    country_id: self.rootScope.user.countries,
	                                    specialization_id: self.rootScope.user.specialization,
	                                    fromtime: from,
	                                    totime: to,
	                                    fileUrl: fileUrl,
	                                    token: self.rootScope.token,
	                                    platform: 'web'
	                                };
	                                // console.log(user); 
	                                self.$auth.signup(user).then(function (response) {
	                                    self.chatMessages.init(response.data.data.user).then(function (user) {
	                                        self.rootScope.chatMessages.getRooms().then(function (Rooms) {
	                                            self.rootScope.chatMessages.Rooms = Rooms;
	                                            self.rootScope.Rooms = Rooms;
	                                            self.rootScope.messaging_enabled = true;
	                                            self.rootScope.chatMessages.checkStatus();
	                                            self.$auth.setToken(response.data.data.token);
	                                            window.location.href = "/";
	                                        });
	                                    });
	                                }).catch(self.failedRegistration.bind(self));
	                            });
	                        }
	                    }
	                } else {
	                    var user = {
	                        name: self.rootScope.user.name,
	                        email: self.rootScope.user.email,
	                        password: self.rootScope.user.password,
	                        account_type: self.rootScope.user.status,
	                        country_id: self.rootScope.user.countries,
	                        specialization_id: self.rootScope.user.specialization,
	                        fromtime: '',
	                        totime: '',
	                        fileUrl: '',
	                        token: self.rootScope.token,
	                        platform: 'web'
	                    };
	                    // console.log(user); 
	                    self.$auth.signup(user).then(function (response) {
	                        self.chatMessages.init(response.data.data.user).then(function (user) {
	                            self.rootScope.chatMessages.getRooms().then(function (Rooms) {
	                                self.rootScope.chatMessages.Rooms = Rooms;
	                                self.rootScope.Rooms = Rooms;
	                                self.rootScope.messaging_enabled = true;
	                                self.rootScope.chatMessages.checkStatus();
	                                self.$auth.setToken(response.data.data.token);
	                                window.location.href = "/";
	                            });
	                        });
	                    }).catch(self.failedRegistration.bind(self));
	                }
	            } else {
	                this.regsubmit = true;
	                console.log('notVaild');
	            }
	        }
	    }, {
	        key: 'failedRegistration',
	        value: function failedRegistration(response) {
	            if (response.status === 422) {
	                for (var error in response.data.errors) {
	                    this.errors[error] = response.data.errors[error][0];
	                    this.registerForm.$invalid = true;
	                    this.registerForm[error].$invalid = true;
	                }
	            }
	        }
	    }, {
	        key: 'changeCountry',
	        value: function changeCountry(self) {
	            this.rootScope.user.university = '';
	            this.rootScope.user.specialization = '';
	            self.scope.unvrepeat = '';
	            self.scope.sperepeat = '';
	            var counId = this.rootScope.user.countries;
	            if (counId) {
	                this.$http.get('/api/auth/university-by-name/' + counId, {}).then(function (response) {
	                    self.scope.unvrepeat = response.data.data.universities;
	                });
	            }
	        }
	    }, {
	        key: 'changeUniversity',
	        value: function changeUniversity(self) {
	            this.rootScope.user.collages = '';
	            this.rootScope.user.specialization = '';
	            var unvId = this.rootScope.user.university;
	            // console.log(unvId);
	            if (unvId) {
	                this.$http.get('/api/auth/colleges-by-university/' + unvId, {}).then(function (response) {
	                    // console.log(response);
	                    self.scope.colrepeat = response.data.data.colleges;
	                });
	            }
	        }
	    }, {
	        key: 'changeCollages',
	        value: function changeCollages(self) {
	            this.rootScope.user.specialization = '';
	            var colId = this.rootScope.user.collages;
	            // console.log(colId);
	            if (colId) {
	                this.$http.get('/api/auth/specialition-by-name/' + colId, {}).then(function (response) {
	                    // console.log(response);
	                    self.scope.sperepeat = response.data.data.specialitions;
	                });
	            }
	        }
	    }, {
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return RegistrationEducationController;
	}();

	var RegistrationEducationComponent = exports.RegistrationEducationComponent = {
	    templateUrl: './views/app/components/registration-education/registration-education.component.html',
	    controller: RegistrationEducationController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 71 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SpecializationAttachmentsHomeworkController = function () {
	    function SpecializationAttachmentsHomeworkController() {
	        'ngInject';

	        //

	        _classCallCheck(this, SpecializationAttachmentsHomeworkController);
	    }

	    _createClass(SpecializationAttachmentsHomeworkController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return SpecializationAttachmentsHomeworkController;
	}();

	var SpecializationAttachmentsHomeworkComponent = exports.SpecializationAttachmentsHomeworkComponent = {
	    templateUrl: './views/app/components/specialization-attachments-homework/specialization-attachments-homework.component.html',
	    controller: SpecializationAttachmentsHomeworkController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 72 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SpecializationAttachmentsPhotosController = function () {
	    function SpecializationAttachmentsPhotosController() {
	        'ngInject';

	        //

	        _classCallCheck(this, SpecializationAttachmentsPhotosController);
	    }

	    _createClass(SpecializationAttachmentsPhotosController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return SpecializationAttachmentsPhotosController;
	}();

	var SpecializationAttachmentsPhotosComponent = exports.SpecializationAttachmentsPhotosComponent = {
	    templateUrl: './views/app/components/specialization-attachments-photos/specialization-attachments-photos.component.html',
	    controller: SpecializationAttachmentsPhotosController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 73 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SpecializationAttachmentsVideosController = function () {
	    function SpecializationAttachmentsVideosController() {
	        'ngInject';

	        //

	        _classCallCheck(this, SpecializationAttachmentsVideosController);
	    }

	    _createClass(SpecializationAttachmentsVideosController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return SpecializationAttachmentsVideosController;
	}();

	var SpecializationAttachmentsVideosComponent = exports.SpecializationAttachmentsVideosComponent = {
	    templateUrl: './views/app/components/specialization-attachments-videos/specialization-attachments-videos.component.html',
	    controller: SpecializationAttachmentsVideosController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 74 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SpecializationAttachmentsFilesController = function () {
	    function SpecializationAttachmentsFilesController() {
	        'ngInject';

	        //

	        _classCallCheck(this, SpecializationAttachmentsFilesController);
	    }

	    _createClass(SpecializationAttachmentsFilesController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return SpecializationAttachmentsFilesController;
	}();

	var SpecializationAttachmentsFilesComponent = exports.SpecializationAttachmentsFilesComponent = {
	    templateUrl: './views/app/components/specialization-attachments-files/specialization-attachments-files.component.html',
	    controller: SpecializationAttachmentsFilesController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 75 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SpecializationAttachmentsController = function () {
	    function SpecializationAttachmentsController() {
	        'ngInject';

	        //

	        _classCallCheck(this, SpecializationAttachmentsController);
	    }

	    _createClass(SpecializationAttachmentsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return SpecializationAttachmentsController;
	}();

	var SpecializationAttachmentsComponent = exports.SpecializationAttachmentsComponent = {
	    templateUrl: './views/app/components/specialization-attachments/specialization-attachments.component.html',
	    controller: SpecializationAttachmentsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 76 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SpecializationAttachmentController = function () {
	    function SpecializationAttachmentController() {
	        'ngInject';

	        //

	        _classCallCheck(this, SpecializationAttachmentController);
	    }

	    _createClass(SpecializationAttachmentController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return SpecializationAttachmentController;
	}();

	var SpecializationAttachmentComponent = exports.SpecializationAttachmentComponent = {
	    templateUrl: './views/app/components/specialization-attachment/specialization-attachment.component.html',
	    controller: SpecializationAttachmentController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 77 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ResultsPostController = function () {
	    ResultsPostController.$inject = ["$scope", "$stateParams", "moment", "API", "Post", "$rootScope", "$timeout", "Upload", "$log", "$state"];
	    function ResultsPostController($scope, $stateParams, moment, API, Post, $rootScope, $timeout, Upload, $log, $state) {
	        'ngInject';
	        //   

	        _classCallCheck(this, ResultsPostController);

	        this.$scope = $scope;
	        this.$scope.moment = moment;
	        this.$stateParams = $stateParams;
	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	        var Post = this.Post;
	        this.Post.seturl('solo/post/' + $stateParams.resultsid);
	        this.Post.setediturl('me/post-update');
	        this.Post.setSection('home');
	        this.Post.setCommentDeleteUrl('social/delete/home/comment');
	        this.Post.settype('post');
	        this.Post.setskip(0);
	        this.Post.settake(1);
	        //this.Post.getPost();
	        this.Post.getPost().then(function (response) {
	            $scope.dat = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	            $rootScope.busy = false;
	        });
	        $rootScope.type = 'post';
	        this.$scope = $scope;
	        //$scope.dat = [];
	        //$scope.dat = Post.getPostat();
	        // 
	        this.$scope = $scope;

	        $scope.getPost = function () {
	            $scope.nopost = Post.getnopost();
	            if ($scope.dat.length == 0) {
	                Post.getPost();
	                $scope.dat = Post.getPostat();
	                $scope.nopost = Post.getnopost();
	                if ($scope.nopost == 3) {
	                    $state.go('app.otherwise');
	                }
	                $rootScope.busy = false;
	            }
	        };
	        $scope.exprissionUser = function ($index, liker) {
	            // Post.getPost();
	            $rootScope.happyexp = 0;
	            $rootScope.normalexp = 0;
	            $rootScope.sadexp = 0;
	            Post.exprissionUser($index, liker);
	            $scope.exprissions = Post.getExprissions();
	            //console.log($rootScope.exprissions);
	            $timeout(function () {
	                $scope.exprissions = Post.getExprissions();
	            }, 1000);
	        };
	        $scope.exprission = function ($post, $exp) {
	            Post.exprission($post, $exp);
	            //$scope.dat = Post.getPostat();
	        };
	        $scope.deleteNode = function (node, deleteType) {
	            Post.deleteNode(node, deleteType, $scope.callback);
	            //$scope.dat = Post.getPostat();
	        };
	        $scope.callback = function () {
	            $scope.nopost = Post.getnopost();
	        };
	        $scope.permission = function (post) {
	            return $rootScope.me.permission.social.indexOf(post) >= 0;
	        };
	        $scope.postPermission = function (permission, post, me) {
	            return $rootScope.me.permission.social.indexOf(permission) >= 0 && post == me;
	        };
	        $scope.commentPermission = function (permission, comment, me, post) {
	            return $rootScope.me.permission.social.indexOf(permission) >= 0 && (comment == me || post == me);
	        };
	        $scope.submitComment = function ($id, $index, $body, place) {
	            Post.submitComment($id, $index, this, $body, place);
	            this.comment[$id] = "";
	            if (this.comment2 != undefined) this.comment2[$id] = "";
	            //$scope.dat = Post.getPostat();
	        };
	        $scope.updateData = function (data, id) {
	            Post.updateData(data, id);
	        };
	    }

	    _createClass(ResultsPostController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return ResultsPostController;
	}();

	var ResultsPostComponent = exports.ResultsPostComponent = {
	    templateUrl: './views/app/components/results-post/results-post.component.html',
	    controller: ResultsPostController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 78 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ResultsController = function () {
	    function ResultsController() {
	        'ngInject';

	        //

	        _classCallCheck(this, ResultsController);
	    }

	    _createClass(ResultsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return ResultsController;
	}();

	var ResultsComponent = exports.ResultsComponent = {
	    templateUrl: './views/app/components/results/results.component.html',
	    controller: ResultsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 79 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GroupAttachmentsVideosController = function () {
	    GroupAttachmentsVideosController.$inject = ["$scope", "$rootScope", "API", "$stateParams", "Post", "$timeout", "moment", "Upload", "$log"];
	    function GroupAttachmentsVideosController($scope, $rootScope, API, $stateParams, Post, $timeout, moment, Upload, $log) {
	        'ngInject';

	        _classCallCheck(this, GroupAttachmentsVideosController);

	        this.$scope = $scope;
	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	        var Post = this.Post;
	        this.Post.seturl('gr/video/' + $stateParams.groupid);
	        this.Post.setskip(0);
	        this.Post.settake(4);
	        this.Post.getPost().then(function (response) {
	            $scope.dat = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	            $rootScope.busy = false;
	        });
	        this.$scope = $scope;
	        $scope.getPost = function () {
	            Post.getPost().then(function (response) {
	                $scope.dat = Post.getPostat();
	                $scope.nopost = Post.getnopost();
	                $rootScope.busy = false;
	            });
	        };
	    }

	    _createClass(GroupAttachmentsVideosController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return GroupAttachmentsVideosController;
	}();

	var GroupAttachmentsVideosComponent = exports.GroupAttachmentsVideosComponent = {
	    templateUrl: './views/app/components/group-attachments-videos/group-attachments-videos.component.html',
	    controller: GroupAttachmentsVideosController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 80 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GroupAttachmentsPhotosController = function () {
	    GroupAttachmentsPhotosController.$inject = ["$scope", "$rootScope", "API", "$stateParams", "Post", "$timeout", "moment", "Upload", "$log"];
	    function GroupAttachmentsPhotosController($scope, $rootScope, API, $stateParams, Post, $timeout, moment, Upload, $log) {
	        'ngInject';

	        _classCallCheck(this, GroupAttachmentsPhotosController);

	        this.$scope = $scope;
	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	        var Post = this.Post;
	        this.Post.seturl('gr/images/' + $stateParams.groupid);
	        this.Post.setskip(0);
	        this.Post.settake(4);
	        //this.Post.getPost();
	        this.Post.getPost().then(function (response) {
	            $scope.dat = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	            $rootScope.busy = false;
	        });
	        //this.$scope = $scope;
	        //this.$scope.dat=this.Post.getPostat();
	        this.$scope = $scope;
	        $scope.getPost = function () {
	            Post.getPost().then(function (response) {
	                $scope.dat = Post.getPostat();
	                $scope.nopost = Post.getnopost();
	                $rootScope.busy = false;
	            });
	        };
	    }

	    _createClass(GroupAttachmentsPhotosController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return GroupAttachmentsPhotosController;
	}();

	var GroupAttachmentsPhotosComponent = exports.GroupAttachmentsPhotosComponent = {
	    templateUrl: './views/app/components/group-attachments-photos/group-attachments-photos.component.html',
	    controller: GroupAttachmentsPhotosController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 81 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GroupAttachmentsPhotoController = function () {
	    function GroupAttachmentsPhotoController() {
	        'ngInject';

	        //

	        _classCallCheck(this, GroupAttachmentsPhotoController);
	    }

	    _createClass(GroupAttachmentsPhotoController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return GroupAttachmentsPhotoController;
	}();

	var GroupAttachmentsPhotoComponent = exports.GroupAttachmentsPhotoComponent = {
	    templateUrl: './views/app/components/group-attachments-photo/group-attachments-photo.component.html',
	    controller: GroupAttachmentsPhotoController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 82 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GroupAttachmentsFilesController = function () {
	    function GroupAttachmentsFilesController() {
	        'ngInject';

	        //

	        _classCallCheck(this, GroupAttachmentsFilesController);
	    }

	    _createClass(GroupAttachmentsFilesController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return GroupAttachmentsFilesController;
	}();

	var GroupAttachmentsFilesComponent = exports.GroupAttachmentsFilesComponent = {
	    templateUrl: './views/app/components/group-attachments-files/group-attachments-files.component.html',
	    controller: GroupAttachmentsFilesController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 83 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GroupAttachmentsController = function () {
	    function GroupAttachmentsController() {
	        'ngInject';

	        //

	        _classCallCheck(this, GroupAttachmentsController);
	    }

	    _createClass(GroupAttachmentsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return GroupAttachmentsController;
	}();

	var GroupAttachmentsComponent = exports.GroupAttachmentsComponent = {
	    templateUrl: './views/app/components/group-attachments/group-attachments.component.html',
	    controller: GroupAttachmentsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 84 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SupportController = function () {
	    SupportController.$inject = ["API", "Post", "$rootScope", "moment", "Upload", "$scope", "$timeout", "$log"];
	    function SupportController(API, Post, $rootScope, moment, Upload, $scope, $timeout, $log) {
	        'ngInject';
	        //this.$http = $http;

	        _classCallCheck(this, SupportController);

	        this.$rootScope = $rootScope;
	        this.$rootScope.pageTitle = "الدعم";
	        this.$scope = $scope;
	        this.timeout = $timeout;
	        this.API = API;
	        this.Upload = Upload;
	        this.$scope.moment = moment;
	        this.files = [];
	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload);
	        var Post = this.Post;
	        this.Post.seturl('home/contact-us-messages');
	        this.Post.setskip(0);
	        this.Post.settake(5);
	        //console.log('$rootScope.newPost');
	        this.Post.getPost().then(function (response) {
	            $scope.dat = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	            $rootScope.busy = false;
	        });
	        this.Post.setsubmiturl('home/contact-us');
	        this.Post.setuploadurl('api/wvc/uploadhw');
	        this.Post.settype('support');
	        this.scope = $scope;

	        $scope.getPost = function () {
	            Post.seturl('home/contact-us-messages');
	            Post.getPost().then(function (response) {
	                $scope.dat = Post.getPostat();
	                $scope.nopost = Post.getnopost();
	                $rootScope.busy = false;
	            });
	        };
	        $scope.correct = function (response, postat) {
	            $scope.dat = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	        };
	        $scope.addTicket = function (form, files, self) {
	            var hasFile = false;
	            if (form.$valid) {
	                Post.NewNode($rootScope.newPost, $scope.correct, hasFile, files);
	                form.$submitted = false;
	            }
	        };
	    }

	    _createClass(SupportController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return SupportController;
	}();

	var SupportComponent = exports.SupportComponent = {
	    templateUrl: './views/app/components/support/support.component.html',
	    controller: SupportController,
	    controllerAs: 'sup',
	    bindings: {}
	};

/***/ },
/* 85 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RegistrationBoxController = function () {
	    RegistrationBoxController.$inject = ["chatMessages", "$http", "AclService", "API", "$auth", "$stateParams", "$rootScope", "$scope", "$state", "toastr"];
	    function RegistrationBoxController(chatMessages, $http, AclService, API, $auth, $stateParams, $rootScope, $scope, $state, toastr) {
	        'ngInject';

	        _classCallCheck(this, RegistrationBoxController);

	        $rootScope.user = [];
	        this.scope = $scope;
	        this.$state = $state;
	        this.rootScope = $rootScope;
	        this.$auth = $auth;
	        this.API = API;
	        this.toastr = toastr;
	        this.$stateParams = $stateParams;
	        this.AclService = AclService;
	        this.registerSuccess = $stateParams.registerSuccess;
	        this.successMsg = $stateParams.successMsg;
	        this.loginfailed = false;
	        this.unverified = false;
	        this.scope.formError = false;
	        this.scope.formErrorData = '';
	        this.rootScope.pageTitle = 'مرحبًا بك في ادزانس';
	        this.rootScope.user.name = '';
	        this.rootScope.user.email = '';
	        this.rootScope.user.password = '';
	        this.rootScope.isToken = 123;
	        this.$http = $http;
	        this.checkEmail = false;
	        this.chatMessages = chatMessages;
	        $scope.unvcountries = [];
	        angular.element('meta[name=Description]').attr('content', 'تواصل مع مدرسيك وزملائك , احصل على ملفاتك الدراسية و على تنبيهات الامتحانات , شارك زملائك آرائك ونقاشاتك وتطلعاتك .');
	        angular.element('meta[name=Keywords]').attr('content', 'دزانس,ادزنس,ed-zance,edzance');
	        $http.get('/api/auth/get-countries-list', {}).then(function (response) {
	            $scope.unvcountries = response.data.data;
	        });
	        var messaging = firebase.messaging();
	        messaging.requestPermission().then(function () {
	            // console.log('Notification permission granted.');
	            // console.log(messaging.getToken());
	            return messaging.getToken();
	        }).then(function (Token) {
	            // console.log(Token);
	            $rootScope.token = Token;
	        }).catch(function (err) {
	            // console.log('Unable to get permission to notify.', err);
	        });
	    }
	    // register (isValid,vm) {
	    //   //console.log(this.$stateParams);
	    //     var data = { email: this.rootScope.user.email};
	    //     var registerData = {  
	    //         name:this.rootScope.user.name,
	    //         email: this.rootScope.user.email,
	    //         password: this.rootScope.user.password,
	    //         country_id: this.rootScope.user.countries,
	    //         university: this.rootScope.user.university,
	    //         token: self.rootScope.token,
	    //         platform: 'web'
	    //     };
	    //   if (isValid) {
	    //     this.API.all('/auth/check-registered-email').post(data).then((response) => {
	    //       if(response.data == "success"){
	    //          this.API.all('/auth/register').post(data);
	    //         //this.$state.go('logins.registration-education');
	    //         //this.formError = false;
	    //       }  
	    //     },(response) =>{ 
	    //       if(response.data.status_code == 422){
	    //         //this.formErrorData = response.data.errors;
	    //         this.toastr.error(response.data.errors.email[0]);
	    //         //this.formError = true;
	    //       }
	    //     });
	    //   } else {
	    //     this.formSubmitted = true;
	    //   }
	    // }


	    _createClass(RegistrationBoxController, [{
	        key: 'register',
	        value: function register(isValid, vm) {
	            var _this = this;

	            var self = this;
	            if (isValid) {
	                var data = { email: this.rootScope.user.email };
	                this.API.all('/auth/check-registered-email').post(data).then(function (response) {
	                    if (response.data == "success") {
	                        self.checkEmail = true;
	                        self.signup();
	                    }
	                }, function (response) {
	                    if (response.data.status_code == 422) {
	                        self.checkEmail = false;
	                        //this.formErrorData = response.data.errors;
	                        _this.toastr.error(response.data.errors.email[0]);
	                        //this.formError = true;
	                    }
	                });
	            } else {
	                this.regsubmit = true;
	                console.log('notVaild');
	            }
	        }
	    }, {
	        key: 'signup',
	        value: function signup() {
	            var self = this;
	            var user = {
	                name: this.rootScope.user.name,
	                email: this.rootScope.user.email,
	                password: this.rootScope.user.password,
	                country_id: this.rootScope.user.countries,
	                //university: this.rootScope.user.university,
	                token: self.rootScope.token,
	                platform: 'web'
	            };
	            self.$auth.signup(user).then(function (response) {
	                self.chatMessages.init(response.data.data.user).then(function (user) {
	                    self.rootScope.chatMessages.getRooms().then(function (Rooms) {
	                        self.rootScope.chatMessages.Rooms = Rooms;
	                        self.rootScope.Rooms = Rooms;
	                        self.rootScope.messaging_enabled = true;
	                        self.rootScope.chatMessages.checkStatus();
	                        self.$auth.setToken(response.data.data.token);
	                        window.location.href = "/";
	                    });
	                });
	            });
	        }
	    }, {
	        key: 'go',
	        value: function go(url) {
	            if (url == '') {
	                url = 'logins.register.error';
	            }
	            this.$state.go(url, { back: this.$stateParams.back, next: this.$stateParams.next, type: this.$stateParams.type });
	        }
	        // changeCountry (self) {
	        //     this.rootScope.user.university = '';
	        //     this.rootScope.user.specialization = '';
	        //     self.scope.unvrepeat = '';
	        //     self.scope.sperepeat = '';
	        //     var counId = this.rootScope.user.countries;
	        //     if(counId){
	        //         this.$http.get('/api/auth/by-countrey-id/'+counId, {
	        //         }).then(function(response){
	        //             console.log(response.data.ins__institutes);
	        //             self.scope.unvrepeat = response.data.ins__institutes; 
	        //         });
	        //     }
	        // }

	    }, {
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return RegistrationBoxController;
	}();

	var RegistrationBoxComponent = exports.RegistrationBoxComponent = {
	    templateUrl: './views/app/components/registration-box/registration-box.component.html',
	    controller: RegistrationBoxController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 86 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LoginBoxController = function () {
	    LoginBoxController.$inject = ["$http", "AclService", "API", "$auth", "$stateParams", "$rootScope", "$scope", "$state", "toastr"];
	    function LoginBoxController($http, AclService, API, $auth, $stateParams, $rootScope, $scope, $state, toastr) {
	        'ngInject';

	        _classCallCheck(this, LoginBoxController);

	        this.scope = $scope;
	        this.$state = $state;
	        this.rootScope = $rootScope;
	        this.$auth = $auth;
	        this.API = API;
	        this.$stateParams = $stateParams;
	        this.AclService = AclService;
	        this.toastr = toastr;
	        // $rootScope.throttle = false;

	        console.log("state:", $state.current.name, 'and throttle:', $rootScope.throttle);
	        if ($state.current.name == "logins.login.retry") {
	            $rootScope.throttle = true;
	        }
	        if ($state.current.name != "logins.login.retry" && $rootScope.throttle == true) {
	            this.$state.go('logins.login.retry');
	            $rootScope.throttle = true;
	        }

	        // if (this.rootScope.redirecFlag == 1) {
	        //     this.$state.go('logins.login.retry');
	        // }
	        // Retrieve Firebase Messaging object.
	        var messaging = firebase.messaging();
	        messaging.requestPermission().then(function () {
	            // console.log('Notification permission granted.');
	            // console.log(messaging.getToken());
	            return messaging.getToken();
	        }).then(function (Token) {
	            $rootScope.token = Token;
	        }).catch(function (err) {
	            // console.log('Unable to get permission to notify.', err);
	        });
	    }

	    _createClass(LoginBoxController, [{
	        key: 'login',
	        value: function login(isValid, _self) {
	            var _this = this;

	            //this.rootScope.redirecFlag = 0;
	            if (isValid) {
	                this.loginfailed = false;
	                this.unverified = false;
	                var user = {
	                    email: this.logemail,
	                    password: this.logpassword,
	                    recaptcha: this.gRecaptchaResponse,
	                    token: this.rootScope.token,
	                    platform: "web"
	                };
	                this.$auth.login(user).then(function (response) {
	                    if (response.data.data.sucess == false) {
	                        if (_this.$state.current.name != "logins.login.retry") {
	                            _this.$state.go('logins.login.retry');
	                            _this.rootScope.throttle = true;

	                            //this.rootScope.redirecFlag = 1;
	                        }
	                        // _self.scope.show_captcha = response.data.data.result.show_captcha ;
	                        _this.toastr.error(response.data.data.result);
	                    } else {
	                        _this.$auth.setToken(response.data);
	                        window.location.href = "/#/";
	                    }
	                }).catch(this.failedLogin.bind(this));
	            } else {
	                this.logSubmitted = true;
	                // console.log(this)
	            }
	        }
	    }, {
	        key: 'failedLogin',
	        value: function failedLogin(res) {
	            if (res.status == 401) {
	                this.loginfailed = true;
	            } else {
	                if (res.data.errors.message[0] == 'Email Unverified') {
	                    this.unverified = true;
	                }
	            }
	        }
	    }, {
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return LoginBoxController;
	}();

	var LoginBoxComponent = exports.LoginBoxComponent = {
	    templateUrl: './views/app/components/login-box/login-box.component.html',
	    controller: LoginBoxController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 87 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SpecializationInstructorsController = function () {
	    function SpecializationInstructorsController() {
	        'ngInject';

	        //

	        _classCallCheck(this, SpecializationInstructorsController);
	    }

	    _createClass(SpecializationInstructorsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return SpecializationInstructorsController;
	}();

	var SpecializationInstructorsComponent = exports.SpecializationInstructorsComponent = {
	    templateUrl: './views/app/components/specialization-instructors/specialization-instructors.component.html',
	    controller: SpecializationInstructorsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 88 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SpecializationGroupsController = function () {
	    function SpecializationGroupsController() {
	        'ngInject';

	        //

	        _classCallCheck(this, SpecializationGroupsController);
	    }

	    _createClass(SpecializationGroupsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return SpecializationGroupsController;
	}();

	var SpecializationGroupsComponent = exports.SpecializationGroupsComponent = {
	    templateUrl: './views/app/components/specialization-groups/specialization-groups.component.html',
	    controller: SpecializationGroupsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 89 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SpecializationPhotosController = function () {
	    function SpecializationPhotosController() {
	        'ngInject';

	        //

	        _classCallCheck(this, SpecializationPhotosController);
	    }

	    _createClass(SpecializationPhotosController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return SpecializationPhotosController;
	}();

	var SpecializationPhotosComponent = exports.SpecializationPhotosComponent = {
	    templateUrl: './views/app/components/specialization-photos/specialization-photos.component.html',
	    controller: SpecializationPhotosController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 90 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SpecializationVideosController = function () {
	    function SpecializationVideosController() {
	        'ngInject';

	        //

	        _classCallCheck(this, SpecializationVideosController);
	    }

	    _createClass(SpecializationVideosController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return SpecializationVideosController;
	}();

	var SpecializationVideosComponent = exports.SpecializationVideosComponent = {
	    templateUrl: './views/app/components/specialization-videos/specialization-videos.component.html',
	    controller: SpecializationVideosController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 91 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SpecializationFilesController = function () {
	    function SpecializationFilesController() {
	        'ngInject';

	        //

	        _classCallCheck(this, SpecializationFilesController);
	    }

	    _createClass(SpecializationFilesController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return SpecializationFilesController;
	}();

	var SpecializationFilesComponent = exports.SpecializationFilesComponent = {
	    templateUrl: './views/app/components/specialization-files/specialization-files.component.html',
	    controller: SpecializationFilesController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 92 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SpecializationStudentsController = function () {
	    function SpecializationStudentsController() {
	        'ngInject';

	        //

	        _classCallCheck(this, SpecializationStudentsController);
	    }

	    _createClass(SpecializationStudentsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return SpecializationStudentsController;
	}();

	var SpecializationStudentsComponent = exports.SpecializationStudentsComponent = {
	    templateUrl: './views/app/components/specialization-students/specialization-students.component.html',
	    controller: SpecializationStudentsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 93 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SpecializationHomeworkController = function () {
	    function SpecializationHomeworkController() {
	        'ngInject';

	        //

	        _classCallCheck(this, SpecializationHomeworkController);
	    }

	    _createClass(SpecializationHomeworkController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return SpecializationHomeworkController;
	}();

	var SpecializationHomeworkComponent = exports.SpecializationHomeworkComponent = {
	    templateUrl: './views/app/components/specialization-homework/specialization-homework.component.html',
	    controller: SpecializationHomeworkController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 94 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SpecializationMaterialsController = function () {
	    function SpecializationMaterialsController() {
	        'ngInject';

	        //

	        _classCallCheck(this, SpecializationMaterialsController);
	    }

	    _createClass(SpecializationMaterialsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return SpecializationMaterialsController;
	}();

	var SpecializationMaterialsComponent = exports.SpecializationMaterialsComponent = {
	    templateUrl: './views/app/components/specialization-materials/specialization-materials.component.html',
	    controller: SpecializationMaterialsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 95 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SpecializationDiscussionController = function () {
	    function SpecializationDiscussionController() {
	        'ngInject';

	        //

	        _classCallCheck(this, SpecializationDiscussionController);
	    }

	    _createClass(SpecializationDiscussionController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return SpecializationDiscussionController;
	}();

	var SpecializationDiscussionComponent = exports.SpecializationDiscussionComponent = {
	    templateUrl: './views/app/components/specialization-discussion/specialization-discussion.component.html',
	    controller: SpecializationDiscussionController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 96 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SpecializationController = function () {
	    SpecializationController.$inject = ["$scope", "$stateParams", "$rootScope", "API"];
	    function SpecializationController($scope, $stateParams, $rootScope, API) {
	        'ngInject';

	        _classCallCheck(this, SpecializationController);

	        this.scope = $scope;
	        this.API = API;
	        this.friendIndex = 0;
	        //
	    }

	    _createClass(SpecializationController, [{
	        key: 'follow',
	        value: function follow($friend, $update, $idx, $scope) {
	            var _this = this;

	            this.API.all('me/' + $friend + '/follow/' + $update).post('').then(function (response) {
	                //console.log(this.scope.univ);
	                // console.log("----------");

	                _this.fr[$friend] = null;
	                _this.scope.univ.splice(_this.fr[$friend], 1);

	                _this.scope.univ.map(function (item, key) {

	                    console.log(item.id + ":" + key);
	                }); // console.log(this.scope.univ);
	                // $scope = this.scope;
	                _this.friendIndex++;
	            });
	            if (this.friendIndex == 5) {
	                this.API.all('me/university').get('').then(function (response) {
	                    _this.scope.univ = response.data;
	                    _this.friendIndex = 0;
	                });
	            }
	            //console.log(this.friendIndex ++);
	        }
	    }, {
	        key: '$onInit',
	        value: function $onInit() {
	            var _this2 = this;

	            this.API.all('me/university').get('').then(function (response) {
	                _this2.scope.univ = response.data;

	                _this2.scope.univ.map(function (item, key) {

	                    console.log(item.id + ":" + key);
	                });
	                // $scope=this.scope;
	            });
	        }
	    }]);

	    return SpecializationController;
	}();

	var SpecializationComponent = exports.SpecializationComponent = {
	    templateUrl: './views/app/components/specialization/specialization.component.html',
	    controller: SpecializationController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 97 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SearchController = function () {
	  SearchController.$inject = ["API", "Post", "$stateParams", "$rootScope", "$timeout", "moment", "Upload", "$log", "$scope"];
	  function SearchController(API, Post, $stateParams, $rootScope, $timeout, moment, Upload, $log, $scope) {
	    'ngInject';

	    _classCallCheck(this, SearchController);

	    this.rootScope = $rootScope;
	    this.rootScope.pageTitle = "البحث";
	    this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	    this.API = API;
	    var Post = this.Post;
	    this.Post.seturl('search/' + $stateParams.value);
	    // this.Post.settype('result');
	    this.Post.setskip(0);
	    this.Post.settake(4);
	    this.Post.getPost().then(function (response) {
	      $scope.dat = Post.getPostat();
	      $scope.nopost = Post.getnopost();
	      $rootScope.busy = false;
	    });
	    $scope.getPost = function () {
	      Post.seturl('search/' + $stateParams.value);
	      Post.getPost().then(function (response) {
	        $scope.dat = Post.getPostat();
	        $scope.nopost = Post.getnopost();
	        $rootScope.busy = false;
	      });
	    };
	  }

	  _createClass(SearchController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return SearchController;
	}();

	var SearchComponent = exports.SearchComponent = {
	  templateUrl: './views/app/components/search/search.component.html',
	  controller: SearchController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 98 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NotificationsController = function () {
	    NotificationsController.$inject = ["$rootScope", "API", "$timeout", "moment", "Upload", "$log", "$scope", "Post"];
	    function NotificationsController($rootScope, API, $timeout, moment, Upload, $log, $scope, Post) {
	        'ngInject';

	        _classCallCheck(this, NotificationsController);

	        this.rootScope = $rootScope;
	        this.rootScope.pageTitle = "الإشعارات";
	        this.$scope = $scope;
	        this.$scope.moment = moment;
	        var messaging = firebase.messaging();
	        console.log(messaging);
	        messaging.onMessage(function (payload) {
	            console.log("Message received. ", payload);
	            $scope.dat.push(payload.data);
	            // ...
	        });
	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	        var Post = this.Post;
	        this.Post.seturl('misc/user-notifications');
	        this.Post.setskip(0);
	        this.Post.settake(10);
	        this.Post.getPost().then(function (response) {
	            $scope.dat = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	            $rootScope.busy = false;
	        });
	        $scope.getPost = function () {
	            Post.getPost().then(function (response) {
	                $scope.dat = Post.getPostat();
	                $scope.nopost = Post.getnopost();
	                $rootScope.busy = false;
	            });
	        };
	        $scope.callback = function () {
	            $scope.nopost = Post.getnopost();
	        };
	    }

	    _createClass(NotificationsController, [{
	        key: "$onInit",
	        value: function $onInit() {}
	    }]);

	    return NotificationsController;
	}();

	var NotificationsComponent = exports.NotificationsComponent = {
	    templateUrl: './views/app/components/notifications/notifications.component.html',
	    controller: NotificationsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 99 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GroupOptionsController = function () {
	    function GroupOptionsController() {
	        'ngInject';

	        //

	        _classCallCheck(this, GroupOptionsController);
	    }

	    _createClass(GroupOptionsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return GroupOptionsController;
	}();

	var GroupOptionsComponent = exports.GroupOptionsComponent = {
	    templateUrl: './views/app/components/group-options/group-options.component.html',
	    controller: GroupOptionsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 100 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GroupMembersController = function () {
	    GroupMembersController.$inject = ["$scope", "$stateParams", "$rootScope", "API", "$state", "Post", "$timeout", "moment", "Upload", "$log", "toastr"];
	    function GroupMembersController($scope, $stateParams, $rootScope, API, $state, Post, $timeout, moment, Upload, $log, toastr) {
	        'ngInject';

	        var _this = this;

	        _classCallCheck(this, GroupMembersController);

	        this.$scope = $scope;
	        this.stateParams = $stateParams;
	        this.rootScope = $rootScope;
	        this.API = API;
	        this.$state = $state;
	        this.toastr = toastr;
	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	        var Post = this.Post;
	        this.Post.seturl('gr/users/' + this.stateParams.groupid);
	        this.Post.setskip(0);
	        this.Post.settake(5);
	        //this.Post.getPost(); 
	        this.Post.getPost().then(function (response) {
	            $scope.dat = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	            $rootScope.busy = false;
	        });
	        //this.$scope.dat=this.Post.getPostat();
	        this.memberloadmore = false;
	        this.$scope.groupModirator = [];
	        $scope.modirator = [];
	        $scope.postat = [];
	        API.all('gr/modirator/' + this.stateParams.groupid).get('').then(function (response) {
	            _this.$scope.groupModirator = response.data;
	            if ($scope.groupModirator == 'no Modirator') {
	                $scope.groupModirator = [];
	            }
	            _this.$scope.groupModirator.map(function (item, key) {
	                $scope.modirator[item.id] = key;
	            });
	        });
	        $scope.getPost = function () {
	            this.member = $scope.dat;
	            Post.getPost().then(function (response) {
	                $scope.dat = Post.getPostat();
	                $scope.nopost = Post.getnopost();
	                $rootScope.busy = false;
	                if (this.member.length == $scope.dat.length) {
	                    this.memberloadmore = true;
	                }
	                $scope.dat.map(function (item, key) {
	                    $scope.postat[item.id] = key;
	                });
	            });
	        };

	        $scope.join = function (userId, status, index, location) {
	            var _this2 = this;

	            if ($scope.groupModirator == 'no Modirator') {
	                $scope.groupModirator = [];
	            }
	            $scope.dat.map(function (item, key) {
	                $scope.postat[item.id] = key;
	            });
	            $scope.groupModirator.map(function (item, key) {
	                $scope.modirator[item.id] = key;
	            });

	            API.all('gr/add-to-group/' + $stateParams.groupid + '/' + userId + '/' + status).get('').then(function (response) {
	                toastr.success(response.data.add.message);
	                if (status == 4) {
	                    if ($scope.groupModirator == 'no Modirator') {
	                        $scope.groupModirator = [];
	                    }

	                    $scope.groupModirator.push(response.data.add);
	                    $scope.dat.splice($scope.postat[userId], 1);
	                    if (!$scope.dat) {
	                        $scope.nopost = 3;
	                    }
	                } else if (status == 1) {
	                    if (location == 1) {
	                        $scope.dat.push(response.data.add);
	                    } else if (location == 2) {
	                        $scope.groupModirator.splice($scope.modirator[userId], 1);
	                        $scope.nopost = 1;
	                        $scope.dat.push(response.data.add);
	                    }
	                } else if (status == 2) {
	                    if (location == 2) {
	                        $scope.groupModirator.splice($scope.modirator[userId], 1);
	                    } else if (location == 3) {
	                        $scope.dat.splice($scope.postat[userId], 1);
	                        if (!$scope.dat) {
	                            $scope.nopost = 3;
	                        }
	                    }
	                }
	                _this2.query = '';
	            });
	        };
	        // $scope.membersearch = function(val) { 
	        //     API.all('gr/search-user/' + $stateParams.groupid + '/' +  val).get('').then((response) => {
	        //     $scope.b = [];
	        //     response.data.u.map(function(item){
	        //         $scope.b.push(item);
	        //     });
	        //     },(response) =>{
	        //         $scope.b = response.data;
	        //     }); 
	        //     return $scope.b;
	        // }
	    }

	    _createClass(GroupMembersController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return GroupMembersController;
	}();

	var GroupMembersComponent = exports.GroupMembersComponent = {
	    templateUrl: './views/app/components/group-members/group-members.component.html',
	    controller: GroupMembersController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 101 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GroupInformationController = function () {
	    GroupInformationController.$inject = ["$stateParams", "$scope", "$rootScope", "API", "$state"];
	    function GroupInformationController($stateParams, $scope, $rootScope, API, $state) {
	        'ngInject';

	        _classCallCheck(this, GroupInformationController);

	        this.$scope = $scope;
	        this.$stateParams = $stateParams;
	        this.rootScope = $rootScope;
	        this.$state = $state;
	        this.API = API;
	        //
	        $scope.type = [];
	        this.rootScope.groupObj.data.taxonomies.map(function (item, key) {
	            $scope.type.push({ text: item.body });
	        });
	        switch (this.rootScope.groupObj.data.privacy) {
	            case 'public':
	                $scope.privacy = { value: 1, text: 'عامة للجميع' };
	                break;
	            case 'closed':
	                $scope.privacy = { value: 2, text: 'للأعضاء الذين أقوم بدعوتهم' };
	                break;
	            case 'same_university':
	                $scope.privacy = { value: 3, text: 'أي مستخدم ضمن جامعتك' };
	                break;
	            case 'same_specialization':
	                $scope.privacy = { value: 4, text: 'طلاب تخصصك الدراسي من نفس الجامعة' };
	                break;
	            case 'same_specialization_all_world':
	                $scope.privacy = { value: 5, text: 'أي طالب ينتمي الى نفس تخصصك' };
	                break;
	        }
	        $scope.group = {
	            name: this.rootScope.groupObj.data.name,
	            description: this.rootScope.groupObj.data.description,
	            privacy: $scope.privacy.value,
	            tags: $scope.type
	        };
	        $scope.privacytype = [{ value: 1, text: 'عامة للجميع' }, { value: 2, text: 'للأعضاء الذين أقوم بدعوتهم' }, { value: 3, text: 'أي مستخدم ضمن جامعتك' }, { value: 4, text: 'طلاب تخصصك الدراسي من نفس الجامعة' }, { value: 5, text: 'أي طالب ينتمي الى نفس تخصصك' }];
	    }

	    _createClass(GroupInformationController, [{
	        key: 'deleteGroup',
	        value: function deleteGroup() {
	            var _this = this;

	            var self = this;
	            var modelTitle = 'هذه المجموعه';
	            swal({
	                title: "هل انت متأكد من حذف المجموعه ؟",
	                type: 'warning',
	                showCancelButton: true,
	                confirmButtonColor: '#DD6B55',
	                confirmButtonText: "نعم, احذفه",
	                cancelButtonText: "لا, الغاء العمليه",
	                closeOnConfirm: false,
	                closeOnCancel: true,
	                showLoaderOnConfirm: true
	            }, function (isConfirm) {
	                if (isConfirm) {
	                    self.API.all('gr/delete/' + _this.$stateParams.groupid).post('').then(function (response) {
	                        if (response.data.sucess) {
	                            swal({
	                                title: "تم حذف " + modelTitle,
	                                type: "success",
	                                timer: 2000,
	                                showConfirmButton: false
	                            });
	                            self.$state.go('app.groups.index');
	                        } else {
	                            if (response.data.result == 'condition erorr') {
	                                swal({
	                                    title: "انت لا تملك الصلاحية لحذف " + modelTitle,
	                                    type: "error",
	                                    timer: 2000,
	                                    showConfirmButton: false
	                                });
	                            } else {
	                                swal({
	                                    title: "حدث خطأ في عملية حذف " + modelTitle,
	                                    type: "error",
	                                    timer: 2000,
	                                    showConfirmButton: false
	                                });
	                            }
	                        }
	                    }, function (response) {});
	                }
	            });
	        }
	    }, {
	        key: 'editableForm',
	        value: function editableForm(form) {
	            var _this2 = this;

	            if (form.$submitted) {
	                var self = this;
	                this.API.all('gr/editgr/' + this.$stateParams.groupid).post(this.$scope.group).then(function (response) {
	                    console.log(response.data.group);
	                    self.$scope.type = [];
	                    response.data.group.taxonomies.map(function (item, key) {
	                        self.$scope.type.push({ text: item.body });
	                    });
	                    self.$scope.group = {
	                        name: response.data.group.name,
	                        description: response.data.group.description,
	                        privacy: response.data.group.privacy_num,
	                        tags: self.$scope.type
	                    };
	                    _this2.rootScope.groupObj.data.name = response.data.group.name;
	                    _this2.rootScope.groupObj.data.description = response.data.group.description;
	                    _this2.rootScope.groupObj.data.privacy = response.data.group.privacy;
	                    _this2.rootScope.groupObj.data.taxonomies = response.data.group.taxonomies;
	                    _this2.$scope.privacy = _this2.$scope.privacytype[response.data.group.privacy_num - 1];
	                });
	            }
	        }
	    }, {
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return GroupInformationController;
	}();

	var GroupInformationComponent = exports.GroupInformationComponent = {
	    templateUrl: './views/app/components/group-information/group-information.component.html',
	    controller: GroupInformationController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 102 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GroupFilesController = function () {
	    function GroupFilesController() {
	        'ngInject';

	        //

	        _classCallCheck(this, GroupFilesController);
	    }

	    _createClass(GroupFilesController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return GroupFilesController;
	}();

	var GroupFilesComponent = exports.GroupFilesComponent = {
	    templateUrl: './views/app/components/group-files/group-files.component.html',
	    controller: GroupFilesController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 103 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GroupDiscussionController = function () {
	    GroupDiscussionController.$inject = ["Post", "moment", "$state", "$sce", "$scope", "$stateParams", "$rootScope", "API", "$log", "$timeout", "Upload"];
	    function GroupDiscussionController(Post, moment, $state, $sce, $scope, $stateParams, $rootScope, API, $log, $timeout, Upload) {
	        'ngInject';

	        _classCallCheck(this, GroupDiscussionController);

	        this.$state = $state;
	        this.scope = $scope;
	        this.scope.moment = moment;
	        this.stateParams = $stateParams;
	        this.rootScope = $rootScope;
	        this.API = API;
	        this.sce = $sce;
	        this.log = $log;
	        this.timeout = $timeout;
	        this.Upload = Upload;
	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	        var Post = this.Post;
	        this.Post.seturl('gr/post/' + this.stateParams.groupid);
	        this.Post.setediturl('gr/post/' + this.stateParams.groupid + '-update');
	        this.Post.setskip(0);
	        this.Post.settype('group');
	        this.Post.setsubmiturl('gr/post/' + this.stateParams.groupid);
	        this.Post.setimageurl('gr/post/' + this.stateParams.groupid);
	        this.Post.settake(2);
	        this.Post.setSection('group');
	        this.Post.setdeleteurl('social/delete/group/post');
	        this.Post.setCommentDeleteUrl('social/delete/group/comment');
	        //this.Post.getPost();
	        this.Post.getPost().then(function (response) {
	            $scope.dat = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	            $rootScope.busy = false;
	        });
	        this.Post.settake(5);
	        //this.scope.dat=this.Post.getPostat();
	        this.scope.files = [];
	        $rootScope.liveUrlFlag = false;
	        $scope.getPost = function () {
	            Post.getPost().then(function (response) {
	                $scope.dat = Post.getPostat();
	                $scope.nopost = Post.getnopost();
	                $rootScope.busy = false;
	            });
	        };
	        $scope.exprissionUser = function ($index, liker) {
	            // Post.getPost();
	            $rootScope.happyexp = 0;
	            $rootScope.normalexp = 0;
	            $rootScope.sadexp = 0;
	            Post.exprissionUser($index, liker);
	            $scope.exprissions = Post.getExprissions();
	            $timeout(function () {
	                $scope.exprissions = Post.getExprissions();
	            }, 1000);
	        };
	        $scope.exprission = function ($post, $exp) {
	            Post.exprission($post, $exp);
	            $scope.dat = Post.getPostat();
	        };
	        $scope.deleteNode = function (node, deleteType) {
	            Post.deleteNode(node, deleteType, $scope.callback);
	            $scope.dat = Post.getPostat();
	        };
	        $scope.permission = function (post) {
	            return $rootScope.me.permission.social.indexOf(post) >= 0;
	        };
	        $scope.postPermission = function (permission, post, me) {
	            return post == me || $rootScope.groupObj.member == 'owner' || $rootScope.groupObj.member == 'modirator';
	        };
	        $scope.commentPermission = function (permission, comment, me, post) {
	            return comment == me || post == me || $rootScope.groupObj.member == 'owner' || $rootScope.groupObj.member == 'modirator';
	        };
	        $scope.submitComment = function ($id, $index, $body, place) {
	            Post.submitComment($id, $index, this, $body, place);
	            this.comment[$id] = "";
	            if (this.comment2 != undefined) this.comment2[$id] = "";
	            $scope.dat = Post.getPostat();
	        };
	        $scope.updatepost = function (data, id, url) {
	            Post.updatepost(data, id, url);
	        };
	        $scope.updateData = function (data, id) {
	            Post.updateData(data, id);
	        };
	        $scope.submitPost = function (files) {
	            Post.submitPost(files, $stateParams.groupid, this.textpost, $scope.callback);
	            $scope.resetSubmit(this);
	            $scope.dat = Post.getPostat();
	        };
	        $scope.callback = function () {
	            $scope.nopost = Post.getnopost();
	        };
	        $scope.resetSubmit = function (scope) {
	            angular.element(".image-readed").attr("ng-src", "");
	            angular.element(".image-readed").attr("src", "");
	            angular.element(".readed-con").attr("style", "display: none");
	            angular.element(".liveurl").attr("style", "display: none");
	            scope.files = '';
	            scope.textpost = '';
	            scope.live_title = '';
	            scope.live_description = '';
	            scope.live_url = '';
	            scope.live_image = '';
	            scope.media = '';
	            scope.closeUrl = false;
	        };
	        $scope.imageUpload = function (element, files) {
	            var reader = new FileReader();
	            reader.onload = $scope.imageIsLoaded;
	            reader.readAsDataURL(files);
	            angular.element(".readed-con").attr("style", "display: block");
	        };
	        $scope.imageIsLoaded = function (e) {
	            $scope.$apply(function () {
	                $scope.imagereaded = e.target.result;
	            });
	        };
	        $scope.removeImg = function () {
	            angular.element(".image-readed").attr("ng-src", "");
	            angular.element(".image-readed").attr("src", "");
	            angular.element(".readed-con").attr("style", "display: none");
	            this.files = '';
	        };
	    }

	    _createClass(GroupDiscussionController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return GroupDiscussionController;
	}();

	var GroupDiscussionComponent = exports.GroupDiscussionComponent = {
	    templateUrl: './views/app/components/group-discussion/group-discussion.component.html',
	    controller: GroupDiscussionController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 104 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GroupsController = function () {
	    function GroupsController() {
	        'ngInject';

	        _classCallCheck(this, GroupsController);
	    }

	    _createClass(GroupsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return GroupsController;
	}();

	var GroupsComponent = exports.GroupsComponent = {
	    templateUrl: './views/app/components/groups/groups.component.html',
	    controller: GroupsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 105 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GroupController = function () {
	    GroupController.$inject = ["$scope", "$stateParams", "$rootScope", "API", "$state", "Post", "$timeout", "moment", "Upload", "$log", "toastr", "$http"];
	    function GroupController($scope, $stateParams, $rootScope, API, $state, Post, $timeout, moment, Upload, $log, toastr, $http) {
	        'ngInject';

	        var _this = this;

	        _classCallCheck(this, GroupController);

	        this.$scope = $scope;
	        this.stateParams = $stateParams;
	        this.rootScope = $rootScope;
	        this.API = API;
	        this.$scope.template = 0;
	        this.$scope.btnType = 0;
	        this.$state = $state;
	        this.skip = 0;
	        this.toastr = toastr;
	        this.$scope.showcovercrop = false;
	        var self = this;
	        self.rootScope.pageTitle = "المجموعات";
	        angular.element('meta[name=Keywords]').attr('content', 'المجموعات,المجموعات ادزانس,Edzance Group');
	        angular.element('meta[name=Description]').attr('content', 'تواصل مع مدرسيك وزملائك , احصل على ملفاتك الدراسية و على تنبيهات امتحانات , شارك الطلاب الجامعيين آرائك ونقاشاتك .');
	        $scope.myCoverImage = '';
	        $scope.myCroppedCover = '';
	        $scope.join = function (userId, status) {
	            if (status == 1) {
	                if (self.rootScope.groupObj.data.authorized == 1) {
	                    status = 6;
	                }
	            }
	            self.API.all('gr/add-to-group/' + self.stateParams.groupid + '/' + userId + '/' + status).get('').then(function (response) {
	                self.rootScope.groupObj.member = response.data.add.type;
	                self.$scope.template = response.data.add.template;
	                if (response.data.add.type == 'in') {
	                    self.$scope.btnType = 3;
	                } else if (response.data.add.type == "out") {
	                    self.$scope.btnType = 1;
	                } else if (response.data.add.type == "waiting") {
	                    self.$scope.btnType = 2;
	                }
	            });
	        };
	        //this.memberIndex = 0;
	        $rootScope.req = this.API.all('group/' + this.stateParams.groupid).get('').then(function (response) {
	            _this.rootScope.groupObj = response.data;
	            if (_this.rootScope.groupObj.member == 'in' || _this.rootScope.groupObj.member == 'owner' || _this.rootScope.groupObj.member == 'modirator') {
	                if ($state.current.name != 'app.group') {
	                    $state.go($state.current.name);
	                } else {
	                    $state.go('app.group.discussion');
	                }
	                _this.$scope.template = 1;
	                _this.$scope.btnType = 3;
	            } else {
	                if (_this.rootScope.groupObj.template == 1) {
	                    _this.$scope.template = 1;
	                    if ($state.current.name != 'app.group') {
	                        _this.$state.go($state.current.name);
	                    } else {
	                        _this.$state.go('app.group.discussion');
	                    };
	                    if (_this.rootScope.groupObj.canEnter == true) {
	                        if (_this.rootScope.groupObj.member == 'waiting') {
	                            _this.$scope.btnType = 2;
	                        } else if (_this.rootScope.groupObj.member == 'invited') {
	                            _this.$scope.btnType = 4;
	                        } else {
	                            _this.$scope.btnType = 1;
	                        }
	                    } else {
	                        _this.$scope.btnType = 0;
	                    }
	                } else if (_this.rootScope.groupObj.template == 2) {
	                    _this.$scope.template = 2;
	                    _this.$state.go('app.group.members');
	                    if (_this.rootScope.groupObj.canEnter == true) {
	                        if (_this.rootScope.groupObj.member == 'waiting') {
	                            _this.$scope.btnType = 2;
	                        } else if (_this.rootScope.groupObj.member == 'invited') {
	                            _this.$scope.btnType = 4;
	                        } else {
	                            _this.$scope.btnType = 1;
	                        }
	                    } else {
	                        _this.$scope.btnType = 0;
	                    }
	                } else if (_this.rootScope.groupObj.template == 3) {
	                    _this.$scope.template = 3;
	                }
	            }
	        });
	        API.all('gr/users/' + this.stateParams.groupid + "/0/6").get('').then(function (response) {
	            _this.rootScope.groupMember = response.data;
	        });
	        API.all('gr/suggested-user/' + this.stateParams.groupid + '/' + this.skip + '/4').get('').then(function (response) {
	            _this.rootScope.groupsuggested = response.suggested;
	            _this.rootScope.suggestedIds = response.suggested_ids;
	            _this.skip = 4;
	            //this.memberIndex = 3;
	        });
	        API.all('gr/images/' + this.stateParams.groupid + '/0/6').get('').then(function (response) {
	            _this.$scope.images = response.data;
	        });
	        // API.all('gr/video/' + this.stateParams.groupid + '/0/6').get('').then((response) => {
	        //     this.$scope.video = response.data;
	        // });
	        $rootScope.usersearch = function (val) {
	            return $http.get('api/gr/search-user/' + $stateParams.groupid + '/' + val).then(function (response) {
	                if (response.data.data != "no post") {
	                    return response.data.data.map(function (item) {
	                        return item;
	                    });
	                }
	            });
	        };
	        $scope.getLocation = function (val) {
	            return $http.get('api/class/search/' + $stateParams.classid + '/' + val).then(function (response) {
	                if (response.data.data != "no post") {
	                    return response.data.data.map(function (item) {
	                        return item;
	                    });
	                }
	            });
	        };
	        var handleCoverSelect = function handleCoverSelect(evt) {
	            $scope.showcovercrop = true;
	            var file = evt.currentTarget.files[0];
	            var reader = new FileReader();
	            reader.onload = function (evt) {
	                $scope.$apply(function ($scope) {
	                    $scope.myCoverImage = evt.target.result;
	                });
	            };
	            reader.readAsDataURL(file);
	        };
	        angular.element(document.querySelector('#coverInput')).on('change', handleCoverSelect);
	    }

	    _createClass(GroupController, [{
	        key: 'addmember',
	        value: function addmember(userId, location, index, name, last_name) {
	            var _this2 = this;

	            var self = this;
	            if (location == 2) {
	                this.rootScope.groupsuggested.splice(index, 1);
	                var a = this.rootScope.suggestedIds.indexOf(userId);
	                this.rootScope.suggestedIds.splice(a, 1);
	            }
	            this.API.all('gr/add-to-group/' + this.stateParams.groupid + '/' + userId + '/5').post(this.rootScope.suggestedIds).then(function (response) {
	                if (location == 2) {
	                    angular.element('#friend-' + userId).hide();
	                    _this2.rootScope.groupsuggested.push(response.data.suggested);
	                    _this2.rootScope.suggestedIds.push(response.data.suggested.user_id);
	                }
	                _this2.toastr.success('تمت دعوة العضو ' + name + ' ' + last_name);
	            });
	        }
	    }, {
	        key: 'changecover',
	        value: function changecover() {
	            var _this3 = this;

	            var data = {
	                string_file: this.$scope.myCroppedCover,
	                id: this.stateParams.groupid
	            };
	            this.API.all('gr/cover').post(data).then(function (response) {
	                _this3.rootScope.groupObj.data.cover = _this3.$scope.myCroppedCover;
	                _this3.$scope.showcovercrop = false;
	                _this3.$scope.myCroppedCover = '';
	                _this3.$scope.myCoverImage = '';
	            });
	        }
	    }, {
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return GroupController;
	}();

	var GroupComponent = exports.GroupComponent = {
	    templateUrl: './views/app/components/group/group.component.html',
	    controller: GroupController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 106 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VirtualclassUnauthorizedController = function () {
	    VirtualclassUnauthorizedController.$inject = ["$http", "$scope", "$log"];
	    function VirtualclassUnauthorizedController($http, $scope, $log) {
	        'ngInject';

	        _classCallCheck(this, VirtualclassUnauthorizedController);

	        $scope.a = [];
	        angular.element('html').scrollTop(0);
	        $scope.getLocation = function (val) {
	            return $http.get('vc-debug/university-information/' + val + '/2065', {
	                params: {}
	            }).then(function (response) {
	                response.data.data.u.map(function (item) {
	                    $scope.a.push(item);
	                });
	                return $scope.a;
	            });
	        };
	        $scope.test = function (val) {
	            $scope.getLocation(val);
	        };
	    }

	    _createClass(VirtualclassUnauthorizedController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return VirtualclassUnauthorizedController;
	}();

	var VirtualclassUnauthorizedComponent = exports.VirtualclassUnauthorizedComponent = {
	    templateUrl: './views/app/components/virtualclass-unauthorized/virtualclass-unauthorized.component.html',
	    controller: VirtualclassUnauthorizedController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 107 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VirtualclassInformationController = function () {
	    VirtualclassInformationController.$inject = ["$stateParams", "$scope", "$rootScope", "ContextService", "API", "AclService", "Upload", "$timeout"];
	    function VirtualclassInformationController($stateParams, $scope, $rootScope, ContextService, API, AclService, Upload, $timeout) {
	        'ngInject';

	        _classCallCheck(this, VirtualclassInformationController);

	        this.Upload = Upload;
	        this.rscope = $rootScope;
	        this.$timeout = $timeout;
	        this.scope = $scope;
	        this.API = API;
	        this.stateParams = $stateParams;
	        //this.rscope.mobileHeader = false
	        angular.element('html').scrollTop(0);
	        $scope.vc_info = {
	            name: '',
	            Description: '',
	            class_number: '',
	            class_hall: '',
	            book: '',
	            syllabus: '',
	            days: '',
	            Hours: '',
	            season: '',
	            Privacy: '',
	            from: new Date(),
	            to: new Date(),
	            Permission: false
	        };
	        //$scope.vc_info.to = new Date(); 
	        $scope.vc_info.to.setHours(0);
	        $scope.vc_info.to.setMinutes(0);
	        //$scope.vc_info.from = new Date(); 
	        $scope.vc_info.from.setHours(0);
	        $scope.vc_info.from.setMinutes(0);
	        $scope.to_changed = function (to) {
	            $scope.vc_info.to.setHours(to.getHours());
	            $scope.vc_info.to.setMinutes(to.getMinutes());
	        };
	        $scope.vc_info.from = $rootScope.from;
	        $scope.from_changed = function (from) {
	            $scope.vc_info.from.setHours(from.getHours());
	            $scope.vc_info.from.setMinutes(from.getMinutes());
	        };
	        $scope.hstep = 1;
	        $scope.mstep = 1;
	        $scope.myday = [];

	        $scope.Hours = [{
	            value: "1",
	            text: '1'
	        }, {
	            value: "2",
	            text: '2'
	        }, {
	            value: "3",
	            text: '3'
	        }, {
	            value: "4",
	            text: '4'
	        }, {
	            value: "5",
	            text: '5'
	        }, {
	            value: "6",
	            text: '6'
	        }];
	        $scope.season = [{
	            value: 'first',
	            text: 'الأول'
	        }, {
	            value: 'second',
	            text: 'الثاني'
	        }, {
	            value: 'summer',
	            text: 'الصيفي'
	        }];
	        $scope.Privacy = [{
	            value: 'private',
	            text: 'خاصة'
	        }, {
	            value: 'public',
	            text: 'عامة'
	        }, {
	            value: 'custom',
	            text: 'مخصصة'
	        }];
	        $scope.days = [{
	            value: 'الاحد',
	            text: 'الاحد'
	        }, {
	            value: 'الاثنين',
	            text: 'الاثنين'
	        }, {
	            value: 'الثلاثاء',
	            text: 'الثلاثاء'
	        }, {
	            value: 'الاربعاء',
	            text: 'الاربعاء'
	        }, {
	            value: 'الخميس',
	            text: 'الخميس'
	        }, {
	            value: 'السبت',
	            text: 'السبت'
	        }];
	        $scope.privacyAr = function (data) {
	            switch (data) {
	                case "private":
	                    return "خاصة";
	                    break;
	                case "public":
	                    return "عامة";
	                    break;
	                case "custom":
	                    return "مخصصة";
	                    break;
	            }
	        };
	        $scope.seasonAr = function (data) {
	            switch (data) {
	                case "first":
	                    return "الأول";
	                    break;
	                case "second":
	                    return "الثاني";
	                    break;
	                case "summer":
	                    return "الصيفي";
	                    break;
	            }
	        };
	        $scope.showDays = function () {
	            var selected = [];
	            angular.forEach($scope.days, function (s) {
	                if ($scope.myday.indexOf(s.value) >= 0) {
	                    selected.push(s.text);
	                }
	            });
	            return selected.length ? selected.join(', ') : 'لم يتم اختيار الايام';
	        };
	        API.all('class/get/' + $stateParams.classid).get('').then(function (response) {
	            $scope.myday = response.data.days.split(',');
	            $scope.vc_info = {
	                name: response.data.name,
	                Description: response.data.Description,
	                class_number: response.data.class_number,
	                class_hall: response.data.class_hall,
	                book: response.data.Books,
	                syllabus: response.data.syllabus,
	                days: response.data.days,
	                Hours: response.data.Hours,
	                from: new Date(response.data.from),
	                to: new Date(response.data.to),
	                season: response.data.season,
	                Privacy: response.data.Privacy,
	                Permission: response.data.Permission
	            };
	        });
	    }

	    _createClass(VirtualclassInformationController, [{
	        key: 'editableForm',
	        value: function editableForm(form) {
	            var _this = this;

	            if (form.$valid) {
	                var payload;
	                var data;

	                (function () {
	                    var self = _this;
	                    payload = new FormData();
	                    //console.log(self.scope.myday);

	                    data = self.scope.vc_info;

	                    data.days = self.scope.myday.join(',');
	                    data.from = self.scope.vc_info.from / 1000;
	                    data.to = self.scope.vc_info.to / 1000;
	                    angular.forEach(data, function (value, key) {
	                        payload.append(key, value);
	                    });
	                    self.API.all('class/edit/' + self.stateParams.classid + '/info').withHttpConfig({ transformRequest: angular.identity }).customPOST(payload, undefined, undefined, { 'Content-Type': undefined }).then(function (response) {
	                        self.scope.vc_info.from = new Date(response.data.from);
	                        self.scope.vc_info.to = new Date(response.data.to);
	                        self.scope.vc_info.syllabus = response.data.syllabus;
	                        self.scope.vc_info.book = response.data.Books;
	                    });
	                })();
	            } else {
	                form.$visible = true;
	            }
	        }
	    }, {
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return VirtualclassInformationController;
	}();

	var VirtualclassInformationComponent = exports.VirtualclassInformationComponent = {
	    templateUrl: './views/app/components/virtualclass-information/virtualclass-information.component.html',
	    controller: VirtualclassInformationController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 108 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ProfileScheduleController = function () {
	    ProfileScheduleController.$inject = ["$scope", "$rootScope", "API", "$stateParams", "Post", "$timeout", "moment", "Upload", "$log"];
	    function ProfileScheduleController($scope, $rootScope, API, $stateParams, Post, $timeout, moment, Upload, $log) {
	        'ngInject';

	        _classCallCheck(this, ProfileScheduleController);

	        this.$scope = $scope;
	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	        var Post = this.Post;
	        this.Post.seturl('profile/classes/' + $stateParams.id);
	        this.Post.setskip(0);
	        this.Post.settake(6);
	        this.Post.getPost().then(function (response) {
	            $scope.dat = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	            $rootScope.busy = false;
	        });
	        this.scope = $scope;
	        angular.element('html').scrollTop(0);
	        $scope.getPost = function () {
	            Post.getPost().then(function (response) {
	                $scope.dat = Post.getPostat();
	                $scope.nopost = Post.getnopost();
	                $rootScope.busy = false;
	                $scope.dat.map(function (item) {
	                    item.from = new Date(item.from);
	                    item.to = new Date(item.to);
	                });
	            });
	        };
	        $scope.callback = function () {
	            $scope.nopost = Post.getnopost();
	        };
	    }

	    _createClass(ProfileScheduleController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return ProfileScheduleController;
	}();

	var ProfileScheduleComponent = exports.ProfileScheduleComponent = {
	    templateUrl: './views/app/components/profile-schedule/profile-schedule.component.html',
	    controller: ProfileScheduleController,
	    controllerAs: 'pro',
	    bindings: {}
	};

/***/ },
/* 109 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PostController = function () {
	    function PostController() {
	        'ngInject';

	        //

	        _classCallCheck(this, PostController);
	    }

	    _createClass(PostController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return PostController;
	}();

	var PostComponent = exports.PostComponent = {
	    templateUrl: './views/app/components/post/post.component.html',
	    controller: PostController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 110 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CommentController = function () {
	    function CommentController() {
	        'ngInject';

	        //

	        _classCallCheck(this, CommentController);
	    }

	    _createClass(CommentController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return CommentController;
	}();

	var CommentComponent = exports.CommentComponent = {
	    templateUrl: './views/app/components/comment/comment.component.html',
	    controller: CommentController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 111 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LoginRedirectController = function () {
	    function LoginRedirectController() {
	        'ngInject';

	        //  this.$state.go(url)

	        _classCallCheck(this, LoginRedirectController);
	    }

	    _createClass(LoginRedirectController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return LoginRedirectController;
	}();

	var LoginRedirectComponent = exports.LoginRedirectComponent = {
	    templateUrl: './views/app/components/login-redirect/login-redirect.component.html',
	    controller: LoginRedirectController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 112 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LoginIndexController = function () {
	  LoginIndexController.$inject = ["$rootScope", "$auth", "$state", "$stateParams", "API", "AclService", "$scope"];
	  function LoginIndexController($rootScope, $auth, $state, $stateParams, API, AclService, $scope) {
	    'ngInject';

	    _classCallCheck(this, LoginIndexController);

	    delete $rootScope.me;
	    var d = new Date();
	    $scope.year = d.getFullYear();

	    $scope.month = 12;
	    $scope.day = 31;
	    this.scope = $scope;
	    this.$auth = $auth;
	    this.$state = $state;
	    this.API = API;
	    this.$stateParams = $stateParams;
	    this.AclService = AclService;

	    this.password = '';
	    this.password_confirmation = '';
	    this.formSubmitted = false;
	    this.logSubmitted = false;
	    this.errors = [];

	    this.registerSuccess = $stateParams.registerSuccess;
	    this.successMsg = $stateParams.successMsg;
	    this.loginfailed = false;
	    this.unverified = false;
	  }

	  _createClass(LoginIndexController, [{
	    key: '$onInit',
	    value: function $onInit() {
	      this.firstname = '';
	      this.lastname = '', this.phone = '', this.gender = '', this.day = '', this.month = '', this.year = '', this.logemail = '';
	      this.logpassword = '';
	      this.email = '';
	      this.password = '';
	      this.password_confirmation = '';
	      this.mailcheck = '';
	      this.phonecheck = '';
	      //console.log(this)
	    }
	  }, {
	    key: 'checkemail',
	    value: function checkemail() {
	      var _this = this;

	      if (this.registerForm.password) this.API.all('me/check').post(this.email).then(function (response) {
	        //  this.scope.dat.push(response.data.post);
	        //  $scope=this.scope;
	      }, function (response) {
	        //console.log($scope.post_enabled);
	        for (var error in response.data.errors) {
	          _this.errors[error] = response.data.errors[error][0];
	          _this.registerForm.$invalid = true;
	          _this.registerForm[error].$invalid = true;
	        }
	      });
	    }
	  }, {
	    key: 'checkphone',
	    value: function checkphone() {
	      var _this2 = this;

	      this.API.all('me/post').post(this.telephone).then(function (response) {
	        // this.scope.dat.push(response.data.post);
	        //$scope=this.scope;
	      }, function (response) {
	        //console.log($scope.post_enabled);
	        for (var error in response.data.errors) {
	          _this2.errors[error] = response.data.errors[error][0];
	          _this2.registerForm.$invalid = true;
	          _this2.registerForm[error].$invalid = true;
	        }
	      });
	    }
	  }, {
	    key: 'getNumber',
	    value: function getNumber(num) {
	      return new Array(num);
	    }
	  }, {
	    key: 'login',
	    value: function login(isValid, _self) {
	      var _this3 = this;

	      if (isValid) {
	        this.loginfailed = false;
	        this.unverified = false;

	        var user = {
	          email: this.logemail,
	          password: this.logpassword
	        };

	        this.$auth.login(user).then(function (response) {
	          var data = response.data.data;
	          var AclService = _this3.AclService;

	          angular.forEach(data.userRole, function (value) {
	            AclService.attachRole(value);
	          });
	          // //console.log(response.data);
	          AclService.setAbilities(data.abilities);
	          _this3.$auth.setToken(response.data);
	          if (response.data.data.dataleak == true) {
	            //console.log(response)
	            var user = {
	              email: _self.logemail,
	              password: _self.logpassword
	            };
	            //console.log(user)
	            //    _self.API.all('auth/setpass').post(user).then((response) => {
	            //         //console.log(response)
	            //      },(response) =>{
	            //          ////console.log($scope.post_enabled);

	            // });
	            _this3.$state.go('logins.university-information', { id: response.data.data.user.id, user: response.data.data.user, email: _this3.logemail, password: _this3.logpassword });
	          } else {
	            // this.$state.go('app.landing')
	            window.location.href = "/";
	          }
	        }).catch(this.failedLogin.bind(this));
	      } else {
	        this.logSubmitted = true;
	        //console.log(this)
	      }
	    }
	  }, {
	    key: 'failedLogin',
	    value: function failedLogin(res) {
	      if (res.status == 401) {
	        this.loginfailed = true;
	      } else {
	        if (res.data.errors.message[0] == 'Email Unverified') {
	          this.unverified = true;
	        }
	      }
	    }
	  }, {
	    key: 'register',
	    value: function register(isValid) {
	      var _this4 = this;

	      if (isValid) {
	        var user = {
	          firstname: this.firstname,
	          lastname: this.lastname,
	          telephone: this.telephone,
	          gender: this.gender,
	          day: this.day,
	          month: this.month,
	          year: this.year,
	          email: this.email,
	          password: this.password,
	          password_confirmation: this.password_confirmation
	        };

	        this.$auth.signup(user).then(function () {
	          _this4.$state.go('logins.login.index', { registerSuccess: true });
	        }).catch(this.failedRegistration.bind(this));
	      } else {
	        this.formSubmitted = true;
	      }
	    }
	  }, {
	    key: 'failedRegistration',
	    value: function failedRegistration(response) {
	      if (response.status === 422) {
	        for (var error in response.data.errors) {
	          this.errors[error] = response.data.errors[error][0];
	          this.registerForm.$invalid = true;
	          this.registerForm[error].$invalid = true;
	          //console.log(this)
	        }
	      }
	    }
	  }]);

	  return LoginIndexController;
	}();

	var LoginIndexComponent = exports.LoginIndexComponent = {
	  templateUrl: './views/app/components/login-index/login-index.component.html',
	  controller: LoginIndexController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 113 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Login3Controller = function () {
	  Login3Controller.$inject = ["$http", "AclService", "API", "$auth", "$stateParams", "$rootScope", "$scope", "$state"];
	  function Login3Controller($http, AclService, API, $auth, $stateParams, $rootScope, $scope, $state) {
	    'ngInject';

	    _classCallCheck(this, Login3Controller);

	    this.scope = $scope;
	    this.$state = $state;
	    this.rootScope = $rootScope;
	    this.$auth = $auth;
	    this.API = API;
	    this.$stateParams = $stateParams;
	    this.AclService = AclService;

	    this.registerSuccess = $stateParams.registerSuccess;
	    this.successMsg = $stateParams.successMsg;
	    this.loginfailed = false;
	    this.unverified = false;
	    this.rootScope.pageTitle = 'مرحبًا بك في ادزانس';
	    angular.element('meta[name=Description]').attr('content', 'تواصل مع مدرسيك وزملائك , احصل على ملفاتك الدراسية و على تنبيهات امتحانات , شارك الطلاب الجامعيين آرائك ونقاشاتك .');
	    angular.element('meta[name=Keywords]').attr('content', 'إدزانس,ادزانس,ed-zance,edzance');
	    $scope.getLocation = function (val) {
	      return $http.get('auth-debug/university-information/' + val, {
	        params: {}
	      }).then(function (response) {
	        return response.data.data.u.map(function (item) {
	          return item;
	        });
	      });
	    };
	  }

	  _createClass(Login3Controller, [{
	    key: 'login',
	    value: function login(isValid, _self) {
	      var _this = this;

	      if (isValid) {
	        this.loginfailed = false;
	        this.unverified = false;

	        var user = {
	          email: this.logemail,
	          password: this.logpassword
	        };
	        this.$auth.login(user).then(function (response) {
	          var data = response.data.data;
	          var AclService = _this.AclService;
	          angular.forEach(data.userRole, function (value) {
	            AclService.attachRole(value);
	          });
	          AclService.setAbilities(data.abilities);
	          _this.$auth.setToken(response.data);
	          if (response.data.data.dataleak == true) {
	            var user = {
	              email: _self.logemail,
	              password: _self.logpassword
	            };
	            console.log(user);
	            _this.$state.go('logins.university-information', { id: response.data.data.user.id, user: response.data.data.user, email: _this.logemail, password: _this.logpassword });
	          } else {
	            window.location.href = "/";
	          }
	        }).catch(this.failedLogin.bind(this));
	      } else {
	        this.logSubmitted = true;
	        console.log(this);
	      }
	    }
	  }, {
	    key: 'register',
	    value: function register(isValid) {
	      var _this2 = this;

	      if (isValid) {
	        var user = {
	          name: this.name,
	          university: this.university,
	          status: this.status,
	          email: this.email,
	          password: this.password
	        };

	        this.$auth.signup(user).then(function () {
	          _this2.$state.go('logins.login.index', { registerSuccess: true });
	        }).catch(this.failedRegistration.bind(this));
	      } else {
	        this.formSubmitted = true;
	      }
	    }
	  }, {
	    key: 'failedRegistration',
	    value: function failedRegistration(response) {
	      if (response.status === 422) {
	        for (var error in response.data.errors) {
	          this.errors[error] = response.data.errors[error][0];
	          this.registerForm.$invalid = true;
	          this.registerForm[error].$invalid = true;
	          console.log(this);
	        }
	      }
	    }
	  }, {
	    key: 'go',
	    value: function go(url) {
	      if (url == '') {
	        url = 'logins.register.error';
	      }
	      this.$state.go(url, { back: this.$stateParams.back, next: this.$stateParams.next, type: this.$stateParams.type });
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {
	      this.firstname = '';
	      this.lastname = '', this.phone = '', this.gender = '', this.day = '', this.month = '', this.year = '', this.logemail = '';
	      this.logpassword = '';
	      this.email = '';
	      this.password = '';
	      this.password_confirmation = '';
	      this.mailcheck = '';
	      this.phonecheck = '';
	    }
	  }]);

	  return Login3Controller;
	}();

	var Login3Component = exports.Login3Component = {
	  templateUrl: './views/app/components/login3/login3.component.html',
	  controller: Login3Controller,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 114 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RegisterLoaderController = function () {
	    RegisterLoaderController.$inject = ["$rootScope", "$auth", "$state", "$stateParams", "API", "$scope"];
	    function RegisterLoaderController($rootScope, $auth, $state, $stateParams, API, $scope) {
	        'ngInject';

	        _classCallCheck(this, RegisterLoaderController);

	        this.stateParams = $stateParams;
	        this.$state = $state;
	        console.log(this.stateParams);
	        // this.$state.go('logins.register.main',{logtype:'social',name:this.stateParams.name,email:this.stateParams.email})
	    }

	    _createClass(RegisterLoaderController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return RegisterLoaderController;
	}();

	var RegisterLoaderComponent = exports.RegisterLoaderComponent = {
	    templateUrl: './views/app/components/register-loader/register-loader.component.html',
	    controller: RegisterLoaderController,
	    controllerAs: 'reglod',
	    bindings: {}
	};

/***/ },
/* 115 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RegisterMailController = function () {
	    RegisterMailController.$inject = ["$rootScope", "$auth", "$state", "$stateParams", "API", "AclService", "$scope"];
	    function RegisterMailController($rootScope, $auth, $state, $stateParams, API, AclService, $scope) {
	        'ngInject';

	        _classCallCheck(this, RegisterMailController);

	        $scope.showHints = true;

	        this.stateParams = $stateParams;
	        this.scope = $scope;
	        this.auth = $auth;
	        this.scope.showHints = true;
	        this.rootScope = $rootScope;
	        this.stateParams.back = 'logins.login.register.information';
	        // this.stateParams.name = '';
	        // this.stateParams.phone = '';
	        // this.stateParams.email = '';
	        // this.stateParams.password = '';
	        var user = {
	            name: this.stateParams.name,
	            email: this.stateParams.email,
	            university: this.stateParams.university,
	            type: this.stateParams.type,
	            password: this.stateParams.password,
	            telephone: this.stateParams.phone
	        };
	        if (this.stateParams.type == 'Teacher') {
	            this.stateParams.next = 'logins.login.register.confirm';
	        } else {
	            if (this.stateParams.type == 'student') {
	                this.stateParams.next = 'logins.login.register.loader';
	            } else {
	                this.stateParams.next = 'logins.login.register.loader';
	            }
	            if (this.stateParams.type == 'Teacher') {}
	        }
	        console.log('register from mail');
	        ////////////////////////////////////////////////
	        // $auth.signup(user)
	        // .then(() => {
	        //   $state.go('logins.login.index', { registerSuccess: true })
	        // })
	        // .catch(this.failedRegistration.bind(this))
	        ///////////////////////////////////////////////////

	        ////////////////////////////////////////////////////
	        // API.oneUrl('authenticate').one('user').get().then((response) => {
	        //   if (!response.error &&( document.referrer =='http://initial.dev/' || document.referrer =='https://www.facebook.com/')) {
	        //     let data = response.data
	        //     angular.forEach(data.userRole, function (value) {
	        //       AclService.attachRole(value)
	        //     })
	        //     AclService.setAbilities(data.abilities)
	        //     $auth.setToken(data.token)
	        //     // $state.go('app.landing')
	        //     //window.location.href = "/";
	        //   }else{$state.go('logins.login')}
	        // })
	    }

	    _createClass(RegisterMailController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return RegisterMailController;
	}();

	var RegisterMailComponent = exports.RegisterMailComponent = {
	    templateUrl: './views/app/components/register-mail/register-mail.component.html',
	    controller: RegisterMailController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 116 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RegisterErrorController = function () {
	    RegisterErrorController.$inject = ["$stateParams", "$rootScope", "$scope"];
	    function RegisterErrorController($stateParams, $rootScope, $scope) {
	        'ngInject';

	        _classCallCheck(this, RegisterErrorController);

	        this.stateParams = $stateParams;
	        this.scope = $scope;
	        this.rootScope = $rootScope;
	        this.stateParams.back = 'logins.login.register.main';
	        if (this.stateParams.type == 'student') {
	            this.stateParams.next = 'logins.login.register.class';
	        }
	        if (this.stateParams.type == 'Teacher') {
	            this.stateParams.next = 'logins.login.register.email';
	        } else {
	            this.stateParams.next = 'logins.login.register.error';
	        }
	        console.log(this);
	    }

	    _createClass(RegisterErrorController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return RegisterErrorController;
	}();

	var RegisterErrorComponent = exports.RegisterErrorComponent = {
	    templateUrl: './views/app/components/register-error/register-error.component.html',
	    controller: RegisterErrorController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 117 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RegisterController = function () {
	  RegisterController.$inject = ["$http", "$stateParams", "$auth", "$scope", "$rootScope", "$state", "ContextService", "API", "$interval", "$uibModal", "$log", "Upload", "$timeout"];
	  function RegisterController($http, $stateParams, $auth, $scope, $rootScope, $state, ContextService, API, $interval, $uibModal, $log, Upload, $timeout) {
	    'ngInject';

	    var _this = this;

	    _classCallCheck(this, RegisterController);

	    this.stateParams = $stateParams;
	    this.API = API;
	    this.$auth = $auth;
	    this.scope = $scope;
	    this.$state = $state;
	    this.rootScope = $rootScope;
	    this.file = [];
	    this.API = API;
	    this.interval = $interval;
	    this.uibModal = $uibModal;
	    this.log = $log;
	    this.timeout = $timeout;
	    $scope.logs = '';
	    this.scope.files = [];
	    this.Upload = Upload;
	    this.logs = '';
	    var timeout = $timeout;

	    var user = {
	      name: this.stateParams.name,
	      email: this.stateParams.email,
	      university: this.stateParams.university,
	      type: this.stateParams.type,
	      password: this.stateParams.password,
	      telephone: this.stateParams.phone
	    };
	    if (this.$state.current.name == 'logins.login.register.goreg') {
	      // this.$state.go('logins.login.register')
	      this.stateParams.logtype = 'social';
	      this.API.all('auth/user-inf/' + this.stateParams.id).get('').then(function (response) {
	        _this.stateParams.name = response.data.user.name;
	        _this.stateParams.email = response.data.user.email;
	        _this.$state.go('logins.login.register');
	      }, function (response) {
	        _this.$state.go('logins.login');
	      });
	    } else {
	      if (this.stateParams.type == null) {
	        this.$state.go('logins.login.register');
	      } else {
	        if (this.stateParams.email == null || this.stateParams.name == null || this.stateParams.password == null || this.stateParams.phone == null) {
	          this.$state.go('logins.login.register.main');
	        } else {
	          if (this.stateParams.university == null) {
	            this.$state.go('logins.login.register.information');
	          }
	        }
	      }
	    }
	    //
	  }

	  _createClass(RegisterController, [{
	    key: 'test',
	    value: function test(reg) {
	      console.log('hi this is reg');
	      console.log(reg);
	    }
	  }, {
	    key: 'go',
	    value: function go(url) {
	      var _this2 = this;

	      if (this.stateParams.type == null) {
	        this.stateParams.type = "";
	      }
	      //console.log(url)
	      if (url == '') {
	        url = 'logins.login.register.error';
	      }
	      if (url === 'logins.login.register.confirm' && this.stateParams.type === 'Teacher') {
	        // console.log(this.stateParams)
	        //this.$state.go(url,{back:this.stateParams.back,next:'logins.login.register.mail',type: this.stateParams.type})
	        this.$state.go(url, { back: 'logins.login.register.information', next: 'logins.login.register.mail', type: this.stateParams.type });
	        this.addhomework(this.stateParams.files, this.timeout, this.logs, this.stateParams.classid, this);
	      } else {
	        if (url === 'logins.login.register.mail' || url === 'logins.login.register.information') {
	          var user = {
	            name: this.stateParams.name,
	            email: this.stateParams.email,
	            university: this.stateParams.university,
	            type: this.stateParams.type,
	            password: this.stateParams.password,
	            telephone: this.stateParams.phone
	          };
	          console.log('register from register');
	          ////////////////////////////////////////////////
	          this.$auth.signup(user).then(function () {
	            _this2.$state.go('logins.login.index', { registerSuccess: true });
	          }).catch(this.failedRegistration.bind(this));
	          ///////////////////////////////////////////////////
	        } else {
	          this.$state.go(url, { back: 'logins.login.register.information', next: 'logins.login.register.mail', type: this.stateParams.type });
	          ////console.log('hi we are going to :' + url )
	        }
	      }
	    }
	  }, {
	    key: 'failedRegistration',
	    value: function failedRegistration(response) {
	      if (response.status === 422) {
	        for (var error in response.data.errors) {
	          this.rootScope.errors[error] = response.data.errors[error][0];
	          this.rootScope['errorDes' + (error + 1)] = response.data.errors[error][0];
	          this.registerForm.$invalid = true;
	          this.registerForm[error].$invalid = true;
	          //console.log(this)
	        }
	        this.rootScope.rerror = true;
	        $timeout(function () {
	          this.rootScope.rerror = false;
	        }, 5000);
	      }
	    }
	  }, {
	    key: 'watch',
	    value: function watch(file) {
	      this.upload(this.scope.files);
	    }
	  }, {
	    key: 'watch',
	    value: function watch() {
	      if (this.scope.file != null) {
	        this.scope.files = [this.scope.file];
	      }
	    }
	  }, {
	    key: 'upload',
	    value: function upload(files, $timeout, logs, $scope) {
	      //console.log(this)
	      if (files && files.length) {
	        for (var i = 0; i < files.length; i++) {
	          var file = files[i];
	          if (!file.$error) {
	            //console.log(files)
	            this.Upload.upload({
	              url: 'api/vc/upload',
	              method: 'POST',
	              file: file,
	              data: {
	                username: this.username,
	                file: this.scope.files[i]
	              }
	            }).then(function (resp, $scope) {
	              $timeout(function () {
	                // console.log('upload finished ')
	              });
	            }, null, function (evt, $scope) {
	              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	              logs = 'progress: ' + progressPercentage + '% ' + evt.config.data.file.name + '\n';
	            });
	          }
	        }
	      }
	    }
	  }, {
	    key: 'addhomework',
	    value: function addhomework(files, $timeout, logs, classid, _self) {
	      //console.log('enter addhomework')
	      if (files && files.length) {
	        // console.log('files is exist')

	        for (var i = 0; i < files.length; i++) {
	          var file = files[i];
	          if (!file.$error) {
	            //console.log(files)
	            this.Upload.upload({
	              url: 'api/auth/uploadhw',
	              method: 'POST',
	              file: file
	            }).then(function (resp) {
	              $timeout(function () {
	                //  console.log('timeout acativated :s')
	                //  console.log(resp.data.data)
	              });
	            }, null, function (evt) {
	              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	              logs = 'progress: ' + progressPercentage + '% ' + evt.config.data.file.name + '\n';
	              console.log(logs);
	            });
	          }
	        }
	      }
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {
	      //   console.log(this)
	    }
	  }]);

	  return RegisterController;
	}();

	var RegisterComponent = exports.RegisterComponent = {
	  templateUrl: './views/app/components/register/register.component.html',
	  controller: RegisterController,
	  controllerAs: 'reg',
	  bindings: {}
	};

/***/ },
/* 118 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RegisterConfirmController = function () {
	    RegisterConfirmController.$inject = ["$state", "$stateParams", "$rootScope", "$scope"];
	    function RegisterConfirmController($state, $stateParams, $rootScope, $scope) {
	        'ngInject';

	        _classCallCheck(this, RegisterConfirmController);

	        this.stateParams = $stateParams;
	        this.state = $state;
	        this.scope = $scope;
	        this.rootScope = $rootScope;
	        //this.stateParams = $stateParams;
	        this.stateParams.back = 'logins.login.register.information';
	        if (this.stateParams.type == 'student') {
	            this.stateParams.next = 'logins.login.register.mail';
	        } else {
	            if (this.stateParams.type == 'Teacher') {
	                this.stateParams.next = 'logins.login.register.mail';
	            } else {
	                this.stateParams.next = 'logins.login.register.error';
	            }
	        }
	    }

	    _createClass(RegisterConfirmController, [{
	        key: 'check',
	        value: function check() {
	            console.log(this.stateParams);
	            console.log(this.state.current.name);
	        }
	    }]);

	    return RegisterConfirmController;
	}();

	var RegisterConfirmComponent = exports.RegisterConfirmComponent = {
	    templateUrl: './views/app/components/register-confirm/register-confirm.component.html',
	    controller: RegisterConfirmController,
	    controllerAs: 'regconf',
	    bindings: {}
	};

/***/ },
/* 119 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RegisterClassController = function () {
	    function RegisterClassController() {
	        'ngInject';

	        //

	        _classCallCheck(this, RegisterClassController);
	    }

	    _createClass(RegisterClassController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return RegisterClassController;
	}();

	var RegisterClassComponent = exports.RegisterClassComponent = {
	    templateUrl: './views/app/components/register-class/register-class.component.html',
	    controller: RegisterClassController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 120 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RegisterInformationController = function () {
	  RegisterInformationController.$inject = ["$http", "$stateParams", "$scope", "$rootScope", "ContextService", "API", "$interval", "$uibModal", "$log", "Upload", "$timeout"];
	  function RegisterInformationController($http, $stateParams, $scope, $rootScope, ContextService, API, $interval, $uibModal, $log, Upload, $timeout) {
	    'ngInject';

	    _classCallCheck(this, RegisterInformationController);

	    this.file = [];
	    this.API = API;
	    this.interval = $interval;
	    this.uibModal = $uibModal;
	    this.log = $log;
	    this.timeout = $timeout;
	    $scope.logs = '';
	    this.Upload = Upload;
	    this.logs = '';
	    var timeout = $timeout;
	    this.stateParams = $stateParams;
	    this.scope = $scope;
	    this.rootScope = $rootScope;
	    this.scope.files = [];
	    this.stateParams.back = 'logins.login.register.main';
	    if (this.stateParams.type == 'student') {
	      this.stateParams.next = 'logins.login.register.mail';
	    } else {
	      if (this.stateParams.type == 'Teacher') {
	        this.stateParams.next = 'logins.login.register.mail';
	      } else {
	        this.stateParams.next = 'logins.login.register.error';
	      }
	    }

	    $scope.getLocation = function (val) {
	      return $http.get('auth-debug/university-information/' + val, {
	        params: {}
	      }).then(function (response) {
	        return response.data.data.u.map(function (item) {
	          return item;
	        });
	      });
	    };
	  }

	  _createClass(RegisterInformationController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return RegisterInformationController;
	}();

	var RegisterInformationComponent = exports.RegisterInformationComponent = {
	  templateUrl: './views/app/components/register-information/register-information.component.html',
	  controller: RegisterInformationController,
	  controllerAs: 'reginf',
	  bindings: {}
	};

/***/ },
/* 121 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RegisterMainController = function () {
	    RegisterMainController.$inject = ["$state", "$stateParams", "$rootScope", "$scope"];
	    function RegisterMainController($state, $stateParams, $rootScope, $scope) {
	        'ngInject';

	        _classCallCheck(this, RegisterMainController);

	        $scope.showHints = true;

	        this.stateParams = $stateParams;
	        this.$state = $state;
	        this.scope = $scope;
	        this.scope.showHints = true;
	        this.rootScope = $rootScope;
	        this.stateParams.back = 'logins.login.register';
	        // this.stateParams.name = '';
	        // this.stateParams.phone = '';
	        // this.stateParams.email = '';
	        // this.stateParams.password = '';
	        $scope.user = {
	            name: this.stateParams.name,
	            email: this.stateParams.email,
	            social: this.stateParams.password,
	            phone: this.stateParams.phone
	        };
	        if (this.stateParams.type == 'Teacher') {
	            this.stateParams.next = 'logins.login.register.information';
	        } else {
	            this.stateParams.next = 'logins.login.register.information';
	        }

	        $scope.getLocation = function (val) {
	            return $http.get('auth-debug/university-information/' + val, {
	                params: {}
	            }).then(function (response) {
	                // console.log(response)
	                return response.data.data.u.map(function (item) {
	                    return item;
	                });
	            });
	        };
	        //console.log(this)
	    }

	    _createClass(RegisterMainController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }, {
	        key: 'test',
	        value: function test(reg) {
	            //  console.log(reg)
	        }
	    }]);

	    return RegisterMainController;
	}();

	var RegisterMainComponent = exports.RegisterMainComponent = {
	    templateUrl: './views/app/components/register-main/register-main.component.html',
	    controller: RegisterMainController,
	    controllerAs: 'regmain',
	    bindings: {}
	};

/***/ },
/* 122 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RegisterTypeController = function () {
	    RegisterTypeController.$inject = ["$stateParams", "$rootScope", "$scope"];
	    function RegisterTypeController($stateParams, $rootScope, $scope) {
	        'ngInject';

	        _classCallCheck(this, RegisterTypeController);

	        this.stateParams = $stateParams;
	        this.scope = $scope;
	        this.rootScope = $rootScope;
	        this.stateParams.back = 'logins.login.register.index';
	        this.stateParams.next = 'logins.login.register.main';
	        // console.log(this)

	        //console.log('up is the constructor')
	        //
	    }

	    _createClass(RegisterTypeController, [{
	        key: '$onInit',
	        value: function $onInit() {
	            // console.log(this)
	        }
	    }]);

	    return RegisterTypeController;
	}();

	var RegisterTypeComponent = exports.RegisterTypeComponent = {
	    templateUrl: './views/app/components/register-type/register-type.component.html',
	    controller: RegisterTypeController,
	    controllerAs: 'regtype',
	    bindings: {}
	};

/***/ },
/* 123 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CompaniesController = function () {
	    function CompaniesController() {
	        'ngInject';

	        //

	        _classCallCheck(this, CompaniesController);
	    }

	    _createClass(CompaniesController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return CompaniesController;
	}();

	var CompaniesComponent = exports.CompaniesComponent = {
	    templateUrl: './views/app/components/companies/companies.component.html',
	    controller: CompaniesController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 124 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CompaniesVideosController = function () {
	    function CompaniesVideosController() {
	        'ngInject';

	        //

	        _classCallCheck(this, CompaniesVideosController);
	    }

	    _createClass(CompaniesVideosController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return CompaniesVideosController;
	}();

	var CompaniesVideosComponent = exports.CompaniesVideosComponent = {
	    templateUrl: './views/app/components/companies-videos/companies-videos.component.html',
	    controller: CompaniesVideosController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 125 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CompaniesPhotosController = function () {
	    function CompaniesPhotosController() {
	        'ngInject';

	        //

	        _classCallCheck(this, CompaniesPhotosController);
	    }

	    _createClass(CompaniesPhotosController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return CompaniesPhotosController;
	}();

	var CompaniesPhotosComponent = exports.CompaniesPhotosComponent = {
	    templateUrl: './views/app/components/companies-photos/companies-photos.component.html',
	    controller: CompaniesPhotosController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 126 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CompaniesAboutController = function () {
	    function CompaniesAboutController() {
	        'ngInject';

	        //

	        _classCallCheck(this, CompaniesAboutController);
	    }

	    _createClass(CompaniesAboutController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return CompaniesAboutController;
	}();

	var CompaniesAboutComponent = exports.CompaniesAboutComponent = {
	    templateUrl: './views/app/components/companies-about/companies-about.component.html',
	    controller: CompaniesAboutController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 127 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CompaniesTimelineController = function () {
	    function CompaniesTimelineController() {
	        'ngInject';

	        //

	        _classCallCheck(this, CompaniesTimelineController);
	    }

	    _createClass(CompaniesTimelineController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return CompaniesTimelineController;
	}();

	var CompaniesTimelineComponent = exports.CompaniesTimelineComponent = {
	    templateUrl: './views/app/components/companies-timeline/companies-timeline.component.html',
	    controller: CompaniesTimelineController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 128 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ProfileVideoController = function () {
	    ProfileVideoController.$inject = ["$scope", "$rootScope", "API", "$stateParams", "Post", "$timeout", "moment", "Upload", "$log"];
	    function ProfileVideoController($scope, $rootScope, API, $stateParams, Post, $timeout, moment, Upload, $log) {
	        'ngInject';

	        _classCallCheck(this, ProfileVideoController);

	        this.$scope = $scope;
	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	        var Post = this.Post;
	        this.Post.seturl('social/get/profile/post/' + $stateParams.id + '/video');
	        this.Post.setskip(0);
	        this.Post.settake(4);
	        angular.element('html').scrollTop(0);
	        this.Post.getPost().then(function (response) {
	            $scope.dat = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	        });
	        this.$scope = $scope;
	        //this.$scope.dat=this.Post.getPostat();
	        this.$scope = $scope;
	        $scope.getPost = function () {
	            Post.getPost().then(function (response) {
	                $scope.dat = Post.getPostat();
	                $scope.nopost = Post.getnopost();
	            });
	        };
	        $scope.callback = function () {
	            $scope.nopost = Post.getnopost();
	        };
	    }

	    _createClass(ProfileVideoController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return ProfileVideoController;
	}();

	var ProfileVideoComponent = exports.ProfileVideoComponent = {
	    templateUrl: './views/app/components/profile-video/profile-video.component.html',
	    controller: ProfileVideoController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 129 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ProfileMediaController = function () {
	    ProfileMediaController.$inject = ["$scope", "$rootScope", "ContextService", "API"];
	    function ProfileMediaController($scope, $rootScope, ContextService, API) {
	        'ngInject';

	        _classCallCheck(this, ProfileMediaController);

	        var navHeader = this;

	        ContextService.me(function (data) {
	            navHeader.userData = data;
	        });
	        this.scope = $scope;
	        this.rootScope = $rootScope;
	        this.API = API;
	    }

	    _createClass(ProfileMediaController, [{
	        key: '$onInit',
	        value: function $onInit() {
	            console.log(this);
	        }
	    }]);

	    return ProfileMediaController;
	}();

	var ProfileMediaComponent = exports.ProfileMediaComponent = {
	    templateUrl: './views/app/components/profile-media/profile-media.component.html',
	    controller: ProfileMediaController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 130 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ProfileFollowerController = function () {
	    ProfileFollowerController.$inject = ["$scope", "$rootScope", "API", "$stateParams", "Post", "$timeout", "moment", "Upload", "$log"];
	    function ProfileFollowerController($scope, $rootScope, API, $stateParams, Post, $timeout, moment, Upload, $log) {
	        'ngInject';

	        _classCallCheck(this, ProfileFollowerController);

	        this.$scope = $scope;
	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	        var Post = this.Post;
	        this.Post.seturl('profile/followers/' + $stateParams.id);
	        this.Post.setskip(0);
	        this.Post.settake(5);
	        angular.element('html').scrollTop(0);
	        $rootScope.busy = false;
	        this.$scope = $scope;
	        $scope.getPost = function () {
	            Post.getPost().then(function (response) {
	                $scope.dat = Post.getPostat();
	                $scope.nopost = Post.getnopost();
	                $rootScope.busy = false;
	            });
	        };
	        $scope.callback = function () {
	            $scope.nopost = Post.getnopost();
	        };
	    }

	    _createClass(ProfileFollowerController, [{
	        key: '$onInit',
	        value: function $onInit() {
	            console.log(this);
	        }
	    }]);

	    return ProfileFollowerController;
	}();

	var ProfileFollowerComponent = exports.ProfileFollowerComponent = {
	    templateUrl: './views/app/components/profile-follower/profile-follower.component.html',
	    controller: ProfileFollowerController,
	    controllerAs: 'pfr',
	    bindings: {}
	};

/***/ },
/* 131 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ProfileFollowingController = function () {
	    ProfileFollowingController.$inject = ["$scope", "$rootScope", "API", "$stateParams", "Post", "$timeout", "moment", "Upload", "$log"];
	    function ProfileFollowingController($scope, $rootScope, API, $stateParams, Post, $timeout, moment, Upload, $log) {
	        'ngInject';

	        _classCallCheck(this, ProfileFollowingController);

	        this.$scope = $scope;
	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	        var Post = this.Post;
	        this.Post.seturl('profile/friends/' + $stateParams.id);
	        this.Post.setskip(0);
	        this.Post.settake(5);
	        angular.element('html').scrollTop(0);
	        this.Post.getPost().then(function (response) {
	            $scope.dat = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	            $rootScope.busy = false;
	        });
	        this.$scope = $scope;
	        //this.$scope.dat=this.Post.getPostat();
	        this.$scope = $scope;
	        $scope.getPost = function () {
	            Post.getPost().then(function (response) {
	                $scope.dat = Post.getPostat();
	                $scope.nopost = Post.getnopost();
	                $rootScope.busy = false;
	            });
	        };
	        $scope.callback = function () {
	            $scope.nopost = Post.getnopost();
	        };
	    }

	    _createClass(ProfileFollowingController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return ProfileFollowingController;
	}();

	var ProfileFollowingComponent = exports.ProfileFollowingComponent = {
	    templateUrl: './views/app/components/profile-following/profile-following.component.html',
	    controller: ProfileFollowingController,
	    controllerAs: 'pfg',
	    bindings: {}
	};

/***/ },
/* 132 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var instituteCollegesController = function () {
	    function instituteCollegesController() {
	        'ngInject';

	        //

	        _classCallCheck(this, instituteCollegesController);
	    }

	    _createClass(instituteCollegesController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return instituteCollegesController;
	}();

	var instituteCollegesComponent = exports.instituteCollegesComponent = {
	    templateUrl: './views/app/components/institute-colleges/institute-colleges.component.html',
	    controller: instituteCollegesController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 133 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var instituteSpecialtiesController = function () {
	    function instituteSpecialtiesController() {
	        'ngInject';

	        //

	        _classCallCheck(this, instituteSpecialtiesController);
	    }

	    _createClass(instituteSpecialtiesController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return instituteSpecialtiesController;
	}();

	var instituteSpecialtiesComponent = exports.instituteSpecialtiesComponent = {
	    templateUrl: './views/app/components/institute-specialties/institute-specialties.component.html',
	    controller: instituteSpecialtiesController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 134 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var instituteVideosController = function () {
	    function instituteVideosController() {
	        'ngInject';

	        //

	        _classCallCheck(this, instituteVideosController);
	    }

	    _createClass(instituteVideosController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return instituteVideosController;
	}();

	var instituteVideosComponent = exports.instituteVideosComponent = {
	    templateUrl: './views/app/components/institute-videos/institute-videos.component.html',
	    controller: instituteVideosController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 135 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var institutePhotosController = function () {
	    function institutePhotosController() {
	        'ngInject';

	        //

	        _classCallCheck(this, institutePhotosController);
	    }

	    _createClass(institutePhotosController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return institutePhotosController;
	}();

	var institutePhotosComponent = exports.institutePhotosComponent = {
	    templateUrl: './views/app/components/institute-photos/institute-photos.component.html',
	    controller: institutePhotosController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 136 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var instituteTimelineController = function () {
	    instituteTimelineController.$inject = ["$scope"];
	    function instituteTimelineController($scope) {
	        'ngInject';

	        _classCallCheck(this, instituteTimelineController);

	        $scope.showEvent = function () {
	            angular.element('.event-div').removeClass('hidden');
	            angular.element('.referendum-div').addClass('hidden');
	        };
	        $scope.showReferendum = function () {
	            angular.element('.event-div').addClass('hidden');
	            angular.element('.referendum-div').removeClass('hidden');
	        };
	        $scope.closePost = function () {
	            angular.element('.event-div').addClass('hidden');
	            angular.element('.referendum-div').addClass('hidden');
	        };
	    }

	    _createClass(instituteTimelineController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return instituteTimelineController;
	}();

	var instituteTimelineComponent = exports.instituteTimelineComponent = {
	    templateUrl: './views/app/components/institute-timeline/institute-timeline.component.html',
	    controller: instituteTimelineController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 137 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TimelineController = function () {
	    function TimelineController() {
	        'ngInject';

	        //

	        _classCallCheck(this, TimelineController);
	    }

	    _createClass(TimelineController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return TimelineController;
	}();

	var TimelineComponent = exports.TimelineComponent = {
	    templateUrl: './views/app/components/timeline/timeline.component.html',
	    controller: TimelineController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 138 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var instituteAboutController = function () {
	  instituteAboutController.$inject = ["$scope", "$log", "$timeout", "$uibModal", "API", "$rootScope"];
	  function instituteAboutController($scope, $log, $timeout, $uibModal, API, $rootScope) {
	    'ngInject';

	    _classCallCheck(this, instituteAboutController);

	    this.API = API;
	    this.$scope = $scope;
	    this.$rootScope = $rootScope;
	    this.$uibModal = $uibModal;
	    this.$log = $log;
	    this.$scope = $scope;
	    this.items = ['item1', 'item2', 'item3'];
	    this.$rootScope.newBox = {
	      "name": "",
	      "icon": "",
	      "visible": true,
	      "data": [{
	        "title": "",
	        "type": "",
	        "value": ""
	      }]
	    };
	    $rootScope.about = [{
	      "name": "المعلومات العامة",
	      "icon": "info",
	      "visible": true,
	      "data": [{
	        "title": "اسم المؤسسه",
	        "value": "الجامعه الاردنيه",
	        "type": "text"
	      }, {
	        "title": "تاريخ التاسيس",
	        "value": "12/07/1992",
	        "type": "date"
	      }]
	    }, {
	      "name": "معلومات الاتصال",
	      "icon": "phone",
	      "visible": true,
	      "data": [{
	        "title": "الموقع الالكتروني",
	        "value": "www.edazance.com",
	        "type": "url"
	      }, {
	        "title": "البريد الالكتروني",
	        "value": "12/07/1992",
	        "type": "date"
	      }]
	    }];
	  }

	  _createClass(instituteAboutController, [{
	    key: 'info',
	    value: function info() {
	      console.log(2132);
	    }
	  }, {
	    key: 'modalOpen',
	    value: function modalOpen(size) {
	      var $uibModal = this.$uibModal;
	      var $scope = this.$scope;
	      var $log = this.$log;
	      var _items = this.items;
	      var modalInstance = $uibModal.open({
	        animation: true,
	        templateUrl: 'newBox.html',
	        controller: this.modalcontroller,
	        controllerAs: 'mvm',
	        size: size,
	        resolve: {
	          items: function items() {
	            return _items;
	          }
	        }
	      });

	      modalInstance.result.then(function (selectedItem) {
	        $scope.selected = selectedItem;
	      }, function () {
	        $log.info('Modal dismissed at: ' + new Date());
	      });
	    }
	  }, {
	    key: 'modalcontroller',
	    value: ["$rootScope", "$scope", "$uibModalInstance", "items", "API", function modalcontroller($rootScope, $scope, $uibModalInstance, items, API) {
	      'ngInject';

	      var _this = this;

	      this.$rootScope = $rootScope;
	      this.scope = $scope;
	      //console.log(this.scope);
	      this.items = items;
	      this.API = API;
	      var self = this;

	      this.classEnabled = true;
	      $scope.selected = {
	        item: items[0]
	      };
	      this.addNewBox = function (form) {
	        //console.log(pro);
	        _this.$rootScope.about.push(_this.$rootScope.newBox);
	        console.log(_this.$rootScope.newBox);
	        console.log(_this.$rootScope.about);
	        _this.$rootScope.newBox = {
	          "name": "",
	          "icon": "",
	          "data": [{
	            "title": "",
	            "type": "",
	            "value": ""
	          }]
	        };
	        _this.cancel();
	      };
	      this.ok = function () {
	        $uibModalInstance.close($scope.selected.item);
	      };

	      this.cancel = function () {
	        $uibModalInstance.dismiss('cancel');
	      };
	      this.addNewItem = function () {
	        var x = {
	          "title": "",
	          "type": "",
	          "value": ""
	        };
	        _this.$rootScope.newBox.data.push(x);
	      };
	    }]
	  }, {
	    key: 'cancel',
	    value: function cancel() {
	      this.dismiss({ $value: 'cancel' });
	    }
	  }, {
	    key: 'toggleModalAnimation',
	    value: function toggleModalAnimation() {
	      this.animationsEnabled = !this.animationsEnabled;
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return instituteAboutController;
	}();

	var instituteAboutComponent = exports.instituteAboutComponent = {
	  templateUrl: './views/app/components/institute-about/institute-about.component.html',
	  controller: instituteAboutController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 139 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var instituteController = function () {
	    function instituteController() {
	        'ngInject';

	        //

	        _classCallCheck(this, instituteController);
	    }

	    _createClass(instituteController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return instituteController;
	}();

	var instituteComponent = exports.instituteComponent = {
	    templateUrl: './views/app/components/institute/institute.component.html',
	    controller: instituteController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 140 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LoginUniversitySocialController = function () {
	  LoginUniversitySocialController.$inject = ["$rootScope", "$auth", "$state", "$stateParams", "API", "AclService", "$scope"];
	  function LoginUniversitySocialController($rootScope, $auth, $state, $stateParams, API, AclService, $scope) {
	    'ngInject';

	    _classCallCheck(this, LoginUniversitySocialController);

	    this.scope = $scope;
	    this.API = API;
	    this.$auth = $auth;
	    this.$state = $state;
	    this.$stateParams = $stateParams;
	    this.AclService = AclService;
	    this.formSubmitted = false;
	    this.errors = [];
	    this.type = 2;
	    this.registerSuccess = $stateParams.registerSuccess;
	    this.successMsg = $stateParams.successMsg;
	    this.loginfailed = false;
	    this.unverified = false;
	  }

	  _createClass(LoginUniversitySocialController, [{
	    key: '$onInit',
	    value: function $onInit() {
	      var _this = this;

	      this.API.all('auth/university-information/jor').get('').then(function (response) {
	        _this.scope.university = response.data.university;
	        _this.email = _this.$stateParams.email;
	        _this.id = _this.$stateParams.id;
	        console.log(_this);
	      });
	    }
	  }, {
	    key: 'getcollege',
	    value: function getcollege($id) {
	      var _this2 = this;

	      this.API.all('auth/college-information/' + $id).get('').then(function (response) {
	        _this2.scope.univ = response.data.university;
	        // console.log(this.scope)
	      });
	    }
	  }, {
	    key: 'getspecialize',
	    value: function getspecialize($id) {
	      var _this3 = this;

	      this.API.all('auth/specialize-information/' + $id).get('').then(function (response) {
	        _this3.scope.college = response.data.university;
	        // console.log(this.scope)
	      });
	    }
	  }, {
	    key: 'register',
	    value: function register(isValid) {
	      var _this4 = this;

	      //console.log( this.$stateParams);
	      //console.log(isValid);
	      console.log(this);

	      if (isValid) {
	        var user = {
	          email: this.email,
	          id: this.id,
	          country: this.country,
	          university: this.university,
	          college: this.college,
	          specialize: this.specialize,
	          type: this.type,
	          ids: this.$stateParams.id,
	          user: this.$stateParams.user
	        };
	        //console.log(this.$stateParams.user);
	        this.API.all('auth/university-inf-social').post(user).then(function (response) {
	          console.log("There are  saving successfull");
	          // console.log(response);

	          _this4.API.oneUrl('authenticate').one('user').get().then(function (response) {
	            if (!response.error) {
	              var data = response.data;

	              angular.forEach(data.userRole, function (value) {
	                this.AclService.attachRole(value);
	              });

	              _this4.AclService.setAbilities(data.abilities);
	              _this4.$auth.setToken(data.token);
	              _this4.$state.go('app.landing');
	            }
	          });
	        });
	      } else {
	        this.formSubmitted = true;
	        console.log('Not Valid :(!!');
	        console.log(this);
	      }
	    }
	  }, {
	    key: 'failedRegistration',
	    value: function failedRegistration(response) {
	      if (response.status === 422) {
	        for (var error in response.data.errors) {
	          console.log('Had Error :(!!');
	          console.log(this);

	          this.errors[error] = response.data.errors[error][0];
	          this.$scope.registerForm[error].$invalid = true;
	        }
	      }
	    }
	  }]);

	  return LoginUniversitySocialController;
	}();

	var LoginUniversitySocialComponent = exports.LoginUniversitySocialComponent = {
	  templateUrl: './views/app/components/login-university-social/login-university-social.component.html',
	  controller: LoginUniversitySocialController,
	  controllerAs: 'logs',
	  bindings: {}
	};

/***/ },
/* 141 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LoginConfirmdataController = function () {
	    function LoginConfirmdataController() {
	        'ngInject';

	        //

	        _classCallCheck(this, LoginConfirmdataController);
	    }

	    _createClass(LoginConfirmdataController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return LoginConfirmdataController;
	}();

	var LoginConfirmdataComponent = exports.LoginConfirmdataComponent = {
	    templateUrl: './views/app/components/login-confirmdata/login-confirmdata.component.html',
	    controller: LoginConfirmdataController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 142 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LoginUniversityController = function () {
	  LoginUniversityController.$inject = ["$rootScope", "$auth", "$state", "$stateParams", "API", "AclService", "$scope"];
	  function LoginUniversityController($rootScope, $auth, $state, $stateParams, API, AclService, $scope) {
	    'ngInject';

	    _classCallCheck(this, LoginUniversityController);

	    this.scope = $scope;
	    this.API = API;
	    this.$auth = $auth;
	    this.$state = $state;
	    this.$stateParams = $stateParams;
	    this.AclService = AclService;
	    this.formSubmitted = false;
	    this.errors = [];
	    this.type = 0;
	    this.status = 0;
	    this.registerSuccess = $stateParams.registerSuccess;
	    this.successMsg = $stateParams.successMsg;
	    this.loginfailed = false;
	    this.unverified = false;
	  }

	  _createClass(LoginUniversityController, [{
	    key: '$onInit',
	    value: function $onInit() {
	      var _this = this;

	      this.API.all('auth/university-information/jor').get('').then(function (response) {
	        _this.scope.university = response.data.university;
	        _this.email = _this.$stateParams.email;
	        _this.password = _this.$stateParams.password;
	        // console.log(this)
	      });
	    }
	  }, {
	    key: 'getcollege',
	    value: function getcollege($id) {
	      var _this2 = this;

	      this.API.all('auth/college-information/' + $id).get('').then(function (response) {
	        _this2.scope.univ = response.data.university;
	        // console.log(this.scope)
	      });
	    }
	  }, {
	    key: 'getspecialize',
	    value: function getspecialize($id) {
	      var _this3 = this;

	      this.API.all('auth/specialize-information/' + $id).get('').then(function (response) {
	        _this3.scope.college = response.data.university;
	        // console.log(this.scope)
	      });
	    }
	  }, {
	    key: 'watch',
	    value: function watch(file) {
	      this.upload(this.scope.files);
	    }
	  }, {
	    key: 'watch',
	    value: function watch() {
	      if (this.scope.file != null) {
	        this.scope.files = [this.scope.file];
	      }
	    }
	  }, {
	    key: 'upload',
	    value: function upload(files, $timeout, logs, $scope) {
	      //console.log(this)
	      if (files && files.length) {
	        for (var i = 0; i < files.length; i++) {
	          var file = files[i];
	          if (!file.$error) {
	            //console.log(files)
	            this.Upload.upload({
	              url: 'api/me/upload',
	              method: 'POST',
	              file: file,
	              data: {
	                username: this.username,
	                file: this.scope.files[i]
	              }
	            }).then(function (resp, $scope) {
	              $timeout(function () {
	                console.log('upload finished ');
	              });
	            }, null, function (evt, $scope) {
	              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	              logs = 'progress: ' + progressPercentage + '% ' + evt.config.data.file.name + '\n';
	            });
	          }
	        }
	      }
	    }
	  }, {
	    key: 'addhomework',
	    value: function addhomework(files, $timeout, logs, classid, _self) {
	      if (files && files.length) {
	        for (var i = 0; i < files.length; i++) {
	          var file = files[i];
	          if (!file.$error) {
	            this.Upload.upload({
	              url: 'api/me/uploadhw',
	              method: 'POST',
	              file: file,
	              data: {
	                id: _self.userData.id
	              }
	            }).then(function (resp) {
	              $timeout(function () {
	                var mynewhomework = {
	                  id: _self.userData.id,
	                  textpost: _self.textpost,
	                  imgTag: _self.imgTag,
	                  file: resp.data.data.return[0]
	                };
	                _self.API.all('me/image').post(mynewhomework).then(function (response) {
	                  _self.scope.dat.push(response.data.post);
	                  // _self.scope.dat.push(response.data.post);
	                });
	              });
	            }, null, function (evt) {
	              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	              logs = 'progress: ' + progressPercentage + '% ' + evt.config.data.file.name + '\n';
	              console.log(logs);
	            });
	          }
	        }
	      }
	    }
	  }, {
	    key: 'register',
	    value: function register(isValid) {
	      var _this4 = this;

	      if (isValid) {
	        var user = {
	          email: this.email,
	          password: this.password,
	          country: this.country,
	          university: this.university,
	          college: this.college,
	          specialize: this.specialize,
	          cv: this.file,
	          status: '2',
	          from: this.from,
	          to: this.to,
	          type: '2',
	          id: this.$stateParams.id
	        };
	        this.API.all('auth/university-inf').post(user).then(function (response) {
	          if (!response.error) {
	            var data = response.data;
	            angular.forEach(data.userRole, function (value) {
	              this.AclService.attachRole(value);
	            });
	            _this4.AclService.setAbilities(data.abilities);
	            _this4.$auth.setToken(data.token);
	            window.location.href = "/";
	          }
	        });
	      } else {
	        this.formSubmitted = true;
	        console.log('Not Valid :(!!');
	        console.log(this);
	      }
	    }
	  }, {
	    key: 'failedRegistration',
	    value: function failedRegistration(response) {
	      if (response.status === 422) {
	        for (var error in response.data.errors) {
	          console.log('Had Error :(!!');
	          console.log(this);

	          this.errors[error] = response.data.errors[error][0];
	          this.$scope.registerForm[error].$invalid = true;
	        }
	      }
	    }
	  }]);

	  return LoginUniversityController;
	}();

	var LoginUniversityComponent = exports.LoginUniversityComponent = {
	  templateUrl: './views/app/components/login-university/login-university.component.html',
	  controller: LoginUniversityController,
	  controllerAs: 'logu',
	  bindings: {}
	};

/***/ },
/* 143 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VirtualclassOptionsController = function () {
	    VirtualclassOptionsController.$inject = ["$rootScope", "$scope", "API", "$stateParams", "$state"];
	    function VirtualclassOptionsController($rootScope, $scope, API, $stateParams, $state) {
	        'ngInject';

	        _classCallCheck(this, VirtualclassOptionsController);

	        this.rscope = $rootScope;
	        this.rscope.mobileHeader = false;
	        this.$state = $state;
	        angular.element('html').scrollTop(0);
	        $scope.deleteClass = function () {
	            var modelTitle = 'هذه المادة';
	            swal({
	                title: "هل انت متأكد من حذف " + modelTitle + " ؟",
	                type: 'warning',
	                showCancelButton: true,
	                confirmButtonColor: '#DD6B55',
	                confirmButtonText: "نعم, احذفه",
	                cancelButtonText: "لا, الغاء العمليه",
	                closeOnConfirm: false,
	                closeOnCancel: true,
	                showLoaderOnConfirm: true
	            }, function (isConfirm) {
	                if (isConfirm) {
	                    API.all('class/delete/' + $stateParams.classid).post('').then(function (response) {
	                        if (response.data.sucess) {
	                            swal({
	                                title: "تم حذف " + modelTitle,
	                                type: "success",
	                                timer: 2000,
	                                showConfirmButton: false
	                            });
	                            $state.go('app.landing');
	                        } else {
	                            if (response.data.result == 'condition erorr') {
	                                swal({
	                                    title: "انت لا تملك الصلاحية لحذف " + modelTitle,
	                                    type: "error",
	                                    timer: 2000,
	                                    showConfirmButton: false
	                                });
	                            } else {
	                                swal({
	                                    title: "حدث خطأ في عملية حذف " + modelTitle,
	                                    type: "error",
	                                    timer: 2000,
	                                    showConfirmButton: false
	                                });
	                            }
	                        }
	                    }, function (response) {});
	                }
	            });
	        };
	        $scope.archiveClass = function (status) {
	            var modelTitle = 'هذه المادة';
	            var status = status;
	            if (status == 'archiving') {
	                var title = "هل متاكد انك تريد ارشفة هذه المادة؟";
	                var successMsg = "تم ارشفة هذه المادة";
	            } else {
	                var title = "هل متاكد انك تريد الغاء ارشفة هذه المادة؟";
	                var successMsg = "تم الغاء ارشفة هذه المادة";
	            }
	            swal({
	                title: title,
	                type: 'warning',
	                showCancelButton: true,
	                confirmButtonColor: '#DD6B55',
	                confirmButtonText: "نعم",
	                cancelButtonText: "الغاء العمليه",
	                closeOnConfirm: false,
	                closeOnCancel: true,
	                showLoaderOnConfirm: true
	            }, function (isConfirm) {
	                if (isConfirm) {
	                    API.all('class/' + status + '/' + $stateParams.classid).post('').then(function (response) {
	                        if (response.data.sucess) {
	                            swal({
	                                title: successMsg,
	                                type: "success",
	                                timer: 2000,
	                                showConfirmButton: false
	                            });
	                            $state.go('app.landing');
	                        } else {
	                            if (response.data.result == 'condition erorr') {
	                                swal({
	                                    title: "انت لا تملك الصلاحية ",
	                                    type: "error",
	                                    timer: 2000,
	                                    showConfirmButton: false
	                                });
	                            } else {
	                                swal({
	                                    title: "حدث خطأ في العملية ",
	                                    type: "error",
	                                    timer: 2000,
	                                    showConfirmButton: false
	                                });
	                            }
	                        }
	                    }, function (response) {});
	                }
	            });
	        };
	        $scope.leaveClass = function () {
	            swal({
	                title: "هل انت متأكد من مغادرة المادة ؟",
	                type: 'warning',
	                showCancelButton: true,
	                confirmButtonColor: '#DD6B55',
	                confirmButtonText: "نعم, متاكد",
	                cancelButtonText: "لا, الغاء العمليه",
	                closeOnConfirm: false,
	                closeOnCancel: true,
	                showLoaderOnConfirm: true
	            }, function (isConfirm) {
	                if (isConfirm) {
	                    API.all('class/leave/' + $stateParams.classid).post('').then(function (response) {
	                        if (response.data.sucess) {
	                            swal({
	                                title: "تمت مغادرة من المادة",
	                                type: "success",
	                                timer: 2000,
	                                showConfirmButton: false
	                            });
	                            $state.go('app.virtualclasses');
	                        } else {
	                            if (response.data.result == 'condition erorr') {
	                                swal({
	                                    title: "انت لا تملك الصلاحية المغادره المادة",
	                                    type: "error",
	                                    timer: 2000,
	                                    showConfirmButton: false
	                                });
	                            } else {
	                                swal({
	                                    title: "حدث خطأ في عملية المغادرة المادة",
	                                    type: "error",
	                                    timer: 2000,
	                                    showConfirmButton: false
	                                });
	                            }
	                        }
	                    });
	                }
	            });
	        };
	    }

	    _createClass(VirtualclassOptionsController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return VirtualclassOptionsController;
	}();

	var VirtualclassOptionsComponent = exports.VirtualclassOptionsComponent = {
	    templateUrl: './views/app/components/virtualclass-options/virtualclass-options.component.html',
	    controller: VirtualclassOptionsController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 144 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VirtualclassStudentController = function () {
	    VirtualclassStudentController.$inject = ["$http", "$stateParams", "$scope", "$rootScope", "API", "toastr"];
	    function VirtualclassStudentController($http, $stateParams, $scope, $rootScope, API, toastr) {
	        'ngInject';

	        _classCallCheck(this, VirtualclassStudentController);

	        $scope.a = [];
	        var navSideBar = this;
	        this.API = API;
	        this.rootScope = $rootScope;
	        this.scope = $scope;
	        this.stateParams = $stateParams;
	        //this.rootScope.prouser = []
	        //this.rootScope.vc = []
	        this.userData = [];
	        this.counter = 0;
	        this.rootScope.mobileHeader = false;
	        this.toastr = toastr;
	        angular.element('html').scrollTop(0);
	        var _selected;
	        $scope.selected = undefined;

	        // $scope.getLocation = function(val) {
	        //     API.all('class/search/'+ $stateParams.classid + '/' + val).get('')
	        //     .then((response) => {
	        //         $scope.a = [];
	        //         console.log(response.data);
	        //         response.data.map(function(item) {
	        //             $scope.a.push(item)
	        //         });
	        //     }, (response) => {
	        //         var a = response.data;
	        //     });
	        //     return $scope.a;
	        // }
	        $scope.getLocation = function (val) {
	            return $http.get('api/class/search/' + $stateParams.classid + '/' + val).then(function (response) {
	                if (response.data.data != "no post") {
	                    return response.data.data.map(function (item) {
	                        return item;
	                    });
	                }
	            });
	        };
	        API.all('class/requests/' + $stateParams.classid).get('').then(function (response) {
	            $scope.waitingStudent = response.data;
	            $scope.noWaitingStudent = false;
	            if (response.data.success == false) {
	                $scope.noWaitingStudent = true;
	            }
	        });
	    }

	    _createClass(VirtualclassStudentController, [{
	        key: 'addclasses',
	        value: function addclasses($item) {
	            var mynewclass = {
	                code: this.rootScope.vc.class_code,
	                student: $item.id
	            };
	            var self = this;
	            this.API.all('class/add/' + self.rootScope.vc.id).post(mynewclass).then(function (response) {
	                if (response.data.sucess == false) {
	                    self.toastr.error(response.data.message);
	                } else {
	                    self.toastr.success(response.data.message);
	                    self.rootScope.vc.vcuser = response.data.result;
	                    self.scope.a = [];
	                    self.scope.query = '';
	                }
	            });
	        }
	    }, {
	        key: 'removeclassuser',
	        value: function removeclassuser($id) {
	            var mynewclass = {
	                user: $id,
	                class: this.rootScope.vc.id
	            };
	            var self = this;
	            this.API.all('class/remove/' + self.rootScope.vc.id).post(mynewclass).then(function (response) {
	                if (response.data.sucess == true) {
	                    self.toastr.success(response.data.message);
	                    self.rootScope.vc.vcuser = response.data.result;
	                    self.scope.asyncSelected = '';
	                }
	                //this.newcoursecode = response.data.code.class_code
	                //this.newname = response.data.code.name
	                //console.log(response)
	            });
	        }
	    }, {
	        key: 'acceptStudent',
	        value: function acceptStudent(status, student, index) {
	            var data = {
	                status: status,
	                class_id: this.stateParams.classid,
	                user_id: student.user_id,
	                join_id: student.join_id
	            };
	            var self = this;
	            this.API.all('class/accept/' + self.rootScope.vc.id).post(data).then(function (response) {
	                if (response.errors == true) {
	                    self.toastr.error(response.data.message);
	                } else if (response.errors == false) {
	                    self.toastr.success(response.data.message);
	                }
	                if (status == 1) {
	                    self.scope.waitingStudent.splice(index, 1);
	                    self.rootScope.vc.vcuser.push(student);
	                } else if (status == 0) {
	                    self.scope.waitingStudent.splice(index, 1);
	                }
	                if (self.scope.waitingStudent.length == 0) {
	                    self.scope.noWaitingStudent = true;
	                }
	            });
	        }
	    }, {
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return VirtualclassStudentController;
	}();

	var VirtualclassStudentComponent = exports.VirtualclassStudentComponent = {
	    templateUrl: './views/app/components/virtualclass-student/virtualclass-student.component.html',
	    controller: VirtualclassStudentController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 145 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VirtualclassExamController = function () {
	  VirtualclassExamController.$inject = ["Post", "moment", "$stateParams", "$scope", "$rootScope", "ContextService", "API", "AclService", "$interval", "$uibModal", "$log", "Upload", "$timeout"];
	  function VirtualclassExamController(Post, moment, $stateParams, $scope, $rootScope, ContextService, API, AclService, $interval, $uibModal, $log, Upload, $timeout) {
	    'ngInject';

	    _classCallCheck(this, VirtualclassExamController);

	    var navSideBar = this;
	    this.stateParams = $stateParams;
	    if ($rootScope.newPost == undefined) $rootScope.newPost = new Object();
	    $rootScope.newPost.mytime = new Date();
	    $rootScope.newPost.mytime.setHours(0);
	    $rootScope.newPost.mytime.setMinutes(0);
	    angular.element('html').scrollTop(0);
	    $scope.hstep = 1;
	    $scope.mstep = 1;
	    this.$uibModal = $uibModal;
	    this.$log = $log;
	    this.$scope = $scope;
	    this.items = ['item1', 'item2', 'item3'];
	    $rootScope.dat = [];
	    this.file = [];
	    this.can = AclService.can;
	    $scope.post_enabled = true;
	    $scope.comment_enabled = true;
	    $scope.post_delete = true;
	    this.rootScope = $rootScope;
	    this.API = API;
	    this.interval = $interval;
	    this.uibModal = $uibModal;
	    this.log = $log;
	    this.timeout = $timeout;
	    $scope.logs = '';
	    this.scope = $scope;
	    this.$rootScope = $rootScope;
	    this.scope.moment = moment;
	    this.$rootScope.dat = [];
	    this.scope.files = [];
	    this.Upload = Upload;
	    this.logs = '';
	    this.addExam = false;
	    this.noExam = false;
	    this.$rootScope.newPost.mytime = $rootScope.newPost.mytime;
	    var timeout = $timeout;
	    this.rootScope.mobileHeader = false;
	    $scope.changed = function (mytime) {
	      this.$rootScope.newPost.mytime.setHours(mytime.getHours());
	      this.$rootScope.newPost.mytime.setMinutes(mytime.getMinutes());
	    };
	    this.scope = $scope;
	    this.Post = new Post.constructor($rootScope, this.API, $timeout, moment, Upload, $log);
	    var Post = this.Post;
	    this.Post.setSection('vc');
	    this.Post.seturl('class/get/' + $stateParams.classid + '/exam/all');
	    this.Post.setediturl('class/edit/' + $stateParams.classid + '/exam');
	    this.Post.setdeleteurl('class/delete/' + $stateParams.classid + '/exam');
	    this.Post.setsubmiturl('class/set/' + $stateParams.classid + '/exam');
	    this.Post.setCommentDeleteUrl('social/delete/vc/comment');
	    this.Post.setskip(0);
	    this.Post.settype('exam');
	    this.Post.settake(2);
	    this.Post.getPost().then(function (response) {
	      $scope.dat = Post.getPostat();
	      $scope.nopost = Post.getnopost();
	      $rootScope.busy = false;
	    });
	    this.Post.settake(5);
	    this.scope = $scope;
	    //this.scope.dat=this.Post.getPostat();
	    Date.prototype.yyyymmdd = function () {
	      var mm = this.getMonth() + 1; // getMonth() is zero-based
	      var dd = this.getDate();
	      return [this.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('-');
	    };

	    $scope.getPost = function () {
	      Post.getPost().then(function (response) {
	        $scope.dat = Post.getPostat();
	        $scope.nopost = Post.getnopost();
	        $rootScope.busy = false;
	        $scope.dat.map(function (item) {
	          item.exam_date = new Date(item.exam_date);
	          item.exam_time = new Date(item.exam_time);
	        });
	      });
	    };
	    $scope.deleteNode = function (node, deleteType) {
	      Post.deleteNode(node, deleteType, $scope.callback);
	      $scope.dat = Post.getPostat();
	    };
	    $scope.permission = function (post) {
	      return $rootScope.vc.permissions.class.indexOf(post) >= 0;
	    };
	    $scope.postPermission = function (permission, post, me) {
	      return $rootScope.vc.permissions.class.indexOf(permission) >= 0 && post == me || $rootScope.me.id == $rootScope.vc.instructor;
	    };
	    $scope.commentPermission = function (permission, comment, me, post) {
	      return $rootScope.vc.permissions.class.indexOf(permission) >= 0 && (comment == me || post == me) || $rootScope.me.id == $rootScope.vc.instructor;
	    };
	    $scope.submitComment = function ($id, $index, $body, place) {
	      Post.submitComment($id, $index, this, $body, 'exams');
	    };
	    $scope.updateData = function (data, id) {
	      data.exam_date = data.exam_date / 1000;
	      data.exam_time = data.exam_time / 1000;
	      Post.updateData(data, id);
	    };
	    $scope.correct = function (response, postat) {
	      $scope.dat = postat;
	      $scope.dat.map(function (item) {
	        item.exam_date = new Date(item.exam_date);
	        item.exam_time = new Date(item.exam_date);
	      });
	      $scope.callback();
	    };
	    $scope.callback = function () {
	      $scope.nopost = Post.getnopost();
	    };
	    $scope.addexam = function (form, self) {
	      if (form.$valid) {
	        // var date =  $rootScope.newPost.date;
	        //  var mytime =  $rootScope.newPost.mytime;
	        $rootScope.newPost.date.setHours($rootScope.newPost.mytime.getHours());
	        $rootScope.newPost.date.setMinutes($rootScope.newPost.mytime.getMinutes());
	        $rootScope.newPost.date = $rootScope.newPost.date / 1000;
	        $rootScope.newPost.mytime = $rootScope.newPost.mytime / 1000;
	        // $rootScope.newPost.mytime = $rootScope.newPost.mytime / 1000;
	        $rootScope.newPost['class_id'] = $stateParams.classid;
	        Post.NewNode($rootScope.newPost, $scope.correct, false, ' ');
	        form.$submitted = false;
	        self.modalOpen();
	        //  $scope.dat = Post.getPostat();
	      }
	    };
	    $scope.types = [{ value: 'first', text: 'الأول' }, { value: 'second', text: 'الثاني' }, { value: 'final', text: 'النهائي' }, { value: 'quiz', text: 'قصير' }, { value: 'mackup', text: 'تكميلي' }];
	  }

	  _createClass(VirtualclassExamController, [{
	    key: 'changed',
	    value: function changed(mytime) {
	      this.$rootScope.newPost.mytime.setHours(mytime.getHours());
	      this.$rootScope.newPost.mytime.setMinutes(mytime.getMinutes());
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      this.$rootScope.newPost.mytime.setFullYear(this.$rootScope.newPost.date.getFullYear());
	      this.$rootScope.newPost.mytime.setDate(this.$rootScope.newPost.date.getDate());
	      this.$rootScope.newPost.mytime.setMonth(this.$rootScope.newPost.date.getMonth());
	    }
	  }, {
	    key: 'editableForm',
	    value: function editableForm($data, $id) {
	      $data['id'] = $id;
	      var date = new Date();
	      date.setFullYear($data['exam_date'].getFullYear());
	      date.setDate($data['exam_date'].getDate());
	      date.setMonth($data['exam_date'].getMonth());
	      date.setHours($data['exam_time'].getHours() + 2);
	      date.setMinutes($data['exam_time'].getMinutes());
	      $data['exam_date'] = date;
	      console.log($data);
	      this.API.all('vc/editexam').post($data).then(function (response) {
	        //      this.scope.inf = response.data.user
	        //      this.scope.inf.country = response.data.user.student_info.country
	        //      var d = new Date(response.data.user.DOB)
	        // this.scope.inf.DOB= d;
	        // console.log(response)
	      }, function (response) {
	        //console.log("There was an error saving !! Not saved");
	      });
	    }
	  }, {
	    key: 'exam',
	    value: function exam(isValid, classid, _self) {
	      var _this = this;

	      if (isValid && (this.scope.mytime.getHours() != 0 || this.scope.mytime.getMinutes() != 0)) {
	        if (this.addExam == false) {
	          this.addExam = true;
	          var mynewexam = {
	            id: classid,
	            date: this.scope.mytime,
	            type: this.type,
	            hall: this.hall
	          };
	          this.API.all('vc/exam').post(mynewexam).then(function (response) {
	            console.log(_this.scope);
	            response.data.exam.exam_date = new Date(response.data.exam.exam_date);
	            response.data.exam.exam_time = new Date(response.data.exam.exam_date);
	            _this.$rootScope.dat.push(response.data.exam);
	            _this.date = false;

	            _self.scope.mytime.setHours(0);
	            _self.scope.mytime.setMinutes(0);
	            _self.scope.mytime = false;
	            _self.modalOpen();
	            _this.type = '';
	            _this.hall = '';
	            _this.noExam = false;
	            _this.examsubmit = false;
	          }, function (response) {
	            //console.log("There was an error in deleting");
	            $scope.post_delete = true;
	            _this.addExam = false;
	            // console.log($scope.post_delete);
	          });
	        }
	      } else {
	        this.examsubmit = true;
	      }
	    }
	  }, {
	    key: 'modalOpen',
	    value: function modalOpen(size) {
	      var $uibModal = this.$uibModal;
	      var $scope = this.$scope;
	      var $log = this.$log;
	      var _items = this.items;

	      var modalInstance = $uibModal.open({
	        animation: this.animationsEnabled,
	        templateUrl: 'examModal.html',
	        controller: this.modalcontroller,
	        controllerAs: 'mvm',
	        size: size,
	        resolve: {
	          items: function items() {
	            return _items;
	          }
	        }
	      });
	      modalInstance.result.then(function (selectedItem) {
	        $scope.selected = selectedItem;
	      }, function () {
	        $log.info('Modal dismissed at: ' + new Date());
	      });
	    }
	  }, {
	    key: 'modalcontroller',
	    value: ["$scope", "$uibModalInstance", "items", function modalcontroller($scope, $uibModalInstance, items) {
	      'ngInject';

	      this.items = items;

	      $scope.selected = {
	        item: items[0]
	      };

	      this.ok = function () {
	        $uibModalInstance.close($scope.selected.item);
	      };

	      this.cancel = function () {
	        $uibModalInstance.dismiss('cancel');
	      };
	    }]
	  }, {
	    key: 'toggleModalAnimation',
	    value: function toggleModalAnimation() {
	      this.animationsEnabled = !this.animationsEnabled;
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return VirtualclassExamController;
	}();

	var VirtualclassExamComponent = exports.VirtualclassExamComponent = {
	  templateUrl: './views/app/components/virtualclass-exam/virtualclass-exam.component.html',
	  controller: VirtualclassExamController,
	  controllerAs: 'vmex',
	  bindings: {}
	};

/***/ },
/* 146 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VirtualclassChatController = function () {
	    VirtualclassChatController.$inject = ["$stateParams", "$state", "chatMessages", "$rootScope", "$scope", "$crypto", "$firebaseArray", "moment"];
	    function VirtualclassChatController($stateParams, $state, chatMessages, $rootScope, $scope, $crypto, $firebaseArray, moment) {
	        'ngInject';

	        _classCallCheck(this, VirtualclassChatController);

	        var ctrl = this;
	        this.stateParams = $stateParams;
	        this.$state = $state;
	        this.$scope = $scope;
	        this.$scope.moment = moment;
	        this.$scope.$crypto = $crypto;
	        this.$rootScope = $rootScope;
	        this.$firebaseArray = $firebaseArray;
	        this.$rootScope.$firebaseArray = $firebaseArray;
	        this.$scope.from = 0;
	        this.$scope.to = 0;
	        this.$scope.chatLoader = false;
	        $scope.loadmore = false;
	        $scope.loaded = false;
	        this.$scope.mCount = 0;
	        this.$scope.roomName = '';
	        $scope.selected = -1;
	        var self = this;
	        self.$rootScope.pageTitle = "الرسائل";
	        angular.element('meta[name=Keywords]').attr('content', 'الرسائل,الرسائل ادزانس,Edzance Message');
	        angular.element('meta[name=Description]').attr('content', 'تواصل مع مدرسيك وزملائك , احصل على ملفاتك الدراسية و على تنبيهات امتحانات , شارك الطلاب الجامعيين آرائك ونقاشاتك .');
	        angular.element('html').scrollTop(0);
	        this.RoomNow = null;
	        this.$scope.hasRoom = 0;
	        $rootScope.$watch('messaging_enabled', function () {
	            if ($rootScope.messaging_enabled == true) {
	                self.$scope.messages_showed = true;
	                self.$scope.messages = [];
	                $rootScope.req.then(function (response) {
	                    self.RoomNow = $rootScope.vc.Fire_Base_Chat_Room_name;
	                    self.$rootScope.RoomNow = $rootScope.vc.Fire_Base_Chat_Room_name;
	                    chatMessages.getRoom(self.RoomNow, 10).then(function (Room) {
	                        // self.RoomNow = self.RoomNow;
	                        // var Room = values[1];
	                        Room.$loaded().then(function (x) {
	                            $scope.messages = x;
	                        });
	                        self.$scope.roomName = $rootScope.Rooms.$getRecord(self.RoomNow).display;
	                    });
	                });
	                $scope.addMessage = function (message, id) {
	                    self.$scope.first_limit++;
	                    chatMessages.addMessage($rootScope.me.id, $rootScope.me.name, message, self.RoomNow);
	                    self.$scope.mCount = self.$scope.mCount + 1;
	                };
	            }
	        });
	        $scope.infiniteScroll = function () {
	            return new Promise(function (success, error) {
	                if ($scope.loadmore != true) {
	                    $scope.loadmore = true;
	                    if (self.RoomNow) {
	                        var count = chatMessages.getMessageCount(self.RoomNow);
	                        $scope.from = $scope.from == 0 ? count - 10 : $scope.to;
	                        $scope.to = $scope.from <= 0 ? 0 : $scope.from - 10;
	                        if (count >= 10 && $scope.to != 0) {
	                            chatMessages.infiniteScroll(self.RoomNow, $scope.to, $scope.from - 1, true).then(function (moreMessages) {
	                                if (chatMessages.enabler) {
	                                    $scope.messages = moreMessages;
	                                }
	                                $scope.loadmore = false;
	                                success($scope.messages);
	                            });
	                        }
	                    }
	                }
	            });
	        };
	        $scope.deleteRoom = function () {
	            chatMessages.deleteRoom($rootScope.RoomNow, $scope.mCount, $scope.messages);
	            $scope.messages = [];
	        };
	    }

	    _createClass(VirtualclassChatController, [{
	        key: 'GetRoom',
	        value: function GetRoom($id, self, index, display) {
	            self.$scope.loadmore = false;
	            self.$scope.mCount = 0;
	            self.$scope.messages = [];
	            self.RoomNow = $id;
	            self.$scope.roomName = display;
	            var ref = firebase.database().ref().child('chat').child($id).child('data');
	            self.$scope.chatLoader = true;
	            if (self.$scope.chatLoader == true) {
	                self.$rootScope.chatMessages.getRoom($id, 10).then(function (Room) {
	                    self.$scope.messages.$loaded().then(function (x) {
	                        self.$scope.messages = Room;
	                        //angular.element('.lv-body').scrollTop(angular.element('.lv-body').prop('scrollHeight'));
	                    });
	                }).catch(function (Room) {});
	                ref.on('value', function (childSnapshot) {
	                    //angular.element('.lv-body').scrollTop(angular.element('.lv-body').prop('scrollHeight'));
	                });
	                ref.on('child_added', function (childSnapshot, prevChildKey) {
	                    //angular.element('.lv-body').scrollTop(angular.element('.lv-body').prop('scrollHeight'));
	                });
	                this.$scope.chatLoader = false;
	            }
	            var a = self.$rootScope.chatMessages.RoomUsers[$id];
	        }
	    }, {
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return VirtualclassChatController;
	}();

	var VirtualclassChatComponent = exports.VirtualclassChatComponent = {
	    templateUrl: './views/app/components/virtualclass-chat/virtualclass-chat.component.html',
	    controller: VirtualclassChatController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 147 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VirtualclassHomeworkController = function () {
	    VirtualclassHomeworkController.$inject = ["Post", "moment", "$stateParams", "$scope", "$rootScope", "ContextService", "API", "AclService", "$interval", "$uibModal", "$log", "Upload", "$timeout"];
	    function VirtualclassHomeworkController(Post, moment, $stateParams, $scope, $rootScope, ContextService, API, AclService, $interval, $uibModal, $log, Upload, $timeout) {
	        'ngInject';

	        _classCallCheck(this, VirtualclassHomeworkController);

	        var navSideBar = this;
	        this.$uibModal = $uibModal;
	        this.$log = $log;
	        this.$scope = $scope;
	        this.items = ['item1', 'item2', 'item3'];
	        $rootScope.dat = [];
	        this.stateParams = $stateParams;
	        this.file = [];
	        this.can = AclService.can;
	        $scope.user = [];
	        this.rootScope = $rootScope;
	        this.API = API;
	        this.interval = $interval;
	        this.uibModal = $uibModal;
	        angular.element('html').scrollTop(0);
	        this.log = $log;
	        this.timeout = $timeout;
	        $scope.logs = '';
	        this.scope = $scope;
	        this.scope.moment = moment;
	        this.scope.comment = [];
	        this.scope.nohome = false;
	        this.files = [];
	        this.Upload = Upload;
	        this.logs = '';
	        var timeout = $timeout;
	        // var _self = this ;
	        this.rootScope.mobileHeader = false;
	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	        var Post = this.Post;
	        this.Post.setSection('vc');
	        this.Post.seturl('class/get/' + $stateParams.classid + '/homeWork/all');
	        this.Post.setediturl('class/edit/' + $stateParams.classid + '/homeWork');
	        this.Post.setdeleteurl('class/delete/' + $stateParams.classid + '/homeWork');
	        //this.Post.setediturl('vc/edithomework');
	        this.Post.setsubmiturl('class/set/' + $stateParams.classid + '/homeWork');
	        this.Post.setuploadurl('api/me/upload-file/vc_homework_file');
	        this.Post.setCommentDeleteUrl('social/delete/vc/comment');
	        this.Post.setskip(0);
	        this.Post.settype('homework');
	        this.Post.settake(2);
	        this.Post.getPost().then(function (response) {
	            $scope.dat = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	            $rootScope.busy = false;
	        });
	        this.Post.settake(5);
	        this.scope = $scope;
	        //this.scope.dat = this.Post.getPostat();
	        var con = this;
	        $scope.getPost = function () {
	            Post.getPost().then(function (response) {
	                $scope.dat = Post.getPostat();
	                $scope.nopost = Post.getnopost();
	                $rootScope.busy = false;
	                $scope.dat.map(function (item) {
	                    item.handover = new Date(item.handover);
	                });
	            });
	        };
	        $scope.deleteNode = function (node, deleteType) {
	            Post.deleteNode(node, deleteType, $scope.callback);
	            $scope.dat = Post.getPostat();
	        };
	        $scope.permission = function (post) {
	            return $rootScope.vc.permissions.class.indexOf(post) >= 0;
	        };
	        $scope.postPermission = function (permission, post, me) {
	            return $rootScope.vc.permissions.class.indexOf(permission) >= 0 && post == me || $rootScope.me.id == $rootScope.vc.instructor;
	        };
	        $scope.commentPermission = function (permission, comment, me, post) {
	            return $rootScope.vc.permissions.class.indexOf(permission) >= 0 && (comment == me || post == me) || $rootScope.me.id == $rootScope.vc.instructor;
	        };
	        $scope.submitComment = function ($id, $index, $body, place) {
	            Post.submitComment($id, $index, this, $body, place);
	            this.comment[$id] = "";
	            if (this.comment2 != undefined) this.comment2[$id] = "";
	            $scope.dat = Post.getPostat();
	        };
	        $scope.updateData = function (data, id) {
	            data.handover = data.handover / 1000;
	            Post.updateData(data, id);
	        };
	        $scope.correct = function (response, postat, self) {
	            $scope.dat = Post.getPostat();
	            $scope.dat.map(function (item) {
	                item.handover = new Date(item.handover);
	            });
	            $scope.callback(self);
	        };
	        $scope.callback = function (self) {
	            $scope.nopost = Post.getnopost();
	        };
	        $scope.addfile = function (form, files, self) {
	            if (form.$valid) {
	                $rootScope.newPost['class_id'] = $stateParams.classid;
	                $rootScope.newPost['hw_date'] = $rootScope.newPost['hw_date'] / 1000;
	                Post.NewNode($rootScope.newPost, $scope.correct, true, files, self);
	                form.$submitted = false;
	                con.modalOpen();
	            }
	        };
	        $scope.type = [{
	            value: 'presentation',
	            text: 'عرض تقديمي'
	        }, {
	            value: 'homework',
	            text: 'واجب بيتي'
	        }, {
	            value: 'project',
	            text: 'مشروع'
	        }, {
	            value: 'report',
	            text: 'تقرير'
	        }, {
	            value: 'research',
	            text: 'بحث'
	        }];
	        // if ($rootScope.vc.length==0) {
	        // API.all('vc/class/' + $stateParams.classid).get('')
	        //     .then((response) => {
	        //         $rootScope.vc = response.data;
	        //         $scope.student = response.data.vcuser;
	        //     }, (response) => {
	        //         console.log('VirtualclassHomeworkController:' + response.data.errors.message["0"])
	        //     });
	    }

	    _createClass(VirtualclassHomeworkController, [{
	        key: 'modalOpen',
	        value: function modalOpen(size) {
	            var $uibModal = this.$uibModal;
	            var $scope = this.$scope;
	            var $log = this.$log;
	            var _items = this.items;

	            var modalInstance = $uibModal.open({
	                animation: this.animationsEnabled,
	                templateUrl: 'homeworkModal.html',
	                controller: this.modalcontroller,
	                controllerAs: 'mvm',
	                size: size,
	                resolve: {
	                    items: function items() {
	                        return _items;
	                    }
	                }
	            });

	            modalInstance.result.then(function (selectedItem) {
	                $scope.selected = selectedItem;
	            }, function () {
	                $log.info('Modal dismissed at: ' + new Date());
	            });
	        }
	    }, {
	        key: 'modalcontroller',
	        value: ["$scope", "$uibModalInstance", "items", function modalcontroller($scope, $uibModalInstance, items) {
	            'ngInject';

	            this.items = items;

	            $scope.selected = {
	                item: items[0]
	            };

	            this.ok = function () {
	                $uibModalInstance.close($scope.selected.item);
	            };

	            this.cancel = function () {
	                $uibModalInstance.dismiss('cancel');
	            };
	        }]
	    }, {
	        key: 'toggleModalAnimation',
	        value: function toggleModalAnimation() {
	            this.animationsEnabled = !this.animationsEnabled;
	        }
	    }, {
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return VirtualclassHomeworkController;
	}();

	var VirtualclassHomeworkComponent = exports.VirtualclassHomeworkComponent = {
	    templateUrl: './views/app/components/virtualclass-homework/virtualclass-homework.component.html',
	    controller: VirtualclassHomeworkController,
	    controllerAs: 'vchw',
	    bindings: {}
	};

/***/ },
/* 148 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VirtualclassFilesController = function () {
	    VirtualclassFilesController.$inject = ["Post", "moment", "$stateParams", "$scope", "$rootScope", "ContextService", "API", "$interval", "$uibModal", "$log", "Upload", "$timeout", "$document", "$state"];
	    function VirtualclassFilesController(Post, moment, $stateParams, $scope, $rootScope, ContextService, API, $interval, $uibModal, $log, Upload, $timeout, $document, $state) {
	        'ngInject';

	        _classCallCheck(this, VirtualclassFilesController);

	        angular.element('html').scrollTop(0);
	        this.$uibModal = $uibModal;
	        this.$log = $log;
	        this.$scope = $scope;
	        this.$state = $state;
	        this.items = ['item1', 'item2', 'item3'];
	        this.animationsEnabled = true;
	        $rootScope.dat = [];
	        $scope.uibModal = $uibModal;
	        this.rootScope = $rootScope;
	        this.API = API;
	        this.stateParams = $stateParams;
	        this.interval = $interval;
	        this.uibModal = $uibModal;
	        this.Upload = Upload;
	        this.log = $log;
	        this.timeout = $timeout;
	        $scope.logs = '';
	        this.scope = $scope;
	        this.scope.moment = moment;
	        this.scope.file = [];
	        this.Upload = Upload;
	        this.logs = '';
	        this.scope.hasFile = false;
	        var timeout = $timeout;
	        this.rootScope.mobileHeader = false;

	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	        var Post = this.Post;
	        this.Post.setSection('vc');
	        this.Post.seturl('class/get/' + $stateParams.classid + '/files/all');
	        this.Post.setediturl('class/edit/' + $stateParams.classid + '/files');
	        this.Post.setdeleteurl('class/delete/' + $stateParams.classid + '/files');
	        this.Post.setsubmiturl('class/set/' + $stateParams.classid + '/file');
	        this.Post.setuploadurl('api/me/upload-file/vc_file');
	        this.Post.setCommentDeleteUrl('social/delete/vc/comment');
	        this.Post.setskip(0);
	        this.Post.settype('file');
	        this.Post.settake(2);
	        this.Post.getPost().then(function (response) {
	            $scope.dat = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	            $rootScope.busy = false;
	        });
	        this.Post.settake(5);
	        this.scope = $scope;
	        //this.scope.dat = this.Post.getPostat();
	        var con = this;
	        $scope.getPost = function () {
	            Post.getPost().then(function (response) {
	                $scope.dat = Post.getPostat();
	                $scope.nopost = Post.getnopost();
	                $rootScope.busy = false;
	            });
	        };
	        $scope.exprissionUser = function () {
	            Post.getPost();
	            $scope.exprissions = Post.getExprissions();
	        };
	        $scope.deleteNode = function (node, deleteType) {
	            Post.deleteNode(node, deleteType, $scope.correct);
	            $scope.dat = Post.getPostat();
	        };
	        $scope.permission = function (post) {
	            return $rootScope.vc.permissions.class.indexOf(post) >= 0;
	        };
	        $scope.postPermission = function (permission, post, me) {
	            return $rootScope.vc.permissions.class.indexOf(permission) >= 0 && post == me || $rootScope.me.id == $rootScope.vc.instructor;
	        };
	        $scope.commentPermission = function (permission, comment, me, post) {
	            return $rootScope.vc.permissions.class.indexOf(permission) >= 0 && (comment == me || post == me) || $rootScope.me.id == $rootScope.vc.instructor;
	        };
	        $scope.submitComment = function ($id, $index, $body, place) {
	            Post.submitComment($id, $index, this, $body, place);
	            this.comment[$id] = "";
	            if (this.comment2 != undefined) this.comment2[$id] = "";
	            $scope.dat = Post.getPostat();
	        };
	        $scope.updateData = function (data, id) {
	            Post.updateData(data, id);
	        };
	        $scope.correct = function (response, postat, self) {
	            $scope.nopost = Post.getnopost();
	            $scope.dat = Post.getPostat();
	            //if(self){
	            //con.modalOpen();
	            //}
	        };
	        $scope.addfile = function (form, file, self) {
	            console.log(file);
	            if (form.$valid) {
	                $rootScope.newPost['class_id'] = $stateParams.classid;
	                Post.NewNode($rootScope.newPost, $scope.correct, true, file, self);
	                form.$submitted = false;
	                con.modalOpen();
	            }
	        };
	    }
	    // watch(file) {
	    //     this.upload(this.scope.file);
	    // }


	    _createClass(VirtualclassFilesController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }, {
	        key: 'modalOpen',
	        value: function modalOpen(size) {
	            var $uibModal = this.$uibModal;
	            var $scope = this.$scope;
	            var $log = this.$log;
	            var _items = this.items;
	            var modalInstance = $uibModal.open({
	                animation: true,
	                templateUrl: 'fileModal.html',
	                controller: this.modalcontroller,
	                controllerAs: 'mvm',
	                size: size,
	                resolve: {
	                    items: function items() {
	                        return _items;
	                    }
	                }
	            });

	            modalInstance.result.then(function (selectedItem) {
	                $scope.selected = selectedItem;
	            }, function () {
	                $log.info('Modal dismissed at: ' + new Date());
	            });
	        }
	    }, {
	        key: 'modalcontroller',
	        value: ["$scope", "$uibModalInstance", "items", function modalcontroller($scope, $uibModalInstance, items) {
	            'ngInject';

	            this.items = items;

	            $scope.selected = {
	                item: items[0]
	            };

	            this.ok = function () {
	                $uibModalInstance.close($scope.selected.item);
	            };

	            this.cancel = function () {
	                $uibModalInstance.dismiss('cancel');
	            };
	        }]
	    }, {
	        key: 'toggleModalAnimation',
	        value: function toggleModalAnimation() {
	            this.animationsEnabled = !this.animationsEnabled;
	        }
	    }, {
	        key: 'swalConfirm',
	        value: function swalConfirm() {
	            swal({
	                title: 'Are you sure?',
	                text: 'You will not be able to recover this imaginary file!',
	                type: 'warning',
	                showCancelButton: true,
	                confirmButtonColor: '#DD6B55',
	                confirmButtonText: 'Yes, delete it!',
	                closeOnConfirm: false
	            }, function () {
	                swal('Deleted!', 'Your imaginary file has been deleted.', 'success');
	            });
	        }
	    }, {
	        key: 'swalBasic',
	        value: function swalBasic() {
	            swal("Here's a message!", "It's pretty, isn't it?");
	        }
	    }, {
	        key: 'swalSuccess',
	        value: function swalSuccess() {
	            swal('Good job!', 'You clicked the button!', 'success');
	        }
	    }, {
	        key: 'swalDecide',
	        value: function swalDecide() {
	            swal({
	                title: 'Are you sure?',
	                text: 'You will not be able to recover this imaginary file!',
	                type: 'warning',
	                showCancelButton: true,
	                confirmButtonColor: '#DD6B55',
	                confirmButtonText: 'Yes, delete it!',
	                cancelButtonText: 'No, cancel plx!',
	                closeOnConfirm: false,
	                closeOnCancel: false
	            }, function (isConfirm) {
	                if (isConfirm) {
	                    swal('Deleted!', 'Your imaginary file has been deleted.', 'success');
	                } else {
	                    swal('Cancelled', 'Your imaginary file is safe :)', 'error');
	                }
	            });
	        }
	    }, {
	        key: 'swalImage',
	        value: function swalImage() {
	            swal({
	                title: 'Sweet!',
	                text: "Here's a custom image.",
	                imageUrl: '/img/avatar5.png'
	            });
	        }
	    }, {
	        key: 'swalHtmlMessage',
	        value: function swalHtmlMessage() {
	            swal({
	                title: 'HTML <small>Title</small>!',
	                text: 'A custom <span style="color:#F8BB86">html<span> message.',
	                html: true
	            });
	        }
	    }, {
	        key: 'swalAutoClose',
	        value: function swalAutoClose() {
	            swal({
	                title: 'Auto close alert!',
	                text: 'I will close in 2 seconds.',
	                timer: 2000,
	                showConfirmButton: false
	            });
	        }
	    }, {
	        key: 'swalPrompt',
	        value: function swalPrompt() {
	            swal({
	                title: 'An input!',
	                text: 'Write something interesting:',
	                type: 'input',
	                showCancelButton: true,
	                closeOnConfirm: false,
	                animation: 'slide-from-top',
	                inputPlaceholder: 'Write something'
	            }, function (inputValue) {
	                if (inputValue === false) return false;
	                if (inputValue === '') {
	                    swal.showInputError('You need to write something!');
	                    return false;
	                }
	                swal('Nice!', 'You wrote: ' + inputValue, 'success');
	            });
	        }
	    }, {
	        key: 'swalAjax',
	        value: function swalAjax() {
	            var API = this.API;

	            swal({
	                title: 'Ajax request example',
	                text: 'Submit to run ajax request',
	                type: 'info',
	                showCancelButton: true,
	                closeOnConfirm: false,
	                showLoaderOnConfirm: true
	            }, function () {
	                var UserData = API.service('me', API.all('users'));

	                UserData.one().get().then(function (response) {
	                    var userdata = response.plain();
	                    swal('Your Name is: ' + userdata.data.name);
	                });
	            });
	        }
	    }]);

	    return VirtualclassFilesController;
	}();

	var VirtualclassFilesComponent = exports.VirtualclassFilesComponent = {
	    templateUrl: './views/app/components/virtualclass-files/virtualclass-files.component.html',
	    controller: VirtualclassFilesController,
	    controllerAs: 'vcfl',
	    bindings: {}
	};

/***/ },
/* 149 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VirtualclassDiscussionController = function () {
	  VirtualclassDiscussionController.$inject = ["Post", "moment", "$state", "$sce", "$scope", "$stateParams", "$rootScope", "API", "$interval", "AclService", "$uibModal", "$log", "$timeout", "Upload", "$q"];
	  function VirtualclassDiscussionController(Post, moment, $state, $sce, $scope, $stateParams, $rootScope, API, $interval, AclService, $uibModal, $log, $timeout, Upload, $q) {
	    'ngInject';
	    //injection

	    _classCallCheck(this, VirtualclassDiscussionController);

	    var navHeader = this;
	    this.$state = $state;
	    this.scope = $scope;
	    this.stateParams = $stateParams;
	    this.rootScope = $rootScope;
	    this.API = API;
	    this.sce = $sce;
	    this.log = $log;
	    this.timeout = $timeout;
	    this.q = $q;
	    this.Upload = Upload;
	    this.scope.moment = moment;
	    this.can = AclService.can;
	    this.interval = $interval;
	    this.uibModal = $uibModal;
	    $rootScope.liveUrlFlag = false;
	    //initiation
	    $scope.post_enabled = true;
	    $scope.comment_enabled = true;
	    this.rootScope.mobileHeader = true;
	    //post initiation
	    this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	    var Post = this.Post;
	    this.Post.setSection('vc');
	    this.Post.seturl('class/get/' + this.stateParams.classid + '/post');
	    this.Post.setediturl('social/edit/vc/post');
	    this.Post.setskip(0);

	    this.Post.settype('post');
	    this.Post.setsubmiturl('class/set/' + this.stateParams.classid + '/post');
	    this.Post.setimageurl('class/set/' + this.stateParams.classid + '/post');
	    this.Post.setdeleteurl('social/delete/vc/post');
	    this.Post.setCommentDeleteUrl('social/delete/vc/comment');
	    // this.Post.setPostDeleteUrl('vc/delete-post');
	    this.Post.settake(2);
	    this.Post.getPost().then(function (response) {
	      $scope.dat = Post.getPostat();
	      $scope.nopost = Post.getnopost();
	      $rootScope.busy = false;
	    });
	    this.Post.settake(5);
	    this.scope = $scope;
	    this.scope.dat = this.Post.getPostat();
	    this.scope.post_enabled = true;
	    this.scope.comment_enabled = true;
	    this.scope.exprission = [];
	    this.scope.commentlimit = 2;
	    this.scope.happyexp = 0;
	    this.scope.normalexp = 0;
	    this.scope.sadexp = 0;
	    this.scope.files = [];
	    angular.element('html').scrollTop(0);
	    $scope.getPost = function () {
	      Post.getPost().then(function (response) {
	        $scope.dat = Post.getPostat();
	        $scope.nopost = Post.getnopost();
	        $rootScope.busy = false;
	      });
	    };
	    $scope.exprissionUser = function ($index, liker) {
	      // Post.getPost();
	      $rootScope.happyexp = 0;
	      $rootScope.normalexp = 0;
	      $rootScope.sadexp = 0;
	      Post.exprissionUser($index, liker);
	      $scope.exprissions = Post.getExprissions();
	      $timeout(function () {
	        $scope.exprissions = Post.getExprissions();
	      }, 1000);
	    };
	    $scope.exprission = function ($post, $exp) {
	      Post.exprission($post, $exp);
	      $scope.dat = Post.getPostat();
	    };
	    $scope.deleteNode = function (node, deleteType) {
	      Post.deleteNode(node, deleteType, $scope.callback);
	      $scope.dat = Post.getPostat();
	    };
	    $scope.permission = function (post) {
	      return $rootScope.vc.permissions.class.indexOf(post) >= 0;
	    };
	    $scope.postPermission = function (permission, post, me) {
	      return $rootScope.vc.permissions.class.indexOf(permission) >= 0 || post == me || $rootScope.me.id == $rootScope.vc.instructor;
	    };
	    $scope.commentPermission = function (permission, comment, me, post) {
	      return $rootScope.vc.permissions.class.indexOf(permission) >= 0 || comment == me || post == me || $rootScope.me.id == $rootScope.vc.instructor;
	    };
	    $scope.submitComment = function ($id, $index, $body, place) {
	      Post.submitComment($id, $index, this, $body, place);
	      this.comment[$id] = "";
	      if (this.comment2 != undefined) this.comment2[$id] = "";
	      $scope.dat = Post.getPostat();
	    };
	    $scope.updatepost = function (data, id, url) {
	      Post.updatepost(data, id, url);
	    };
	    $scope.updateData = function (data, id) {
	      Post.updateData(data, id);
	    };
	    $scope.submitPost = function (files) {
	      Post.submitPost(files, $stateParams.classid, this.textpost, $scope.callback);
	      $scope.resetSubmit(this);
	      $scope.dat = Post.getPostat();
	    };
	    $scope.callback = function () {
	      $scope.nopost = Post.getnopost();
	    };
	    $scope.resetSubmit = function (scope) {
	      angular.element(".image-readed").attr("ng-src", "");
	      angular.element(".image-readed").attr("src", "");
	      angular.element(".readed-con").attr("style", "display: none");
	      angular.element(".liveurl").attr("style", "display: none");
	      scope.files = '';
	      scope.textpost = '';
	      scope.live_title = '';
	      scope.live_description = '';
	      scope.live_url = '';
	      scope.live_image = '';
	      scope.media = '';
	      scope.closeUrl = false;
	    };
	    $scope.imageUpload = function (element, files) {
	      var reader = new FileReader();
	      reader.onload = $scope.imageIsLoaded;
	      reader.readAsDataURL(files);
	      angular.element(".readed-con").attr("style", "display: block");
	    };
	    $scope.imageIsLoaded = function (e) {
	      $scope.$apply(function () {
	        $scope.imagereaded = e.target.result;
	      });
	    };
	    $scope.removeImg = function () {
	      angular.element(".image-readed").attr("ng-src", "");
	      angular.element(".image-readed").attr("src", "");
	      angular.element(".readed-con").attr("style", "display: none");
	      this.files = '';
	    };
	    //end post initiation
	    var timeout = $timeout;

	    // if ($rootScope.vc == undefined) {
	    // API.all('vc/class/'+$stateParams.classid).get('')
	    //     .then((response) => {
	    //       $rootScope.vc= response.data;
	    //       $scope.student= response.data.vcuser;
	    //        // console.log($scope)
	    //     },(response) => {
	    //    if (response.data.errors.message["0"]=='you are not in this class') {
	    //        console.log('first done')
	    //        if(!($rootScope.vc)){
	    //         console.log('go to unauthorized')
	    //           this.$state.go('app.unauthorized')
	    //       }
	    //     }         $scope.student= response.data.vcuser;
	    //     });
	    // }else{
	    //   if ($rootScope.vc ) {
	    //   API.all('vc/class/'+$stateParams.classid).get('')
	    //       .then((response) => {
	    //         $rootScope.vc= response.data;
	    //         $scope.student= response.data.vcuser;
	    //          // console.log($scope)
	    //       },(response) => {
	    //       //console.log('VirtualclassDiscussionController:'+response.data.errors.message["0"]);
	    //       if (response.data.errors.message["0"]=='you are not in this class') {
	    //         if(!($rootScope.vc)){
	    //           console.log('go to unauthorized')
	    //             this.$state.go('app.unauthorized')
	    //         }
	    //       }
	    //      });
	    //   }}
	  }

	  _createClass(VirtualclassDiscussionController, [{
	    key: 'updatepost',
	    value: function updatepost(data, id) {
	      var dat = { data: data, id: id };
	      this.API.all('vc/update-post').post(dat).then(function (response) {});
	    }
	  }, {
	    key: 'autolink',
	    value: function autolink(str, attributes) {
	      attributes = attributes || {};
	      var attrs = "";
	      for (name in attributes) {
	        attrs += " " + name + '="' + attributes[name] + '"';
	      }var reg = new RegExp("(\\s?)((http|https|ftp)://[^\\s<]+[^\\s<\.)])", "gim");
	      str = str.toString().replace(reg, '$1<a href="$2">$2</a>');
	      this.vurl = str;
	      return str;
	    }
	  }, {
	    key: 'addhomework',
	    value: function addhomework(files, $timeout, logs, classid, _self) {
	      var file = files;
	      if (!file.$error) {
	        this.Upload.upload({
	          url: 'api/vc/uploadhw',
	          method: 'POST',
	          file: file,
	          data: {
	            id: _self.userData.id
	          }
	        }).then(function (resp) {
	          $timeout(function () {
	            console.log('timeout acativated :s');
	            console.log(resp.data.data);
	            var mynewhomework = {
	              class_id: _self.stateParams.classid,
	              id: _self.userData.id,
	              textpost: _self.textpost,
	              imgTag: _self.imgTag,
	              file: resp.data.data.return[0]
	            };
	            _self.API.all('vc/image').post(mynewhomework).then(function (response) {
	              _self.rootScope.dat.push(response.data.post);
	              // _self.scope.dat.push(response.data.post);
	            });
	          });
	        }, null, function (evt) {
	          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	          logs = 'progress: ' + progressPercentage + '% ' + evt.config.data.file.name + '\n';
	          console.log(logs);
	        });
	      }
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return VirtualclassDiscussionController;
	}();

	var VirtualclassDiscussionComponent = exports.VirtualclassDiscussionComponent = {
	  templateUrl: './views/app/components/virtualclass-discussion/virtualclass-discussion.component.html',
	  controller: VirtualclassDiscussionController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 150 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VirtualclassController = function () {
	    VirtualclassController.$inject = ["Post", "$stateParams", "$state", "$scope", "$rootScope", "ContextService", "API", "AclService"];
	    function VirtualclassController(Post, $stateParams, $state, $scope, $rootScope, ContextService, API, AclService) {
	        'ngInject';

	        var _this = this;

	        _classCallCheck(this, VirtualclassController);

	        this.Post = Post;
	        var navSideBar = this;
	        this.API = API;
	        this.rscope = $rootScope;
	        this.scope = $scope;
	        this.stateParams = $stateParams;
	        this.scope.$state = $state;
	        this.$state = $state;
	        this.rscope.prouser = [];
	        this.rscope.student = [];
	        this.userData = [];
	        this.counter = 0;
	        this.can = AclService.can;
	        this.rscope.mobileHeader = false;
	        this.Post.setSection('class');
	        this.scope.loader = 0;
	        $rootScope.req = API.all('class/get/' + $stateParams.classid).get('').then(function (response) {
	            if (response.data.access == false) {
	                _this.$state.go('app.unauthorized');
	            } else {
	                $scope.loader = 1;
	            }
	            $rootScope.vc = response.data;
	            $scope.student = response.data.vcuser;
	            _this.rscope.pageTitle = $rootScope.vc.name + ' | ' + $rootScope.vc.u_name;
	            angular.element('meta[name=Keywords]').attr('content', 'الصف الافتراضي' + $rootScope.vc.name + ',' + $rootScope.vc.u_name);
	            angular.element('meta[name=Description]').attr('content', '');
	        });
	    }

	    _createClass(VirtualclassController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return VirtualclassController;
	}();

	var VirtualclassComponent = exports.VirtualclassComponent = {
	    templateUrl: './views/app/components/virtualclass/virtualclass.component.html',
	    controller: VirtualclassController,
	    controllerAs: 'vc',
	    bindings: {}
	};

/***/ },
/* 151 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SuggestionsfriendsController = function () {
	  SuggestionsfriendsController.$inject = ["API", "Post", "$rootScope", "$timeout", "moment", "Upload", "$log", "$scope"];
	  function SuggestionsfriendsController(API, Post, $rootScope, $timeout, moment, Upload, $log, $scope) {
	    'ngInject';

	    _classCallCheck(this, SuggestionsfriendsController);

	    this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	    this.API = API;
	    var Post = this.Post;
	    this.Post.seturl('home/suggest-all');
	    this.Post.setediturl('me/post-update');
	    this.Post.settype('result');
	    this.Post.setskip(0);
	    this.Post.settake(6);
	    this.Post.getPost().then(function (response) {
	      $scope.dat = Post.getPostat();
	      $scope.nopost = Post.getnopost();
	      $rootScope.busy = false;
	    });
	    $scope.getPost = function () {
	      Post.getPost().then(function (response) {
	        $scope.dat = Post.getPostat();
	        $scope.nopost = Post.getnopost();
	        $rootScope.busy = false;
	      });
	    };
	    $scope.friendRequest = function (friendId, type) {
	      if (type == 'add') {
	        API.all('home/friend-request/' + friendId).post('').then(function (response) {
	          $rootScope.me.friend.push(friendId);
	        });
	      } else if (type == 'remove') {
	        API.all('home/friend-remove/' + friendId).post('').then(function (response) {
	          $rootScope.me.friend.splice(friendId, 1);
	        });
	      } else {
	        API.all('home/friend-response' + friendId + '/' + type).post('').then(function (response) {
	          if (type == 'accepted') {
	            $rootScope.me.friend.push(friendId);
	          }
	        });
	      }
	    };
	  }

	  _createClass(SuggestionsfriendsController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return SuggestionsfriendsController;
	}();

	var SuggestionsfriendsComponent = exports.SuggestionsfriendsComponent = {
	  templateUrl: './views/app/components/suggestionsfriends/suggestionsfriends.component.html',
	  controller: SuggestionsfriendsController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 152 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MessageController = function () {
	    MessageController.$inject = ["$stateParams", "$state", "chatMessages", "$rootScope", "$scope", "$crypto", "$firebaseArray", "moment"];
	    function MessageController($stateParams, $state, chatMessages, $rootScope, $scope, $crypto, $firebaseArray, moment) {
	        'ngInject';

	        _classCallCheck(this, MessageController);

	        this.$scope = $scope;
	        this.$scope.moment = moment;
	        this.$scope.$crypto = $crypto;
	        this.$rootScope = $rootScope;
	    }

	    _createClass(MessageController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return MessageController;
	}();

	var MessageComponent = exports.MessageComponent = {
	    templateUrl: './views/app/components/message/message.component.html',
	    controller: MessageController,
	    controllerAs: 'mc',
	    bindings: {}
	};

/***/ },
/* 153 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MyEnterController = function () {
	    function MyEnterController() {
	        'ngInject';

	        //

	        _classCallCheck(this, MyEnterController);
	    }

	    _createClass(MyEnterController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return MyEnterController;
	}();

	var MyEnterComponent = exports.MyEnterComponent = {
	    templateUrl: './views/app/components/my-enter/my-enter.component.html',
	    controller: MyEnterController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 154 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ProfileController = function () {
	    ProfileController.$inject = ["Post", "moment", "$state", "$timeout", "$stateParams", "$scope", "$rootScope", "API", "Upload", "screenSize"];
	    function ProfileController(Post, moment, $state, $timeout, $stateParams, $scope, $rootScope, API, Upload, screenSize) {
	        'ngInject';

	        var _this = this;

	        _classCallCheck(this, ProfileController);

	        var navSideBar = this;
	        var _self = this;
	        this.API = API;
	        this.scope = $scope;
	        this.$rootScope = $rootScope;
	        this.$timeout = $timeout;
	        this.stateParams = $stateParams;
	        $rootScope.prouser = [];
	        this.userData = [];
	        this.scope.Upload = Upload;
	        this.Upload = Upload;
	        $rootScope.itsme = false;
	        this.rscope = $rootScope;
	        this.counter = 0;
	        //crop flag
	        this.scope.showcrop = false;
	        this.scope.showcovercrop = false;
	        this.scope.myImage = '';
	        this.scope.myCoverImage = '';
	        this.scope.myCroppedImage = '';
	        this.scope.myCroppedCover = '';
	        this.scope.file = '';
	        this.scope.canenter = false;
	        this.Post = Post;
	        this.Post.setSection('profile');
	        API.all('profile/header/' + $stateParams.id).get('').then(function (response) {
	            if (response.data.message == 'not_exists_user') {
	                _this.rscope.pageTitle = 'إدزانس';
	                $state.go('app.otherwise');
	                _this.scope.canenter = false;
	            } else {
	                _this.rscope.prodata = response.data;
	                _this.rscope.pageTitle = _this.rscope.prodata.name + ' | إدزانس';
	                angular.element('meta[name=Description]').attr('content', _this.rscope.prodata.name + ' ' + _this.rscope.prodata.last_name + ' يدرس ' + _this.rscope.prodata.specialition + ' في جامعة ' + _this.rscope.prodata.university + ' - ' + _this.rscope.prodata.university_town);
	                angular.element('meta[name=Keywords]').attr('content', _this.rscope.prodata.name + ' ' + _this.rscope.prodata.last_name);
	                _this.scope.canenter = true;
	            }
	        }, function (response) {
	            _this.rscope.pageTitle = 'إدزانس';
	            $state.go('app.otherwise');
	            _this.scope.canenter = false;
	        });
	        this.$scope = $scope;
	        var handleFileSelect = function handleFileSelect(evt) {
	            $scope.showcrop = true;
	            var file = evt.currentTarget.files[0];
	            var reader = new FileReader();
	            reader.onload = function (evt) {
	                $scope.$apply(function ($scope) {
	                    $scope.myImage = evt.target.result;
	                });
	            };
	            reader.readAsDataURL(file);
	            this.scope = $scope;
	        };
	        angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);
	        //cover
	        $scope.myCoverImage = '';
	        $scope.myCroppedCover = '';
	        var handleCoverSelect = function handleCoverSelect(evt) {
	            $scope.showcovercrop = true;
	            var file = evt.currentTarget.files[0];
	            var reader = new FileReader();
	            reader.onload = function (evt) {
	                $scope.$apply(function ($scope) {
	                    $scope.myCoverImage = evt.target.result;
	                });
	            };
	            reader.readAsDataURL(file);
	        };
	        angular.element(document.querySelector('#coverInput')).on('change', handleCoverSelect);
	        //
	        $rootScope.scope = $scope;
	        this.rscope.sSize = true;
	        if (screenSize.is('xs, sm')) {
	            this.rscope.sSize = false;
	        }
	    }

	    _createClass(ProfileController, [{
	        key: 'changeavatar',
	        value: function changeavatar() {
	            var _this2 = this;

	            var data = {
	                string_file: this.scope.myCroppedImage,
	                id: this.scope.id
	            };
	            this.API.all('profile/changeavatar').post(data).then(function (response) {
	                location.reload();
	                _this2.scope.showcrop = false;
	            });
	        }
	    }, {
	        key: 'watch',
	        value: function watch(file) {
	            this.upload(this.scope.files);
	        }
	    }, {
	        key: 'watch',
	        value: function watch() {
	            if (this.scope.file != null) {
	                this.scope.files = [this.scope.file];
	            }
	        }
	        // upload(files, $timeout, $scope) {
	        //     this.Upload.upload({
	        //         url: 'api/me/upload-file/profile_cover',
	        //         method: 'POST',
	        //         file: files,
	        //         data: {
	        //             username: this.username,
	        //             file: files
	        //         }
	        //     }).then(function(resp, $scope) {
	        //     }, null, function(evt, $scope) {
	        //         var progressPercentage = parseInt(100.0 *
	        //             evt.loaded / evt.total);
	        //         logs = 'progress: ' + progressPercentage +
	        //             '% ' + evt.config.data.file.name + '\n';
	        //     });
	        // };

	    }, {
	        key: 'changecover',
	        value: function changecover() {
	            var _this3 = this;

	            var data = {
	                string_file: this.scope.myCroppedCover,
	                id: this.scope.id
	            };
	            this.API.all('profile/changecover').post(data).then(function (response) {
	                _this3.rscope.prodata.showcase = _this3.scope.myCroppedCover;
	                _this3.$rootScope.me.showcase = _this3.scope.myCroppedCover;
	                _this3.scope.showcovercrop = false;
	                _this3.scope.myCoverImage = '';
	            });
	        }
	    }, {
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return ProfileController;
	}();

	var ProfileComponent = exports.ProfileComponent = {
	    templateUrl: './views/app/components/profile/profile.component.html',
	    controller: ProfileController,
	    controllerAs: 'pro',
	    bindings: {}
	};

/***/ },
/* 155 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ProfileConnectionController = function () {
	    ProfileConnectionController.$inject = ["$scope", "$rootScope", "ContextService", "API", "$stateParams"];
	    function ProfileConnectionController($scope, $rootScope, ContextService, API, $stateParams) {
	        'ngInject';

	        _classCallCheck(this, ProfileConnectionController);

	        var navHeader = this;
	        this.scope = $scope;
	        this.$stateParams = $stateParams;
	        this.rootScope = $rootScope;
	        this.API = API;
	    }

	    _createClass(ProfileConnectionController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return ProfileConnectionController;
	}();

	var ProfileConnectionComponent = exports.ProfileConnectionComponent = {
	    templateUrl: './views/app/components/profile-connection/profile-connection.component.html',
	    controller: ProfileConnectionController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 156 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ProfilePhotoController = function () {
	    ProfilePhotoController.$inject = ["$scope", "$rootScope", "API", "$stateParams", "Post", "$timeout", "moment", "Upload", "$log"];
	    function ProfilePhotoController($scope, $rootScope, API, $stateParams, Post, $timeout, moment, Upload, $log) {
	        'ngInject';

	        _classCallCheck(this, ProfilePhotoController);

	        this.$scope = $scope;
	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	        var Post = this.Post;
	        this.Post.seturl('social/get/profile/post/' + $stateParams.id + '/image');
	        this.Post.setskip(0);
	        this.Post.settake(4);
	        angular.element('html').scrollTop(0);
	        this.Post.getPost().then(function (response) {
	            $scope.dat = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	            $rootScope.busy = false;
	        });
	        this.$scope = $scope;
	        //this.$scope.dat=this.Post.getPostat();
	        this.$scope = $scope;
	        $scope.getPost = function () {
	            Post.getPost().then(function (response) {
	                $scope.dat = Post.getPostat();
	                $scope.nopost = Post.getnopost();
	                $rootScope.busy = false;
	            });
	        };
	        $scope.callback = function () {
	            $scope.nopost = Post.getnopost();
	        };
	    }

	    _createClass(ProfilePhotoController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return ProfilePhotoController;
	}();

	var ProfilePhotoComponent = exports.ProfilePhotoComponent = {
	    templateUrl: './views/app/components/profile-photo/profile-photo.component.html',
	    controller: ProfilePhotoController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 157 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ProfileAboutController = function () {
	    ProfileAboutController.$inject = ["moment", "$stateParams", "$scope", "$rootScope", "API", "$http"];
	    function ProfileAboutController(moment, $stateParams, $scope, $rootScope, API, $http) {
	        'ngInject';

	        var _this = this;

	        _classCallCheck(this, ProfileAboutController);

	        var navSideBar = this;
	        this.API = API;
	        this.rscope = $rootScope;
	        this.scope = $scope;
	        this.scope.classes = [];
	        this.stateParams = $stateParams;
	        this.scope.unicountry = [];
	        this.scope.daysError = true;
	        this.scope.timeError = true;
	        this.API.all('profile/countries-list').get('').then(function (response) {
	            angular.element('html').scrollTop(0);
	            for (var i in response.data) {
	                $scope.unicountry.push({
	                    value: response.data[i].id,
	                    text: response.data[i].country_arabic
	                });
	            }
	        });
	        $scope.getInstitute = function (val, edu) {
	            var instype;
	            if (edu.grade == 'school' || edu.grade == 'secondery') {
	                instype = 2;
	            } else {
	                instype = 1;
	            }
	            return $http.get('../api/inst/search-institute/1/' + val).then(function (response) {
	                if (response.data.data != "no post") {
	                    var obj = response.data.data;
	                    return Object.keys(obj).map(function (key) {
	                        return { 'id': key, 'name': obj[key] };
	                    });
	                }
	            });
	        };
	        $scope.getSpecialty = function (val, instId) {
	            return $http.get('../api/inst/search-institute/' + instId + '/' + val).then(function (response) {
	                if (response.data.data != "no post") {
	                    var obj = response.data.data;
	                    return Object.keys(obj).map(function (key) {
	                        return { 'id': key, 'name': obj[key] };
	                    });
	                }
	            });
	        };
	        $scope.onInsSelect = function (item, key) {
	            $scope.dgreeuni[key].instId = item.id;
	            $scope.dgreeuni[key].instName = item.name;
	        };
	        $scope.shouldInsSelect = function (event, key) {
	            if ($scope.dgreeuni[key].instId != '') {
	                $scope.dgreeuni[key].instId = '';
	            }
	        };
	        $scope.onSpeSelect = function (item, key) {
	            $scope.dgreeuni[key].speId = item.id;
	            $scope.dgreeuni[key].speName = item.name;
	        };
	        $scope.shouldSpeSelect = function (event, key) {
	            if ($scope.dgreeuni[key].speId != '') {
	                $scope.dgreeuni[key].speId = '';
	            }
	        };
	        $scope.getCountry = function (id) {
	            var data = $scope.unicountry;
	            for (var x in data) {
	                if (data[x].value == id) {
	                    return data[x].text;
	                }
	            }
	        };
	        $scope.showGrade = function (data) {
	            switch (data) {
	                case "school":
	                    return "المرحله الاساسية";
	                    break;
	                case "secondery":
	                    return "المرحله الثانوية";
	                    break;
	                case "diploma":
	                    return "دبلوم";
	                    break;
	                case "bachelor":
	                    return "بكالوريوس";
	                    break;
	                case "master":
	                    return "ماجستر";
	                    break;
	                case "doctorate":
	                    return "دكتوراة";
	                    break;
	                case "assistant-professor":
	                    return "استاذ مساعد";
	                    break;
	                case "co-professor":
	                    return "استاذ مشارك";
	                    break;
	                case "Professor":
	                    return "بروفيسور";
	                    break;
	            }
	        };
	        $scope.showDays = function (data) {
	            switch (data) {
	                case "saturday":
	                    return "السبت";
	                    break;
	                case "sunday":
	                    return "الاحد";
	                    break;
	                case "monday":
	                    return "الاثنين";
	                    break;
	                case "tuesday":
	                    return "الثلاثاء";
	                    break;
	                case "wednesday":
	                    return "الاربعاء";
	                    break;
	                case "thursday":
	                    return "الخميس";
	                    break;
	                case "friday":
	                    return "الجمعة";
	                    break;
	            }
	        };
	        $scope.daysSelected = {
	            status: []
	        };
	        this.API.all('profile/cv/' + navSideBar.stateParams.id).get('').then(function (response) {
	            _this.date = response.data.DOB;
	            _this.scope.acctype = response.data.acctype;
	            response.data.DOB = new Date(_this.date);
	            _this.userData = response.data;
	            if (response.data.sex == 'male') response.data.sex = 'ذكر';
	            if (response.data.sex == 'female') response.data.sex = 'انثى';
	            $scope.university_ends = function () {
	                var e = [];
	                var d = new Date();
	                var n = d.getFullYear();
	                for (var i = n; i >= 1950; i--) {
	                    e.push({
	                        value: i,
	                        text: i
	                    });
	                }
	                return e;
	            };
	            $scope.university_end = $scope.university_ends();
	            // var t = this.date.split(/[- :]/);
	            var d = new Date(Date.UTC('01', '01', '1940'));
	            var date2 = new Date();
	            var day = 1000 * 3600 * 24;
	            var timeDiff = Math.abs(date2.getTime() - d.getTime());
	            var diffDays = Math.ceil(timeDiff / day);
	            var age = diffDays / 365;
	            var university_start = (date2.getTime() - (age * day * 365 - day * 365 * 18)) / 365 / day + 1940;
	            var school = (date2.getTime() - (age * day * 365 - day * 365 * 5)) / 365 / day + 1940;
	            var timeDiff = Math.abs(date2.getTime() - d.getTime());
	            _this.scope.student_info = {
	                user_id: response.data.id,
	                country: response.data.university_Country,
	                university_id: '',
	                school: Math.round(school),
	                university_start: university_start,
	                university_end: university_start + 4,
	                skills: '',
	                concerns: '',
	                hobbies: '',
	                languages: 'ar',
	                status: 1,
	                school_town: response.data.university_country,
	                school_end: Math.round(school + 13)

	            };
	            if (response.data.student_info == null) {
	                response.data.student_info = _this.scope.student_info;
	            }

	            var d = new Date(_this.date);
	            var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
	            // response.data.DOB=   d.getFullYear() + '-' + month + '-' + d.getDate() ; 
	            if (_this.date == null) {
	                response.data.DOB = new Date('1940/01/01');
	            }
	            _this.scope.inf = {
	                id: response.data.id,
	                name: response.data.name,
	                mid_name: response.data.mid_name,
	                last_name: response.data.last_name,
	                sex: response.data.sex,
	                DOB: response.data.DOB,
	                country: response.data.student_country
	            };
	            if (response.data.university_start == null) {
	                var uni_start = new Date('1940/01/01');
	            } else {
	                var uni_start = new Date(response.data.university_start);
	            }
	            if (response.data.university_end == null) {
	                var uni_end = new Date('1940/01/01');
	            } else {
	                var uni_end = new Date(response.data.university_end);
	            }
	            if (response.data.school_end == null) {
	                var school_end = new Date('1940/01/01');
	            } else {
	                var school_end = new Date(response.data.school_end);
	            }

	            _this.scope.uni = {
	                id: response.data.id,
	                university_name: response.data.university_name,
	                college_name: response.data.college_name,
	                specialition_name: response.data.specialition_name,
	                university_id: response.data.university_id,
	                university_start: uni_start.getFullYear(),
	                university_end: uni_end.getFullYear(),
	                university_country: response.data.university_country,
	                specialition_desc: response.data.specialition_desc
	            };
	            _this.scope.dgreeuni = response.data.instructor_education;
	            _this.scope.freehours = response.data.free_hours;
	            if (response.data.available_from != null) {
	                _this.scope.available_from = new Date(response.data.available_from);
	            }
	            if (response.data.available_to != null) {
	                _this.scope.available_to = new Date(response.data.available_to);
	            }
	            _this.scope.sec = {
	                id: response.data.id,
	                school: response.data.school,
	                school_town: response.data.school_town,
	                school_end: school_end
	            };
	            if (response.data.skills != null) {
	                var skills = response.data.skills.split(',');
	                var myskills = [];
	                skills.map(function (item, key) {
	                    myskills.push({
	                        text: item
	                    });
	                });
	            } else {
	                myskills = response.data.skills;
	            }
	            if (response.data.hobbies != null) {
	                var hobbies = response.data.hobbies.split(',');
	                var myhobbies = [];
	                hobbies.map(function (item, key) {
	                    myhobbies.push({
	                        text: item
	                    });
	                });
	            } else {
	                myhobbies = response.data.hobbies;
	            }
	            if (response.data.concerns != null) {
	                var concerns = response.data.concerns.split(',');
	                var myconcerns = [];
	                concerns.map(function (item, key) {
	                    myconcerns.push({
	                        text: item
	                    });
	                });
	            } else {
	                myconcerns = response.data.concerns;
	            }
	            if (response.data.languages != null) {
	                var languages = response.data.languages.split(',');
	                var mylanguages = [];
	                languages.map(function (item, key) {
	                    mylanguages.push({
	                        text: item
	                    });
	                });
	            } else {
	                mylanguages = response.data.languages;
	            }
	            _this.scope.other = {
	                id: response.data.id,
	                skills: myskills,
	                hobbies: myhobbies,
	                concerns: myconcerns,
	                languages: mylanguages
	            };
	            _this.scope.contact = {
	                id: response.data.id,
	                email: response.data.email,
	                telephone: response.data.telephone,
	                skype: response.data.skype,
	                twitter: response.data.twitter,
	                linkedin: response.data.linkedin,
	                facebook: response.data.facebook
	            };
	        });
	        this.scope.advdays = [{ id: 'saturday', text: 'السبت' }, { id: 'sunday', text: 'الاحد' }, { id: 'monday', text: 'الاثنين' }, { id: 'tuesday', text: 'الثلاثاء' }, { id: 'wednesday', text: 'الاربعاء' }, { id: 'thursday', text: 'الخميس' }, { id: 'friday', text: 'الجمعة' }];
	        this.sex = [{
	            value: 'ذكر',
	            text: 'ذكر'
	        }, {
	            value: 'انثى',
	            text: 'انثى'
	        }];
	        this.countries = [{
	            value: 'اردني',
	            text: 'اردني'
	        }, {
	            value: 'فلسطيني',
	            text: 'فلسطيني'
	        }, {
	            value: 'عراقي',
	            text: 'عراقي'
	        }, {
	            value: 'سوري',
	            text: 'سوري'
	        }, {
	            value: 'لبناني',
	            text: 'لبناني'
	        }, {
	            value: 'سعودي',
	            text: 'سعودي'
	        }, {
	            value: 'كويتي',
	            text: 'كويتي'
	        }, {
	            value: 'قطري',
	            text: 'قطري'
	        }, {
	            value: 'بحريني',
	            text: 'بحريني'
	        }, {
	            value: 'مصري',
	            text: 'مصري'
	        }, {
	            value: 'اماراتي',
	            text: 'اماراتي'
	        }, {
	            value: 'عماني',
	            text: 'عماني'
	        }, {
	            value: 'يمني',
	            text: 'يمني'
	        }, {
	            value: 'سوداني',
	            text: 'سوداني'
	        }, {
	            value: 'ليبي',
	            text: 'ليبي'
	        }, {
	            value: 'جزائري',
	            text: 'جزائري'
	        }, {
	            value: 'تونسي',
	            text: 'تونسي'
	        }, {
	            value: 'مغربي',
	            text: 'مغربي'
	        }, {
	            value: 'صومالي',
	            text: 'صومالي'
	        }, {
	            value: 'موريتاني',
	            text: 'موريتاني'
	        }, {
	            value: 'جيبوتي',
	            text: 'جيبوتي'
	        }];
	        this.scope.grade = [{
	            value: "school",
	            text: "المرحله الاساسية"
	        }, {
	            value: "secondery",
	            text: "المرحله الثانوية"
	        }, {
	            value: "diploma",
	            text: "دبلوم"
	        }, {
	            value: "bachelor",
	            text: "بكالوريوس"
	        }, {
	            value: "master",
	            text: "ماجستر"
	        }, {
	            value: "doctorate",
	            text: "دكتوراة"
	        }, {
	            value: "assistant-professor",
	            text: "استاذ مساعد"
	        }, {
	            value: "co-professor",
	            text: "استاذ مشارك"
	        }, {
	            value: "professor",
	            text: "بروفيسور"
	        }];
	    }

	    _createClass(ProfileAboutController, [{
	        key: 'editableForm',
	        value: function editableForm() {
	            var _this2 = this;

	            var endsex = '';
	            var bd;
	            if (this.scope.inf.sex == 'ذكر') endsex = 'male';
	            if (this.scope.inf.sex == 'انثى') endsex = 'female';
	            if (this.scope.inf.DOB == null) {
	                this.scope.inf.DOB = 1940;
	                bd = null;
	            } else if (this.scope.inf.DOB.getFullYear() == 1940) {
	                this.scope.inf.DOB = 1940;
	                bd = null;
	            } else {
	                bd = this.scope.inf.DOB;
	            }
	            //console.log(this.scope.inf.DOB);
	            var data = {
	                id: this.scope.inf.id,
	                country: this.scope.inf.country,
	                name: this.scope.inf.name,
	                DOB: bd,
	                sex: endsex,
	                last_name: this.scope.inf.last_name,
	                mid_name: this.scope.inf.mid_name
	            };
	            this.API.all('profile/inf').post(data).then(function (response) {
	                if (response.data.user.sex == 'male') response.data.user.sex = 'ذكر';
	                if (response.data.user.sex == 'female') response.data.user.sex = 'انثى';
	                var d = new Date(response.data.user.DOB);
	                _this2.rscope.prodata.name = _this2.scope.inf.name + ' ' + _this2.scope.inf.mid_name + ' ' + _this2.scope.inf.last_name;
	                _this2.scope.inf.DOB = d;
	            }, function (response) {});
	        }
	    }, {
	        key: 'UniversityInf',
	        value: function UniversityInf() {
	            var _this3 = this;

	            var data = {
	                school: this.scope.sec.school,
	                school_town: this.scope.sec.school_town,
	                school_end: this.scope.sec.school_end
	            };
	            this.API.all('profile/sec').post(data).then(function (response) {
	                //console.log(response.data.student_info.school_end); 
	                var d = new Date(response.data.student_info.school_end);
	                _this3.scope.sec.school_end = d;
	            }, function (response) {});
	        }
	    }, {
	        key: 'SocialForm',
	        value: function SocialForm() {
	            var data = {
	                university_name: this.scope.uni.university_name,
	                college_name: this.scope.uni.college_name,
	                specialition_name: this.scope.uni.specialition_name,
	                university_id: this.scope.uni.university_id,
	                university_start: this.scope.uni.university_start,
	                university_end: this.scope.uni.university_end,
	                university_country: this.scope.uni.university_country,
	                specialition_desc: this.scope.uni.specialition_desc
	            };
	            var self = this;
	            this.API.all('profile/uni').post(data).then(function (response) {
	                var university_start = new Date(response.data.student_info.university_start);
	                var university_end = new Date(response.data.student_info.university_end);
	                self.scope.uni.university_id = response.data.student_info.university_id;
	                self.scope.uni.specialition_desc = response.data.student_info.specialition_desc;
	                self.scope.uni.university_start = university_end_start;
	                self.scope.uni.university_end = university_end;
	            });
	        }
	    }, {
	        key: 'UnvForm',
	        value: function UnvForm() {
	            var _this4 = this;

	            var data = {
	                university_name: this.scope.uni.university_name,
	                college_name: this.scope.uni.college_name,
	                specialition_name: this.scope.uni.specialition_name,
	                university_id: this.scope.uni.university_id,
	                university_start: this.scope.uni.university_start,
	                university_end: this.scope.uni.university_end,
	                university_country: this.scope.uni.university_country,
	                specialition_desc: this.scope.uni.specialition_desc
	            };
	            this.API.all('profile/uni').post(data).then(function (response) {
	                var university_start = new Date(response.data.university_start);
	                var university_end = new Date(response.data.university_end);
	                _this4.scope.uni.university_id = response.data.university_id;
	                _this4.scope.uni.specialition_desc = response.data.specialition_desc;
	                _this4.scope.uni.university_start = university_end_start;
	                _this4.scope.uni.university_end = university_end;
	            }, function (response) {});
	        }
	    }, {
	        key: 'PublicInf',
	        value: function PublicInf() {
	            var myskills = [];
	            var myhobbies = [];
	            var myconcerns = [];
	            var mylanguages = [];
	            if (this.scope.other.skills != null) {
	                this.scope.other.skills.map(function (item, key) {
	                    myskills.push(item.text);
	                });
	                myskills = myskills.join(',');
	            } else {
	                myskills = this.scope.other.skills;
	            }
	            if (this.scope.other.hobbies != null) {
	                this.scope.other.hobbies.map(function (item, key) {
	                    myhobbies.push(item.text);
	                });
	                myhobbies = myhobbies.join(',');
	            } else {
	                myhobbies = this.scope.other.hobbies;
	            }
	            if (this.scope.other.concerns != null) {
	                this.scope.other.concerns.map(function (item, key) {
	                    myconcerns.push(item.text);
	                });
	                myconcerns = myconcerns.join(',');
	            } else {
	                myconcerns = this.scope.other.concerns;
	            }
	            if (this.scope.other.languages != null) {
	                this.scope.other.languages.map(function (item, key) {
	                    mylanguages.push(item.text);
	                });
	                mylanguages = mylanguages.join(',');
	            } else {
	                mylanguages = this.scope.other.languages;
	            }
	            var data = {
	                skills: myskills,
	                concerns: myconcerns,
	                hobbies: myhobbies,
	                languages: mylanguages
	            };
	            this.API.all('profile/other').post(data).then(function (response) {}, function (response) {});
	        }
	    }, {
	        key: 'ConnectionStatus',
	        value: function ConnectionStatus() {
	            var data = {
	                email: this.scope.contact.email,
	                telephone: this.scope.contact.telephone,
	                skype: this.scope.contact.skype,
	                twitter: this.scope.contact.twitter,
	                linkedin: this.scope.contact.linkedin,
	                facebook: this.scope.contact.facebook
	            };
	            this.API.all('profile/contact').post(data).then(function (response) {}, function (response) {});
	        }
	    }, {
	        key: 'getNumber',
	        value: function getNumber(num) {
	            return new Array(num).map(function (item, key) {
	                return item = {
	                    value: item,
	                    text: item
	                };
	            });
	        }
	    }, {
	        key: 'addGrade',
	        value: function addGrade(form) {
	            var data = {
	                id: '',
	                user_id: this.stateParams.id,
	                grade: 'school',
	                speId: '',
	                speName: '',
	                instId: '',
	                instName: '',
	                country_id: 14,
	                start_year: 2016,
	                end_year: 2017,
	                country_name: '',
	                open_edit: 1
	            };
	            this.scope.dgreeuni.push(data);
	        }
	    }, {
	        key: 'saveGrade',
	        value: function saveGrade(self, id) {
	            // console.log(self);
	            self['id'] = id;
	            if (id == '') {
	                this.API.all('profile/add-instructor-education').post(self).then(function (response) {});
	            } else {
	                this.API.all('profile/update-instructor-education').post(self).then(function (response) {});
	            }
	        }
	    }, {
	        key: 'removeGrade',
	        value: function removeGrade(index, id) {
	            var _this5 = this;

	            var data = {
	                'id': id
	            };
	            if (id == '') {
	                this.scope.dgreeuni.splice(index, 1);
	            } else {
	                this.API.all('profile/delete-instructor-education').post(data).then(function (response) {
	                    _this5.scope.dgreeuni.splice(index, 1);
	                });
	            }
	        }
	    }, {
	        key: 'closeGrade',
	        value: function closeGrade() {
	            for (var i in this.scope.dgreeuni) {
	                if (this.scope.dgreeuni[i].id == '') {
	                    this.scope.dgreeuni.splice(i, 1);
	                }
	            }
	        }
	    }, {
	        key: 'avaTime',
	        value: function avaTime(from, to, data, index) {
	            if (data.length == 0) {
	                this.scope.daysError = true;
	                this.scope.freehours.splice(index, 1);
	            } else if (from == undefined || to == undefined) {
	                this.scope.timeError = true;
	                this.scope.freehours.splice(index, 1);
	            } else {
	                this.scope.daysError = false;
	                this.scope.timeError = false;
	                var days = [];
	                for (var i in data) {
	                    days[i] = data[i].id;
	                }
	                // var fromhours = from.getHours();
	                // var fromminutes = from.getMinutes();
	                // //var fromAmpm = fromhours >= 12 ? 'pm' : 'am';
	                // //fromhours = fromhours % 12; 
	                // fromhours = fromhours ? fromhours : 12;
	                // fromhours = fromhours < 10 ? '0' + fromhours : fromhours;
	                // fromminutes = fromminutes < 10 ? '0' + fromminutes : fromminutes;
	                // var ftime = fromhours + ':' + fromminutes + ':00';
	                // var fromTime = to.getFullYear() + "-" + to.getMonth() + "-" + to.getDate() + " " + ftime;

	                // var tohours = to.getHours();
	                // var tominutes = to.getMinutes();
	                // //var toAmpm = tohours >= 12 ? 'pm' : 'am';
	                // //tohours = tohours % 12;
	                // tohours = tohours ? tohours : 12;
	                // tohours = tohours < 10 ? '0' + tohours : tohours;
	                // tominutes = tominutes < 10 ? '0' + tominutes : tominutes;
	                // var ttime = tohours + ':' + tominutes + ':00';
	                // var toTime = to.getFullYear() + "-" + to.getMonth() + "-" + to.getDate() +" " + ttime;

	                //var fromd = new Date(fromTime);
	                //var tod = new Date(toTime);

	                var time = {
	                    days: days,
	                    from_hour: from / 1000,
	                    to_hour: to / 1000
	                };
	                self = this;
	                this.API.all('profile/add-instructor-free-Hours').post(time).then(function (response) {
	                    time.id = response.data.id;
	                    self.scope.freehours[index] = time;
	                });
	            }
	        }
	    }, {
	        key: 'toDate',
	        value: function toDate($date) {
	            var a = new Date($date);
	            var datehours = a.getHours();
	            var dateMinutes = a.getMinutes();
	            var dateAmpm = datehours >= 12 ? 'pm' : 'am';
	            datehours = datehours % 12;
	            datehours = datehours == 0 ? 12 : datehours;

	            return datehours + ':' + dateMinutes + ' ' + dateAmpm;
	        }
	    }, {
	        key: 'from_changed',
	        value: function from_changed(from) {
	            this.scope.available_from.setHours(from.getHours());
	            this.scope.available_from.setMinutes(from.getMinutes());
	        }
	    }, {
	        key: 'getFrom',
	        value: function getFrom() {
	            return this.scope.available_from;
	        }
	    }, {
	        key: 'to_changed',
	        value: function to_changed(to) {
	            this.scope.available_to.setHours(to.getHours());
	            this.scope.available_to.setMinutes(to.getMinutes());
	        }
	    }, {
	        key: 'addTime',
	        value: function addTime(form) {
	            var data = {
	                id: '',
	                from_hour: '',
	                to_hour: '',
	                days: [],
	                edit_hour: 1
	            };
	            this.scope.freehours.push(data);
	        }
	    }, {
	        key: 'removeTime',
	        value: function removeTime(index, id) {
	            var _this6 = this;

	            var data = {
	                'id': id
	            };
	            if (id == '') {
	                this.scope.freehours.splice(index, 1);
	            } else {
	                this.API.all('profile/delete-free-hours').post(data).then(function (response) {
	                    _this6.scope.freehours.splice(index, 1);
	                });
	            }
	        }
	    }, {
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return ProfileAboutController;
	}();

	var ProfileAboutComponent = exports.ProfileAboutComponent = {
	    templateUrl: './views/app/components/profile-about/profile-about.component.html',
	    controller: ProfileAboutController,
	    controllerAs: 'proab',
	    bindings: {}
	};

/***/ },
/* 158 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ProfileTimelineController = function () {
	  ProfileTimelineController.$inject = ["moment", "$scope", "$stateParams", "$rootScope", "ContextService", "API", "$state", "Post", "$timeout", "Upload", "$log"];
	  function ProfileTimelineController(moment, $scope, $stateParams, $rootScope, ContextService, API, $state, Post, $timeout, Upload, $log) {
	    'ngInject';

	    var _this = this;

	    _classCallCheck(this, ProfileTimelineController);

	    this.rootScope = $rootScope;
	    this.scope = $scope;
	    this.scope.moment = moment;
	    this.stateParams = $stateParams;
	    angular.element('html').scrollTop(0);
	    $rootScope.liveUrlFlag = false;
	    this.API = API;
	    this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	    var Post = this.Post;
	    this.Post.seturl('profile/post/' + this.stateParams.id);
	    this.Post.setediturl('social/edit/profile/post');
	    this.Post.setskip(0);
	    this.Post.settype('post');
	    this.Post.setSection('home');
	    this.Post.setsubmiturl('social/set/home/post');
	    this.Post.setimageurl('social/set/home/post');
	    this.Post.setdeleteurl('social/delete/profile/post');
	    this.Post.setCommentDeleteUrl('social/delete/vc/comment');
	    this.Post.settake(2);
	    this.Post.getPost().then(function (response) {
	      $scope.dat = Post.getPostat();
	      $scope.nopost = Post.getnopost();
	      $rootScope.busy = false;
	    });
	    this.Post.settake(5);
	    this.scope = $scope;
	    this.scope = $scope;
	    this.scope.post_enabled = true;
	    this.scope.comment_enabled = true;
	    this.scope.commentlimit = 2;
	    this.scope.files = [];

	    $scope.getPost = function () {
	      Post.getPost().then(function (response) {
	        $scope.dat = Post.getPostat();
	        $scope.nopost = Post.getnopost();
	        $rootScope.busy = false;
	      });
	    };
	    $scope.exprissionUser = function ($index, liker) {
	      // Post.getPost();
	      $rootScope.happyexp = 0;
	      $rootScope.normalexp = 0;
	      $rootScope.sadexp = 0;
	      Post.exprissionUser($index, liker);
	      $scope.exprissions = Post.getExprissions();
	      $timeout(function () {
	        $scope.exprissions = Post.getExprissions();
	      }, 1000);
	    };
	    $scope.exprission = function ($post, $exp) {
	      Post.exprission($post, $exp);
	      $scope.dat = Post.getPostat();
	    };
	    $scope.deleteNode = function (node, deleteType) {
	      Post.deleteNode(node, deleteType, $scope.callback);
	      $scope.dat = Post.getPostat();
	      console.log($scope.exprissions);
	    };
	    $scope.permission = function (post) {
	      return $rootScope.me.permission.social.indexOf(post) >= 0;
	    };
	    $scope.postPermission = function (permission, post, me) {
	      return $rootScope.me.permission.social.indexOf(permission) >= 0 && post == me;
	    };
	    $scope.commentPermission = function (permission, comment, me, post) {
	      return $rootScope.me.permission.social.indexOf(permission) >= 0 && (comment == me || post == me);
	    };
	    $scope.submitComment = function ($id, $index, $body, place) {
	      Post.submitComment($id, $index, this, $body, place);
	      this.comment[$id] = "";
	      if (this.comment2 != undefined) this.comment2[$id] = "";
	      $scope.dat = Post.getPostat();
	    };
	    $scope.updateData = function (data, id) {
	      Post.updateData(data, id);
	    };
	    $scope.submitPost = function (files) {
	      Post.submitPost(files, $stateParams.classid, this.textpost, $scope.callback);
	      $scope.resetSubmit(this);
	      $scope.dat = Post.getPostat();
	    };
	    $scope.callback = function () {
	      $scope.nopost = Post.getnopost();
	    };
	    $scope.resetSubmit = function (scope) {
	      angular.element(".image-readed").attr("ng-src", "");
	      angular.element(".image-readed").attr("src", "");
	      angular.element(".readed-con").attr("style", "display: none");
	      scope.files = '';
	      scope.textpost = '';
	      scope.live_title = '';
	      scope.live_description = '';
	      scope.live_url = '';
	      scope.live_image = '';
	      scope.media = '';
	      scope.showlive = 0;
	      scope.closeUrl = false;
	    };
	    $scope.imageUpload = function (element, files) {
	      var reader = new FileReader();
	      reader.onload = $scope.imageIsLoaded;
	      reader.readAsDataURL(files);
	      angular.element(".readed-con").attr("style", "display: block");
	    };
	    $scope.imageIsLoaded = function (e) {
	      $scope.$apply(function () {
	        $scope.imagereaded = e.target.result;
	      });
	    };
	    $scope.removeImg = function () {
	      angular.element(".image-readed").attr("ng-src", "");
	      angular.element(".image-readed").attr("src", "");
	      angular.element(".readed-con").attr("style", "display: none");
	      this.files = '';
	    };
	    this.API.all('profile/wall/' + this.stateParams.id).get('').then(function (response) {
	      _this.scope.timeline = response.data;
	      if (response.data.sex == 'male') response.data.sex = 'ذكر';
	      if (response.data.sex == 'female') response.data.sex = 'انثى';
	    });
	    this.scope.me = $rootScope.me;
	  }

	  _createClass(ProfileTimelineController, [{
	    key: 'yvideo',
	    value: function yvideo(url) {
	      this.scope.yurl = url;
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return ProfileTimelineController;
	}();

	var ProfileTimelineComponent = exports.ProfileTimelineComponent = {
	  templateUrl: './views/app/components/profile-timeline/profile-timeline.component.html',
	  controller: ProfileTimelineController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 159 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LogHeadController = function () {
	  LogHeadController.$inject = ["$http", "AclService", "API", "$auth", "$stateParams", "$rootScope", "$scope", "$state", "screenSize"];
	  function LogHeadController($http, AclService, API, $auth, $stateParams, $rootScope, $scope, $state, screenSize) {
	    'ngInject';

	    _classCallCheck(this, LogHeadController);

	    this.scope = $scope;
	    this.$state = $state;
	    this.rootScope = $rootScope;
	    this.$auth = $auth;
	    this.API = API;
	    this.$stateParams = $stateParams;
	    this.AclService = AclService;

	    $rootScope.mobile = screenSize.on('xs', function (match) {
	      $rootScope.mobile = match;
	    });
	    $scope.desktop = screenSize.on('sm, md, lg', function (match) {
	      $scope.desktop = match;
	    });
	  }

	  _createClass(LogHeadController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }, {
	    key: 'login',
	    value: function login(isValid, _self) {
	      var _this = this;

	      if (isValid) {
	        this.loginfailed = false;
	        this.unverified = false;

	        var user = {
	          email: this.logemail,
	          password: this.logpassword
	        };
	        this.$auth.login(user).then(function (response) {
	          var data = response.data.data;
	          var AclService = _this.AclService;
	          angular.forEach(data.userRole, function (value) {
	            AclService.attachRole(value);
	          });
	          AclService.setAbilities(data.abilities);
	          _this.$auth.setToken(response.data);
	          if (response.data.data.dataleak == true) {
	            var user = {
	              email: _self.logemail,
	              password: _self.logpassword
	            };
	            console.log(user);
	            _this.$state.go('logins.university-information', { id: response.data.data.user.id, user: response.data.data.user, email: _this.logemail, password: _this.logpassword });
	          } else {
	            window.location.href = "/";
	          }
	        }).catch(this.failedLogin.bind(this));
	      } else {
	        this.logSubmitted = true;
	        console.log(this);
	      }
	    }
	  }, {
	    key: 'failedLogin',
	    value: function failedLogin(res) {
	      if (res.status == 401) {
	        this.loginfailed = true;
	      } else {
	        if (res.data.errors.message[0] == 'Email Unverified') {
	          this.unverified = true;
	        }
	      }
	    }
	  }]);

	  return LogHeadController;
	}();

	var LogHeadComponent = exports.LogHeadComponent = {
	  templateUrl: './views/app/components/log-head/log-head.component.html',
	  controller: LogHeadController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 160 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FootController = function () {
	    function FootController() {
	        'ngInject';

	        //

	        _classCallCheck(this, FootController);
	    }

	    _createClass(FootController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return FootController;
	}();

	var FootComponent = exports.FootComponent = {
	    templateUrl: './views/app/components/foot/foot.component.html',
	    controller: FootController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 161 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NotificationController = function () {
	    function NotificationController() {
	        'ngInject';

	        //

	        _classCallCheck(this, NotificationController);
	    }

	    _createClass(NotificationController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return NotificationController;
	}();

	var NotificationComponent = exports.NotificationComponent = {
	    templateUrl: './views/app/components/notification/notification.component.html',
	    controller: NotificationController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 162 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NavController = function () {
	  NavController.$inject = ["$scope", "$http", "$rootScope", "ContextService", "API", "$timeout", "$state", "$sce", "toastr", "$stateParams", "Post", "Upload", "moment", "$log", "$interval", "screenSize"];
	  function NavController($scope, $http, $rootScope, ContextService, API, $timeout, $state, $sce, toastr, $stateParams, Post, Upload, moment, $log, $interval, screenSize) {
	    'ngInject';

	    _classCallCheck(this, NavController);

	    this.API = API;
	    this.$rootScope = $rootScope;
	    this.$rootScope.user = [];
	    this.$state = $state;
	    this.$scope = $scope;
	    this.$scope.moment = moment;
	    $rootScope.progressPercentage = 0;
	    $rootScope.flags = {
	      post: {
	        show_loadmore: true,
	        busy: false,
	        addpost_counter: 0,
	        nopost: 2
	      }
	    };
	    $rootScope.not = [];
	    $rootScope.exprission = [];
	    $rootScope.skip = 2;
	    $rootScope.take = 5;
	    $rootScope.nopost = 2;
	    $rootScope.addpost_counter = 0;
	    $rootScope.postindex = [];
	    $rootScope.commentlimit = 2;
	    $rootScope.busy = false;
	    $rootScope.notificationBusy = false;
	    $rootScope.happyexp = 0;
	    $rootScope.normalexp = 0;
	    $rootScope.sadexp = 0;
	    var navHeader = this;
	    ContextService.me(function (data) {
	      navHeader.userData = data;
	    });
	    // $rootScope.liveUrlFlag = false
	    //$rootScope.verifyEmailFlag = false 
	    $rootScope.meFlag = false;
	    $scope.a = [];

	    $scope.mobile = screenSize.on('xs', function (match) {
	      $scope.mobile = match;
	    });
	    $scope.getLocation = function (val) {
	      return $http.get('../api/search/' + val).then(function (response) {
	        if (response.data.data != "no post") {
	          return response.data.data.map(function (item) {
	            return item;
	          });
	        }
	      });
	    };
	    $scope.search = function (val) {
	      console.clear();
	      console.log($scope.a);
	      $scope.searching = true;
	      API.all('search/' + val).get('').then(function (response) {
	        $scope.a = [];
	        $scope.a = response.data;
	        console.log($scope.a);
	        $timeout(function () {}, 1000);
	        $scope.showResult = true;
	        $scope.searching = false;
	        // $scope.$digest();
	      });
	    };
	    $scope.goToSearch = function (val) {
	      $state.go('app.search', { value: val });
	    };
	    $scope.GoToUser = function (val) {
	      $state.go('app.profile.timeline', { id: val });
	    };
	    $rootScope.trustSrc = function (src) {
	      return $sce.trustAsResourceUrl(src);
	    };
	    $rootScope.youtubevideo = function (src) {
	      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=|\?lp-)([^#\&\?]*).*/;
	      var match = src.match(regExp);
	      var url = 'https://www.youtube.com/embed/' + match[2];
	      return $sce.trustAsResourceUrl(url);
	    };
	    // ** Friend function **//
	    $rootScope.follow = function ($friend, $update, $idx, $scope) {
	      API.all('home/friend/' + $friend + '/' + $update).post('').then(function (response) {});
	    };
	    // $rootScope.friendRequest = function(friendId,type){
	    //   if(type == 'add'){
	    //     API.all('home/friend-request/'+ friendId ).post('').then((response) => {
	    //       $rootScope.me.friend.push(friendId);
	    //     });
	    //   } else if(type == 'remove'){
	    //     API.all('home/friend-remove/'+ friendId).post('').then((response) => {
	    //       $rootScope.me.friend.splice(friendId,1);
	    //     });
	    //   } else {
	    //     API.all('home/friend-response'+ friendId +'/'+ type ).post('').then((response) => {
	    //       if(type == 'accepted'){
	    //         $rootScope.me.friend.push(friendId);
	    //       }
	    //     });
	    //   }
	    // };
	    // ** End Friend Function **//
	    $scope.cnsl = function ($log) {
	      console.log($log);
	      return true;
	    };
	    $rootScope.findpost = function (post) {
	      return post.id === $rootScope.deleteindex;
	    };
	    $rootScope.postText = function () {
	      angular.element(".post-text").removeClass("hidden-element");
	      angular.element(".post-img1").addClass("hidden-element");
	    };
	    $rootScope.addImage = function () {
	      angular.element(".post-text").addClass("hidden-element");
	      angular.element(".post-img1").removeClass("hidden-element");
	    };
	    $rootScope.resendVerification = function () {
	      API.all('misc/remail').get('').then(function (response) {
	        if (response.data.sucess == true) {
	          toastr.success(response.data.result);
	        } else {
	          toastr.error(response.data.result);
	        }
	      }, function (response) {});
	    };
	    $rootScope.changeEmail = function (email, form) {
	      if (form.$valid) {
	        var data = {
	          email: email
	        };
	        API.all('misc/change-mail').post(data).then(function (response) {
	          if (response.data.sucess == true) {
	            toastr.success(response.data.result);
	            $rootScope.me.email = email;
	            $rootScope.newEmail = '';
	            $rootScope.verifyEmailFlag = true;
	          } else {
	            toastr.error(response.data.result);
	            $rootScope.verifyEmailFlag = true;
	          }
	          form.$submitted = false;
	        }, function (response) {});
	      }
	    };
	    $scope.seenNotifications = function () {
	      angular.element('.lv-body').scrollTop(0);
	      if ($rootScope.me.un_seen_notifications != 0) {
	        API.all('misc/seen-notifications').post('').then(function (response) {
	          $rootScope.me.un_seen_notifications = 0;
	        });
	      }
	    };
	    $scope.sendTokenToServer = function () {
	      API.all('misc/reset-notifications-token').post('').then(function (response) {});
	    };
	    $scope.goToLink = function (link) {
	      window.location.href = link;
	    };
	    $scope.sendToken = function () {
	      var data = {
	        token: $rootScope.token,
	        platform: 'web'
	      };
	      API.all('misc/reset-notifications-token').post(data).then(function (response) {});
	    };
	    $scope.notFlag = 0;
	    this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	    var Post = this.Post;
	    this.Post.seturl('misc/user-notifications');
	    this.Post.setnotificationSkip(0);
	    this.Post.setnotificationTake(10);
	    this.Post.getNotification();
	    this.Post.getNotification().then(function (response) {
	      $scope.not = Post.getNotifications();
	      $scope.noNotification = Post.getnonotification();
	    });
	    $scope.getNotification = function () {
	      Post.getNotification();
	      $scope.not = Post.getNotifications();
	      $scope.noNotification = Post.getnonotification();
	    };
	    $scope.hasToken = 0;
	    var messaging = firebase.messaging();
	    messaging.requestPermission().then(function () {
	      return messaging.getToken();
	    }).then(function (Token) {
	      $scope.hasToken = 1;
	      $rootScope.token = Token;
	      $scope.sendToken();
	    }).catch(function (err) {
	      $scope.hasToken = 2;
	    });
	    $scope.$watch('hasToken', function (event) {
	      if ($scope.hasToken == 2) {
	        API.all('home/check-unseen-notifications').get('').then(function (response) {});
	      }
	    });
	    var h = true;
	    var interval = $interval(function () {
	      if ($scope.hasToken == 1) {
	        $interval.cancel(interval);
	      } else {
	        angular.element(window).focus(function () {
	          h = true;
	        });
	        angular.element(window).blur(function () {
	          h = false;
	        });
	        var data = {
	          count: $rootScope.me.un_seen_notifications
	        };
	        if (h == true) {
	          API.all('home/check-unseen-notifications').post(data).then(function (response) {
	            if ($rootScope.me.un_seen_notifications < response.data.unseen) {
	              $rootScope.me.un_seen_notifications = response.data.unseen;
	              angular.forEach(response.data.notifications, function (value, key) {
	                $scope.not.push(value);
	                toastr.info('<a href="' + value.link + '">' + value.body + '</a>', value.title, {
	                  allowHtml: true,
	                  autoDismiss: false,
	                  newestOnTop: true,
	                  progressBar: false,
	                  timeOut: 0,
	                  extendedTimeOut: 0,
	                  //onclick: $scope.goToLink(payload.data.click_action),
	                  closeHtml: '<button><i class="md md-clear"></i></button>',
	                  iconClass: 'toast-edzance',
	                  closeButton: true
	                });
	              });
	            }
	          });
	        }
	      }
	    }, 25000);

	    messaging.onTokenRefresh(function () {
	      messaging.getToken().then(function (refreshedToken) {
	        //console.log('Token refreshed.');
	        // Indicate that the new Instance ID token has not yet been sent to the
	        // app server.
	        //setTokenSentToServer(false);
	        // Send Instance ID token to app server.
	        sendTokenToServer(refreshedToken);
	        $scope.sendToken();
	        // ...
	      }).catch(function (err) {
	        //console.log('Unable to retrieve refreshed token ', err);
	        showToken('Unable to retrieve refreshed token ', err);
	      });
	    });
	    messaging.onMessage(function (payload) {
	      //console.log("Message received. ", payload);
	      $scope.not.push(payload.data);
	      //console.log($scope.dat);
	      $rootScope.me.un_seen_notifications++;
	      toastr.info('<a href="' + payload.data.click_action + '">' + payload.data.body + '</a>', payload.data.title, {
	        allowHtml: true,
	        autoDismiss: false,
	        newestOnTop: true,
	        progressBar: false,
	        timeOut: 0,
	        extendedTimeOut: 0,
	        //onclick: $scope.goToLink(payload.data.click_action),
	        closeHtml: '<button><i class="md md-clear"></i></button>',
	        iconClass: 'toast-edzance',
	        closeButton: true
	      });
	      // ...
	    });
	  }

	  _createClass(NavController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return NavController;
	}();

	var NavComponent = exports.NavComponent = {
	  templateUrl: './views/app/components/nav/nav.component.html',
	  controller: NavController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 163 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SidebarController = function () {
	    SidebarController.$inject = ["moment", "$scope", "$rootScope", "ContextService", "API", "AclService", "$uibModal", "$log", "$document", "toastr", "$http"];
	    function SidebarController(moment, $scope, $rootScope, ContextService, API, AclService, $uibModal, $log, $document, toastr, $http) {
	        'ngInject';

	        _classCallCheck(this, SidebarController);

	        this.$scope = $scope;
	        this.$scope.moment = moment;
	        this.toastr = toastr;
	        this.$rootScope = $rootScope;
	        this.API = API;
	        this.classEnabled = true;
	        var navSideBar = this;
	        this.$scope.classes = [];
	        this.can = AclService.can;
	        this.newcoursecode = '';
	        this.newclass = false;
	        $scope.membershipModal = false;
	        this.newuserclass = false;
	        this.classsubmit = false;
	        this.sclasssubmit = false;
	        $scope.membership = [];
	        //$scope.membership.level = 4;
	        if ($rootScope.me) $scope.membership.level = $rootScope.me.level;
	        $scope.fromtime = new Date();
	        $scope.totime = new Date();
	        $scope.membership.from = new Date();
	        $scope.membership.to = new Date();
	        this.vday = false;

	        this.$scope.fromtime = $scope.fromtime;
	        this.$scope.totime = $scope.totime;
	        $scope.fromtime.setHours(0);
	        $scope.fromtime.setMinutes(0);
	        $scope.totime.setHours(0);
	        $scope.totime.setMinutes(0);

	        $scope.membership.from.setHours(0);
	        $scope.membership.from.setMinutes(0);
	        $scope.membership.to.setHours(0);
	        $scope.membership.to.setMinutes(0);
	        $scope.membership.country = 14;
	        $scope.fromChanged = function (fromtime) {
	            $scope.fromtime.setHours(fromtime.getHours());
	            $scope.fromtime.setMinutes(fromtime.getMinutes());
	        };
	        $scope.totimeChanged = function (totime) {
	            $scope.totime.setHours(totime.getHours());
	            $scope.totime.setMinutes(totime.getMinutes());
	        };
	        $scope.fromMembership = function (fromtime) {
	            $scope.membership.from.setHours(fromtime.getHours());
	            $scope.membership.from.setMinutes(fromtime.getMinutes());
	        };
	        $scope.totimeMembership = function (totime) {
	            $scope.membership.to.setHours(totime.getHours());
	            $scope.membership.to.setMinutes(totime.getMinutes());
	        };
	        angular.element('.uType input').on('change', function () {
	            angular.element('.user-type').removeClass('active');
	            angular.element(this.parentNode).addClass('active');
	        });
	        API.all('home/countries-list').post().then(function (response) {
	            $scope.countries = response.data;
	        });
	        $scope.getInstitute = function (val) {
	            return $http.get('../api/inst/search-institute/' + $scope.membership.instype + '/' + val).then(function (response) {
	                if (response.data.data != "no post") {
	                    var obj = response.data.data;
	                    return Object.keys(obj).map(function (key) {
	                        return { 'id': key, 'name': obj[key] };
	                    });
	                }
	            });
	        };
	        $scope.onInsSelect = function (item) {
	            $scope.membership.institute = item.id;
	            $scope.membership.instituteName = item.name;
	        };
	        $scope.shouldInsSelect = function (event) {
	            if ($scope.membership.institute != '') {
	                $scope.membership.institute = '';
	            }
	        };
	        $scope.changeType = function () {
	            $scope.membership.institute = '';
	            $scope.membership.instituteName = '';
	            $scope.membership.specialty = '';
	            $scope.membership.specialtyName = '';
	        };
	        $scope.getSpecialty = function (val) {
	            return $http.get('../api/inst/search-institute/' + $scope.membership.institute + '/' + val).then(function (response) {
	                if (response.data.data != "no post") {
	                    var obj = response.data.data;
	                    return Object.keys(obj).map(function (key) {
	                        return { 'id': key, 'name': obj[key] };
	                    });
	                }
	            });
	        };
	        $scope.onSpeSelect = function (item) {
	            $scope.membership.specialty = item.id;
	            $scope.membership.specialtyName = item.name;
	        };
	        $scope.shouldSpeSelect = function (event) {
	            if ($scope.membership.specialty != '') {
	                $scope.membership.specialty = '';
	            }
	        };
	        $scope.newMembership = function (membership, isValid) {

	            var data = {};
	            var doc = true;
	            var payload = new FormData();
	            if (membership.level == 5) {
	                doc = false;
	                if (membership.from.getTime() == membership.to.getTime()) {
	                    $scope.timeErrorFlag = true;
	                } else {
	                    $scope.timeErrorFlag = false;
	                }
	                if (!membership.files) {
	                    $scope.fileErrorFlag = true;
	                } else {
	                    $scope.fileErrorFlag = false;
	                }
	                if (!$scope.fileErrorFlag && !$scope.timeErrorFlag) {
	                    doc = true;
	                }
	            }
	            if (isValid && membership.institute != '' && doc) {
	                if (membership.level == 5) {
	                    data = { "institute": membership.institute,
	                        "specialty": membership.specialty,
	                        "from": membership.from / 1000,
	                        "to": membership.to / 1000,
	                        "file": membership.files
	                    };
	                } else {
	                    data = { "institute": membership.institute,
	                        "specialty": membership.specialty
	                    };
	                }
	                //var payload = new FormData();
	                angular.forEach(data, function (value, key) {
	                    payload.append(key, value);
	                });
	                API.all('home/add-information').withHttpConfig({ transformRequest: angular.identity }).customPOST(payload, undefined, undefined, { 'Content-Type': undefined }).then(function (response) {
	                    $scope.membershipModal = true;
	                    $scope.level = membership.level;
	                    $scope.membership.country = 14;
	                    $scope.membership.instituteName = '';
	                    $scope.membership.specialtyName = '';
	                    $scope.membership.institute = '';
	                    $scope.membership.specialty = '';
	                    $scope.membership.files = {};
	                    $scope.membership.level = 5;
	                    $scope.membership.instype = 1;
	                });
	            }
	        };
	    }
	    // changeCountries(coun){    
	    //     this.$scope.universities = uni.universities;
	    // }
	    // checkdays() {
	    //     if (this.sat == false || this.sat == undefined) var sat = false;
	    //     else var sat = true;
	    //     if (this.sun == false || this.sun == undefined) var sun = false;
	    //     else var sun = true;
	    //     if (this.mon == false || this.mon == undefined) var mon = false;
	    //     else var mon = true;
	    //     if (this.tus == false || this.tus == undefined) var tus = false;
	    //     else var tus = true;
	    //     if (this.wed == false || this.wed == undefined) var wed = false;
	    //     else var wed = true;
	    //     if (this.thu == false || this.thu == undefined) var thu = false;
	    //     else var thu = true;
	    //     if (sat || sun || mon || tus || wed || thu) return false;
	    //     else return true;
	    // }


	    _createClass(SidebarController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return SidebarController;
	}();

	var SidebarComponent = exports.SidebarComponent = {
	    templateUrl: './views/app/components/sidebar/sidebar.component.html',
	    controller: SidebarController,
	    controllerAs: 'side',
	    bindings: {}
	};

/***/ },
/* 164 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ChatController = function () {
	    ChatController.$inject = ["moment", "$crypto", "$scope", "$rootScope", "ContextService", "API", "chatMessages", "$state"];
	    function ChatController(moment, $crypto, $scope, $rootScope, ContextService, API, chatMessages, $state) {
	        'ngInject';

	        _classCallCheck(this, ChatController);

	        this.API = API;
	        this.$scope = $scope;
	        this.$scope.$crypto = $crypto;
	        this.$scope.chatMessages = chatMessages;
	        this.$rootScope = $rootScope;
	        this.$rootScope.chatMessages = chatMessages;
	        this.$scope.popups = [];
	        this.$scope.moment = moment;
	        this.$scope.total_popups = 0;
	        this.$scope.myObj = {};
	        this.open = 0;
	        this.$scope.messages = [];
	        $rootScope.message = [];
	        $scope.loadmore = false;
	        $scope.loaded = false;
	        var self = this;
	        window.addEventListener("resize", $scope.calculate_popups);
	        window.addEventListener("load", $scope.calculate_popups);
	        $rootScope.$watch('messaging_enabled', function () {
	            if ($rootScope.messaging_enabled == true) {
	                $scope.addMessage = function (message, id) {
	                    $rootScope.message[id] = $rootScope.chatMessages.addMessage($rootScope.me.FB_UID, $rootScope.me.name, message, id);
	                };
	            }
	        });
	        $scope.infiniteScroll = function (id) {
	            return new Promise(function (success, error) {
	                if ($scope.loadmore != true) {
	                    $scope.loadmore = true;
	                    chatMessages.Rooms.forEach(function (currentValue, index, arr) {
	                        if (currentValue.name == id) {
	                            chatMessages.myRoomInRooms = currentValue;
	                        }
	                    });
	                    if (id) {
	                        var count = chatMessages.getMessageCount(id);
	                        if ($rootScope.messages[id].length >= count - chatMessages.RoomData[id]) return;
	                        if (count >= 10 && $scope.limit >= 0) {
	                            chatMessages.infiniteScroll(id, $scope.limit, false).then(function (moreMessages) {
	                                var exist_message = $rootScope.messages[id].length;
	                                var new_message = moreMessages.length;
	                                moreMessages.splice(new_message - exist_message, exist_message);
	                                moreMessages.reverse();
	                                moreMessages.forEach(function (value, key) {
	                                    $rootScope.messages[id].unshift(value);
	                                });
	                                $scope.loadmore = false;
	                                $scope.limit = $scope.limit - moreMessages.length;
	                                success(1);
	                            });
	                        } else {
	                            $scope.loadmore = false;
	                        }
	                    }
	                }
	            });
	        };
	        $scope.GetRoom = function ($id) {
	            var count = chatMessages.getMessageCount($id);
	            $scope.limit = count - 20;
	            if ($rootScope.messages[$id]) {
	                $rootScope.messages[$id] = [];
	            }
	            $rootScope.chatMessages.getRoom($id, 10).then(function (Room) {
	                $rootScope.messages[$id] = Room;
	                $rootScope.messages[$id].RoomNow = $id;
	                angular.element('#' + $id + ' .popup-messages').scrollTop(angular.element('.popup-messages').prop('scrollHeight'));
	            });
	        };
	        $scope.close_popup = function (id) {
	            for (var iii = 0; iii < $scope.popups.length; iii++) {
	                if (id == $scope.popups[iii].id) {
	                    $scope.popups.splice(iii, 1);
	                    $scope.calculate_popups();
	                    return;
	                }
	            }
	        };
	        $scope.close_all_popup = function () {
	            for (var iii = 0; iii < $scope.popups.length; iii++) {
	                $scope.popups.splice(iii, 1);
	                $scope.calculate_popups();
	                return;
	            }
	        };
	        $rootScope.register_popup = function (id, name) {
	            for (var iii = 0; iii < $scope.popups.length; iii++) {
	                //already registered. Bring it to front.
	                if (id == $scope.popups[iii].id) {
	                    $scope.popups.splice(iii, 1);
	                    $scope.popups.unshift({
	                        id: id,
	                        name: name
	                    });
	                    $scope.calculate_popups();
	                    return;
	                }
	            }
	            $scope.popups.unshift({
	                id: id,
	                name: name
	            });
	            $scope.calculate_popups(id);
	        };
	        $scope.calculate_popups = function (id) {
	            //let self = this;
	            $rootScope.$on('$stateChangeSuccess', function () {
	                if ($state.current.name == 'app.message.room') $scope.close_all_popup();
	            });
	            var width = window.innerWidth;
	            if (width < 540 || $state.current.name == 'app.message.room') {
	                $scope.total_popups = 0;
	                $state.go('app.message.room', {
	                    Room: id
	                });
	                $scope.close_all_popup();
	            } else {
	                width = width - 450;
	                //320 is width of a single popup box
	                $scope.total_popups = parseInt(width / 320);
	            }
	            $scope.display_popups();
	        };
	        $scope.display_popups = function () {
	            var self = this;
	            var left = 270;

	            var iii = 0;
	            for (iii; iii < $scope.total_popups; iii++) {
	                if ($scope.popups[iii] != undefined) {
	                    $scope.myObj = {
	                        "left": left + "px",
	                        "display": "block"
	                    };
	                    left = left + 275;
	                    $scope.popups[iii].myObj = $scope.myObj;
	                }
	            }
	            for (var jjj = iii; jjj < $scope.popups.length; jjj++) {
	                $scope.myObj = {
	                    "display": "none"
	                };
	                $scope.popups[jjj].myObj = $scope.myObj;
	            }
	        };
	    }

	    _createClass(ChatController, [{
	        key: "toggleMenu",
	        value: function toggleMenu(id) {
	            if (angular.element('#' + id).hasClass("close-box")) {
	                angular.element('#' + id).removeClass('close-box');
	            } else {
	                angular.element('#' + id).addClass("close-box");
	            }
	        }
	    }, {
	        key: "$onInit",
	        value: function $onInit() {}
	    }]);

	    return ChatController;
	}();

	var ChatComponent = exports.ChatComponent = {
	    templateUrl: './views/app/components/chat/chat.component.html',
	    controller: ChatController,
	    controllerAs: 'vma',
	    bindings: {}
	};

/***/ },
/* 165 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HomeController = function () {
	    HomeController.$inject = ["Post", "moment", "$sce", "$scope", "$stateParams", "$state", "$rootScope", "ContextService", "API", "$interval", "AclService", "$uibModal", "$log", "$timeout", "Upload", "$q", "screenSize"];
	    function HomeController(Post, moment, $sce, $scope, $stateParams, $state, $rootScope, ContextService, API, $interval, AclService, $uibModal, $log, $timeout, Upload, $q, screenSize) {
	        'ngInject';

	        _classCallCheck(this, HomeController);

	        $state.current.show_loadmore = true;
	        $scope.mobile = screenSize.on('xs', function (match) {
	            $scope.mobile = match;
	        });
	        $scope.desktop = screenSize.on('sm, md, lg', function (match) {
	            $scope.desktop = match;
	        });
	        $rootScope.liveUrlFlag = false;

	        angular.element('html').scrollTop(0);
	        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	        var Post = this.Post;
	        this.Post.seturl('home/post');
	        this.Post.setediturl('social/edit/home/post');
	        this.Post.setskip(0);
	        this.Post.settype('post');
	        this.Post.setsubmiturl('social/set/home/post');
	        this.Post.setimageurl('social/set/home/post');
	        this.Post.settake(2);
	        this.Post.setSection('home');
	        this.Post.setdeleteurl('social/delete/home/post');
	        this.Post.setCommentDeleteUrl('social/delete/home/comment');
	        $scope.swiper = {};
	        $scope.friendSliderFlag = false;
	        this.Post.getPost().then(function (response) {
	            $scope.dat = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	            API.all('home/suggest').get('').then(function (response) {
	                $scope.univ = response.data;
	                $scope.univ.map(function (item, key) {});
	                $scope.friendSliderFlag = true;
	            });
	            $rootScope.busy = false;
	        });
	        this.Post.settake(5);

	        this.scope = $scope;
	        $scope.post_enabled = true;
	        $scope.comment_enabled = true;
	        $scope.post_delete = true;
	        $scope.interval = $interval;
	        $scope.uibModal = $uibModal;
	        $scope.log = $log;
	        $scope.timeout = $timeout;
	        $scope.Upload = Upload;

	        var $scope = this.scope;
	        this.$state = $state;
	        this.scope.moment = moment;
	        this.rootScope = $rootScope;
	        this.scope.univ = [];
	        this.comment = [];
	        this.scope.comment = [];
	        this.API = API;
	        this.sce = $sce;
	        this.timeout = $timeout;
	        this.q = $q;
	        this.Upload = Upload;
	        this.scope.dataPost = false;
	        this.stateParams = $stateParams;
	        this.file = [];
	        this.can = AclService.can;
	        this.scope.files = [];
	        var logs = '';
	        var timeout = $timeout;
	        var $i;
	        //before showing the new page data
	        /////////////////////////////////////////////
	        /////////////////////////////////////////////
	        /////////////////////////////////////////////
	        /////////////////////////////////////////////
	        this.scope.post_enabled = true;
	        this.scope.comment_enabled = true;
	        this.scope.exprission = Post.getExprissions();
	        this.scope.commentlimit = 2;
	        // $scope.items = {
	        //     collection: getPost()
	        // }; 
	        // $scope.items.collection.forEach(function(it){
	        //     it.childs = getPost();
	        // }); 
	        /////////////////////////////////////////////
	        /////////////////////////////////////////////
	        /////////////////////////////////////////////
	        /////////////////////////////////////////////
	        $scope.getPost = function () {
	            Post.getPost().then(function (response) {
	                $scope.dat = Post.getPostat();
	                $scope.nopost = Post.getnopost();
	                $rootScope.busy = false;
	            });
	        };
	        $scope.exprissionUser = function ($index, liker) {
	            $rootScope.happyexp = 0;
	            $rootScope.normalexp = 0;
	            $rootScope.sadexp = 0;
	            Post.exprissionUser($index, liker);
	            $scope.exprissions = Post.getExprissions();
	            $timeout(function () {
	                $scope.exprissions = Post.getExprissions();
	            }, 1000);
	        };
	        $scope.exprission = function ($post, $exp) {
	            Post.exprission($post, $exp);
	            $scope.dat = Post.getPostat();
	        };
	        // $scope.exprissionUser = function($index,liker) {
	        //   $scope.exprissions = Post.exprissionUser($index,liker);
	        // }
	        $scope.deleteNode = function (node, deleteType) {
	            Post.deleteNode(node, deleteType, $scope.callback);
	            $scope.dat = Post.getPostat();
	        };
	        $scope.callback = function () {
	            $scope.nopost = Post.getnopost();
	        };
	        $scope.permission = function (post) {
	            return $rootScope.me.permission.social.indexOf(post) >= 0;
	        };
	        $scope.postPermission = function (permission, post, me) {
	            return $rootScope.me.permission.social.indexOf(permission) >= 0 && post == me;
	        };
	        $scope.commentPermission = function (permission, comment, me, post) {
	            return $rootScope.me.permission.social.indexOf(permission) >= 0 && (comment == me || post == me);
	        };
	        $scope.submitComment = function ($id, $index, $body, place) {
	            Post.submitComment($id, $index, this, $body, place);
	            this.comment[$id] = "";
	            if (this.comment2 != undefined) this.comment2[$id] = "";
	            $scope.dat = Post.getPostat();
	        };
	        $scope.updateData = function (data, id) {
	            Post.updateData(data, id);
	        };
	        $scope.submitPost = function (files) {
	            Post.submitPost(files, $stateParams.classid, this.textpost, $scope.callback);
	            $scope.resetSubmit(this);
	            $scope.dat = Post.getPostat();
	            $scope.nopost = Post.getnopost();
	        };
	        $scope.resetSubmit = function (scope) {
	            angular.element(".image-readed").attr("ng-src", "");
	            angular.element(".image-readed").attr("src", "");
	            angular.element(".readed-con").attr("style", "display: none");
	            scope.files = '';
	            scope.textpost = '';
	            scope.live_title = '';
	            scope.live_description = '';
	            scope.live_url = '';
	            scope.live_image = '';
	            scope.live_title = '';
	            $rootScope.posturl = '';
	            $rootScope.posttitle = '';
	            $rootScope.postdescription = '';
	            $rootScope.postimage = '';
	            scope.media = '';
	            scope.showlive = 0;
	            scope.closeUrl = false;
	        };
	        $scope.imageUpload = function (element, files) {
	            if (element.$error.maxSize) {
	                this.fileMaxSize = 'حجم الصورة كبير جدا';
	            } else if (element.$error.pattern) {
	                this.fileMaxSize = 'الرجاء ادخال ملف من نوع صوره';
	            } else {
	                var reader = new FileReader();
	                this.fileMaxSize = 'اضغط لرفع صوره / أو قم بادراجها';
	                reader.onload = $scope.imageIsLoaded;
	                reader.readAsDataURL(files);
	                angular.element(".readed-con").attr("style", "display: block");
	            }
	        };
	        $scope.imageIsLoaded = function (e) {
	            $scope.$apply(function () {
	                $scope.imagereaded = e.target.result;
	            });
	        };
	        $scope.removeImg = function () {
	            angular.element(".image-readed").attr("ng-src", "");
	            angular.element(".image-readed").attr("src", "");
	            angular.element(".readed-con").attr("style", "display: none");
	            this.files = '';
	        };
	        this.friendIndex = 0;
	        $scope.$on('bottom-reached-before', function () {
	            API.all('me/post/' + this.skip + '/' + this.take).get('').then(function (response) {
	                a = response.data;
	                //  $rootScope.dat =a; 
	                $rootScope.dat.push(a);
	            }, function (response) {
	                a = response.data;
	            });
	        });
	        //after showing the new page data
	        $scope.$on('bottom-reached-after', function () {
	            // do whatever you want
	        });
	        this.rootScope.pageTitle = 'الصفحة الرئيسة';
	        angular.element('meta[name=Keywords]').attr('content', 'الصفحة الشخصية ادزنس');
	        angular.element('meta[name=Description]').attr('content', 'تواصل مع مدرسيك وزملائك , احصل على ملفاتك الدراسية و على تنبيهات امتحانات , شارك الطلاب الجامعيين آرائك ونقاشاتك .');
	    }

	    _createClass(HomeController, [{
	        key: 'autolink',
	        value: function autolink(str, attributes) {
	            attributes = attributes || {};
	            var attrs = "";
	            for (name in attributes) {
	                attrs += " " + name + '="' + attributes[name] + '"';
	            }var reg = new RegExp("(\\s?)((http|https|ftp)://[^\\s<]+[^\\s<\.)])", "gim");
	            str = str.toString().replace(reg, '$1<a href="$2">$2</a>');
	            this.vurl = str;
	            return str;
	        }
	    }, {
	        key: 'submitText',
	        value: function submitText($scope, data) {
	            var _this = this;

	            $scope = this.scope;
	            if ($scope.post_enabled == true) {
	                $scope.post_enabled = false;
	                var type = "";
	                var url = this.rootScope.posturl;
	                if (url == undefined || url == '') {
	                    var _data;

	                    type = "text";

	                    var data = (_data = {
	                        textpost: this.textpost,
	                        tag: this.tag,
	                        media: this.media,
	                        title: this.title,
	                        description: this.description
	                    }, _defineProperty(_data, 'media', ''), _defineProperty(_data, 'mediatitle', ''), _defineProperty(_data, 'mediadesc', ''), _defineProperty(_data, 'mediaimage', ''), _defineProperty(_data, 'type', type), _defineProperty(_data, 'place', 'home'), _data);
	                } else {
	                    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
	                    var match = url.match(regExp);
	                    if (match && match[2].length == 11) {
	                        var _data2;

	                        //console.logs('type is video');
	                        type = "video";
	                        this.textpost = this.textpost.replace(url, '<a href="' + url + '" >الرابط هنا</a>');

	                        var data = (_data2 = {
	                            textpost: this.textpost,
	                            tag: this.tag,
	                            media: this.media,
	                            title: this.title,
	                            description: this.description
	                        }, _defineProperty(_data2, 'media', 'https://www.youtube.com/embed/' + match[2]), _defineProperty(_data2, 'mediatitle', this.rootScope.posttitle), _defineProperty(_data2, 'mediadesc', this.rootScope.postdescription), _defineProperty(_data2, 'mediaimage', this.rootScope.postimage), _defineProperty(_data2, 'type', type), _defineProperty(_data2, 'place', 'home'), _data2);
	                    } else {
	                        var _data3;

	                        type = "url";
	                        this.textpost = this.textpost.replace(url, '<a href="' + url + '" >الرابط هنا</a>');
	                        var data = (_data3 = {
	                            textpost: this.textpost,
	                            tag: this.tag,
	                            media: this.media,
	                            title: this.title,
	                            description: this.description
	                        }, _defineProperty(_data3, 'media', url), _defineProperty(_data3, 'mediatitle', this.rootScope.posttitle), _defineProperty(_data3, 'mediadesc', this.rootScope.postdescription), _defineProperty(_data3, 'mediaimage', this.rootScope.postimage), _defineProperty(_data3, 'type', type), _defineProperty(_data3, 'place', 'home'), _data3);
	                    }
	                }
	                this.postC++;
	                this.textpost = '';
	                this.tag = '';
	                this.title = '';
	                this.description = '';
	                this.media = '';
	                this.scope.showlive = 0;
	                this.API.all('me/post').post(data).then(function (response) {
	                    //response.data.post.media= 'https://www.youtube.com/embed/' + response.data.post.media
	                    _this.rootScope.dat.push(response.data.post);
	                    $scope = _this.scope;
	                    _this.lived = _this.live;
	                    $scope.post_enabled = true;
	                    //console.log(response.data);
	                    _this.scope.dataPost = false;
	                    _this.textpost = '';
	                    _this.tag = '';
	                }, function (response) {
	                    $scope.post_enabled = true;
	                });
	            }
	        }
	    }, {
	        key: 'addhomework',
	        value: function addhomework(files, $timeout, logs, classid, _self) {
	            if (files) {
	                //for (var i = 0; i < files.length; i++) {
	                var file = files;
	                if (!file.$error) {
	                    this.Upload.upload({
	                        url: 'api/me/uploadhw',
	                        method: 'POST',
	                        file: file,
	                        data: {
	                            id: _self.userData.id
	                        }
	                    }).then(function (resp) {
	                        $timeout(function () {
	                            var mynewhomework = {
	                                id: _self.userData.id,
	                                textpost: _self.textpost,
	                                imgTag: _self.imgTag,
	                                file: resp.data.data.return[0]
	                            };
	                            _self.API.all('me/image').post(mynewhomework).then(function (response) {
	                                _self.scope.dat.push(response.data.post);
	                                // _self.scope.dat.push(response.data.post);
	                            });
	                            _self.textpost = '';
	                            _self.imgTag = '';
	                            _self.scope.files = '';
	                        });
	                    }, null, function (evt) {
	                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	                        logs = 'progress: ' + progressPercentage + '% ' + evt.config.data.file.name + '\n';
	                    });
	                }
	                //}
	            }
	        }
	    }, {
	        key: 'follow',
	        value: function follow($friend, $update, $idx) {
	            var _this2 = this;

	            this.API.all('home/friend/' + $friend + '/' + $update).post('').then(function (response) {
	                _this2.fr[$friend] = null;
	                _this2.scope.univ.splice($idx, 1);
	                angular.element('#friend-' + $friend).hide();
	                _this2.friendIndex++;
	            });
	            if (this.friendIndex == 7) {
	                this.API.all('me/university').get('').then(function (response) {
	                    _this2.scope.univ = response.data;
	                    _this2.friendIndex = 0;
	                });
	            }
	        }
	    }, {
	        key: 'followMobile',
	        value: function followMobile($friend, $update, $idx) {
	            var _this3 = this;

	            this.API.all('home/friend/' + $friend + '/' + $update).post('').then(function (response) {
	                _this3.fr[$friend] = null;
	                _this3.scope.univ.splice($idx, 1);
	                angular.element('#friend-' + $friend).hide();
	            });
	        }
	    }, {
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return HomeController;
	}();

	var HomeComponent = exports.HomeComponent = {
	    templateUrl: './views/app/components/home/home.component.html',
	    controller: HomeController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 166 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Login2Controller = function () {
	  Login2Controller.$inject = ["$rootScope", "$auth", "$state", "$stateParams", "API", "AclService", "$scope"];
	  function Login2Controller($rootScope, $auth, $state, $stateParams, API, AclService, $scope) {
	    'ngInject';

	    _classCallCheck(this, Login2Controller);

	    delete $rootScope.me;
	    var d = new Date();
	    $scope.year = d.getFullYear();

	    $scope.month = 12;
	    $scope.day = 31;
	    this.scope = $scope;
	    this.$auth = $auth;
	    this.$state = $state;
	    this.API = API;
	    this.$stateParams = $stateParams;
	    this.AclService = AclService;

	    this.password = '';
	    this.password_confirmation = '';
	    this.formSubmitted = false;
	    this.logSubmitted = false;
	    this.errors = [];

	    this.registerSuccess = $stateParams.registerSuccess;
	    this.successMsg = $stateParams.successMsg;
	    this.loginfailed = false;
	    this.unverified = false;
	  }

	  _createClass(Login2Controller, [{
	    key: '$onInit',
	    value: function $onInit() {
	      this.firstname = '';
	      this.lastname = '', this.phone = '', this.gender = '', this.day = '', this.month = '', this.year = '', this.logemail = '';
	      this.logpassword = '';
	      this.email = '';
	      this.password = '';
	      this.password_confirmation = '';
	      this.mailcheck = '';
	      this.phonecheck = '';
	      console.log(this);
	    }
	  }, {
	    key: 'checkemail',
	    value: function checkemail() {
	      var _this = this;

	      if (this.registerForm.password) this.API.all('me/check').post(this.email).then(function (response) {
	        //  this.scope.dat.push(response.data.post);
	        //  $scope=this.scope;
	      }, function (response) {
	        console.log($scope.post_enabled);
	        for (var error in response.data.errors) {
	          _this.errors[error] = response.data.errors[error][0];
	          _this.registerForm.$invalid = true;
	          _this.registerForm[error].$invalid = true;
	        }
	      });
	    }
	  }, {
	    key: 'checkphone',
	    value: function checkphone() {
	      var _this2 = this;

	      this.API.all('me/post').post(this.telephone).then(function (response) {
	        // this.scope.dat.push(response.data.post);
	        //$scope=this.scope;
	      }, function (response) {
	        console.log($scope.post_enabled);
	        for (var error in response.data.errors) {
	          _this2.errors[error] = response.data.errors[error][0];
	          _this2.registerForm.$invalid = true;
	          _this2.registerForm[error].$invalid = true;
	        }
	      });
	    }
	  }, {
	    key: 'getNumber',
	    value: function getNumber(num) {
	      return new Array(num);
	    }
	  }, {
	    key: 'login',
	    value: function login(isValid, _self) {
	      var _this3 = this;

	      if (isValid) {
	        this.loginfailed = false;
	        this.unverified = false;

	        var user = {
	          email: this.logemail,
	          password: this.logpassword
	        };

	        this.$auth.login(user).then(function (response) {
	          var data = response.data.data;
	          var AclService = _this3.AclService;

	          angular.forEach(data.userRole, function (value) {
	            AclService.attachRole(value);
	          });
	          // console.log(response.data);
	          AclService.setAbilities(data.abilities);
	          _this3.$auth.setToken(response.data);
	          if (response.data.data.dataleak == true) {
	            console.log(response);
	            var user = {
	              email: _self.logemail,
	              password: _self.logpassword
	            };
	            console.log(user);
	            _this3.$state.go('logins.university-information', { id: response.data.data.user.id, user: response.data.data.user, email: _this3.logemail, password: _this3.logpassword });
	          } else {
	            // this.$state.go('app.landing')
	            window.location.href = "/";
	          }
	        }).catch(this.failedLogin.bind(this));
	      } else {
	        this.logSubmitted = true;
	        console.log(this);
	      }
	    }
	  }, {
	    key: 'failedLogin',
	    value: function failedLogin(res) {
	      if (res.status == 401) {
	        this.loginfailed = true;
	      } else {
	        if (res.data.errors.message[0] == 'Email Unverified') {
	          this.unverified = true;
	        }
	      }
	    }
	  }, {
	    key: 'register',
	    value: function register(isValid) {
	      var _this4 = this;

	      if (isValid) {
	        var user = {
	          firstname: this.firstname,
	          lastname: this.lastname,
	          telephone: this.telephone,
	          gender: this.gender,
	          day: this.day,
	          month: this.month,
	          year: this.year,
	          email: this.email,
	          password: this.password,
	          password_confirmation: this.password_confirmation
	        };

	        this.$auth.signup(user).then(function () {
	          _this4.$state.go('logins.login.index', { registerSuccess: true });
	        }).catch(this.failedRegistration.bind(this));
	      } else {
	        this.formSubmitted = true;
	      }
	    }
	  }, {
	    key: 'failedRegistration',
	    value: function failedRegistration(response) {
	      if (response.status === 422) {
	        for (var error in response.data.errors) {
	          this.errors[error] = response.data.errors[error][0];
	          this.registerForm.$invalid = true;
	          this.registerForm[error].$invalid = true;
	          console.log(this);
	        }
	      }
	    }
	  }]);

	  return Login2Controller;
	}();

	var Login2Component = exports.Login2Component = {
	  templateUrl: './views/app/components/login2/login2.component.html',
	  controller: Login2Controller,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 167 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LoginMainController = function () {
	    function LoginMainController() {
	        'ngInject';

	        //

	        _classCallCheck(this, LoginMainController);
	    }

	    _createClass(LoginMainController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return LoginMainController;
	}();

	var LoginMainComponent = exports.LoginMainComponent = {
	    templateUrl: './views/app/components/login-main/login-main.component.html',
	    controller: LoginMainController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 168 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LoginFooterController = function () {
	    function LoginFooterController() {
	        'ngInject';

	        //

	        _classCallCheck(this, LoginFooterController);
	    }

	    _createClass(LoginFooterController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return LoginFooterController;
	}();

	var LoginFooterComponent = exports.LoginFooterComponent = {
	    templateUrl: './views/app/components/login-footer/login-footer.component.html',
	    controller: LoginFooterController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 169 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LoginHeaderController = function () {
	    function LoginHeaderController() {
	        'ngInject';

	        //

	        _classCallCheck(this, LoginHeaderController);
	    }

	    _createClass(LoginHeaderController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return LoginHeaderController;
	}();

	var LoginHeaderComponent = exports.LoginHeaderComponent = {
	    templateUrl: './views/app/components/login-header/login-header.component.html',
	    controller: LoginHeaderController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ },
/* 170 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UiModalController = function () {
	  UiModalController.$inject = ["$scope", "$uibModal", "$log", "API"];
	  function UiModalController($scope, $uibModal, $log, API) {
	    'ngInject';

	    _classCallCheck(this, UiModalController);

	    this.API = API;
	    this.$uibModal = $uibModal;
	    this.$log = $log;
	    this.$scope = $scope;
	    this.items = ['item1', 'item2', 'item3'];
	    this.animationsEnabled = true;
	  }

	  _createClass(UiModalController, [{
	    key: 'modalOpen',
	    value: function modalOpen(size) {
	      var $uibModal = this.$uibModal;
	      var $scope = this.$scope;
	      var $log = this.$log;
	      var _items = this.items;

	      var modalInstance = $uibModal.open({
	        animation: this.animationsEnabled,
	        templateUrl: 'myModalContent.html',
	        controller: this.modalcontroller,
	        controllerAs: 'mvm',
	        size: size,
	        resolve: {
	          items: function items() {
	            return _items;
	          }
	        }
	      });

	      modalInstance.result.then(function (selectedItem) {
	        $scope.selected = selectedItem;
	      }, function () {
	        $log.info('Modal dismissed at: ' + new Date());
	      });
	    }
	  }, {
	    key: 'modalcontroller',
	    value: ["$scope", "$uibModalInstance", "items", function modalcontroller($scope, $uibModalInstance, items) {
	      'ngInject';

	      this.items = items;

	      $scope.selected = {
	        item: items[0]
	      };

	      this.ok = function () {
	        $uibModalInstance.close($scope.selected.item);
	      };

	      this.cancel = function () {
	        $uibModalInstance.dismiss('cancel');
	      };
	    }]
	  }, {
	    key: 'toggleModalAnimation',
	    value: function toggleModalAnimation() {
	      this.animationsEnabled = !this.animationsEnabled;
	    }
	  }, {
	    key: 'swalConfirm',
	    value: function swalConfirm() {
	      swal({
	        title: 'Are you sure?',
	        text: 'You will not be able to recover this imaginary file!',
	        type: 'warning',
	        showCancelButton: true,
	        confirmButtonColor: '#DD6B55',
	        confirmButtonText: 'Yes, delete it!',
	        closeOnConfirm: false
	      }, function () {
	        swal('Deleted!', 'Your imaginary file has been deleted.', 'success');
	      });
	    }
	  }, {
	    key: 'swalBasic',
	    value: function swalBasic() {
	      swal("Here's a message!", "It's pretty, isn't it?");
	    }
	  }, {
	    key: 'swalSuccess',
	    value: function swalSuccess() {
	      swal('Good job!', 'You clicked the button!', 'success');
	    }
	  }, {
	    key: 'swalDecide',
	    value: function swalDecide() {
	      swal({
	        title: 'Are you sure?',
	        text: 'You will not be able to recover this imaginary file!',
	        type: 'warning',
	        showCancelButton: true,
	        confirmButtonColor: '#DD6B55',
	        confirmButtonText: 'Yes, delete it!',
	        cancelButtonText: 'No, cancel plx!',
	        closeOnConfirm: false,
	        closeOnCancel: false
	      }, function (isConfirm) {
	        if (isConfirm) {
	          swal('Deleted!', 'Your imaginary file has been deleted.', 'success');
	        } else {
	          swal('Cancelled', 'Your imaginary file is safe :)', 'error');
	        }
	      });
	    }
	  }, {
	    key: 'swalImage',
	    value: function swalImage() {
	      swal({
	        title: 'Sweet!',
	        text: "Here's a custom image.",
	        imageUrl: '/img/avatar5.png'
	      });
	    }
	  }, {
	    key: 'swalHtmlMessage',
	    value: function swalHtmlMessage() {
	      swal({
	        title: 'HTML <small>Title</small>!',
	        text: 'A custom <span style="color:#F8BB86">html<span> message.',
	        html: true
	      });
	    }
	  }, {
	    key: 'swalAutoClose',
	    value: function swalAutoClose() {
	      swal({
	        title: 'Auto close alert!',
	        text: 'I will close in 2 seconds.',
	        timer: 2000,
	        showConfirmButton: false
	      });
	    }
	  }, {
	    key: 'swalPrompt',
	    value: function swalPrompt() {
	      swal({
	        title: 'An input!',
	        text: 'Write something interesting:',
	        type: 'input',
	        showCancelButton: true,
	        closeOnConfirm: false,
	        animation: 'slide-from-top',
	        inputPlaceholder: 'Write something'
	      }, function (inputValue) {
	        if (inputValue === false) return false;
	        if (inputValue === '') {
	          swal.showInputError('You need to write something!');
	          return false;
	        }
	        swal('Nice!', 'You wrote: ' + inputValue, 'success');
	      });
	    }
	  }, {
	    key: 'swalAjax',
	    value: function swalAjax() {
	      var API = this.API;

	      swal({
	        title: 'Ajax request example',
	        text: 'Submit to run ajax request',
	        type: 'info',
	        showCancelButton: true,
	        closeOnConfirm: false,
	        showLoaderOnConfirm: true
	      }, function () {
	        var UserData = API.service('me', API.all('users'));

	        UserData.one().get().then(function (response) {
	          var userdata = response.plain();
	          swal('Your Name is: ' + userdata.data.name);
	        });
	      });
	    }
	  }]);

	  return UiModalController;
	}();

	var UiModalComponent = exports.UiModalComponent = {
	  templateUrl: './views/app/components/ui-modal/ui-modal.component.html',
	  controller: UiModalController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 171 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UiTimelineController = function () {
	  function UiTimelineController() {
	    'ngInject';

	    //

	    _classCallCheck(this, UiTimelineController);
	  }

	  _createClass(UiTimelineController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UiTimelineController;
	}();

	var UiTimelineComponent = exports.UiTimelineComponent = {
	  templateUrl: './views/app/components/ui-timeline/ui-timeline.component.html',
	  controller: UiTimelineController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 172 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UiButtonsController = function () {
	  function UiButtonsController() {
	    'ngInject';

	    //

	    _classCallCheck(this, UiButtonsController);
	  }

	  _createClass(UiButtonsController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UiButtonsController;
	}();

	var UiButtonsComponent = exports.UiButtonsComponent = {
	  templateUrl: './views/app/components/ui-buttons/ui-buttons.component.html',
	  controller: UiButtonsController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 173 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UiIconsController = function () {
	  function UiIconsController() {
	    'ngInject';

	    //

	    _classCallCheck(this, UiIconsController);
	  }

	  _createClass(UiIconsController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UiIconsController;
	}();

	var UiIconsComponent = exports.UiIconsComponent = {
	  templateUrl: './views/app/components/ui-icons/ui-icons.component.html',
	  controller: UiIconsController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 174 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UiGeneralController = function () {
	  function UiGeneralController() {
	    'ngInject';

	    //

	    _classCallCheck(this, UiGeneralController);
	  }

	  _createClass(UiGeneralController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UiGeneralController;
	}();

	var UiGeneralComponent = exports.UiGeneralComponent = {
	  templateUrl: './views/app/components/ui-general/ui-general.component.html',
	  controller: UiGeneralController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 175 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FormsGeneralController = function () {
	  function FormsGeneralController() {
	    'ngInject';

	    //

	    _classCallCheck(this, FormsGeneralController);
	  }

	  _createClass(FormsGeneralController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return FormsGeneralController;
	}();

	var FormsGeneralComponent = exports.FormsGeneralComponent = {
	  templateUrl: './views/app/components/forms-general/forms-general.component.html',
	  controller: FormsGeneralController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 176 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ChartsChartjsController = function () {
	  function ChartsChartjsController() {
	    'ngInject';

	    _classCallCheck(this, ChartsChartjsController);
	  }

	  _createClass(ChartsChartjsController, [{
	    key: '$onInit',
	    value: function $onInit() {
	      this.lineChartLabels = ['Januarys', 'February', 'March', 'April', 'May', 'June', 'July'];
	      this.lineChartSeries = ['Series A', 'Series B'];
	      this.lineChartData = [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]];

	      this.areaChartLabels = ['Januarys', 'February', 'March', 'April', 'May', 'June', 'July'];
	      this.areaChartSeries = ['Series A', 'Series B'];
	      this.areaChartData = [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]];
	      this.areaChartColours = [{
	        fillColor: '#D2D6DE',
	        strokeColor: '#D2D6DE',
	        pointColor: 'rgba(148,159,177,1)',
	        pointStrokeColor: '#fff',
	        pointHighlightFill: '#fff',
	        pointHighlightStroke: 'rgba(148,159,177,0.8)'
	      }, {
	        fillColor: '#4B94C0',
	        strokeColor: '#4B94C0',
	        pointColor: '#2980b9',
	        pointStrokeColor: '#fff',
	        pointHighlightFill: '#fff',
	        pointHighlightStroke: 'rgba(77,83,96,1)'
	      }];

	      this.onClick = function () {};

	      this.barChartLabels = ['Januarys', 'February', 'March', 'April', 'May', 'June', 'July'];
	      this.barChartSeries = ['Series A', 'Series B'];
	      this.barChartData = [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]];
	      this.barChartColours = [{
	        fillColor: '#D2D6DE',
	        strokeColor: '#D2D6DE',
	        pointColor: 'rgba(148,159,177,1)',
	        pointStrokeColor: '#fff',
	        pointHighlightFill: '#fff',
	        pointHighlightStroke: 'rgba(148,159,177,0.8)'
	      }, {
	        fillColor: '#00A65A',
	        strokeColor: '#00A65A',
	        pointColor: '#2980b9',
	        pointStrokeColor: '#fff',
	        pointHighlightFill: '#fff',
	        pointHighlightStroke: 'rgba(77,83,96,1)'
	      }];

	      this.pieLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
	      this.pieData = [300, 500, 100];
	    }
	  }]);

	  return ChartsChartjsController;
	}();

	var ChartsChartjsComponent = exports.ChartsChartjsComponent = {
	  templateUrl: './views/app/components/charts-chartjs/charts-chartjs.component.html',
	  controller: ChartsChartjsController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 177 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var WidgetsController = function () {
	  function WidgetsController() {
	    'ngInject';

	    //

	    _classCallCheck(this, WidgetsController);
	  }

	  _createClass(WidgetsController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return WidgetsController;
	}();

	var WidgetsComponent = exports.WidgetsComponent = {
	  templateUrl: './views/app/components/widgets/widgets.component.html',
	  controller: WidgetsController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 178 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserProfileController = function () {
	  UserProfileController.$inject = ["$stateParams", "$state", "API"];
	  function UserProfileController($stateParams, $state, API) {
	    'ngInject';

	    var _this = this;

	    _classCallCheck(this, UserProfileController);

	    this.$state = $state;
	    this.formSubmitted = false;
	    this.alerts = [];
	    this.userRolesSelected = [];

	    if ($stateParams.alerts) {
	      this.alerts.push($stateParams.alerts);
	    }

	    var UserData = API.service('me', API.all('users'));
	    UserData.one().get().then(function (response) {
	      _this.userdata = API.copy(response);
	      _this.userdata.data.current_password = '';
	      _this.userdata.data.new_password = '';
	      _this.userdata.data.new_password_confirmation = '';
	    });
	  }

	  _createClass(UserProfileController, [{
	    key: 'save',
	    value: function save(isValid, userForm) {
	      var _this2 = this;

	      if (isValid) {
	        (function () {
	          var $state = _this2.$state;

	          _this2.userdata.put().then(function () {
	            var alert = { type: 'success', 'title': 'Success!', msg: 'Profile has been updated.' };
	            $state.go($state.current, { alerts: alert });
	          }, function (response) {
	            var formErrors = [];

	            if (angular.isDefined(response.data.errors.message)) {
	              formErrors = response.data.errors.message[0];
	            } else {
	              formErrors = response.data.errors;
	            }

	            angular.forEach(formErrors, function (value, key) {
	              var varkey = key.replace('data.', '');
	              userForm[varkey].$invalid = true;
	              userForm[varkey].customError = value[0];
	            });

	            _this2.formSubmitted = true;
	          });
	        })();
	      } else {
	        this.formSubmitted = true;
	      }
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UserProfileController;
	}();

	var UserProfileComponent = exports.UserProfileComponent = {
	  templateUrl: './views/app/components/user-profile/user-profile.component.html',
	  controller: UserProfileController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 179 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserVerificationController = function () {
	  UserVerificationController.$inject = ["$stateParams"];
	  function UserVerificationController($stateParams) {
	    'ngInject';

	    _classCallCheck(this, UserVerificationController);

	    this.alerts = [];

	    if ($stateParams.status === 'success') {
	      this.alerts.push({ type: 'success', 'title': 'تمت عملية التسجيل!', msg: 'تمت عملية تأكيد بريدك الالكتروني.' });
	    } else {
	      this.alerts.push({ type: 'danger', 'title': 'خطأ:', msg: 'خطأ في عملية تأكيد البريد الالكتروني ، حاول مرة اخرى ؟؟.' });
	    }
	  }

	  _createClass(UserVerificationController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UserVerificationController;
	}();

	var UserVerificationComponent = exports.UserVerificationComponent = {
	  templateUrl: './views/app/components/user-verification/user-verification.component.html',
	  controller: UserVerificationController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 180 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ComingSoonController = function () {
	  ComingSoonController.$inject = ["Post", "$http", "AclService", "API", "$timeout", "$stateParams", "$rootScope", "$scope", "$state", "toastr", "Upload", "$log"];
	  function ComingSoonController(Post, $http, AclService, API, $timeout, $stateParams, $rootScope, $scope, $state, toastr, Upload, $log) {
	    'ngInject';

	    _classCallCheck(this, ComingSoonController);

	    this.scope = $scope;
	    this.$state = $state;
	    this.rootScope = $rootScope;
	    this.$timeout = $timeout;
	    this.$http = $http;
	    this.API = API;
	    this.$stateParams = $stateParams;
	    this.AclService = AclService;
	    this.toastr = toastr;
	    $scope.show = "hidden";
	    this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
	    var Post = this.Post;
	    this.Post.seturl('misc/post');
	    this.Post.setediturl('misc/post-update');
	    this.Post.setskip(0);
	    this.Post.settype('post');
	    this.Post.setsubmiturl('misc/post');
	    this.Post.setimageurl('misc/image');
	    this.Post.settake(10);
	    this.Post.setSection('misc');
	    var selfy = this;

	    Post.getPost().then(function (response) {
	      $scope.dat = Post.getPostat();
	      console.log(131);
	      $scope.nopost = Post.getnopost();
	      $rootScope.busy = false;
	    });
	    console.log('aaa');
	    $scope.getPost = function () {

	      selfy.$http.get("api/misc/post/" + selfy.Post.getskip() + "/" + selfy.Post.gettake() + "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEwMDE1OCwiaXNzIjoiaHR0cDpcL1wvaW5pdGlhbC5kZXZcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE1MDE3NDc1NzQsImV4cCI6MjE0NzQ4MzY0NywibmJmIjoxNTAxNzQ3NTc0LCJqdGkiOiI1N2JlNTAzNDQ0ZGUxM2RhM2QyNDQxMWY5ZjNmODc3OCJ9.WFUHLjvnb61R6X9g3f2933RU5ITtLYAloiw5nsIJLNM").then(function (response) {
	        console.log(selfy.infiniteItems);
	        if (response.data.data == 'no post') {
	          return;
	        }
	        self.numLoaded_ = self.toLoad_;
	        // Object.assign(obj1, obj2);
	        selfy.infiniteItems = Object.assign(selfy.infiniteItems, response.data.data);

	        // selfy.infiniteItems = response.data.data
	      });

	      Post.getPost().then(function (response) {
	        $scope.dat = Post.getPostat();
	        console.log(Post.getPostat().length);
	        $scope.nopost = Post.getnopost();
	        $rootScope.busy = false;
	      });
	    };
	    $scope.toggleShow = function () {
	      $scope.show = "visible";
	    };
	    // In this example, we set up our model using a plain object.
	    // Using a class works too. All that matters is that we implement
	    // getItemAtIndex and getLength.
	    var selfy = this;
	    this.infiniteItems = {
	      numLoaded_: 0,
	      toLoad_: 0,
	      items: [],

	      // Required.
	      getItemAtIndex: function getItemAtIndex(index) {
	        if (index > this.numLoaded_) {
	          this.fetchMoreItems_(index);
	          return null;
	        }

	        return this[index];
	      },

	      // Required.
	      // For infinite scroll behavior, we always return a slightly higher
	      // number than the previously loaded items.
	      getLength: function getLength() {
	        return this.numLoaded_ + 2;
	      },

	      fetchMoreItems_: function fetchMoreItems_(index) {
	        // For demo purposes, we simulate loading more items with a timed
	        // promise. In real code, this function would likely contain an
	        // $http request.

	        if (this.toLoad_ < index) {
	          this.toLoad_ += 4;

	          selfy.$timeout(angular.noop, 300).then(angular.bind(this, function () {
	            var self = this;
	            selfy.$http.get("api/misc/post/" + this.numLoaded_ + "/" + self.toLoad_ + "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEwMDE1OCwiaXNzIjoiaHR0cDpcL1wvaW5pdGlhbC5kZXZcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE1MDE3NDc1NzQsImV4cCI6MjE0NzQ4MzY0NywibmJmIjoxNTAxNzQ3NTc0LCJqdGkiOiI1N2JlNTAzNDQ0ZGUxM2RhM2QyNDQxMWY5ZjNmODc3OCJ9.WFUHLjvnb61R6X9g3f2933RU5ITtLYAloiw5nsIJLNM").then(function (response) {
	              console.log(selfy.infiniteItems);
	              if (response.data.data == 'no post') {
	                return;
	              }
	              self.numLoaded_ = self.toLoad_;
	              // Object.assign(obj1, obj2);
	              selfy.infiniteItems = Object.assign(selfy.infiniteItems, response.data.data);

	              // selfy.infiniteItems = response.data.data
	            });
	            // Post.getPost().then(function(response) {
	            //     console.log(response.data);
	            //     this.numLoaded_ = this.toLoad_;
	            // }).bind(this);
	          }));

	          // $timeout(angular.noop, 300).then(angular.bind(this, function() {
	          //   this.numLoaded_ = this.toLoad_;
	          // }));
	        }
	      }
	    };
	    //
	  }

	  _createClass(ComingSoonController, [{
	    key: 'sayyes',
	    value: function sayyes() {
	      console.log(111111);
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return ComingSoonController;
	}();

	var ComingSoonComponent = exports.ComingSoonComponent = {
	  templateUrl: './views/app/components/coming-soon/coming-soon.component.html',
	  controller: ComingSoonController,
	  controllerAs: 'ctrl',
	  bindings: {}
	};

/***/ },
/* 181 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserEditController = function () {
	  UserEditController.$inject = ["$stateParams", "$state", "API"];
	  function UserEditController($stateParams, $state, API) {
	    'ngInject';

	    var _this = this;

	    _classCallCheck(this, UserEditController);

	    this.$state = $state;
	    this.formSubmitted = false;
	    this.alerts = [];
	    this.userRolesSelected = [];

	    if ($stateParams.alerts) {
	      this.alerts.push($stateParams.alerts);
	    }

	    var userId = $stateParams.userId;

	    var Roles = API.service('roles', API.all('users'));
	    Roles.getList().then(function (response) {
	      var systemRoles = [];
	      var roleResponse = response.plain();

	      angular.forEach(roleResponse, function (value) {
	        systemRoles.push({ id: value.id, name: value.name });
	      });

	      _this.systemRoles = systemRoles;
	    });

	    var UserData = API.service('show', API.all('users'));
	    UserData.one(userId).get().then(function (response) {
	      var userRole = [];
	      var userResponse = response.plain();

	      angular.forEach(userResponse.data.role, function (value) {
	        userRole.push(value.id);
	      });

	      response.data.role = userRole;
	      _this.usereditdata = API.copy(response);
	    });
	  }

	  _createClass(UserEditController, [{
	    key: 'save',
	    value: function save(isValid) {
	      var _this2 = this;

	      if (isValid) {
	        (function () {
	          var $state = _this2.$state;
	          _this2.usereditdata.put().then(function () {
	            var alert = { type: 'success', 'title': 'Success!', msg: 'User has been updated.' };
	            $state.go($state.current, { alerts: alert });
	          }, function (response) {
	            var alert = { type: 'error', 'title': 'Error!', msg: response.data.message };
	            $state.go($state.current, { alerts: alert });
	          });
	        })();
	      } else {
	        this.formSubmitted = true;
	      }
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UserEditController;
	}();

	var UserEditComponent = exports.UserEditComponent = {
	  templateUrl: './views/app/components/user-edit/user-edit.component.html',
	  controller: UserEditController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 182 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserPermissionsEditController = function () {
	  UserPermissionsEditController.$inject = ["$stateParams", "$state", "API"];
	  function UserPermissionsEditController($stateParams, $state, API) {
	    'ngInject';

	    var _this = this;

	    _classCallCheck(this, UserPermissionsEditController);

	    this.$state = $state;
	    this.formSubmitted = false;
	    this.alerts = [];

	    if ($stateParams.alerts) {
	      this.alerts.push($stateParams.alerts);
	    }

	    var permissionId = $stateParams.permissionId;
	    var Permission = API.service('permissions-show', API.all('users'));
	    Permission.one(permissionId).get().then(function (response) {
	      _this.permission = API.copy(response);
	    });
	  }

	  _createClass(UserPermissionsEditController, [{
	    key: 'save',
	    value: function save(isValid) {
	      var _this2 = this;

	      if (isValid) {
	        (function () {
	          var $state = _this2.$state;
	          _this2.permission.put().then(function () {
	            var alert = { type: 'success', 'title': 'Success!', msg: 'Permission has been updated.' };
	            $state.go($state.current, { alerts: alert });
	          }, function (response) {
	            var alert = { type: 'error', 'title': 'Error!', msg: response.data.message };
	            $state.go($state.current, { alerts: alert });
	          });
	        })();
	      } else {
	        this.formSubmitted = true;
	      }
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UserPermissionsEditController;
	}();

	var UserPermissionsEditComponent = exports.UserPermissionsEditComponent = {
	  templateUrl: './views/app/components/user-permissions-edit/user-permissions-edit.component.html',
	  controller: UserPermissionsEditController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 183 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserPermissionsAddController = function () {
	  UserPermissionsAddController.$inject = ["API", "$state", "$stateParams"];
	  function UserPermissionsAddController(API, $state, $stateParams) {
	    'ngInject';

	    _classCallCheck(this, UserPermissionsAddController);

	    this.$state = $state;
	    this.formSubmitted = false;
	    this.API = API;
	    this.alerts = [];

	    if ($stateParams.alerts) {
	      this.alerts.push($stateParams.alerts);
	    }
	  }

	  _createClass(UserPermissionsAddController, [{
	    key: 'save',
	    value: function save(isValid) {
	      var _this = this;

	      this.$state.go(this.$state.current, {}, { alerts: 'test' });
	      if (isValid) {
	        (function () {
	          var Permissions = _this.API.service('permissions', _this.API.all('users'));
	          var $state = _this.$state;

	          Permissions.post({
	            'name': _this.name,
	            'slug': _this.slug,
	            'description': _this.description
	          }).then(function () {
	            var alert = { type: 'success', 'title': 'Success!', msg: 'Permission has been added.' };
	            $state.go($state.current, { alerts: alert });
	          }, function (response) {
	            var alert = { type: 'error', 'title': 'Error!', msg: response.data.message };
	            $state.go($state.current, { alerts: alert });
	          });
	        })();
	      } else {
	        this.formSubmitted = true;
	      }
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UserPermissionsAddController;
	}();

	var UserPermissionsAddComponent = exports.UserPermissionsAddComponent = {
	  templateUrl: './views/app/components/user-permissions-add/user-permissions-add.component.html',
	  controller: UserPermissionsAddController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 184 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserPermissionsController = function () {
	  UserPermissionsController.$inject = ["$scope", "$state", "$compile", "DTOptionsBuilder", "DTColumnBuilder", "API"];
	  function UserPermissionsController($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
	    'ngInject';

	    var _this = this;

	    _classCallCheck(this, UserPermissionsController);

	    this.API = API;
	    this.$state = $state;

	    var Permissions = this.API.service('permissions', this.API.all('users'));

	    Permissions.getList().then(function (response) {
	      var dataSet = response.plain();

	      _this.dtOptions = DTOptionsBuilder.newOptions().withOption('data', dataSet).withOption('createdRow', createdRow).withOption('responsive', true).withBootstrap();

	      _this.dtColumns = [DTColumnBuilder.newColumn('id').withTitle('ID'), DTColumnBuilder.newColumn('name').withTitle('Name'), DTColumnBuilder.newColumn('slug').withTitle('Slug'), DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(actionsHtml)];

	      _this.displayTable = true;
	    });

	    var createdRow = function createdRow(row) {
	      $compile(angular.element(row).contents())($scope);
	    };

	    var actionsHtml = function actionsHtml(data) {
	      return '\n                <a class="btn btn-xs btn-warning" ui-sref="app.userpermissionsedit({permissionId: ' + data.id + '})">\n                    <i class="fa fa-edit"></i>\n                </a>\n                &nbsp\n                <button class="btn btn-xs btn-danger" ng-click="vm.delete(' + data.id + ')">\n                    <i class="fa fa-trash-o"></i>\n                </button>';
	    };
	  }

	  _createClass(UserPermissionsController, [{
	    key: 'delete',
	    value: function _delete(permissionId) {
	      var API = this.API;
	      var $state = this.$state;

	      swal({
	        title: 'Are you sure?',
	        text: 'You will not be able to recover this data!',
	        type: 'warning',
	        showCancelButton: true,
	        confirmButtonColor: '#DD6B55',
	        confirmButtonText: 'Yes, delete it!',
	        closeOnConfirm: false,
	        showLoaderOnConfirm: true,
	        html: false
	      }, function () {
	        API.one('users').one('permissions', permissionId).remove().then(function () {
	          swal({
	            title: 'Deleted!',
	            text: 'User Permission has been deleted.',
	            type: 'success',
	            confirmButtonText: 'OK',
	            closeOnConfirm: true
	          }, function () {
	            $state.reload();
	          });
	        });
	      });
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UserPermissionsController;
	}();

	var UserPermissionsComponent = exports.UserPermissionsComponent = {
	  templateUrl: './views/app/components/user-permissions/user-permissions.component.html',
	  controller: UserPermissionsController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 185 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserRolesEditController = function () {
	  UserRolesEditController.$inject = ["$stateParams", "$state", "API"];
	  function UserRolesEditController($stateParams, $state, API) {
	    'ngInject';

	    var _this = this;

	    _classCallCheck(this, UserRolesEditController);

	    this.$state = $state;
	    this.formSubmitted = false;
	    this.alerts = [];

	    if ($stateParams.alerts) {
	      this.alerts.push($stateParams.alerts);
	    }

	    var Permissions = API.service('permissions', API.all('users'));

	    Permissions.getList().then(function (response) {
	      var permissionList = [];
	      var permissionResponse = response.plain();

	      angular.forEach(permissionResponse, function (value) {
	        permissionList.push({ id: value.id, name: value.name });
	      });

	      _this.systemPermissions = permissionList;
	    });

	    var roleId = $stateParams.roleId;
	    var Role = API.service('roles-show', API.all('users'));
	    Role.one(roleId).get().then(function (response) {
	      var rolePermissions = [];

	      angular.forEach(response.data.permissions, function (value) {
	        rolePermissions.push(value.id);
	      });

	      response.data.permissions = rolePermissions;

	      _this.role = API.copy(response);
	    });
	  }

	  _createClass(UserRolesEditController, [{
	    key: 'save',
	    value: function save(isValid) {
	      var _this2 = this;

	      if (isValid) {
	        (function () {
	          var $state = _this2.$state;
	          _this2.role.put().then(function () {
	            var alert = { type: 'success', 'title': 'Success!', msg: 'Role has been updated.' };
	            $state.go($state.current, { alerts: alert });
	          }, function (response) {
	            var alert = { type: 'error', 'title': 'Error!', msg: response.data.message };
	            $state.go($state.current, { alerts: alert });
	          });
	        })();
	      } else {
	        this.formSubmitted = true;
	      }
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UserRolesEditController;
	}();

	var UserRolesEditComponent = exports.UserRolesEditComponent = {
	  templateUrl: './views/app/components/user-roles-edit/user-roles-edit.component.html',
	  controller: UserRolesEditController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 186 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserRolesAddController = function () {
	  UserRolesAddController.$inject = ["API", "$state", "$stateParams"];
	  function UserRolesAddController(API, $state, $stateParams) {
	    'ngInject';

	    _classCallCheck(this, UserRolesAddController);

	    this.$state = $state;
	    this.formSubmitted = false;
	    this.API = API;
	    this.alerts = [];

	    if ($stateParams.alerts) {
	      this.alerts.push($stateParams.alerts);
	    }
	  }

	  _createClass(UserRolesAddController, [{
	    key: 'save',
	    value: function save(isValid) {
	      var _this = this;

	      this.$state.go(this.$state.current, {}, { alerts: 'test' });
	      if (isValid) {
	        (function () {
	          var Roles = _this.API.service('roles', _this.API.all('users'));
	          var $state = _this.$state;

	          Roles.post({
	            'role': _this.role,
	            'slug': _this.slug,
	            'description': _this.description
	          }).then(function () {
	            var alert = { type: 'success', 'title': 'Success!', msg: 'Role has been added.' };
	            $state.go($state.current, { alerts: alert });
	          }, function (response) {
	            var alert = { type: 'error', 'title': 'Error!', msg: response.data.message };
	            $state.go($state.current, { alerts: alert });
	          });
	        })();
	      } else {
	        this.formSubmitted = true;
	      }
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UserRolesAddController;
	}();

	var UserRolesAddComponent = exports.UserRolesAddComponent = {
	  templateUrl: './views/app/components/user-roles-add/user-roles-add.component.html',
	  controller: UserRolesAddController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 187 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserRolesController = function () {
	  UserRolesController.$inject = ["$scope", "$state", "$compile", "DTOptionsBuilder", "DTColumnBuilder", "API"];
	  function UserRolesController($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
	    'ngInject';

	    var _this = this;

	    _classCallCheck(this, UserRolesController);

	    this.API = API;
	    this.$state = $state;

	    var Roles = this.API.service('roles', this.API.all('users'));

	    Roles.getList().then(function (response) {
	      var dataSet = response.plain();

	      _this.dtOptions = DTOptionsBuilder.newOptions().withOption('data', dataSet).withOption('createdRow', createdRow).withOption('responsive', true).withBootstrap();

	      _this.dtColumns = [DTColumnBuilder.newColumn('id').withTitle('ID'), DTColumnBuilder.newColumn('name').withTitle('Name'), DTColumnBuilder.newColumn('slug').withTitle('Slug'), DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(actionsHtml)];

	      _this.displayTable = true;
	    });

	    var createdRow = function createdRow(row) {
	      $compile(angular.element(row).contents())($scope);
	    };

	    var actionsHtml = function actionsHtml(data) {
	      return '\n                <a class="btn btn-xs btn-warning" ui-sref="app.userrolesedit({roleId: ' + data.id + '})">\n                    <i class="fa fa-edit"></i>\n                </a>\n                &nbsp\n                <button class="btn btn-xs btn-danger" ng-click="vm.delete(' + data.id + ')">\n                    <i class="fa fa-trash-o"></i>\n                </button>';
	    };
	  }

	  _createClass(UserRolesController, [{
	    key: 'delete',
	    value: function _delete(roleId) {
	      var API = this.API;
	      var $state = this.$state;

	      swal({
	        title: 'Are you sure?',
	        text: 'You will not be able to recover this data!',
	        type: 'warning',
	        showCancelButton: true,
	        confirmButtonColor: '#DD6B55',
	        confirmButtonText: 'Yes, delete it!',
	        closeOnConfirm: false,
	        showLoaderOnConfirm: true,
	        html: false
	      }, function () {
	        API.one('users').one('roles', roleId).remove().then(function () {
	          swal({
	            title: 'Deleted!',
	            text: 'User Role has been deleted.',
	            type: 'success',
	            confirmButtonText: 'OK',
	            closeOnConfirm: true
	          }, function () {
	            $state.reload();
	          });
	        });
	      });
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UserRolesController;
	}();

	var UserRolesComponent = exports.UserRolesComponent = {
	  templateUrl: './views/app/components/user-roles/user-roles.component.html',
	  controller: UserRolesController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 188 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserListsController = function () {
	  UserListsController.$inject = ["$scope", "$state", "$compile", "DTOptionsBuilder", "DTColumnBuilder", "API"];
	  function UserListsController($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
	    'ngInject';

	    var _this = this;

	    _classCallCheck(this, UserListsController);

	    this.API = API;
	    this.$state = $state;

	    var Users = this.API.service('users');

	    Users.getList().then(function (response) {
	      var dataSet = response.plain();

	      _this.dtOptions = DTOptionsBuilder.newOptions().withOption('data', dataSet).withOption('createdRow', createdRow).withOption('responsive', true).withBootstrap();

	      _this.dtColumns = [DTColumnBuilder.newColumn('id').withTitle('ID'), DTColumnBuilder.newColumn('name').withTitle('Name'), DTColumnBuilder.newColumn('email').withTitle('Email'), DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(actionsHtml)];

	      _this.displayTable = true;
	    });

	    var createdRow = function createdRow(row) {
	      $compile(angular.element(row).contents())($scope);
	    };

	    var actionsHtml = function actionsHtml(data) {
	      return '\n                <a class="btn btn-xs btn-warning" ui-sref="app.useredit({userId: ' + data.id + '})">\n                    <i class="fa fa-edit"></i>\n                </a>\n                &nbsp\n                <button class="btn btn-xs btn-danger" ng-click="vm.delete(' + data.id + ')">\n                    <i class="fa fa-trash-o"></i>\n                </button>';
	    };
	  }

	  _createClass(UserListsController, [{
	    key: 'delete',
	    value: function _delete(userId) {
	      var API = this.API;
	      var $state = this.$state;

	      swal({
	        title: 'Are you sure?',
	        text: 'You will not be able to recover this data!',
	        type: 'warning',
	        showCancelButton: true,
	        confirmButtonColor: '#DD6B55',
	        confirmButtonText: 'Yes, delete it!',
	        closeOnConfirm: false,
	        showLoaderOnConfirm: true,
	        html: false
	      }, function () {
	        API.one('users').one('user', userId).remove().then(function () {
	          swal({
	            title: 'Deleted!',
	            text: 'User Permission has been deleted.',
	            type: 'success',
	            confirmButtonText: 'OK',
	            closeOnConfirm: true
	          }, function () {
	            $state.reload();
	          });
	        });
	      });
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UserListsController;
	}();

	var UserListsComponent = exports.UserListsComponent = {
	  templateUrl: './views/app/components/user-lists/user-lists.component.html',
	  controller: UserListsController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 189 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DashboardController = function DashboardController($scope) {
	  'ngInject';

	  _classCallCheck(this, DashboardController);

	  $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
	  $scope.series = ['Series A', 'Series B'];
	  $scope.data = [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]];

	  $scope.onClick = function () {};

	  $scope.pieLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
	  $scope.pieData = [300, 500, 100];
	};
	DashboardController.$inject = ["$scope"];

	var DashboardComponent = exports.DashboardComponent = {
	  templateUrl: './views/app/components/dashboard/dashboard.component.html',
	  controller: DashboardController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 190 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NavSidebarController = function () {
	  NavSidebarController.$inject = ["AclService", "ContextService"];
	  function NavSidebarController(AclService, ContextService) {
	    'ngInject';

	    _classCallCheck(this, NavSidebarController);

	    var navSideBar = this;
	    this.can = AclService.can;

	    ContextService.me(function (data) {
	      navSideBar.userData = data;
	    });
	  }

	  _createClass(NavSidebarController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return NavSidebarController;
	}();

	var NavSidebarComponent = exports.NavSidebarComponent = {
	  templateUrl: './views/app/components/nav-sidebar/nav-sidebar.component.html',
	  controller: NavSidebarController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 191 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NavHeaderController = function () {
	  NavHeaderController.$inject = ["$rootScope", "ContextService"];
	  function NavHeaderController($rootScope, ContextService) {
	    'ngInject';

	    _classCallCheck(this, NavHeaderController);

	    var navHeader = this;

	    ContextService.me(function (data) {
	      navHeader.userData = data;
	    });
	  }

	  _createClass(NavHeaderController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return NavHeaderController;
	}();

	var NavHeaderComponent = exports.NavHeaderComponent = {
	  templateUrl: './views/app/components/nav-header/nav-header.component.html',
	  controller: NavHeaderController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 192 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LoginLoaderController = function () {
	  LoginLoaderController.$inject = ["$state", "$auth", "API", "AclService"];
	  function LoginLoaderController($state, $auth, API, AclService) {
	    'ngInject';

	    _classCallCheck(this, LoginLoaderController);

	    API.oneUrl('authenticate').one('user').get().then(function (response) {
	      if (!(response.status_code == 401)) {
	        var data = response.data;
	        angular.forEach(data.userRole, function (value) {
	          AclService.attachRole(value);
	        });
	        AclService.setAbilities(data.abilities);
	        $auth.setToken(data.token);
	        console.log(document.referrer);
	        // $state.go('app.landing')
	        window.location.href = "/";
	      }
	    });
	  }

	  _createClass(LoginLoaderController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return LoginLoaderController;
	}();

	var LoginLoaderComponent = exports.LoginLoaderComponent = {
	  templateUrl: './views/app/components/login-loader/login-loader.component.html',
	  controller: LoginLoaderController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 193 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ResetPasswordController = function () {
	  ResetPasswordController.$inject = ["API", "$state", "toastr"];
	  function ResetPasswordController(API, $state, toastr) {
	    'ngInject';

	    _classCallCheck(this, ResetPasswordController);

	    this.API = API;
	    this.$state = $state;
	    this.alerts = [];
	    this.toastr = toastr;
	  }

	  _createClass(ResetPasswordController, [{
	    key: '$onInit',
	    value: function $onInit() {
	      this.password = '';
	      this.password_confirmation = '';
	      this.isValidToken = false;
	      this.formSubmitted = false;

	      this.verifyToken();
	    }
	  }, {
	    key: 'verifyToken',
	    value: function verifyToken() {
	      var _this = this;

	      var email = this.$state.params.email;
	      var token = this.$state.params.token;

	      this.API.all('auth/password').get('verify', {
	        email: email, token: token }).then(function () {
	        _this.isValidToken = true;
	      }, function () {
	        _this.$state.go('app.landing');
	      });
	    }
	  }, {
	    key: 'submit',
	    value: function submit(isValid) {
	      var _this2 = this;

	      if (isValid) {
	        this.alerts = [];
	        var data = {
	          email: this.$state.params.email,
	          token: this.$state.params.token,
	          password: this.password,
	          password_confirmation: this.password_confirmation
	        };

	        this.API.all('auth/password/reset').post(data).then(function () {
	          _this2.$state.go('logins.login.index', { successMsg: 'تم تغيير كلمة المرور ، تستطيعالآن تسجيل الدخول.' });
	        }, function (res) {
	          _this2.toastr.error(res.data.errors.password[0]);
	          //let alrtArr = []
	          // angular.forEach(res.data.errors, function (value) {
	          //   //alrtArr = {type: 'error', 'title': 'خطأ!', msg: value[0]}
	          //   //this.toastr.error(value[0]);
	          // })
	          //this.alerts.push(alrtArr)
	        });
	      }
	    }
	  }]);

	  return ResetPasswordController;
	}();

	var ResetPasswordComponent = exports.ResetPasswordComponent = {
	  templateUrl: './views/app/components/reset-password/reset-password.component.html',
	  controller: ResetPasswordController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 194 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ForgotPasswordController = function () {
	  ForgotPasswordController.$inject = ["API", "$state", "toastr"];
	  function ForgotPasswordController(API, $state, toastr) {
	    'ngInject';

	    _classCallCheck(this, ForgotPasswordController);

	    this.API = API;
	    this.$state = $state;
	    this.toastr = toastr;
	  }

	  _createClass(ForgotPasswordController, [{
	    key: '$onInit',
	    value: function $onInit() {
	      this.email = '';
	    }
	  }, {
	    key: 'submit',
	    value: function submit() {
	      var _this = this;

	      this.API.all('auth/password/email').post({
	        email: this.email
	      }).then(function () {
	        _this.$state.go('logins.login.index', { successMsg: 'لقد ارسلنا لك رسالة لتغيير كلمة المرور ، الرجاءمراجعة بريدك الالكترونيلاتمام العملية.' });
	      }, function (response) {
	        _this.toastr.error(response.data.errors.email[0]);
	      });
	    }
	  }]);

	  return ForgotPasswordController;
	}();

	var ForgotPasswordComponent = exports.ForgotPasswordComponent = {
	  templateUrl: './views/app/components/forgot-password/forgot-password.component.html',
	  controller: ForgotPasswordController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 195 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LoginFormController = function () {
	  LoginFormController.$inject = ["$rootScope", "$auth", "$state", "$stateParams", "API", "AclService"];
	  function LoginFormController($rootScope, $auth, $state, $stateParams, API, AclService) {
	    'ngInject';

	    _classCallCheck(this, LoginFormController);

	    delete $rootScope.me;

	    this.$auth = $auth;
	    this.$state = $state;
	    this.$stateParams = $stateParams;
	    this.AclService = AclService;

	    this.registerSuccess = $stateParams.registerSuccess;
	    this.successMsg = $stateParams.successMsg;
	    this.loginfailed = false;
	    this.unverified = false;
	  }

	  _createClass(LoginFormController, [{
	    key: '$onInit',
	    value: function $onInit() {
	      this.email = '';
	      this.password = '';
	    }
	  }, {
	    key: 'login',
	    value: function login() {
	      var _this = this;

	      this.loginfailed = false;
	      this.unverified = false;

	      var user = {
	        email: this.email,
	        password: this.password
	      };

	      this.$auth.login(user).then(function (response) {
	        var data = response.data.data;
	        var AclService = _this.AclService;

	        angular.forEach(data.userRole, function (value) {
	          AclService.attachRole(value);
	        });

	        AclService.setAbilities(data.abilities);
	        _this.$auth.setToken(response.data);
	        _this.$state.go('app.landing');
	      }).catch(this.failedLogin.bind(this));
	    }
	  }, {
	    key: 'failedLogin',
	    value: function failedLogin(res) {
	      if (res.status == 401) {
	        this.loginfailed = true;
	      } else {
	        if (res.data.errors.message[0] == 'Email Unverified') {
	          this.unverified = true;
	        }
	      }
	    }
	  }]);

	  return LoginFormController;
	}();

	var LoginFormComponent = exports.LoginFormComponent = {
	  templateUrl: './views/app/components/login-form/login-form.component.html',
	  controller: LoginFormController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _routeBody = __webpack_require__(197);

	var _passwordVerify = __webpack_require__(198);

	var _myEnter = __webpack_require__(199);

	var _edView = __webpack_require__(200);

	var _hA = __webpack_require__(201);

	var _postRepeat = __webpack_require__(202);

	var _postNew = __webpack_require__(203);

	var _commentRepeat = __webpack_require__(204);

	var _rM = __webpack_require__(205);

	var _activeFace = __webpack_require__(206);

	var _fileUpload = __webpack_require__(207);

	var _imgModel = __webpack_require__(208);

	var _deleteBox = __webpack_require__(209);

	var _scrollHere = __webpack_require__(210);

	var _lightGallery = __webpack_require__(211);

	var _youtubeVideo = __webpack_require__(212);

	var _autoGrow = __webpack_require__(213);

	var _tagsChips = __webpack_require__(214);

	var _classyLoader = __webpack_require__(215);

	var _metaTag = __webpack_require__(216);

	var _videoPost = __webpack_require__(217);

	var _videoPostPopup = __webpack_require__(218);

	var _userContent = __webpack_require__(219);

	var _liveUrl = __webpack_require__(220);

	var _routeHtml = __webpack_require__(221);

	var _chatBox = __webpack_require__(222);

	var _closeMenu = __webpack_require__(223);

	var _emojoFace = __webpack_require__(224);

	var _whenScrolled = __webpack_require__(225);

	var _scrollBottomOn = __webpack_require__(226);

	var _postInstitute = __webpack_require__(227);

	var _examRepeater = __webpack_require__(228);

	angular.module('app.components').directive('routeBody', _routeBody.routeBodyClassComponent).directive('passwordVerify', _passwordVerify.PasswordVerifyClassComponent).directive('myEnter', _myEnter.myEnterClassComponent).directive('edView', _edView.edViewClassComponent).directive('hA', _hA.hAClassComponent).directive('postRepeat', _postRepeat.postRepeatClassComponent).directive('postNew', _postNew.postNewClassComponent).directive('commentRepeat', _commentRepeat.commentRepeatClassComponent).directive('rM', _rM.rMClassComponent).directive('activeFace', _activeFace.activeFaceClassComponent).directive('fileUpload', _fileUpload.fileUploadClassComponent).directive('imgModel', _imgModel.imgModelClassComponent).directive('deleteBox', _deleteBox.deleteBoxClassComponent).directive('scrollHere', _scrollHere.scrollHereClassComponent).directive('lightGallery', _lightGallery.lightGalleryClassComponent).directive('youtubeVideo', _youtubeVideo.youtubeVideoClassComponent).directive('autoGrow', _autoGrow.autoGrowClassComponent).directive('tagsChips', _tagsChips.tagsChipsClassComponent).directive('classyLoader', _classyLoader.classyLoaderClassComponent).directive('metaTag', _metaTag.metaTagClassComponent).directive('videoPost', _videoPost.videoPostClassComponent).directive('videoPostPopup', _videoPostPopup.videoPostPopupClassComponent).directive('userContent', _userContent.userContentClassComponent).directive('liveUrl', _liveUrl.liveUrlClassComponent).directive('routeHtml', _routeHtml.routeHtmlClassComponent).directive('chatBox', _chatBox.chatBoxClassComponent).directive('closeMenu', _closeMenu.closeMenuClassComponent).directive('emojoFace', _emojoFace.emojoFaceClassComponent).directive('whenScrolled', _whenScrolled.whenScrolledClassComponent).directive('scrollBottomOn', _scrollBottomOn.scrollBottomOnClassComponent).directive('postInstitute', _postInstitute.postInstituteClassComponent).directive('examRepeater', _examRepeater.examRepeaterClassComponent);

/***/ },
/* 197 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	routeBodyClass.$inject = ['$rootScope'];
	function routeBodyClass($rootScope) {
	  return {
	    scope: { ngModel: '=ngModel' },
	    link: function routeBodyClassLink(scope, elem) {
	      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
	        // eslint-disable-line angular/on-watch
	        var fromClassnames = angular.isDefined(fromState.data) && angular.isDefined(fromState.data.bodyClass) ? fromState.data.bodyClass : null;
	        var toClassnames = angular.isDefined(toState.data) && angular.isDefined(toState.data.bodyClass) ? toState.data.bodyClass : null;

	        if (fromClassnames != toClassnames) {
	          if (fromClassnames) {
	            elem.removeClass(fromClassnames);
	          }

	          if (toClassnames) {
	            elem.addClass(toClassnames);
	          }
	        }
	      });
	    },
	    restrict: 'EA'
	  };
	}

	var routeBodyClassComponent = exports.routeBodyClassComponent = routeBodyClass;

/***/ },
/* 198 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function passwordVerifyClass() {
	  return {
	    require: 'ngModel',
	    scope: {
	      passwordVerify: '='
	    },
	    link: function link(scope, element, attrs, ctrl) {
	      scope.$watch(function () {
	        var combined;

	        if (scope.passwordVerify || ctrl.$viewValue) {
	          combined = scope.passwordVerify + '_' + ctrl.$viewValue;
	        }

	        return combined;
	      }, function (value) {
	        if (value) {
	          ctrl.$parsers.unshift(function (viewValue) {
	            var origin = scope.passwordVerify;

	            if (origin !== viewValue) {
	              ctrl.$setValidity('passwordVerify', false);
	              return undefined;
	            } else {
	              ctrl.$setValidity('passwordVerify', true);
	              return viewValue;
	            }
	          });
	        }
	      });
	    }
	  };
	}

	var PasswordVerifyClassComponent = exports.PasswordVerifyClassComponent = passwordVerifyClass;

/***/ },
/* 199 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function myEnterClass() {
	    return function (scope, element, attrs) {
	        element.bind(" keypress", function (event) {
	            //var code = event.keyCode || event.which;
	            if (event.which === 13) {
	                if (!event.shiftKey) {
	                    event.preventDefault();
	                    // scope.$apply(function (){
	                    scope.$eval(attrs.myEnter);
	                    element[0].value = '';
	                    //});
	                }
	            }
	        });
	    };
	}
	var myEnterClassComponent = exports.myEnterClassComponent = myEnterClass;

/***/ },
/* 200 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	edViewClass.$inject = ['$rootScope'];
	function edViewClass($rootScope) {
	    return {
	        restrict: 'EA',
	        priority: -1, // give it lower priority than built-in ng-model
	        link: function link(scope, elements, attr) {
	            elements.trigger("change"); //use this for jQuery
	            elements.on('change', function (e) {
	                //console.log('change' + e.target.value);
	                $rootScope.posttitle = e.target.attributes[6].value;
	                $rootScope.postdescription = e.target.attributes[7].value;
	                $rootScope.posturl = e.target.attributes[8].value;
	                $rootScope.postimage = e.target.attributes[11].value;
	                $rootScope.post = e.target.value;
	            });
	            elements.on('keyup', function (e) {
	                //console.log('keyup' + e.target.value);
	                $rootScope.posttitle = e.target.attributes[6].value;
	                $rootScope.postdescription = e.target.attributes[7].value;
	                $rootScope.posturl = e.target.attributes[8].value;
	                $rootScope.postimage = e.target.attributes[11].value;
	                $rootScope.post = e.target.value;
	            });
	        }
	    };
	}
	var edViewClassComponent = exports.edViewClassComponent = edViewClass;

/***/ },
/* 201 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	hAClass.$inject = ['$rootScope'];
	function hAClass($rootScope) {
	    return {
	        restrict: 'EA',
	        priority: -1,
	        link: function link(scope, elements, attr) {
	            elements.trigger("change");
	            elements.on('change keyup paste blur', function (e) {
	                // $rootScope.posttitle = e.target.attributes[6].value;
	                // $rootScope.postdescription =e.target.attributes[7].value;
	                // $rootScope.posturl = e.target.attributes[8].value;
	                // $rootScope.postimage = e.target.attributes[9].value;
	                $rootScope.post = e.target;
	                //  console.log($rootScope);                
	            });
	            $('.close').on('click', function (e) {
	                //console.log('keyup' + e.target.value);
	                $rootScope.posttitle = '';
	                $rootScope.postdescription = '';
	                $rootScope.posturl = '';
	                $rootScope.postimage = '';
	                $rootScope.post = '';
	                //  console.log( $rootScope);
	            });
	        }
	    };
	}
	var hAClassComponent = exports.hAClassComponent = hAClass;

/***/ },
/* 202 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	postRepeatClass.$inject = ['$rootScope', 'API', 'moment', '$state'];
	function postRepeatClass($rootScope, API, moment, $state) {
	  // this.dat = $rootScope.getPost('me/post');
	  var post_template = $state.current.data.template;
	  console.log($state.current.data);
	  return {
	    restrict: 'EA',
	    priority: -1,
	    scope: true,
	    link: function link(scope, elements, attr) {
	      // console.log(scope) 
	      $rootScope.dat = [];
	      $rootScope.post_enabled = true;
	      $rootScope.comment_enabled = true;
	      $rootScope.post_delete = true;
	      var a = [];
	      $rootScope.post_url = attr.reqUrl;
	      $rootScope.type = attr.reqType;
	      //post_template = attr.template;
	      $rootScope.post_template = attr.template;
	      $rootScope.postlocation = attr.reqParent;
	      $rootScope.getPost(attr.reqUrl, 0, 2);
	      $rootScope.skip = 2;
	      $rootScope.take = 5;
	    },
	    templateUrl: './pages/post/' + post_template + '.page.html'
	  };
	}
	var postRepeatClassComponent = exports.postRepeatClassComponent = postRepeatClass;

/***/ },
/* 203 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	postNewClass.$inject = ['$rootScope', 'API', 'moment'];
	function postNewClass($rootScope, API, moment) {
	  return {
	    restrict: 'EA',
	    link: function link(scope, elements, attr) {
	      $rootScope.post_url = attr.reqUrl;
	      $rootScope.type = attr.reqType;
	      $rootScope.postlocation = attr.reqParent;
	    },
	    templateUrl: './pages/post/post-New.page.html'
	  };
	}
	var postNewClassComponent = exports.postNewClassComponent = postNewClass;

/***/ },
/* 204 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	commentRepeatClass.$inject = ['$rootScope', 'API', 'moment'];
	function commentRepeatClass($rootScope, API, moment) {
	    // this.dat = $rootScope.getPost('me/post'); 

	    return {
	        restrict: 'EA',
	        link: function link(scope, elements, attr) {
	            var a = [];
	            scope.comment_type = attr.reqUrl;
	            // API.all('me/comment/'+attr.commentId +'/'+ attr.reqUrl).get('').then((response) => {
	            //     a=response.data;
	            //    //console.log(a);
	            //    if (a.length>0) {
	            //      // console.log(moment(response.data[0].created_at, "YYYY-MM-DD hh:mm:ss").fromNow());
	            //       } 
	            //       // console.log(response.data)
	            //     // console.log('getting comments');
	            //      // scope.dat[attr.commentIndex].comment =a; 
	            //    //  console.log('scope');
	            //   //  console.log(scope);
	            //   //  console.log(attr.reqUrl); 
	            //    // console.log(attr.commentId); 
	            //      },(response) =>{
	            //     a = response.data;
	            //      console.log('error in getting comments');
	            //     }); 
	        },
	        templateUrl: './pages/comment/comment.page.html'
	    };
	}
	var commentRepeatClassComponent = exports.commentRepeatClassComponent = commentRepeatClass;

/***/ },
/* 205 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	rMClass.$inject = ['$rootScope'];
	function rMClass($rootScope) {
	  return {
	    restrict: 'EA',
	    priority: 9,
	    link: function link(scope, elements, attr) {

	      // elements.on('change', function (e) {
	      //  $rootScope.post = e.target;
	      // // console.log( this.scope);                
	      //  })
	      $('.read-more').readmore({
	        collapsedHeight: 65,
	        moreLink: '<a href="#">إقرأ المزيد...</a>',
	        lessLink: '<a href="#">إقرا أقل...</a>',
	        blockCSS: 'padding: 0 12px;'
	      });
	      // $scope=this.scope;
	    }
	  };
	}
	var rMClassComponent = exports.rMClassComponent = rMClass;

/***/ },
/* 206 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	activeFaceClass.$inject = ['$rootScope'];
	function activeFaceClass($rootScope) {
	    return {
	        restrict: 'EA',
	        priority: 9,
	        link: function link(scope, elements, attr) {
	            elements.on('click', function (e) {
	                // console.log(e);
	                var a = e.currentTarget;
	                if ($(a).hasClass("active")) {
	                    a.attributes[1].value = 'facs-size';
	                } else {
	                    a.attributes[1].value = 'facs-size active';
	                }
	            });
	        }
	    };
	}
	var activeFaceClassComponent = exports.activeFaceClassComponent = activeFaceClass;

/***/ },
/* 207 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	fileUploadClass.$inject = ['$rootScope'];
	function fileUploadClass($rootScope) {
	  return {
	    restrict: "EA",
	    transclude: true,
	    scope: {
	      onChange: "="
	    },
	    template: '<input type="file" name="file" id="file-upload"/><label for="file-upload" class="custom-file-upload"><i class="md md-attach-file upload-image-icon"></i></label>',
	    link: function link(scope, element, attrs) {
	      element.bind("change", function () {
	        scope.onChange(element.children()[0].files);
	      });
	    }
	  };
	}
	var fileUploadClassComponent = exports.fileUploadClassComponent = fileUploadClass;

/***/ },
/* 208 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	imgModelClass.$inject = ['$rootScope'];
	function imgModelClass($rootScope) {
	    return {
	        restrict: 'EA',
	        priority: 1,
	        link: function link(scope, elements, attr) {
	            elements.click(function () {
	                var src = elements.attr("src");
	                $(".img-mirror").attr("src", src);
	            });
	        }
	    };
	}
	var imgModelClassComponent = exports.imgModelClassComponent = imgModelClass;

/***/ },
/* 209 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
					value: true
	});
	deleteBoxClass.$inject = ['$rootScope'];
	function deleteBoxClass($rootScope) {
					return {
									restrict: 'EA',
									priority: 1,
									link: function link(scope, elements, attr) {
													elements.click(function () {
																	$(".dropdown").removeClass("open");
													});
													elements.on("click", function () {
																	//console.log(attr);
																	var postId = $(this).attr('data-post-id');
																	var postkey = $(this).attr('data-post-key');
																	var postindex = $(this).attr('data-post-index');
																	var postType = $(this).attr('data-post-type');

																	//var postType2 = $(this).attr('comment-index');
																	var postType2 = $(this).closest("comment-repeat").attr('comment-index');
																	console.log(postType2);
																	console.log(postType);
																	switch (postType) {
																					case 'files':
																									var postlocation = 'virtualclass-files';
																									break;
																					case 'homework':
																									var postlocation = 'virtualclass-homework';
																									break;
																					case 'exam':
																									var postlocation = 'virtualclass-exam';
																									break;
																					case 'post':
																									var postlocation = $("post-repeat").attr('req-parent');
																									break;
																					case 'classpost':
																									var postlocation = $("post-repeat").attr('req-parent');
																									break;
																					case 'comment':
																									var postlocation = $rootScope.controller;
																									break;
																	}
																	var postScope = angular.element(postlocation).scope();
																	var modelTitle = '';
																	var modelTitleConf = '';
																	//console.log(postId);
																	//console.log(postkey);
																	//console.log(postlocation);
																	// console.log(postType);
																	// console.log(postType2);
																	//console.log(postScope);
																	if (postType == 'comment') {
																					modelTitle = "هل انت متأكد من حذف التعليق ؟";
																					modelTitleConf = "تم حذف التعليق";
																	} else if (postType == 'files') {
																					modelTitle = "هل انت متأكد من حذف الملف ؟";
																					modelTitleConf = "تم حذف الملف";
																	} else if (postType == 'homework') {
																					modelTitle = "هل انت متأكد من حذف الواجب ؟";
																					modelTitleConf = "تم حذف الواجب";
																	} else if (postType == 'exam') {
																					modelTitle = "هل انت متأكد من حذف الامتحان ؟";
																					modelTitleConf = "تم حذف الامتحان";
																	} else {
																					modelTitle = "هل انت متأكد من حذف المنشور ؟";
																					modelTitleConf = "تم حذف المنشور";
																	}
																	swal({
																					title: modelTitle,
																					type: "warning",
																					showCancelButton: true,
																					confirmButtonColor: "#DD6B55",
																					confirmButtonText: "نعم, احذفه",
																					cancelButtonText: "لا, الغاء العمليه",
																					closeOnConfirm: false,
																					closeOnCancel: true,
																					showLoaderOnConfirm: true
																	}, function (isConfirm) {
																					if (isConfirm) {
																									swal({
																													title: modelTitleConf,
																													type: "success",
																													timer: 2000,
																													showConfirmButton: false
																									});
																									postScope.$root.deleteNode(postId, postkey, postScope, postType, postType2);
																									//elements.closest(".for-delete").hide();
																									//  $("#name="post-{{key}}"")
																					} else {
																									swal({
																													title: "لقد تم الغاء عملية الحذف :)",
																													type: "error",
																													timer: 2000,
																													showConfirmButton: false
																									});
																					}
																	});
													});
													//Warning Message
													$('#sa-warning').click(function () {
																	swal({
																					title: "هل انت متأكد؟؟",
																					text: modelTitle,
																					type: "warning",
																					showCancelButton: true,
																					confirmButtonColor: "#DD6B55",
																					confirmButtonText: "نعم!",
																					closeOnConfirm: false
																	}, function () {
																					swal("Deleted!", "Your imaginary file has been deleted.", "success");
																	});
													});
									}
					};
	}
	var deleteBoxClassComponent = exports.deleteBoxClassComponent = deleteBoxClass;

/***/ },
/* 210 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	scrollHereClass.$inject = ['$rootScope', '$window'];
	function scrollHereClass($rootScope, $window) {
	    return {
	        scope: { method: '&myMethod', var1: '&firstVar', var2: '&secondVar' },
	        restrict: 'EA',
	        priority: 1,
	        link: function link(scope, element, attrs) {
	            var raw = element[0];
	            console.log('loading directive');
	            console.log(raw);
	            element.scroll(function () {
	                console.log('in scroll');
	                console.log(raw.scrollTop + raw.offsetHeight);
	                console.log(raw.scrollHeight);
	                if (raw.scrollTop + raw.offsetHeight > raw.scrollHeight) {
	                    scope.$apply(attrs.scrolly);
	                }
	            });
	            // jQuery(
	            //   function($)
	            //   {
	            //     console.log(111);
	            //     $('.scroll-here').scroll( function()
	            //       {
	            //         console.log(2222);
	            //         if($(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight)
	            //         {
	            //             console.log(333);
	            //           alert('end reached');
	            //         }
	            //       })
	            //     }
	            // );
	        }
	    };
	}

	var scrollHereClassComponent = exports.scrollHereClassComponent = scrollHereClass;

/***/ },
/* 211 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	lightGalleryClass.$inject = ['$rootScope'];
	function lightGalleryClass($rootScope) {
	    return {
	        restrict: 'EA',
	        priority: 1,
	        link: function link(scope, elements, attr) {
	            elements.ready(function () {
	                $('#lightgallery').lightGallery({
	                    thumbnail: true
	                });
	            });
	        }
	    };
	}
	var lightGalleryClassComponent = exports.lightGalleryClassComponent = lightGalleryClass;

/***/ },
/* 212 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	youtubeVideoClass.$inject = ['$rootScope'];
	function youtubeVideoClass($rootScope) {
		return {
			restrict: 'EA',
			priority: 1,
			link: function link(scope, elements, attr) {
				// impostiamo gli attributi da aggiungere all'iframe es: data-src andrà ad impostare l'url dell'iframe
				elements.on('click', function (e) {
					var src = elements.attr('data-src');
					src = src.replace("watch?v=", "embed/");
					// stampiamo i nostri dati nell'iframe
					$("#myModal iframe").attr({
						'src': src
					});
				});
				// se si chiude la modale resettiamo i dati dell'iframe per impedire ad un video di continuare a riprodursi anche quando la modale è chiusa
				$('#myModal').on('hidden.bs.modal', function () {
					$('#myModal').find('iframe').html("");
					$('#myModal').find('iframe').attr("src", "");
				});
			}
		};
	}
	var youtubeVideoClassComponent = exports.youtubeVideoClassComponent = youtubeVideoClass;

/***/ },
/* 213 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	autoGrowClass.$inject = ['$rootScope', '$timeout'];
	function autoGrowClass($rootScope, $timeout) {
	    return {
	        restrict: 'EA',
	        priority: 1,
	        link: function link($scope, element) {
	            $scope.initialHeight = $scope.initialHeight || element[0].style.height;
	            var resize = function resize() {
	                element[0].style.height = $scope.initialHeight;
	                element[0].style.height = "" + element[0].scrollHeight + "px";
	            };
	            element.on("input change", resize);
	            $timeout(resize, 0);
	            element.bind(" keypress", function (event) {
	                if (event.which === 13) {
	                    resize();
	                }
	            });
	        }
	    };
	}
	var autoGrowClassComponent = exports.autoGrowClassComponent = autoGrowClass;

/***/ },
/* 214 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	tagsChipsClass.$inject = ['$rootScope'];
	function tagsChipsClass($rootScope) {
	    return {
	        restrict: 'EA',
	        priority: 1,
	        link: function link(scope, elements, attr) {
	            // impostiamo gli attributi da aggiungere all'iframe es: data-src andrà ad impostare l'url dell'iframe

	        }
	    };
	}
	var tagsChipsClassComponent = exports.tagsChipsClassComponent = tagsChipsClass;

/***/ },
/* 215 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
					value: true
	});
	classyLoaderClass.$inject = ['$rootScope'];
	function classyLoaderClass($rootScope) {
					var percentage;
					return {
									restrict: 'EA',
									priority: 2,
									link: function link(scope, elements, attr) {
													$(document).ready(function () {
																	percentage = parseInt($rootScope.vc.persantage);
																	//console.log(percentage);
																	$('.classy-loader').ClassyLoader({
																					percentage: percentage,
																					speed: 20,
																					fontSize: '20px',
																					diameter: 40,
																					lineColor: '#337ab7',
																					remainingLineColor: 'rgba(200,200,200,0.4)',
																					lineWidth: 10,
																					width: 100,
																					height: 100,
																					fontColor: '#337ab7'
																	});
													});
									}
					};
	}
	var classyLoaderClassComponent = exports.classyLoaderClassComponent = classyLoaderClass;

/***/ },
/* 216 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	metaTagClass.$inject = ['$rootScope'];
	function metaTagClass($rootScope) {
	    return {
	        restrict: 'E',
	        //priority: 1, 
	        //template: '',	
	        link: function link(scope, elements, attr) {
	            console.log(scope.description);
	            //$stateParams.description;
	            //var description = "123";
	            var descriptionhtml = '<meta name="Description" content="' + $rootScope.description + '"></meta>';
	            elements.html(descriptionhtml);
	        }
	    };
	}
	var metaTagClassComponent = exports.metaTagClassComponent = metaTagClass;

/***/ },
/* 217 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	videoPostClass.$inject = ['$rootScope'];
	function videoPostClass($rootScope) {
		return {
			restrict: 'EA',
			priority: 1,
			link: function link(scope, elements, attr) {
				// impostiamo gli attributi da aggiungere all'iframe es: data-src andrà ad impostare l'url dell'iframe
				elements.on('click', function (e) {
					$('.vpost').removeClass('hidden-element');
					$('iframe').addClass('hidden-element');
					$('iframe').attr('src', '');
					var src = elements.attr('data-src');
					var videoifram = elements.attr('data-post-video');

					elements.addClass('hidden-element');
					$('#' + videoifram).removeClass('hidden-element');
					// stampiamo i nostri dati nell'iframe
					$('#' + videoifram).attr({
						'src': src + '?autoplay=1'
					});
				});
				// // se si chiude la modale resettiamo i dati dell'iframe per impedire ad un video di continuare a riprodursi anche quando la modale è chiusa
			}
		};
	}
	var videoPostClassComponent = exports.videoPostClassComponent = videoPostClass;

/***/ },
/* 218 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	videoPostPopupClass.$inject = ['$rootScope'];
	function videoPostPopupClass($rootScope) {
		return {
			restrict: 'EA',
			priority: 1,
			link: function link(scope, elements, attr) {
				// impostiamo gli attributi da aggiungere all'iframe es: data-src andrà ad impostare l'url dell'iframe
				elements.on('click', function (e) {
					var src = elements.attr('data-src');
					var videopopup = elements.attr('data-video-id');
					// stampiamo i nostri dati nell'iframe
					$('.videopopup' + videopopup).attr({
						'src': src
					});
					$('#commentModel' + videopopup).on('hidden.bs.modal', function () {
						$('.videopopup' + videopopup).find('iframe').html("");
						$('.videopopup' + videopopup).find('iframe').attr("src", "");
					});
					$('#commentModel' + videopopup).on('hidden.bs.modal', function () {
						$('#commentModel' + videopopup).find('iframe').html("");
						$('#commentModel' + videopopup).find('iframe').attr("src", "");
					});
				});
				// // se si chiude la modale resettiamo i dati dell'iframe per impedire ad un video di continuare a riprodursi anche quando la modale è chiusa
			}
		};
	}
	var videoPostPopupClassComponent = exports.videoPostPopupClassComponent = videoPostPopupClass;

/***/ },
/* 219 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	userContentClass.$inject = ['$rootScope'];
	function userContentClass($rootScope) {
	    return {
	        restrict: 'EA',
	        priority: 1,
	        link: function link(scope, elements, attr) {
	            // elements.webuiPopover({placement:'auto',trigger:'hover'});
	            elements.webuiPopover({ placement: 'auto', padding: false, height: '85', style: 'border-radius: 0px', trigger: 'hover' });
	        }
	    };
	}
	var userContentClassComponent = exports.userContentClassComponent = userContentClass;

/***/ },
/* 220 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	liveUrlClass.$inject = ['$rootScope'];
	function liveUrlClass($rootScope) {
	    return {
	        restrict: 'EA',
	        priority: 2,
	        link: function link(scope, elements, attr) {
	            if ($rootScope.liveUrlFlag == false) {
	                $rootScope.liveUrlFlag = true;
	                elements.on('paste', function (e) {
	                    scope.live_title = '';
	                    scope.live_description = '';
	                    scope.live_url = '';
	                    scope.live_image = '';
	                    $rootScope.posturl = '';
	                    $rootScope.posttitle = '';
	                    $rootScope.postdescription = '';
	                    $rootScope.postimage = '';
	                    var curImages = new Array();
	                    scope.closeUrl = true;
	                    elements.liveUrl({
	                        loadStart: function loadStart() {
	                            $rootScope.post_disable = true;
	                            $('.liveurl-loader').show();
	                        },
	                        loadEnd: function loadEnd() {
	                            $('.liveurl-loader').hide();

	                            $rootScope.post_disable = false;
	                        },
	                        success: function success(data) {
	                            console.log(data);
	                            //impor
	                            $rootScope.posttitle = data.title;
	                            $rootScope.postdescription = data.description;
	                            $rootScope.posturl = data.url;

	                            var output = $('.liveurl');
	                            output.find('.title').text(data.title);
	                            output.find('.description').text(data.description);
	                            output.find('.url').text(data.url);
	                            output.find('.image').empty();

	                            output.find('.close').one('click', function () {
	                                $rootScope.liveUrlFlag = false;
	                                scope.closeUrl = false;
	                                var liveUrl = $(this).parent();
	                                liveUrl.hide('fast');
	                                liveUrl.find('.video').html('').hide();
	                                liveUrl.find('.image').html('');
	                                liveUrl.find('.controls .prev').addClass('inactive');
	                                liveUrl.find('.controls .next').addClass('inactive');

	                                liveUrl.find('.thumbnail').hide();
	                                liveUrl.find('.image').hide();
	                                $('textarea').trigger('clear');
	                                curImages = new Array();
	                                scope.showlive = 0;
	                                scope.live_title = '';
	                                scope.live_description = '';
	                                scope.live_url = '';
	                                scope.live_image = '';
	                                $rootScope.posturl = '';
	                                $rootScope.posttitle = '';
	                                $rootScope.postdescription = '';
	                                $rootScope.postimage = '';
	                            });
	                            output.show('fast');
	                            // if (data.video != null) {

	                            // angular.element('nav').scope().$root.postvideo=data.video.file ;
	                            // var ratioW        = data.video.width  /350;
	                            //     data.video.width  = 350;
	                            //     data.video.height = data.video.height / ratioW;

	                            //     var video = 
	                            //     '<object width="' + data.video.width  + '" height="' + data.video.height  + '">' +
	                            //         '<param name="movie"' +
	                            //               'value="' + data.video.file  + '"></param>' +
	                            //         '<param name="allowScriptAccess" value="always"></param>' +
	                            //         '<embed src="' + data.video.file  + '"' +
	                            //               'type="application/x-shockwave-flash"' +
	                            //               'allowscriptaccess="always"' +
	                            //               'width="' + data.video.width  + '" height="' + data.video.height  + '"></embed>' +
	                            //     '</object>';
	                            //     output.find('.video').html(video).show();        
	                            // }
	                        },
	                        addImage: function addImage(image) {
	                            var output = $('.liveurl');
	                            var jqImage = $(image);
	                            jqImage.attr('alt', 'Preview');

	                            if (image.width / image.height > 7 || image.height / image.width > 4) {
	                                // we dont want extra large images...
	                                return false;
	                            }

	                            curImages.push(jqImage.attr('src'));
	                            output.find('.image').append(jqImage);
	                            //console.log(jqImage[0].src);
	                            //impor
	                            $("#postbody").attr("url-image", jqImage[0].src);
	                            $rootScope.postimage = jqImage[0].src;

	                            if (curImages.length == 1) {
	                                // first image...

	                                output.find('.thumbnail .current').text('1');
	                                output.find('.thumbnail').show();
	                                output.find('.image').show();
	                                jqImage.addClass('active');
	                            }

	                            if (curImages.length == 2) {
	                                output.find('.controls .next').removeClass('inactive');
	                            }

	                            output.find('.thumbnail .max').text(curImages.length);
	                        }
	                    });
	                });
	            }
	        }
	    };
	}
	var liveUrlClassComponent = exports.liveUrlClassComponent = liveUrlClass;

/***/ },
/* 221 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	routeHtmlClass.$inject = ['$rootScope'];
	function routeHtmlClass($rootScope) {
	  return {
	    scope: { ngModel: '=ngModel' },
	    link: function routeHtmlClassLink(scope, elem) {
	      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
	        // eslint-disable-line angular/on-watch
	        var fromClassnames = angular.isDefined(fromState.data) && angular.isDefined(fromState.data.htmlClass) ? fromState.data.htmlClass : null;
	        var toClassnames = angular.isDefined(toState.data) && angular.isDefined(toState.data.htmlClass) ? toState.data.htmlClass : null;

	        if (fromClassnames != toClassnames) {
	          if (fromClassnames) {
	            elem.removeClass(fromClassnames);
	          }

	          if (toClassnames) {
	            elem.addClass(toClassnames);
	          }
	        }
	      });
	    },
	    restrict: 'EA'
	  };
	}

	var routeHtmlClassComponent = exports.routeHtmlClassComponent = routeHtmlClass;

/***/ },
/* 222 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	chatBoxClass.$inject = ['$rootScope'];
	function chatBoxClass($rootScope) {
	    return {
	        restrict: 'EA',
	        priority: 1,
	        link: function link(scope, elem, attr) {}
	    };
	}
	var chatBoxClassComponent = exports.chatBoxClassComponent = chatBoxClass;

/***/ },
/* 223 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	closeMenuClass.$inject = ['$rootScope', '$window'];
	function closeMenuClass($rootScope, $window) {
	    return {
	        restrict: 'EA',
	        priority: 1,
	        link: function link(scope, element, attrs) {
	            $(".close-menu").click(function () {
	                $(".dropdown").removeClass("open");
	            });
	        }
	    };
	}

	var closeMenuClassComponent = exports.closeMenuClassComponent = closeMenuClass;

/***/ },
/* 224 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	emojoFaceClass.$inject = ['$rootScope'];
	function emojoFaceClass($rootScope) {
	    return {
	        restrict: 'EA',
	        priority: 9,
	        link: function link(scope, elements, attr) {
	            var id = attr.roomId;
	            var message = $(".emojionearea-editor").html();
	            elements.emojioneArea({
	                pickerPosition: "top",
	                filtersPosition: "bottom",
	                autocomplete: false,
	                hidePickerOnBlur: true,
	                events: {
	                    keypress: function keypress(editor, event) {
	                        var message = $(".emojionearea-editor").html();
	                        if (event.which == 13) {
	                            event.preventDefault();
	                            scope.addMessage(message, id);
	                            $(".emojionearea-editor").html('');
	                        }
	                        $('.emojionearea-button').removeClass('active');
	                        $('.emojionearea-picker').addClass('hidden');
	                    }
	                }
	            });
	            $('.send-chat-btn').click(function () {
	                var message = $(".emojionearea-editor").html();
	                scope.addMessage(message, id);
	                $(".emojionearea-editor").html('');
	            });
	            $(".emojionearea-editor").html('');
	        }
	    };
	}
	var emojoFaceClassComponent = exports.emojoFaceClassComponent = emojoFaceClass;

/***/ },
/* 225 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	whenScrolledClass.$inject = ['$rootScope', '$timeout'];
	function whenScrolledClass($rootScope, $timeout) {
	    return {
	        restrict: 'EA',
	        priority: 1,
	        link: function link(scope, elm, attr) {
	            var raw = elm[0];
	            elm.bind('scroll', function () {
	                if (raw.scrollTop <= 100) {
	                    var sh = raw.scrollHeight;
	                    if ($rootScope.past_scrollTop > raw.scrollTop) {
	                        scope.$apply(attr.whenScrolled).then(function (x) {
	                            $timeout(function () {
	                                raw.scrollTop = raw.scrollHeight - sh + x;
	                            });
	                        });
	                    }
	                }
	                $rootScope.past_scrollTop = raw.scrollTop;
	            });
	        }
	    };
	}
	var whenScrolledClassComponent = exports.whenScrolledClassComponent = whenScrolledClass;

/***/ },
/* 226 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	scrollBottomOnClass.$inject = ['$rootScope', '$timeout'];
	function scrollBottomOnClass($rootScope, $timeout) {
	    return {
	        restrict: 'EA',
	        priority: 1,
	        link: function link(scope, elm, attr) {
	            scope.$watch(attr.scrollBottomOn, function (value) {
	                if (value) {
	                    $timeout(function () {
	                        elm[0].scrollTop = elm[0].scrollHeight;
	                    });
	                }
	            });
	        }
	    };
	}
	var scrollBottomOnClassComponent = exports.scrollBottomOnClassComponent = scrollBottomOnClass;

/***/ },
/* 227 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	postInstituteClass.$inject = ['$rootScope', 'API', 'moment'];
	function postInstituteClass($rootScope, API, moment) {
	  return {
	    restrict: 'EA',
	    link: function link(scope, elements, attr) {
	      $rootScope.post_url = attr.reqUrl;
	      $rootScope.type = attr.reqType;
	      $rootScope.postlocation = attr.reqParent;
	    },
	    templateUrl: './pages/post/post-institute.html'
	  };
	}
	var postInstituteClassComponent = exports.postInstituteClassComponent = postInstituteClass;

/***/ },
/* 228 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	examRepeaterClass.$inject = ['$rootScope', 'API', 'moment', '$state'];
	function examRepeaterClass($rootScope, API, moment, $state) {
	  return {
	    restrict: 'EA',
	    priority: -15,
	    link: function link(scope, elements, attr) {
	      var id = $rootScope.last_id;
	      if (attr.examRepeater == 'form') {
	        elements.attr('na-me', "markForm" + id);
	        elements.attr('ng-show', "markForm" + id + '.$visible');
	      } else if (attr.examRepeater == 'edit') {
	        elements.attr('ng-disabled', "markForm" + id + '.$waiting');
	        elements.attr('ng-show', "markForm" + id + '.$cancel()');
	      } else if (attr.examRepeater == 'cancel') {
	        elements.attr('ng-disabled', "markForm" + id + '.$waiting');
	        elements.attr('ng-click', "markForm" + id + '.$cancel()');
	      } else if (attr.examRepeater == 'button') {
	        elements.attr('ng-show', "markForm" + id + '.$visible');
	        elements.attr('ng-click', "markForm" + id + '.$show()');
	      }
	    }
	  };
	}
	var examRepeaterClassComponent = exports.examRepeaterClassComponent = examRepeaterClass;

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Post = __webpack_require__(230);

	var _context = __webpack_require__(231);

	var _API = __webpack_require__(232);

	var _chatMessages = __webpack_require__(233);

	angular.module('app.services').service('Post', _Post.PostService).service('ContextService', _context.ContextService).service('API', _API.APIService).service('chatMessages', _chatMessages.chatMessagesService);

/***/ },
/* 230 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PostService = exports.PostService = function () {
	    PostService.$inject = ["$rootScope", "API", "$timeout", "moment", "Upload", "$log", "$state"];
	    function PostService($rootScope, API, $timeout, moment, Upload, $log, $state) {
	        'ngInject';

	        _classCallCheck(this, PostService);

	        this.API = API;
	        this.$rootScope = $rootScope;
	        this.$state = $state;
	        this.Upload = Upload;
	        this.$timeout = $timeout;
	        this.$log = $log;
	        this.postat = [];
	        this.notifications = [];
	        this.show_loadmore = true;
	        //this.busy = false;
	        this.oldSkip = -1;
	        this.skip = 2;
	        this.take = 5;
	        this.notificationSkip = 2;
	        this.notificationTake = 5;
	        this.addpost_counter = 0;
	        this.nopost = 2;
	        this.nonotification = 2;
	        $rootScope.busy = false;
	        this.type = 'post';
	        this.url = '';
	        this.imageurl = '';
	        this.postindex = [];
	        this.notificationindex = [];
	        this.exprissions = [];
	        this.comment_enabled = true;
	        this.postcommentindex = '';
	        this.post_enabled = true;
	        var _self = this;
	    }

	    _createClass(PostService, [{
	        key: 'setExprissions',
	        value: function setExprissions(exprissions) {
	            this.exprissions = exprissions;
	        }
	    }, {
	        key: 'settype',
	        value: function settype(type) {
	            this.type = type;
	        }
	    }, {
	        key: 'setPostat',
	        value: function setPostat(postat) {
	            this.postat = postat;
	        }
	    }, {
	        key: 'setNotifications',
	        value: function setNotifications(notifications) {
	            this.notifications = notifications;
	        }
	    }, {
	        key: 'setnopost',
	        value: function setnopost(nopost) {
	            this.nopost = nopost;
	        }
	    }, {
	        key: 'setnonotification',
	        value: function setnonotification(nonotification) {
	            this.nonotification = nonotification;
	        }
	    }, {
	        key: 'setshow_loadmore',
	        value: function setshow_loadmore(show_loadmore) {
	            this.show_loadmore = show_loadmore;
	        }
	    }, {
	        key: 'setskip',
	        value: function setskip(skip) {
	            this.skip = skip;
	        }
	    }, {
	        key: 'settake',
	        value: function settake(take) {
	            this.take = take;
	        }
	    }, {
	        key: 'setnotificationSkip',
	        value: function setnotificationSkip(notificationSkip) {
	            this.notificationSkip = notificationSkip;
	        }
	    }, {
	        key: 'setnotificationTake',
	        value: function setnotificationTake(notificationTake) {
	            this.notificationTake = notificationTake;
	        }
	    }, {
	        key: 'seturl',
	        value: function seturl(url) {
	            this.url = url;
	        }
	    }, {
	        key: 'setediturl',
	        value: function setediturl(url) {
	            this.editurl = url;
	        }
	    }, {
	        key: 'setdeleteurl',
	        value: function setdeleteurl(url) {
	            this.deleteurl = url;
	        }
	    }, {
	        key: 'setCommentDeleteUrl',
	        value: function setCommentDeleteUrl(url) {
	            this.commentDeleteUrl = url;
	        }
	    }, {
	        key: 'setsubmiturl',
	        value: function setsubmiturl(submiturl) {
	            this.submiturl = submiturl;
	        }
	    }, {
	        key: 'setuploadurl',
	        value: function setuploadurl(uploadurl) {
	            this.uploadurl = uploadurl;
	        }
	    }, {
	        key: 'setimageurl',
	        value: function setimageurl(imageurl) {
	            this.imageurl = imageurl;
	        }
	    }, {
	        key: 'setSection',
	        value: function setSection(section) {
	            this.section = section;
	        }
	    }, {
	        key: 'gettype',
	        value: function gettype() {
	            return this.type;
	        }
	    }, {
	        key: 'getExprissions',
	        value: function getExprissions() {
	            return this.exprissions;
	        }
	    }, {
	        key: 'getPostat',
	        value: function getPostat() {
	            return this.postat;
	        }
	    }, {
	        key: 'getNotifications',
	        value: function getNotifications() {
	            return this.notifications;
	        }
	    }, {
	        key: 'getnopost',
	        value: function getnopost() {
	            return this.nopost;
	        }
	    }, {
	        key: 'getnonotification',
	        value: function getnonotification() {
	            return this.nonotification;
	        }
	    }, {
	        key: 'getshow_loadmore',
	        value: function getshow_loadmore() {
	            return this.show_loadmore;
	        }
	    }, {
	        key: 'getskip',
	        value: function getskip() {
	            return this.skip;
	        }
	    }, {
	        key: 'getnotificationSkip',
	        value: function getnotificationSkip() {
	            return this.notificationSkip;
	        }
	    }, {
	        key: 'getimagereaded',
	        value: function getimagereaded() {
	            return this.imagereaded;
	        }
	    }, {
	        key: 'gettake',
	        value: function gettake() {
	            return this.take;
	        }
	    }, {
	        key: 'getnotificationTake',
	        value: function getnotificationTake() {
	            return this.notificationTake;
	        }
	    }, {
	        key: 'geturl',
	        value: function geturl() {
	            return this.url;
	        }
	    }, {
	        key: 'getpostcommentindex',
	        value: function getpostcommentindex() {
	            return this.postcommentindex;
	        }
	    }, {
	        key: 'getPost',
	        value: function getPost() {
	            var _this = this;

	            return new Promise(function (resolve, reject) {
	                _this.getPostSecondary(resolve, reject);
	            });
	        }
	    }, {
	        key: 'getPostSecondary',
	        value: function getPostSecondary(resolve, reject) {
	            var _this2 = this;

	            var API = this.API;
	            var $rootScope = this.$rootScope;
	            var postindex = this.postindex;
	            if (this.show_loadmore) {
	                if (!$rootScope.busy) {
	                    $rootScope.busy = true;
	                    this.show_loadmore = false;
	                    API.all(this.url + '/' + (this.skip + this.addpost_counter) + '/' + this.take).get('').then(function (response) {
	                        _this2.oldSkip = _this2.skip;
	                        _this2.skip = _this2.skip + response.data.length;
	                        if (response.data == "no post") {
	                            _this2.show_loadmore = false;
	                            $rootScope.busy = false;
	                            _this2.checkPostat(2);
	                        } else {
	                            if (_this2.oldSkip != _this2.skip) {
	                                if (_this2.postat) {
	                                    var a = [];
	                                    response.data.map(function (item) {
	                                        a.push(item);
	                                    });
	                                    _this2.postat.map(function (item) {
	                                        a.push(item);
	                                    });
	                                    _this2.nopost = 1;
	                                    _this2.postat = a;
	                                } else {
	                                    _this2.postat = response.data;
	                                    _this2.postat.map(function (item, key) {
	                                        postindex[item.id] = key;
	                                    });
	                                }
	                                //$rootScope.busy = false;
	                                _this2.show_loadmore = true;
	                            }
	                        }
	                        resolve(response);
	                    }, function (response) {
	                        $rootScope.busy = false;
	                        _this2.show_loadmore = false;
	                        if (_this2.postat) {
	                            if (response.data.errors) {
	                                if (response.data.errors.message[0] == 'no post') {
	                                    $rootScope.busy = false;
	                                }
	                            }
	                            _this2.checkPostat(2);
	                        } else {
	                            if (response.data.errors) {
	                                if (response.data.errors.message[0] == 'no post') {
	                                    $state.current.show_loadmore = false;
	                                    $rootScope.busy = false;
	                                }
	                            }
	                            _this2.checkPostat(2);
	                        }
	                        reject(response);
	                    });
	                } else {
	                    this.nopost = 2;
	                }
	            }
	        }
	    }, {
	        key: 'getNotification',
	        value: function getNotification() {
	            var _this3 = this;

	            return new Promise(function (resolve, reject) {
	                _this3.getNotificationPromise(resolve, reject);
	            });
	        }
	    }, {
	        key: 'getNotificationPromise',
	        value: function getNotificationPromise(resolve, reject) {
	            var _this4 = this;

	            var API = this.API;
	            var $rootScope = this.$rootScope;
	            var notificationindex = this.notificationindex;
	            if (this.show_loadmore) {
	                if (!$rootScope.notificationBusy) {
	                    $rootScope.notificationBusy = true;
	                    API.all(this.url + '/' + (this.notificationSkip + this.addpost_counter) + '/' + this.notificationTake).get('').then(function (response) {
	                        if (response.data == "no post") {
	                            _this4.show_loadmore = false;
	                            $rootScope.notificationBusy = false;
	                            if (_this4.notifications.length > 0) {
	                                _this4.nonotification = 1;
	                            } else if (_this4.notifications.length == 0) {
	                                _this4.nonotification = 3;
	                            }
	                        } else {
	                            $rootScope.notificationBusy = false;
	                            _this4.show_loadmore = true;
	                            if (_this4.notifications) {
	                                var a = [];
	                                response.data.map(function (item) {
	                                    a.push(item);
	                                });
	                                _this4.notifications.map(function (item) {
	                                    a.push(item);
	                                });
	                                //this.checknotifications(2);
	                                _this4.nonotification = 1;
	                                _this4.notifications = a;
	                            } else {
	                                _this4.notifications = response.data;
	                                _this4.notifications.map(function (item, key) {
	                                    notificationindex[item.id] = key;
	                                });
	                            }
	                            _this4.notificationSkip = _this4.notificationSkip + response.data.length;
	                        }
	                        return _this4.notifications;
	                    });
	                } else {
	                    return this.notifications;
	                    this.nonotification = 2;
	                }
	            }
	        }
	    }, {
	        key: 'deleteNode',

	        //function is delete any post,commit,file,exam,homework or support 
	        value: function deleteNode(node, deleteType, callback) {
	            var _this5 = this;

	            var API = this.API;
	            var $rootScope = this.$rootScope;
	            var postat = this.postat;
	            var postindex = this.postindex;
	            var nodeType = '';
	            var deleteurl = this.deleteurl;
	            var section = this.section;
	            //console.log(this.section);
	            postat.map(function (item, key) {
	                postindex[item.id] = key;
	            });
	            if (deleteType == true) {
	                nodeType = this.type + '_comment'; //'comment';
	                var url = this.commentDeleteUrl;
	            } else {
	                nodeType = this.type;
	                var url = deleteurl;
	            }
	            if ($rootScope.post_delete == undefined) $rootScope.post_delete = true;
	            if ($rootScope.post_delete == true) {
	                var modelTitle = '';
	                var modelTitleConf = '';
	                var Node = postat;
	                var $post_index = postindex[node.id];
	                switch (nodeType) {
	                    case 'file':
	                        modelTitle = "الملف";
	                        break;
	                    case 'homework':
	                        modelTitle = "الواجب";
	                        break;
	                    case 'exam':
	                        modelTitle = "الامتحان";
	                        break;
	                    case 'post':
	                        modelTitle = "المنشور";
	                        break;
	                    case 'comment':
	                        modelTitle = "التعليق";
	                        break;
	                    case 'books':
	                        modelTitle = "الكتاب";
	                        break;
	                }
	                swal({
	                    title: "هل انت متأكد من حذف " + modelTitle + " ؟",
	                    type: 'warning',
	                    showCancelButton: true,
	                    confirmButtonColor: '#DD6B55',
	                    confirmButtonText: "نعم, احذفه",
	                    cancelButtonText: "لا, الغاء العمليه",
	                    closeOnConfirm: false,
	                    closeOnCancel: false,
	                    showLoaderOnConfirm: true
	                }, function (isConfirm) {
	                    if (isConfirm) {
	                        $rootScope.post_delete = false;
	                        parent = [];
	                        var data = {
	                            id: node.id,
	                            place: nodeType
	                        };
	                        API.all(url).post(data).then(function (response) {
	                            if (response.data.sucess) {
	                                switch (nodeType) {
	                                    case _this5.type + 'comment':
	                                        parent[node.post_id] = [];
	                                        $post_index = postindex[node.post_id];
	                                        Node[$post_index].comment.map(function (item, key) {
	                                            parent[node.post_id][item.id] = key;
	                                        });
	                                        var comment_index = parent[node.post_id][node.id];
	                                        Node[$post_index].comment.splice(comment_index, 1);
	                                        break;
	                                    default:
	                                        Node.splice($post_index, 1);
	                                        _this5.checkPostat(2);
	                                        callback();
	                                }
	                                swal({
	                                    title: "تم حذف " + modelTitle,
	                                    type: "success",
	                                    timer: 2000,
	                                    showConfirmButton: false
	                                });
	                                $rootScope.post_delete = true;
	                            } else {
	                                swal({
	                                    title: "حدث خطأ في عملية حذف " + modelTitle,
	                                    type: "error",
	                                    timer: 2000,
	                                    showConfirmButton: false
	                                });
	                            }
	                        });
	                        $rootScope.post_delete = true;
	                    } else {
	                        swal({
	                            title: "لقد تم الغاء عملية الحذف",
	                            type: "error",
	                            timer: 2000,
	                            showConfirmButton: false
	                        });
	                    }
	                });
	                $rootScope.post_delete = true;
	            } else {
	                console.log('Deleting Disabled:))');
	            }
	        }
	    }, {
	        key: 'exprission',

	        //function is delete any post,commit,file,exam,homework or support 
	        value: function exprission($post, $exp) {
	            var API = this.API;
	            var postat = this.postat;
	            var postindex = this.postindex;
	            postat.map(function (item, key) {
	                postindex[item.id] = key;
	            });
	            var $i = postindex[$post];
	            API.all('social/changeExp/' + this.section + '/exprission/' + $post + '/' + $exp).post('').then(function (response) {
	                postat[$i].all = response.data.all;
	                postat[$i].exprission = response.data.exprission;
	            });
	        }
	    }, {
	        key: 'exprissionUser',
	        value: function exprissionUser($index, liker) {
	            var _this6 = this;

	            var API = this.API;
	            var $rootScope = this.$rootScope;
	            var postat = this.getPostat();
	            var postindex = [];
	            postat.map(function (item, key) {
	                postindex[item.id] = key;
	            });
	            var a = {
	                id: liker
	            };
	            var $i = postindex[$index];
	            //let exprissions = this.exprissions;
	            //let $timeout = this.$timeout;
	            this.exprissions = [];
	            API.all('social/expressor/' + this.section + '/exprission/' + liker).post(a).then(function (response) {
	                //response.data.post.media= 'https://www.youtube.com/embed/' + response.data.post.media
	                postat[$i].exprissions = response.data;
	                _this6.setExprissions(response.data);
	                _this6.exprissions = response.data;
	                $rootScope.exprissions = response.data;
	                $rootScope.happyexp = 1;
	                $rootScope.normalexp = 1;
	                $rootScope.sadexp = 1;

	                if (_this6.exprissions.happy.length < 1) {
	                    $rootScope.happyexp = 2;
	                }
	                if (_this6.exprissions.normal.length < 1) {
	                    $rootScope.normalexp = 2;
	                }
	                if (_this6.exprissions.sad.length < 1) {
	                    $rootScope.sadexp = 2;
	                }
	                _this6.setExprissions(response.data);
	                return response.data;
	            }, function (response) {});
	        }
	    }, {
	        key: 'submitComment',
	        value: function submitComment($id, $index, scope, $body, place) {
	            var _this7 = this;

	            var $rootScope = this.$rootScope;
	            var API = this.API;
	            var postat = this.postat;
	            var postindex = this.postindex;
	            var section = this.section;
	            postat.map(function (item, key) {
	                postindex[item.id] = key;
	            });
	            if (this.comment_enabled == undefined) this.comment_enabled = true;
	            if (this.comment_enabled == true) {
	                this.comment_enabled = false;
	                this.comment = [];
	                this.index = $index;
	                var data = {
	                    body: $body,
	                    user_id: $rootScope.me.id,
	                    post_id: $id,
	                    place: place,
	                    status: 'enabled'
	                };
	                var number = 0;
	                if (this.addpost_counter > 0) {
	                    number = postat.length - 1 - $index;
	                } else {
	                    number = $index;
	                }
	                API.all('social/set/' + section + '/comment').post(data).then(function (response) {
	                    _this7.comment_enabled = true;
	                    var $i = postindex[$id];
	                    //this.postcommentindex = $i
	                    //console.log(response.data.comment);
	                    postat[$i].comment.push(response.data.comment);
	                    // this.newcomment = response.data.comment;
	                    // return this.newcomment;
	                }, function (response) {
	                    _this7.comment_enabled = true;
	                });
	            }
	        }
	    }, {
	        key: 'updateData',
	        value: function updateData(data, id) {
	            var API = this.API;
	            var dat = {
	                data: data,
	                id: id
	            };
	            var section = this.section;
	            API.all(this.editurl).post(dat).then(function (response) {}, function (response) {});
	        }
	    }, {
	        key: 'submitPost',
	        value: function submitPost(files, class_id, textpost, callback) {
	            if (class_id == undefined) {
	                class_id = '';
	            }
	            var API = this.API;
	            var $rootScope = this.$rootScope;
	            var Upload = this.Upload;
	            var logs = this.$log;
	            var $timeout = this.$timeout;
	            var postat = this.getPostat();
	            var postindex = this.postindex;
	            var imageurl = this.imageurl;
	            var addpost_counter = this.addpost_counter;
	            var post_enabled = this.post_enabled;
	            var _self = this;
	            postat.map(function (item, key) {
	                postindex[item.id] = key;
	            });
	            if (post_enabled == true && $rootScope.post_disable != true) {
	                post_enabled = false;
	                if (files.length > 0 || files.name) {
	                    //var files = files;
	                    var file = files;
	                    if (!file.$error) {
	                        var data = {
	                            textpost: textpost,
	                            file: file,
	                            class_id: class_id,
	                            type: "image"
	                        };
	                        var payload = new FormData();
	                        angular.forEach(data, function (value, key) {
	                            payload.append(key, value);
	                        });
	                        API.all(imageurl).withHttpConfig({ transformRequest: angular.identity }).customPOST(payload, undefined, undefined, { 'Content-Type': undefined })
	                        //.post(data)
	                        .then(function (response) {
	                            postat.push(response.data);
	                            // this.nopost = 1;
	                            _self.checkPostat(1);
	                            callback();
	                            addpost_counter++;
	                            $rootScope.posttitle = '';
	                            $rootScope.postdescription = '';
	                            // this.submiturl = '';
	                            $rootScope.postimage = '';
	                        }, null, function (evt) {
	                            console.log(evt);
	                            $rootScope.progressPercentage = parseInt(100.0 * (evt.loaded / evt.total));
	                            logs = 'progress: ' + $rootScope.progressPercentage + '% ' + evt.config.file.name + '\n';
	                            if ($rootScope.progressPercentage == 100) {
	                                $timeout(function () {
	                                    $rootScope.progressPercentage = 0;
	                                }, 2000);
	                            }
	                        });
	                    }
	                } else {
	                    var type = '';
	                    var url = '';
	                    var url = $rootScope.posturl;

	                    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
	                    var match = textpost.match(regExp);

	                    if (match && match[2].length == 11) {
	                        type = "video";
	                        textpost = textpost.replace(url, '   ');
	                        var data = {
	                            textpost: textpost,
	                            title: $rootScope.posttitle,
	                            description: $rootScope.postdescription,
	                            media: 'https://www.youtube.com/embed/' + match[2],
	                            mediatitle: $rootScope.posttitle,
	                            mediadesc: $rootScope.postdescription,
	                            mediaimage: $rootScope.postimage,
	                            type: type,
	                            place: this.type,
	                            class_id: class_id
	                        };
	                    } else {
	                        if (url == undefined || url == '') {
	                            var _data;

	                            type = "text";
	                            var data = (_data = {
	                                textpost: textpost,
	                                media: '',
	                                title: '',
	                                description: ''
	                            }, _defineProperty(_data, 'media', ''), _defineProperty(_data, 'mediatitle', ''), _defineProperty(_data, 'mediadesc', ''), _defineProperty(_data, 'mediaimage', ''), _defineProperty(_data, 'type', type), _defineProperty(_data, 'place', this.type), _defineProperty(_data, 'class_id', class_id), _data);
	                        } else {
	                            type = "url";
	                            textpost = textpost.replace(url, '   ');
	                            var data = {
	                                textpost: textpost,
	                                title: $rootScope.posttitle,
	                                description: $rootScope.postdescription,
	                                media: url,
	                                mediatitle: $rootScope.posttitle,
	                                mediadesc: $rootScope.postdescription,
	                                mediaimage: $rootScope.postimage,
	                                type: type,
	                                place: this.type,
	                                class_id: class_id

	                            };
	                        }
	                    }
	                    type = '';
	                    $rootScope.posturl = '';
	                    $rootScope.posttitle = '';
	                    $rootScope.postdescription = '';
	                    $rootScope.postimage = '';
	                    API.all(this.submiturl).post(data).then(function (response) {
	                        postat.push(response.data);
	                        _self.checkPostat(1);
	                        //this.nopost = 1;
	                        callback();
	                        post_enabled = true;
	                        addpost_counter++;
	                        $rootScope.liveUrlFlag = false;
	                    }, function (response) {
	                        post_enabled = true;
	                    });
	                }
	            }
	        } //end new post

	    }, {
	        key: 'NewNode',
	        value: function NewNode(data, correct, isFile, files, contr) {
	            var payload = new FormData();
	            angular.forEach(data, function (value, key) {
	                payload.append(key, value);
	            });
	            var API = this.API;
	            var self = this;
	            var post_enabled = this.post_enabled;
	            if (post_enabled == true) {
	                post_enabled = false;
	                //if (isFile) {
	                //self.FileUpload(files, self.uploadurl, data, correct, contr);
	                //} else {
	                //data = JSON.stringify(data);
	                API.all(self.submiturl).withHttpConfig({ transformRequest: angular.identity }).customPOST(payload, undefined, undefined, { 'Content-Type': undefined })
	                //.post(data)
	                .then(function (response) {
	                    self.postat.push(response.data);
	                    self.checkPostat(1);
	                    correct(response, self.postat, self.nopost);
	                    post_enabled = true;
	                    self.addpost_counter++;
	                    for (var key in self.$rootScope.newPost) {
	                        self.$rootScope.newPost[key] = '';
	                    }
	                }, function (response) {
	                    post_enabled = true;
	                });
	                //}
	            }
	        }
	    }, {
	        key: 'checkPostat',
	        value: function checkPostat(counter) {
	            if (this.postat.length > 0) {
	                this.nopost = 1;
	            } else if (this.postat.length == 0) {
	                this.nopost = 3;
	            }
	        }
	    }]);

	    return PostService;
	}();

/***/ },
/* 231 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ContextService = exports.ContextService = function () {
	  ContextService.$inject = ["$auth", "$rootScope", "API", "chatMessages"];
	  function ContextService($auth, $rootScope, API, chatMessages) {
	    'ngInject';

	    _classCallCheck(this, ContextService);

	    this.$auth = $auth;
	    this.API = API;
	    this.$rootScope = $rootScope;
	    $rootScope.chatMessages = chatMessages;
	    $rootScope.messaging_enabled = false;
	    if (!this.enteredCaht) this.enableCaht = false;
	  }

	  _createClass(ContextService, [{
	    key: 'getContext',
	    value: function getContext() {
	      var $auth = this.$auth;
	      var $rootScope = this.$rootScope;
	      if ($auth.isAuthenticated()) {
	        do {
	          var API = this.API;
	          var _UserData = API.service('me', API.all('home'));
	          return _UserData.one().get();
	        } while (UserData.one().get().errors != 'false');
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: 'me',
	    value: function me(cb) {
	      var self = this;
	      var $rootScope = self.$rootScope;

	      $rootScope.$watch('me', function (nv, $rootScope) {
	        if (nv) {

	          if (!(self.enableCaht && self.enteredCaht)) {
	            self.$rootScope.chatMessages.init().then(function (user) {
	              console.log('init then');
	              self.$rootScope.chatMessages.getRooms().then(function (Rooms) {

	                self.$rootScope.chatMessages.Rooms = Rooms;
	                self.$rootScope.Rooms = Rooms;
	                self.$rootScope.messaging_enabled = true;
	                self.$rootScope.chatMessages.checkStatus();
	              });
	            });
	            self.enableCaht = true;
	            self.enteredCaht = true;
	          }
	          // if (nv.activated_at) {self.$rootScope.meFlag = false;}else{self.$rootScope.meFlag = true;}
	          cb(nv);
	        }
	      });
	    }
	  }]);

	  return ContextService;
	}();

/***/ },
/* 232 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var APIService = exports.APIService = ["Restangular", "$window", "toastr", "$state", function APIService(Restangular, $window, toastr, $state) {
	  'ngInject';
	  // content negotiation

	  _classCallCheck(this, APIService);

	  var headers = {
	    'Content-Type': 'application/json',
	    'Accept': 'application/x.laravel.v1+json'
	  };

	  return Restangular.withConfig(function (RestangularConfigurer) {
	    RestangularConfigurer.setBaseUrl('/api/').setDefaultHeaders(headers).setDefaultHeaders({ isAngular: 'true' }).setErrorInterceptor(function (response) {
	      // if (response.status === 422) {
	      //   for (var error in response.data.errors) {
	      //   return toastr.error(response.data.errors[error][0],error)
	      //   }
	      // }
	      //  if (response.status === 500) {
	      //   if (response.config.url == "/api/users/me") {
	      //     $state.reload();
	      //     toastr.error('خطأ في جلب معلوماتك الخاصة ستتم اعادة تحميل الصفحة');
	      //     let UserData = this.service('me', API.all('users')) 
	      //      return UserData.one().get()

	      //   }
	      //   console.log(response)
	      //   return toastr.error(response.statusText)
	      // }
	    }).addFullRequestInterceptor(function (element, operation, what, url, headers) {
	      var token = $window.localStorage.satellizer_token;
	      if (token) {
	        headers.Authorization = 'Bearer ' + token;
	      }
	    }).addResponseInterceptor(function (response, operation, what) {
	      if (operation === 'getList') {
	        var newResponse = response.data[what];
	        newResponse.error = response.error;
	        return newResponse;
	      }

	      return response;
	    });
	  });
	}];

/***/ },
/* 233 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var chatMessagesService = exports.chatMessagesService = function () {
	    chatMessagesService.$inject = ["$state", "$stateParams", "$firebaseObject", "$firebaseAuth", "$firebaseArray", "$firebaseStorage", "$timeout", "$rootScope", "$crypto", "API", "Idle"];
	    function chatMessagesService($state, $stateParams, $firebaseObject, $firebaseAuth, $firebaseArray, $firebaseStorage, $timeout, $rootScope, $crypto, API, Idle) {
	        'ngInject';

	        _classCallCheck(this, chatMessagesService);

	        this.API = API;
	        this.stateParams = $stateParams;
	        this.enabled = false;
	        this.$rootScope = $rootScope;
	        // var auth = $firebaseAuth();
	        this.auth = firebase.auth();
	        this.chatter = [];
	        this.$crypto = $crypto;
	        this.chatter.email;
	        this.chatter.password;
	        this.$rootScope = $rootScope;
	        this.$firebaseStorage = $firebaseStorage;
	        this.$firebaseAuth = $firebaseAuth;
	        this.$firebaseArray = $firebaseArray;
	        this.$firebaseObject = $firebaseObject;
	        this.RoomName = [];
	        this.$rootScope.messages = [];
	        this.RoomId = [];
	        this.Room = [];
	        this.temp = {};
	        this.deleteCount = [];
	        this.RoomUsers = [];
	        this.RoomData = [];
	        this.NowRoom = null;
	        this.Online_Users = null;
	        this.Online_UsersId = null;
	        this.myfriends = [];
	        this.friends = [];
	        this.$rootScope.avatar = [];
	        this.Count = [];
	        this.loadmore = false;
	        var self = this;
	        $rootScope.messagesCount = 0;
	        var $firebaseArray = this.$firebaseArray;
	        this.ref = firebase.database().ref();
	        $rootScope.sending = false;
	        $rootScope.sendMessage = function (id, name, FB_UID) {
	            if (!$rootScope.sending) {
	                $rootScope.sending = true;
	                this.newMessage = new Promise(function (resolve, reject) {
	                    self.checkIfUserExist(resolve, FB_UID, name, id);
	                });
	                this.newMessage.then(function (Room_name, name, id) {
	                    self.getRoom(self.getRoomNow(), 10).then(function (temp) {
	                        $rootScope.register_popup(self.getRoomNow(), self.temp.name, self.getRoomNow());
	                        // console.log(self.Room[self.getRoomNow()])
	                        $rootScope.messages[self.getRoomNow()] = self.Room[self.getRoomNow()];
	                        $timeout(function () {
	                            $rootScope.sending = false;
	                        }, 3000);
	                    });
	                });
	            }
	        };
	    }
	    //////////////////////////////////////////////////////////////////
	    //////////////////////////////////////////////////////////////////
	    ///////////////////////Getter & Setter ///////////////////////////
	    //////////////////////////////////////////////////////////////////
	    //////////////////////////////////////////////////////////////////


	    _createClass(chatMessagesService, [{
	        key: 'setRoomName',
	        value: function setRoomName(RoomName, id) {
	            this.RoomName[id] = RoomName;
	        }
	    }, {
	        key: 'getRoomName',
	        value: function getRoomName(id) {
	            return this.RoomName[id];
	        }
	    }, {
	        key: 'getRoomData',
	        value: function getRoomData(id) {
	            return this.RoomData[id];
	        }
	    }, {
	        key: 'getRoomNow',
	        value: function getRoomNow() {
	            return this.NowRoom;
	        }
	    }, {
	        key: 'getRoomsName',
	        value: function getRoomsName() {
	            return this.Rooms;
	        }
	    }, {
	        key: 'getLoadMore',
	        value: function getLoadMore() {
	            return this.loadmore;
	        }
	    }, {
	        key: 'getMessageCount',
	        value: function getMessageCount($id) {
	            var self = this;
	            return self.Count[$id];
	        }
	        //////////////////////////////////////////////////////////////////
	        //////////////////////////////////////////////////////////////////
	        ////////////////// Connection Function ///////////////////////////
	        //////////////////////////////////////////////////////////////////
	        //////////////////////////////////////////////////////////////////

	    }, {
	        key: 'init',
	        value: function init(user) {
	            var self = this;
	            if (!user) {
	                user = {};
	                user.id = self.$rootScope.me.id;
	                user.FB_PASS = self.$rootScope.me.FB_PASS;
	                user.from = 'from scope';
	            }

	            return new Promise(function (fulfill, reject) {
	                self.token = user.token;
	                var a = self.findOrCreate(fulfill, reject, user);
	            });
	        }
	    }, {
	        key: 'getRooms',
	        value: function getRooms() {
	            var self = this;
	            return new Promise(function (fulfill, reject) {
	                var uid = null;
	                self.$rootScope.messagesCount = 0;
	                if (self.chatter.uid != undefined) uid = self.chatter.uid;else if (self.$rootScope.me) uid = self.$rootScope.me.FB_UID;else return 'no uid';
	                var $firebaseArray = self.$firebaseArray;
	                var a = [];
	                a[uid] = null;
	                var ref = firebase.database().ref().child('Rooms').child(uid);
	                self.Rooms = $firebaseArray(firebase.database().ref().child('Rooms').child(uid));
	                self.Rooms.$loaded().then(function (data) {
	                    ref.on('value', function (Rooms) {

	                        var a = Rooms.val();
	                        self.$rootScope.messagesCount = 0;
	                        self.Rooms.forEach(function (currentValue) {
	                            if (self.$rootScope.RoomNow) {
	                                if (currentValue.name == self.$rootScope.RoomNow) {
	                                    self.myRoomInRooms = currentValue;
	                                }
	                            }
	                            self.Count[currentValue.name] = currentValue.count;
	                            self.RoomData[currentValue.name] = currentValue.deleted_at;
	                            if (currentValue.unReaded != 0) self.$rootScope.messagesCount = self.$rootScope.messagesCount + 1;
	                            if (currentValue.unReaded > 0) {
	                                self.$rootScope.addOne = " (" + self.$rootScope.messagesCount + ")";
	                            } else {
	                                self.$rootScope.addOne = " ";
	                            }
	                        });
	                        // Object.keys(a).map(function(objectKey, index) {
	                        //     if(!self.RoomData[objectKey])
	                        //         self.RoomData[objectKey]=[];
	                        //     self.Count[objectKey] = a[objectKey].count;
	                        //     self.RoomData[objectKey]= a[objectKey].deleted_at
	                        // });
	                        self.RoomData.deleted = function (n) {
	                            return 'test:' + n;
	                            return this[Object.keys(this)[n]];
	                        };
	                        self.reloadFriend();
	                        self.Rooms = $firebaseArray(firebase.database().ref().child('Rooms').child(uid));
	                        self.Rooms.forEach(function (currentValue, index, arr) {
	                            if (currentValue.hasNew == true) {}
	                            if (currentValue.unReaded != 0) self.$rootScope.messagesCount = self.$rootScope.messagesCount + 1;
	                            if (currentValue.unReaded > 0) {
	                                self.$rootScope.addOne = "(" + self.$rootScope.messagesCount + ")";
	                            } else {
	                                self.$rootScope.addOne = " ";
	                            }
	                        });
	                        angular.element('.lv-body').scrollTop(100000, 0);
	                        angular.element('#' + self.$rootScope.RoomNow + ' .popup-messages').scrollTop(angular.element('.popup-messages').prop('scrollHeight'));
	                    });
	                }).catch(function (error) {
	                    console.error("Error:", error);
	                });
	                self.chatter.uid = uid;
	                fulfill(self.Rooms);
	            });
	        }
	    }, {
	        key: 'getRoom',
	        value: function getRoom($id, limit) {
	            var self = this;
	            var $firebaseArray = this.$firebaseArray;
	            var fb = firebase.database().ref();
	            return new Promise(function (fulfill, reject) {
	                self.$rootScope.avatar[$id] = [];
	                self.$rootScope.RoomNow = $id;
	                self.messagesPromise($id, limit, false).then(function (Room, status) {
	                    self.Room[$id] = Room;
	                    self.RoomUsers[$id] = $firebaseArray(fb.child('chat').child($id).child('users'));
	                    angular.element('.lv-body').scrollTop(100000, 0);
	                    self.Room[$id].$loaded().then(function (x) {
	                        self.NowRoom = $id;
	                        Object.keys(self.RoomUsers[$id]).map(function (objectKey, index) {
	                            if (_typeof(self.Rooms[objectKey]) == 'object') {
	                                self.$rootScope.avatar[$id][self.RoomUsers[$id].$keyAt(index)] = self.RoomUsers[$id][index].avatar;
	                            }
	                        });
	                        // angular.element('.lv-body').scrollTop(angular.element('.lv-body').prop('scrollHeight'));
	                        angular.element('.lv-body').scrollTop(100000, 0);
	                        angular.element('#' + $id + ' .popup-messages').scrollTop(angular.element('.popup-messages').prop('scrollHeight'));
	                        self.setReaded(self.chatter.uid, $id);
	                        if (self.Room[$id].$resolved) {
	                            fulfill(self.Room[$id]);
	                        } else {
	                            reject(self.Room[$id]);
	                        }
	                    }).catch(function (error) {
	                        console.log(error);
	                    });
	                    return self.Room[$id];
	                });
	            });
	        }
	    }, {
	        key: 'messagesPromise',
	        value: function messagesPromise($id, limit, force) {
	            var self = this;
	            var status = 'not changed';
	            var Room = null;
	            var count = self.getMessageCount($id);
	            var RoomData = self.getRoomData($id);
	            var deleted_at = self.RoomData[$id];
	            if (count - limit > deleted_at) {
	                var from = count - limit;
	            } else {
	                var from = deleted_at;
	            }
	            return new Promise(function (fulfill, reject) {
	                var ref = firebase.database().ref("chat/" + $id + '/data');
	                var Rooms = firebase.database().ref('Rooms/' + self.chatter.uid + '/' + $id);
	                var chat = firebase.database().ref("chat/" + $id);
	                ref.on('child_added', function (childSnapshot, prevChildKey) {
	                    chat.once('value', function (dataSnapshot) {
	                        if (prevChildKey && childSnapshot) {
	                            if (childSnapshot.val().id == self.chatter.uid) {
	                                if (!(childSnapshot.val().message_id - 1 == dataSnapshot.val().data[prevChildKey].message_id)) {
	                                    // console.log(childSnapshot.val().message_id,dataSnapshot.val().data[prevChildKey].message_id);
	                                    // console.log(childSnapshot.key)
	                                    var updates = {};
	                                    updates['/chat/' + $id + '/data/' + childSnapshot.key + '/message_id'] = dataSnapshot.val().data[prevChildKey].message_id + 1;
	                                    firebase.database().ref().update(updates);
	                                }
	                            }
	                        }
	                    });
	                });
	                Rooms.once("value", function (snap) {
	                    var deleted_at = snap.val().deleted_at;
	                    chat.once("value").then(function (snapshot) {
	                        var all_count = snapshot.child("data").numChildren();
	                        if (snapshot.hasChild("data")) {
	                            if (snapshot.child("data").hasChildren()) {
	                                if (all_count == count || force) {
	                                    Room = self.$firebaseArray(ref.orderByChild('message_id').startAt(from));
	                                    status = 'normal';
	                                } else {
	                                    if (count == 0) {
	                                        Room = self.$firebaseArray(ref.startAt(deleted_at));
	                                        status = 'deleted and empty';
	                                    } else {
	                                        Room = self.$firebaseArray(ref.orderByChild('message_id').startAt(from));
	                                        status = 'deleted and writed';
	                                    }
	                                }
	                            } else {
	                                Room = self.$firebaseArray(ref);
	                                status = 'empty';
	                            }
	                        } else {
	                            Room = self.$firebaseArray(ref);
	                            status = 'empty';
	                        }

	                        Room.$loaded().then(function (messages) {
	                            fulfill(Room, status);
	                        }).catch(function (error) {
	                            reject(error);return Room;
	                        });
	                    });
	                });
	            });
	        }
	    }, {
	        key: 'infiniteScroll',
	        value: function infiniteScroll($id, from, force) {
	            var self = this;
	            var status = 'not changed';
	            var Room = null;
	            var count = self.getMessageCount($id);
	            var deleted_at = self.RoomData[$id];
	            var limit = count - from;
	            if (count - limit > deleted_at) {
	                var from = count - limit;
	            } else {
	                var from = deleted_at;
	            }
	            return new Promise(function (fulfill, reject) {

	                var ref = firebase.database().ref("chat/" + $id + '/data').orderByChild('message_id');
	                var Rooms = firebase.database().ref('Rooms/' + self.chatter.uid + '/' + $id);
	                var chat = firebase.database().ref("chat/" + $id);
	                Rooms.once("value").then(function (snap) {
	                    var deleted_at = snap.val().deleted_at;
	                    chat.once("value").then(function (snapshot) {
	                        var all_count = snapshot.child("data").numChildren();
	                        if (snapshot.hasChild("data") && snapshot.child("data").hasChildren()) {
	                            if (all_count == count || force) {
	                                status = 'normal';
	                            } else {
	                                if (count == 0) {
	                                    status = 'deleted and empty';
	                                } else {
	                                    status = 'deleted and writed';
	                                }
	                            }
	                        } else {
	                            status = 'empty';
	                        }
	                        // console.log("status:"+status);
	                        switch (status) {
	                            case 'deleted and writed':
	                                Room = self.$firebaseArray(ref.startAt(from));
	                                // console.log("limit is:"+from);
	                                break;
	                            case 'empty':
	                            case 'deleted and empty':
	                                Room = self.$firebaseArray(ref.startAt(deleted_at));
	                                // console.log("limit is:"+deleted_at);
	                                break;
	                            default:
	                                Room = self.$firebaseArray(ref.startAt(from));
	                            // console.log("limit is:"+from);
	                        }
	                        Room.$loaded().then(function (messages) {
	                            // console.log(messages.length)
	                            fulfill(messages);
	                        }).catch(function (error) {
	                            reject(error);
	                        });
	                    });
	                });
	                // });
	            });
	        }
	    }, {
	        key: 'FirstRoom',
	        value: function FirstRoom(RoomName) {
	            var self = this;
	            return new Promise(function (fulfill, reject) {
	                self.Rooms.$loaded().then(function (Rooms) {
	                    if (Rooms) {
	                        var counter = 0;
	                        var data = {};
	                        if (RoomName) {
	                            while (!data.FirstRoom) {
	                                Rooms.forEach(function (currentValue, index, arr) {
	                                    if (RoomName == currentValue.name) {
	                                        if (!currentValue.deleted) {
	                                            data.FirstRoom = currentValue.name;
	                                        } else {
	                                            self.unDeleteRoom(RoomName);
	                                            data.FirstRoom = RoomName;
	                                        }
	                                    } else {}
	                                });
	                            }
	                        }
	                        if (!data.FirstRoom || !RoomName) {
	                            while (!data.FirstRoom) {
	                                if (Rooms[counter].deleted) {
	                                    counter++;
	                                } else {
	                                    data.FirstRoom = Rooms[counter].name;
	                                    data.selected = counter;
	                                    data.roomName = Rooms[counter].display;
	                                }
	                            }
	                        }
	                        fulfill(data);
	                    }
	                });
	            });
	        }
	        //////////////////////////////////////////////////////////////////
	        //////////////////////////////////////////////////////////////////
	        //////////////////  check Function ///////////////////////////////
	        //////////////////////////////////////////////////////////////////
	        //////////////////////////////////////////////////////////////////

	    }, {
	        key: 'checkIfUserExist',
	        value: function checkIfUserExist(resolve, FB_UID, name, id) {
	            var self = this;
	            var a = self.friends.indexOf(parseInt(FB_UID));
	            if (self.friends[FB_UID] != id) {
	                console.log('new!!');
	                return self.registerRoom(self.$rootScope.me.id, id, 'personal', self.$rootScope.me.name + ' ' + self.$rootScope.me.last_name, resolve);
	            } else {
	                self.temp.name = name;
	                self.temp.FB_UID = FB_UID;
	                self.temp.Room_name = self.myfriends[FB_UID].Room;
	                self.unDeleteRoom(self.temp.Room_name);
	                self.NowRoom = self.temp.Room_name;
	                console.log('exist!!');
	                var count = self.getMessageCount(self.temp.Room_name);
	                self.getRoom(self.myfriends[FB_UID].Room, count).then(function (Room) {
	                    var R = Room;
	                    Room.$loaded().then(function (x) {
	                        // self.$rootScope.messages[self.NowRoom] = Room;
	                        // self.$rootScope.messages[self.NowRoom].RoomNow = self.NowRoom;
	                    });
	                    resolve(self.myfriends[FB_UID].Room, self.temp.name, self.getRoomNow());
	                    return R;
	                });
	            }
	        }
	    }, {
	        key: 'checkVariables',
	        value: function checkVariables() {}
	    }, {
	        key: 'checkStatus',
	        value: function checkStatus() {
	            var self = this;
	            self.amOnline = firebase.database().ref('.info/connected');
	            if (self.chatter.uid) {
	                self.userRef = firebase.database().ref('Online_Users/' + self.chatter.uid);
	            } else {
	                self.userRef = firebase.database().ref('Online_Users/' + self.$rootScope.me.FB_UID);
	            }
	            self.amOnline.on('value', function (snapshot) {
	                if (snapshot.val()) {
	                    self.userRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
	                    self.userRef.set(true);
	                    // console.log('â˜… online');
	                }
	            });
	            self.$rootScope.$on('IdleStart', function () {
	                self.userRef.set('â˜† idle');
	                // console.log('â˜† idle');
	            });
	            self.$rootScope.$on('IdleWarn', function (e, countdown) {
	                // self.userRef.set('â˜„ away');
	                // console.log('â˜„ away');
	            });
	            self.$rootScope.$on('IdleEnd', function (isIdle, isAway) {
	                self.userRef.set(true);
	                // console.log('â˜… online');
	            });
	        }
	    }, {
	        key: 'onlineUsers',
	        value: function onlineUsers() {
	            var self = this;
	            var $firebaseArray = this.$firebaseArray;
	            var fb = firebase.database().ref();
	            self.Online_Users = $firebaseArray(fb.child('Online_Users'));
	            self.checkStatus();
	            self.Online_UsersId = self.Online_Users.$$getKey();
	            self.Online_Users.forEach(function (item, index) {
	                if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) == 'object') {
	                    if (item.$value == true) {
	                        Object.keys(self.Rooms[index].chatter).map(function (i, key) {
	                            if (self.$rootScope.me.id != self.Rooms[index].participant[key]) {
	                                friends.push(self.Rooms[index].participant[key]);
	                                myfriends.push({
	                                    id: self.Rooms[index].participant[key],
	                                    uid: i,
	                                    Room: item.name,
	                                    data: self.Rooms[index]
	                                });
	                            }
	                        });
	                    }
	                }
	            });
	            return self.Online_Users;
	        }
	    }, {
	        key: 'reloadFriend',
	        value: function reloadFriend() {
	            var self = this;
	            var myfriends = [];
	            var friends = [];
	            self.Rooms.forEach(function (item, index) {
	                if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) == 'object') {
	                    if (item.type == 'personal') {
	                        // myfriends.push(self.Rooms[index]);
	                        Object.keys(self.Rooms[index].chatter).map(function (i, key) {
	                            if (self.$rootScope.me.FB_UID != i) {
	                                friends[i] = parseInt(self.Rooms[index].participant[i]);
	                                myfriends[i] = {
	                                    id: self.Rooms[index].participant[i],
	                                    uid: i,
	                                    Room: self.Rooms[index].name,
	                                    data: self.Rooms[index]
	                                };
	                                angular.element('.lv-body').scrollTop(100000, 0);
	                                // friends[item.name] = self.Rooms[index].participant[key];
	                                // friends[item.name] = {id:self.Rooms[index].participant[key],uid:i,Room:i};
	                            }
	                        });
	                    }
	                }
	            });
	            self.myfriends = myfriends;
	            self.friends = friends;
	            return self.myfriends;
	        }
	    }, {
	        key: 'getMyFriendChat',
	        value: function getMyFriendChat() {
	            var self = this;
	            self.reloadFriend();
	            return self.myfriends;
	        }
	        //////////////////////////////////////////////////////////////////
	        //////////////////////////////////////////////////////////////////
	        ////////////////// services & send Function //////////////////////
	        //////////////////////////////////////////////////////////////////
	        //////////////////////////////////////////////////////////////////

	    }, {
	        key: 'registerRoom',
	        value: function registerRoom($owner, $participant, $type, $name, resolve) {
	            var self = this;
	            var data = {
	                participant: $participant,
	                owner: $owner,
	                type: $type,
	                name: $name
	            };
	            self.API.all('chat/add-new-room').post(data).then(function (response) {
	                var Room_name = response.Rooms[Object.keys(response.Rooms)[0]].name;
	                var user_name = response.Rooms[Object.keys(response.Rooms)[0]].display;
	                var owner_id = response.Rooms[Object.keys(response.Rooms)[0]].participant[0];
	                self.RoomName[Room_name] = Room_name;
	                self.temp.Room_name = Room_name;
	                self.temp.name = user_name;
	                self.temp.id = owner_id;
	                self.NowRoom = Room_name;
	                resolve(Room_name, $name, owner_id);
	                // self.getRoom(Object.keys(response.chat)[0], 10).then(function(Room) {
	                //     // return self.Room[Object.keys(response.Rooms)[0].name] = Room;
	                // });
	            }, function (response) {});
	        }
	    }, {
	        key: 'addMessage',
	        value: function addMessage($id, $from, $message, Room) {
	            var self = this;
	            if ($message.trim() != '&nbsp;') {

	                return new Promise(function (fulfill, reject) {
	                    self.$rootScope.RoomNow = Room;
	                    var count = self.getMessageCount(Room);
	                    if (!count) count = 0;
	                    self.Room[Room].$add({
	                        message_id: count,
	                        from: $from,
	                        id: self.chatter.uid,
	                        content: self.$crypto.encrypt($message),
	                        type: 'text',
	                        seen: false,
	                        timestamp: firebase.database.ServerValue.TIMESTAMP
	                    }).then(function (ref) {
	                        angular.element('.lv-body').scrollTop(100000, 0);
	                        angular.element('#' + Room + ' .popup-messages').scrollTop(angular.element('.popup-messages').prop('scrollHeight'));
	                        self.updateMessagesOption($message);
	                        return "";
	                    });
	                });
	            }
	        }
	    }, {
	        key: 'UploadFile',
	        value: function UploadFile(fileList, $id) {
	            var self = this;
	            var fileExt = fileList[0].name.split('.').pop();
	            var fileName = fileList[0].name;
	            if (fileExt == 'jpg' || fileExt == 'png' || fileExt == 'jpeg' || fileExt == 'gif') {
	                var fileType = 'image';
	            } else {
	                var fileType = 'file';
	            }
	            var $firebaseArray = this.$firebaseArray;
	            var fb = firebase.database().ref();
	            self.fileToUpload = null;
	            self.$rootScope.RoomNow = $id;
	            var a = new Date().getTime();
	            self.uploaded = "chat/" + $id + "/" + a;
	            var storageRef = firebase.storage().ref(self.uploaded);
	            var storage = self.$firebaseStorage(storageRef);
	            self.fileToUpload = fileList[0];
	            var file = self.fileToUpload;
	            var uploadTask = storage.$put(file);
	            uploadTask.$complete(function (snapshot) {
	                self.updateMessagesOption(fileName);
	                var Room = $firebaseArray(fb.child('chat').child(self.$rootScope.RoomNow).child('data'));
	                var count = self.getMessageCount($id);
	                Room.$add({
	                    message_id: self.getMessageCount($id),
	                    from: self.$rootScope.me.name,
	                    id: self.$rootScope.me.FB_UID,
	                    type: fileType,
	                    fileName: fileName,
	                    seen: false,
	                    content: snapshot.downloadURL,
	                    timestamp: firebase.database.ServerValue.TIMESTAMP
	                });
	            });
	        }
	        //////////////////////////////////////////////////////////////////
	        //////////////////////////////////////////////////////////////////
	        ////////////////////Modify & Delete data//////////////////////////
	        //////////////////////////////////////////////////////////////////
	        //////////////////////////////////////////////////////////////////

	    }, {
	        key: 'updateMessagesOption',
	        value: function updateMessagesOption($message) {
	            var self = this;
	            if (self.getRoomNow()) {
	                self.$rootScope.RoomNow = self.getRoomNow();
	            }
	            self.Rooms.forEach(function (currentValue) {
	                if (self.$rootScope.RoomNow) {
	                    if (currentValue.name == self.$rootScope.RoomNow) {
	                        self.myRoomInRooms = currentValue;
	                    }
	                }
	            });
	            var myRoomInRooms = self.myRoomInRooms;
	            var Room = myRoomInRooms.name;
	            Object.keys(myRoomInRooms.chatter).forEach(function (currentValue, index, arr) {
	                var updates = {};
	                var Rooms = firebase.database().ref('Rooms/' + currentValue + '/' + Room);
	                Rooms.once('value', function (snapshot) {
	                    self.unReaded = snapshot.val().unReaded;
	                    if (Object.keys(updates).length == 0) {
	                        updates['/Rooms/' + currentValue + '/' + Room + '/count'] = snapshot.val().count + 1;
	                        updates['/Rooms/' + currentValue + '/' + Room + '/updatedAt'] = firebase.database.ServerValue.TIMESTAMP;
	                        updates['/Rooms/' + currentValue + '/' + Room + '/lastMessage'] = self.$crypto.encrypt($message);
	                        if (snapshot.val().name == Room && currentValue == self.chatter.uid) {
	                            updates['/Rooms/' + currentValue + '/' + Room + '/unReaded'] = 0;
	                        } else {
	                            updates['/Rooms/' + currentValue + '/' + Room + '/unReaded'] = parseInt(snapshot.val().unReaded) + 1;
	                        }
	                        firebase.database().ref().update(updates);
	                    }
	                });
	            });
	            var updates = {};
	            var chat = firebase.database().ref('chat/' + Room);
	            chat.once('value', function (snapshot) {
	                if (Object.keys(updates).length == 0) {
	                    // updates['chat/' + Room + '/option'+ '/count'] = snapshot.val().option.count + 1;
	                    updates['chat/' + Room + '/option' + '/lastMessageFrom'] = self.chatter.uid;
	                    firebase.database().ref().update(updates);
	                }
	            });
	        }
	    }, {
	        key: 'deleteRoom',
	        value: function deleteRoom(id, mCount, object) {
	            var self = this;
	            var updates = {};
	            var ref = firebase.database().ref("chat/" + id + '/data');
	            ref.once('value', function (Snapshot) {
	                updates['/Rooms/' + self.chatter.uid + '/' + id + '/count'] = 0;
	                updates['/Rooms/' + self.chatter.uid + '/' + id + '/deleted'] = true;
	                updates['/Rooms/' + self.chatter.uid + '/' + id + '/deleted_at'] = Snapshot.numChildren();
	                firebase.database().ref().update(updates);
	            });
	        }
	    }, {
	        key: 'unDeleteRoom',
	        value: function unDeleteRoom(id) {
	            var self = this;
	            var updates = {};
	            updates['/Rooms/' + self.chatter.uid + '/' + id + '/deleted'] = false;
	            // updates['/Rooms/' + self.chatter.uid + '/' + id + '/deleted_at'] = false;
	            firebase.database().ref().update(updates);
	        }
	    }, {
	        key: 'deleteMessage',
	        value: function deleteMessage(Room, id) {
	            var self = this;
	            var item = Room[Room.$indexFor(id)];
	            Room.$remove(item);
	        }
	    }, {
	        key: 'updateUserData',
	        value: function updateUserData(id) {}
	    }, {
	        key: 'setReaded',
	        value: function setReaded(uid, Room) {
	            var updates = {};
	            updates['/Rooms/' + uid + '/' + Room + '/unReaded'] = 0;
	            firebase.database().ref().update(updates);
	            return updates;
	        }
	    }, {
	        key: 'setAddUnReaded',
	        value: function setAddUnReaded(uid, Room, message) {
	            var self = this;
	            var updates = {};
	            updates['/Rooms/' + uid + '/' + Room + '/unReaded'] = 0;
	            updates['/Rooms/' + uid + '/' + Room + '/unReaded'] = parseInt(self.unReaded) + 1;
	            firebase.database().ref().update(updates);
	            return updates;
	        }
	        //////////////////////////////////////////////////////////////////
	        //////////////////////////////////////////////////////////////////
	        ////////////////////sign in & up users ///////////////////////////
	        //////////////////////////////////////////////////////////////////
	        //////////////////////////////////////////////////////////////////

	    }, {
	        key: 'signOut',
	        value: function signOut() {
	            var $firebaseAuth = this.$firebaseAuth();
	            $firebaseAuth.$signOut();
	            return 'sign Out successfully';
	        }
	    }, {
	        key: 'signIn',
	        value: function signIn(fulfill, reject, u) {
	            var self = this;
	            var $firebaseAuth = this.$firebaseAuth();
	            // console.log(self.$rootScope.me.id + '@edzance.com', self.$rootScope.me.FB_PASS)
	            $firebaseAuth.$signInWithEmailAndPassword(u.id + '@edzance.com', u.FB_PASS).then(function (user) {
	                self.chatter.uid = user.uid;
	                self.chatter.entered = true;
	                var data = {
	                    uid: user.uid,
	                    id: u.id
	                };
	                self.API.all('chat/set-uid').post(data);
	                fulfill(user.uid);
	                return user;
	            }).catch(function (error) {
	                reject(error);
	            });
	        }
	    }, {
	        key: 'signIn2',
	        value: function signIn2(id, pass) {
	            var self = this;
	            var $firebaseAuth = this.$firebaseAuth();
	            self.auth.signInWithEmailAndPassword(id, pass).then(function (user) {
	                var data = {
	                    uid: user.uid,
	                    id: self.$rootScope.me.id
	                };
	                console.log('signed In');
	            }).catch(function (error) {
	                console.log(error);
	            });
	        }
	    }, {
	        key: 'signUp',
	        value: function signUp(fulfill, reject, u) {
	            var self = this;
	            var $firebaseAuth = this.$firebaseAuth();
	            var API = this.API;
	            if (u) console.log("user:", u);
	            $firebaseAuth.$createUserWithEmailAndPassword(u.id + '@edzance.com', u.FB_PASS).then(function (user) {
	                self.chatter.uid = user.uid;
	                var data = {
	                    uid: user.uid,
	                    id: u.id
	                };
	                API.all('chat/set-uid?token=' + self.token).post(data);
	                self.signIn(fulfill, reject, u);
	                return user;
	            }).catch(function (error) {
	                // self.signIn(); 
	                if (error.code == 'auth/email-already-in-use') {
	                    self.signIn(fulfill, reject, u);
	                } else {}
	                // self.signIn(); 
	            });
	        }
	    }, {
	        key: 'findOrCreate',
	        value: function findOrCreate(fulfill, reject, u) {
	            var self = this;
	            var $firebaseAuth = this.$firebaseAuth();
	            var auth = $firebaseAuth.$getAuth();
	            firebase.auth().signInWithEmailAndPassword(u.id + '@edzance.com', " ").catch(function (error) {
	                if (error.code === "auth/wrong-password") {
	                    self.signIn(fulfill, reject, u);
	                } else if (error.code === "auth/user-not-found") {
	                    self.signUp(fulfill, reject, u);
	                }
	            });
	            // if (!auth) {
	            //     self.signUp(fulfill, reject,user);
	            // } else {
	            //     self.signIn(fulfill, reject,user);
	            // }
	            // return auth;
	        }
	    }]);

	    return chatMessagesService;
	}();

/***/ }
/******/ ]);