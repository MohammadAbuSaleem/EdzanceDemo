export function RoutesConfig ($stateProvider, $urlRouterProvider) {
  'ngInject'

  var getView = (viewName) => {
    return `./views/app/pages/${viewName}/${viewName}.page.html`
  }

  var getLayout = (layout) => {
    return `./views/app/pages/layout/${layout}.page.html`
  } 

  $urlRouterProvider.otherwise('/404')
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
          template:'<foot></foot>'
        },
        main: {}
      },
      data: {
        bodyClass: 'hold-transition sw-toggled'
      },
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load({
            files:[ 'vendors/sweet-alert/sweet-alert.min.css',
                    'vendors/material-icons/material-design-iconic-font.min.css',
                    'css/emojionearea.min.css',
                    'vendors/socicon/socicon.min.css',
                    'vendors/light-gallery/lightGallery.min.css',
                    'css/angular-datatables.css',
                    'css/app.min.1.css',
                    'css/app.min.2.css',
                    'css/app.min.3.css'
                  ]
          });
        }]
      }
    })
    .state('app.otherwise', {
      url: '/404',
        data: {
        auth: false
      },
      views: {
        'main@app': {
          template: '<otherwise></otherwise>'
        },
      }
    })
    .state('app.landing', {
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
        },
      }
    })
    .state('logins', {
      abstract: true,
      views: {
        'layout': {
          templateUrl: getLayout('loginslayout')
        },
        'main@logins': {
          template:getView('login')
        }
      },
      data: {
        bodyClass: 'hold-transition'
      },
      params: {
        registerSuccess: null,
        successMsg: null,
        user:{
          name: null,
          email: null,
          password: null
        }
      },
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load({
            files:[ 'vendors/material-icons/material-design-iconic-font.min.css',
                    'vendors/socicon/socicon.min.css',
                    'css/app.min.1.css',
                    'css/app.min.2.css',
                    'css/app.min.3.css'
                  ]
          });
        }]
      }
    })   
    .state('app.notifications', {
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
    })
    .state('app.search', {
      url: '/search/?=:value',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          templateUrl: getView('search')
        },'search@app.search': {
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
        groupcategory:null
      }
    }
    })
    .state('app.course', {
      url: '/course',
      //url: '/course-:coursesid',
      params: {
        groupid:null
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
        },'booksbank@app.booksbank': {
          templateUrl: '../../pages/misc/booksbank.html'
        },
      data: {
        auth: true,
        bodyClass: 'hold-transition sw-toggled'
      },
      params: {
        groupcategory:null
      }
    }
    })
    .state('app.mybooks', {
      url: '/mybooks',
      views: {
        'main@app': {
          template: '<booksbank-mybooks></booksbank-mybooks>'
        },'booksbank@app.mybooks': {
          templateUrl: '../../pages/misc/booksbank.html'
        },
      data: {
        auth: true,
        bodyClass: 'hold-transition sw-toggled'
      },
      params: {
        groupcategory:null
      }
    }
    })
    .state('app.book', {
      url: '/book-:bookId',
      views: {
        'main@app': {
          template: '<bookbank-about></bookbank-about>'
        },
        data: {
          bodyClass: 'hold-transition sw-toggled'
        }
      }
    }) 
    .state('app.jobs', {
      url: '/jobs',
      views: {
        'main@app': {
          template: '<jobs></jobs>'
        },'jobs@app.jobs': {
          templateUrl: '../../pages/misc/jobs.html'
        },
      data: {
        auth: true,
        bodyClass: 'hold-transition sw-toggled'
      },
      params: {
        groupcategory:null
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
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load({
            files:[ 'vendors/material-icons/material-design-iconic-font.min.css',
                    'vendors/socicon/socicon.min.css',
                    'css/app.min.1.css',
                    'css/app.min.2.css',
                    'css/app.min.3.css'
                  ]
          });
        }]
      }
    })

    .state('institution', {
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
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load({
            files:[ 'vendors/sweet-alert/sweet-alert.min.css',
                    'vendors/material-icons/material-design-iconic-font.min.css',
                    'vendors/socicon/socicon.min.css',
                    'css/app.min.1.css',
                    'css/app.min.2.css',
                    'css/app.min.3.css'
                  ]
          });
        }]
      }
    })
    .state('institution.index', {
      url: '/index',
      views: {
        'main@institution': {
          template: '<educational-institutions></educational-institutions>'
        },
        'footer@institution': {
          template:'<footer-institutions></footer-institutions>'
        }
      }
    })
    .state('institution.adding', {
      url: '/create',
      views: {
        'main@institution': {
          template: '<adding-institutions></adding-institutions>'
        },
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
    })
   .state('app.specialization.discussion', {
      url: '/discussion',
     template: '<specialization-discussion></specialization-discussion>'
    })
   .state('app.specialization.materials', {
      url: '/materials',
     template: '<specialization-materials></specialization-materials>'
    })
   .state('app.specialization.attachments.homework', {
      url: '/homework',
     template: '<specialization-homework></specialization-homework>'
    })
   .state('app.specialization.students', {
      url: '/students',
     template: '<specialization-students></specialization-students>'
    })
   .state('app.specialization.instructors', {
      url: '/instructors',
     template: '<specialization-instructors></specialization-instructors>'
    })
   .state('app.specialization.attachments.files', {
      url: '/files',
     template: '<specialization-files></specialization-files>'
    })
   .state('app.specialization.attachments.videos', {
      url: '/videos',
     template: '<specialization-videos></specialization-videos>'
    })
   .state('app.specialization.attachments.photos', {
      url: '/photos',
     template: '<specialization-photos></specialization-photos>'
    })
   .state('app.specialization.groups', {
      url: '/groups',
     template: '<specialization-groups></specialization-groups>'
    })
   .state('app.specialization.attachments', {
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
        resultsid:null
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
    })
    .state('app.results.post', {
      url: '/post/:resultsid',
      views: {
        'post@app.results.post': {
          templateUrl: '../../pages/post/post.html'
        },
        'results': {
          template: '<results-post></results-post>'
        }
      }
    })
    .state('app.results.classpost', {
      url: '/classpost/:resultsid',
       views: {
        'post@app.results.classpost': {
          templateUrl: '../../pages/post/post.html'
        },
        'results': {
          template: '<results-classpost></results-classpost>'
        }
      }
    })
    .state('app.results.classfile', {
      url: '/classfile/:resultsid',
       views: {
        'file@app.results.classfile': {
          templateUrl: '../../pages/post/file.html'
        },
        'results': {
          template: '<results-classfile></results-classfile>'
        }
      }
    })
    .state('app.results.classexam', {
      url: '/classexam/:resultsid',
       views: {
        'exam@app.results.classexam': {
          templateUrl: '../../pages/post/exam.html'
        },
        'results': {
          template: '<results-classexam></results-classexam>'
        }
      }
    })
     .state('app.results.classhomework', {
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
       template:'<register></register>',
      data: {
      //  bodyClass: 'hold-transition'
      },
      params: {
        from:null,
        to:null,
        files:null,
        id:null,
        agree:null,
        logtype:null,
        university: null,
        type: null,
        back: null,
        name: null,
        phone: null,
        email: null,
        password: null,
        next: null
      }
    })
   .state('logins.login.register.main', {
      url: '/register-main',
        template: '<register-main></register-main>',
      data: {
        bodyClass: 'hold-transition'
      },
      params: {
        id:null,
        logtype:null,
        type: null,
        back: null,
        name: null,
        phone: null,
        email: null,
        password: null,
        next: null
      }
    })
   .state('logins.login.register.goreg', {
      url: '/goreg/:id',
        template: '<profile-following></profile-following>',
      data: {
        bodyClass: 'hold-transition'
      },
      params: {
        logtype:'social',
        id:null,
        type: null,
        back: null,
        name: null,
        phone: null,
        email: null,
        password: null,
        next: null
      }
    })
   .state('logins.login.register.confirm', {
      url: '/register-confirm',
        template: '<register-confirm></register-confirm>',
      data: {
        bodyClass: 'hold-transition'
      },
      params: {
      }
    })
   .state('logins.login.register.mail', {
      url: '/register-mail',
        template: '<register-mail></register-mail>',
      data: {
        bodyClass: 'hold-transition'
      },
      params: {
      }
    })
   .state('logins.login.register.information', {
      url: '/register-information',
        template: '<register-information></register-information>',
      data: {
        bodyClass: 'hold-transition'
      },
      params: {
      }
    })
   .state('logins.login.register.loader', {
      url: '/register-information',
        template: '<register-loader></register-loader>',
      data: {
        bodyClass: 'hold-transition'
      },
      params: {
      }
    })
   .state('logins.login.register.error', {
      url: '/register-error',
        template: '<register-error></register-error>',
      data: {
        bodyClass: 'hold-transition'
      },
      params: {
      }
    })
   .state('logins.login.register.class', {
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
       'main@logins': {templateUrl: getView('login')},
        'footer@logins':  {templateUrl: getView('login-footer')}
      },
      data: {
        htmlClass: 'homepage-background reg-mobile',
        bodyClass: 'login-background'
      },
      params: {
        registerSuccess: null,
        successMsg: null
      }
    })
   .state('logins.login.retry', {
     url: '/login-retry',
      views: {
       'main@logins': {templateUrl: getView('retry')}
      },
      data: {
        htmlClass: 'homepage-background reg-mobile',
        bodyClass: 'login-background'
      },
    })
   .state('logins.login.privacy', {
     url: '/privacy',
      views: {
       'main@logins': {templateUrl: getView('privacy')}
      },
      data: {
        htmlClass: 'privacy-background reg-mobile',
        bodyClass: 'login-background'
      },
    })
   .state('app.privacy-login', {
     url: '/privacy-login',
      views: {
        'main@app': {
          templateUrl: getView('privacy-login')
        },
      },
      data: {
        auth: true
      }
    })
    .state('logins.registration-education', {
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
        user:{
          name: null,
          email: null,
          password: null
        }
      }
    })
    .state('logins.login.index', {
      url: '/login',
      views: {
       'main@logins': {templateUrl: getView('login')}},
      data: {
        htmlClass: 'homepage-background reg-mobile',
        bodyClass: 'login-background'
      },
      params: {
        registerSuccess: null,
        successMsg: null,
         user:{
          name: null,
          email: null,
          password: null
        }
      }
    })
    .state('logins.login.redirect', {
      url: '/go/:url',
      views: {
       'main@logins': {templateUrl: getView('login2')},
        'footer@logins':  {templateUrl: getView('login-footer')}
      },
      data: {
        bodyClass: 'hold-transition'
      },
      params: {
        registerSuccess: null,
        successMsg: null
      }
    })
    .state('logins.loginloader', {
      url: '/login-loader',
      views: {
      'main@logins': {templateUrl: getView('login-loader')}
    
      },
      data: {
        bodyClass: 'hold-transition '
      }
    })
    .state('loginloader', {
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
    })
    .state('logins.userverification', {
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
    })
    .state('logins.forgot_password', {
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
    })
    .state('logins.reset_password', {
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
    })
    .state('logins.university-information', {
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
        template:'post'
      },
      views: {
        'main@app': {
          templateUrl: getView('profile')
        },
      data: {
        bodyClass: 'hold-transition  sw-toggled'
      }
    }
    })
    .state('app.profile.about', {
      url: '/about',
       views: {
          'pro': {
            template: '<profile-about></profile-about>'
          }
        } 
    })
    
    .state('app.profile.connection', {
      url: '/connection',
      views: {
        'pro': {
          template: '<profile-connection></profile-connection>'
        }
      } 
    })
     .state('app.profile.connection.following', {
      url: '/following',
       views: {
        'connection': {
          template: '<profile-following></profile-following>'
        }
      }
    })
     .state('app.profile.connection.follower', {
      url: '/follower',
      views: {
        'connection': {
          template: '<profile-follower></profile-follower>'
        }
      }
    })
    
    .state('app.profile.timeline', {
      url: '/timeline',
      views: {
        'post@app.profile.timeline': {
          templateUrl: '../../pages/post/post.html'
        },
        'pro': {
          template: '<profile-timeline></profile-timeline>'
        }
      }  
    })
    
    .state('app.profile.photo', {
      url: '/media',
      views: {
        'pro': {
          template: '<profile-media></profile-media>'
        }
      }
    })
     
    .state('app.profile.photo.photo', {
      url: '/photo',
      views: {
        'media': {
          template: '<profile-photo></profile-photo>'
        }
      }
    })
     
    .state('app.profile.photo.video', {
      url: '/video',
      views: {
        'media': {
          template: '<profile-video></profile-video>'
        }
      }
    })
    .state('app.profile.schedule', {
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
    })
    .state('app.virtualclasses.archived', {
      url: '/archived',
      views: {
        'main@app': {
          template: '<virtualclasses-archived></virtualclasses-archived>' 
        }
      }
    })
    .state('app.virtualclass', {
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
    })
    .state('app.virtualclass.discussion', {
      url: '/discussion',
      data: {
        auth: true,
        template:'post'
      },params: {
        classid:null
      },
      views: {
        'post@app.virtualclass.discussion': {
          templateUrl: '../../pages/post/post.html'
        },
        'vc': {
          template: '<virtualclass-discussion></virtualclass-discussion>'
        }
      }
    })
    .state('app.virtualclass.files', {
      url: '/files',
      params: {
        classid:null
      },
      views: {
        'file@app.virtualclass.files': {
          templateUrl: '../../pages/post/file.html'
        },
        'vc': {
          template: '<virtualclass-files></virtualclass-files>'
        }
      }
    })
    .state('app.virtualclass.homework', {
      url: '/homework',
      params: {
        classid:null
      },
       views: {
        'homework@app.virtualclass.homework': {
          templateUrl: '../../pages/post/homework.html'
        },
        'vc': {
          template: '<virtualclass-homework></virtualclass-homework>'
        }
      }
    })
    .state('app.virtualclass.chat', {
      url: '/chat',
      params: {
        classid:null
      },
       views: {
        'vc': {
          template: '<virtualclass-chat></virtualclass-chat>'
        }
      }
    })
     .state('app.virtualclass.exam', {
      url: '/exam',
      views: {
        'exam@app.virtualclass.exam': {
          templateUrl: '../../pages/post/exam.html'
        },
        'vc': {
          template: '<virtualclass-exam></virtualclass-exam>'
        }
      }
    })
    .state('app.virtualclass.student', {
      url: '/student',
     views: {
        'vc': {
          template: '<virtualclass-student></virtualclass-student>'
        }
      },
      params: {
        classid:null
      }
    })
     .state('app.virtualclass.options', {
      url: '/options',
     views: {
        'vc': {
          template: '<virtualclass-options></virtualclass-options>'
        }
      }
    })
    .state('app.virtualclass.information', {
      url: '/information',
     views: {
        'vc': {
          template: '<virtualclass-information></virtualclass-information>'
        }
      }
    })
    .state('app.virtualclass.instructions', {
      url: '/instructions',
      views: {
        'vc': {
          template: '<virtualclass-instructions></virtualclass-instructions>'
        }
      }
    })
    .state('app.virtualclass.marks', {
      url: '/marks',
      views: {
        'vc': {
          template: '<virtualclass-marks></virtualclass-marks>'
        }
      }
    })
    .state('app.virtualclass.attendance', {
      url: '/attendance',
      views: {
        'vc': {
          template: '<virtualclass-attendance></virtualclass-attendance>'
        }
      }
    })
    .state('app.unauthorized', {
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
        },
      }
    })
   .state('app.institute', {
      url: '/institute-:instituteid',
      data: {
        auth: true,
        bodyClass: 'hold-transition  sw-toggled'
      },
      views: {
        'main@app': {
          templateUrl: getView('institute')
        },
      }
    })
    .state('app.institute.timeline', {
      url: '/timeline',
      views: {
        'post@app.institute.timeline': {
            templateUrl: '../../pages/post/post.html'
          },
        'ins': {
            template: '<institute-timeline></institute-timeline>'
        }
      }
      })
    .state('app.institute.about', {
      url: '/about',
      views: {
        'ins': {
            template: '<institute-about></institute-about>'
        }
      }
    })
    .state('app.institute.attachments', {
      url: '/attachments',
      views: {
        'ins': {
            template: '<institute-attachments></institute-attachments>'
        }
      }
    })
    .state('app.institute.attachments.photos', {
      url: '/photos',
      views: {
        'ins': {
            template: '<institute-photos></institute-photos>'
        }
      }
    })
    .state('app.institute.attachments.videos', {
      url: '/videos',
      views: {
        'ins': {
            template: '<institute-videos></institute-videos>'
        }
      }
    })
    .state('app.institute.colleges', {
      url: '/colleges',
      views: {
        'ins': {
            template: '<institute-colleges></institute-colleges>'
        }
      }
    })
    .state('app.institute.department', {
      url: '/department',
      views: {
        'ins': {
            template: '<institute-department></institute-department>'
        }
      }
    })
    .state('app.institute.specialties', {
      url: '/specialties',
      views: {
        'ins': {
            template: '<institute-specialties></institute-specialties>'
        }
      }
    })
    .state('app.institute.members', {
        url: '/members',
        views: {
          'ins': {
              template: '<institute-members></institute-members>'
          }
        }
    })
    .state('app.institute.events', {
        url: '/events',
        views: {
          'ins': {
              template: '<institute-events></institute-events>'
          }
        }
    })
    .state('app.institute.volunteering', {
        url: '/volunteering',
        views: {
          'ins': {
              template: '<institute-volunteering></institute-volunteering>'
          }
        }
    })
    .state('app.institute.statistics', {
        url: '/statistics',
        views: {
          'ins': {
              template: '<institute-statistics></institute-statistics>'
          }
        }
    })
    .state('app.institute.messages', {
        url: '/messages',
        views: {
          'ins': {
              template: '<institute-messages></institute-messages>'
          }
        }
    })
    .state('app.institute.jobs', {
        url: '/jobs',
        views: {
          'ins': {
              template: '<institute-jobs></institute-jobs>'
          }
        }
    })
    .state('app.institute.grant', {
        url: '/grant',
        views: {
          'ins': {
              template: '<institute-grant></institute-grant>'
          }
        }
    })
    .state('app.institute.vacations', {
        url: '/vacations',
        views: {
          'ins': {
              template: '<institute-vacations></institute-vacations>'
          }
        }
    })
    .state('app.institute.groups', {
        url: '/groups',
        views: {
          'ins': {
              template: '<institute-groups></institute-groups>'
          }
        }
    })
    .state('app.institute.achievements', {
        url: '/achievements',
        views: {
          'ins': {
              template: '<institute-achievements></institute-achievements>'
          }
        }
    })
    .state('app.institute.parents', {
        url: '/parents',
        views: {
          'ins': {
              template: '<institute-parents></institute-parents>'
          }
        }
    })
    .state('app.institute.settings', {
        url: '/settings',
        views: {
          'ins': {
              template: '<institute-settings></institute-settings>'
          }
        }
    })
    .state('app.institute.marks', {
        url: '/marks',
        views: {
          'ins': {
              template: '<institute-marks></institute-marks>'
          }
        }
    })
    .state('app.institute.courses', {
        url: '/courses',
        views: {
          'ins': {
              template: '<institute-courses></institute-courses>'
          }
        }
    })
    .state('app.institute.virtualclass', {
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
    })
    .state('app.companies.timeline', {
      url: '/timeline',
     template: '<companies-timeline></companies-timeline>'
    })
    .state('app.companies.about', {
      url: '/about',
     template: '<companies-about></companies-about>'
    })
    .state('app.companies.photos', {
      url: '/photos',
     template: '<companies-photos></companies-photos>'
    })
    .state('app.companies.videos', {
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
    })
  	.state('app.message.room', {
      url: '/message:Room?',
     template: '<message-room></message-room>'
    })
    .state('app.suggestionsfriends', {
      url: '/suggestionsfriends',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          templateUrl: getView('suggestionsfriends')
          ,
        },
        'suggestionsfriends@app.suggestionsfriends': {
          templateUrl: '../../pages/misc/suggestionsfriends.html'
        }
    }
    })
    .state('app.friendsrequests', {
      url: '/friendsrequests',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          templateUrl: getView('friendsrequests')
          ,
        },
        'friendsrequests@app.friendsrequests': {
          templateUrl: '../../pages/misc/friendsrequests.html'
        }
    }
    })
    .state('app.widgets', {
      url: '/widgets',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<widgets></widgets>'
        },'support@app.support': {
          templateUrl: '../../pages/misc/support.html'
        }
      }
    })
    .state('app.support', {
      url: '/support',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          templateUrl: getView('support')
        },'support@app.support': {
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
        groupcategory:null
      }
    }
    })
    .state('app.groups.index', {
      url: '/all',
      params: {
        groupcategory:null
      },
       views: {
        'group@app.groups.index': {
          templateUrl: '../../pages/misc/group.html'
        },
        'gro': {
          template: '<groups-index></groups-index>'
        }
      }
    })
    .state('app.groups.all', {
      url: '/all-:groupcategory',
      params: {
        groupcategory:null
      } ,
     views: {
        'group@app.groups.all': {
          templateUrl: '../../pages/misc/group.html'
        },
        'gro': {
          template: '<group-all></group-all>'
        }
      }
    })
    .state('app.groups.Invitations', {
      url: '/Invitations',
     views: {
        'group@app.groups.Invitations': {
          templateUrl: '../../pages/misc/group.html'
        },
        'gro': {
          template: '<groups-Invitations></groups-Invitations>'
        }
      }
    })
    .state('app.group', {
      url: '/group-:groupid',
      params: {
        groupid:null
      },
      views: {
        'main@app': {
          templateUrl: getView('group')
        },
      data: {
        bodyClass: 'hold-transition sw-toggled'
      }
    }
    })
    .state('app.group.discussion', {
      url: '/discussion',
      data: {
        auth: true
      },params: {
        groupid:null
      },
      views: {
        'post@app.group.discussion': {
          templateUrl: '../../pages/post/post.html'
        },
        'group': {
          template: '<group-discussion></group-discussion>'
        }
      }
    })
    .state('app.group.chat', {
      url: '/chat',
      params: {
        classid:null
      },
      views: {
        'group': {
          template: '<group-chat></group-chat>'
        }
      }
    })
    .state('app.group.information', {
      url: '/information',
      params: {
        classid:null
      },
      views: {
        'group': {
          template: '<group-information></group-information>'
        }
      }
    })
    .state('app.group.members', {
      url: '/members',
      params: {
        classid:null
      },
      views: {
        'group': {
          template: '<group-members></group-members>'
        }
      }
    })
    .state('app.group.members-requests', {
      url: '/members-requests',
      params: {
        classid:null
      },
      views: {
        'group': {
          template: '<group-members-requests></group-members-requests>'
        }
      }
    })
    .state('app.group.options', {
      url: '/options',
     template: '<group-options></group-options>',
      params: {
        classid:null
      }
    })
    .state('app.group.attachments', {
      url: '/attachments',
      params: {
        classid:null
      },
      views: {
        'group': {
          template: '<group-attachments></group-attachments>'
        }
      }
      })
    .state('app.group.attachments.photos', {
      url: '/photos',
      params: {
        classid:null
      },
      template: '<group-attachments-photos></group-attachments-photos>'
      })
     
    .state('app.group.attachments.videos', {
      url: '/videos',
      params: {
        classid:null
      },
      template: '<group-attachments-videos></group-attachments-videos>'
      })
    .state('app.group.attachments.files', {
      url: '/files',
      params: {
        classid:null
      },
      template: '<group-attachments-files></group-attachments-files>'
      })
    .state('app.group.redirect', {
      url: '/group-redirect',
      template: '<group-redirect></group-redirect>'
      })
    .state('app.logout', {
      url: '/logout',
      views: {
        'main@app': {
          controller: function (chatMessages,$rootScope, $scope, $auth, $state, AclService,API) {
            $auth.logout().then(function () {
              delete $rootScope.me
              AclService.flushRoles()
              AclService.setAbilities({})
               chatMessages.signOut();
              API.all('auth/logout').get('').then((response) => {
                window.location.href = "/";
              }); 
            })
          }
        }
      }
    })
    .state('login', {
      url: '/log-in',
      views: {
        'main@app': {
          controller: function ($state) {
              $state.go('logins.login.index')
          }
        }
      }
    })
    .state('app.test', {
      url: '/ahmad-test',
      views: {
        'main@app': {
           template: '<ahmad-test></ahmad-test>'
        }
      }
    })
    .state('app.test2', {
      url: '/test2',
      views: {
        'main@app': {
           template: '<coming-soon></coming-soon>'
        }
      }
    })
}
