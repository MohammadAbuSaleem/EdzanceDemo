class NavController{
  constructor ($scope,$http,$rootScope, ContextService,API,$timeout,$state,$sce,toastr,$stateParams,Post,Upload,moment,$log, $interval,screenSize) {
    'ngInject'
    this.API = API; 
    this.$rootScope = $rootScope;
    this.$rootScope.user =[];
    this.$state =$state;
    this.$scope = $scope;
    this.$scope.moment = moment;
    $rootScope.progressPercentage = 0;
    $rootScope.flags={
        post:{
          show_loadmore:true,
          busy:false,
          addpost_counter:0,
          nopost:2,
        }
    };
    $rootScope.not =[];
    $rootScope.exprission =[];
    $rootScope.skip = 2;
    $rootScope.take = 5;
    $rootScope.nopost = 2;
    $rootScope.addpost_counter = 0;
    $rootScope.postindex = [];
    $rootScope.commentlimit =2;
    $rootScope.busy = false;
    $rootScope.notificationBusy = false;
    $rootScope.happyexp = 0
    $rootScope.normalexp = 0
    $rootScope.sadexp = 0
    let navHeader = this
    ContextService.me(function (data) {
      navHeader.userData = data
    })
    // $rootScope.liveUrlFlag = false
    //$rootScope.verifyEmailFlag = false 
    $rootScope.meFlag = false;
    $scope.a = [];
    
    $scope.mobile = screenSize.on('xs', function(match){
      $scope.mobile = match;
    });
  $scope.getLocation = function(val) {
    return $http.get('../api/search/'+val).then(function(response){
      if(response.data.data != "no post"){
        return response.data.data.map(function(item){
          return item;
        });
      }
    });
  };
  $scope.search = function(val) {
    console.clear();
    console.log($scope.a);
    $scope.searching = true;
    API.all('search/'+val).get('').then((response) => {
          $scope.a=[];
          $scope.a = response.data;
          console.log($scope.a);
        $timeout(function () {
        }, 1000);
        $scope.showResult = true
        $scope.searching = false;
         // $scope.$digest();
    }); 
  };    
  $scope.goToSearch = function(val) {
    $state.go('app.search',{value:val});
  };    
  $scope.GoToUser = function(val) {
    $state.go('app.profile.timeline',{id:val});
  };
  $rootScope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
  $rootScope.youtubevideo = function(src) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=|\?lp-)([^#\&\?]*).*/;
    var match = src.match(regExp);
    var url = 'https://www.youtube.com/embed/' + match[2];
    return $sce.trustAsResourceUrl(url);
  }
  // ** Friend function **//
  $rootScope.follow = function($friend,$update,$idx,$scope){
    API.all('home/friend/'+ $friend +'/'+ $update ).post('').then((response) => {
    });
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
  $scope.cnsl = function($log){
    console.log($log);
     return true;
  };
  $rootScope.findpost =  function (post) { 
      return post.id === $rootScope.deleteindex;
  }
  $rootScope.postText = function () {
    angular.element(".post-text").removeClass("hidden-element");
    angular.element(".post-img1").addClass("hidden-element");
  }
  $rootScope.addImage = function () {
    angular.element(".post-text").addClass("hidden-element");
    angular.element(".post-img1").removeClass("hidden-element");
  }
  $rootScope.resendVerification = function () {
     API.all('misc/remail').get('').then((response) => {
       if(response.data.sucess == true){
        toastr.success(response.data.result);
      }else{
        toastr.error(response.data.result);
      }
     },(response) =>{
      
    }); 
  }
   $rootScope.changeEmail = function (email,form) {
      if(form.$valid){
        var data = {
          email: email
        }
         API.all('misc/change-mail').post(data).then((response) => {
            if(response.data.sucess == true){
              toastr.success(response.data.result);
              $rootScope.me.email = email;
              $rootScope.newEmail = '';
              $rootScope.verifyEmailFlag = true;
             
            }else{
              toastr.error(response.data.result);
              $rootScope.verifyEmailFlag = true;
            }
            form.$submitted = false;
         },(response) =>{
          
        });
     }
  }
  $scope.seenNotifications = function() {
    angular.element('.lv-body').scrollTop(0);
    if($rootScope.me.un_seen_notifications != 0){
      API.all('misc/seen-notifications').post('').then((response) => {
        $rootScope.me.un_seen_notifications = 0;
      });
    }
  };
  $scope.sendTokenToServer = function() {
      API.all('misc/reset-notifications-token').post('').then((response) => {

      });
  };
  $scope.goToLink = function(link) {
    window.location.href = link;
  };
  $scope.sendToken = function() {
    var data = {
      token: $rootScope.token,
      platform:'web'
    };
    API.all('misc/reset-notifications-token').post(data).then((response) => {
        
    }); 
  }; 
    $scope.notFlag = 0;
    this.Post = new Post.constructor($rootScope,API,$timeout,moment,Upload,$log);
    var Post = this.Post;
    this.Post.seturl('misc/user-notifications');
    this.Post.setnotificationSkip(0);
    this.Post.setnotificationTake(10);
    this.Post.getNotification();
    this.Post.getNotification().then(function(response) {
      $scope.not = Post.getNotifications();
      $scope.noNotification = Post.getnonotification();
    });
    $scope.getNotification = function() {
      Post.getNotification();
      $scope.not = Post.getNotifications();
      $scope.noNotification = Post.getnonotification();
    }
    $scope.hasToken = 0;
    const messaging = firebase.messaging();
    messaging.requestPermission()
    .then(function() {
      return messaging.getToken();
    }).then(function(Token) {
      $scope.hasToken = 1;
      $rootScope.token = Token;
      $scope.sendToken();
    })
    .catch(function(err) {
      $scope.hasToken = 2;
    });
    $scope.$watch('hasToken',function(event) {
      if($scope.hasToken == 2){
        API.all('home/check-unseen-notifications').get('').then((response) => {
        }); 
      }
    });
    var h = true;
    var interval = $interval(function () {
      if($scope.hasToken == 1){
        $interval.cancel(interval);
      }else{
        angular.element(window).focus(function() {
          h =true;
        });
        angular.element(window).blur(function() {
          h = false;
        });
        var data = {
          count: $rootScope.me.un_seen_notifications
        }
        if(h == true){
          API.all('home/check-unseen-notifications').post(data).then((response) => {
            if($rootScope.me.un_seen_notifications < response.data.unseen){
              $rootScope.me.un_seen_notifications = response.data.unseen;
              angular.forEach(response.data.notifications, function(value, key){
                    $scope.not.push(value);
                    toastr.info('<a href="'+value.link+'">' + value.body + '</a>', value.title,{
                      allowHtml: true,
                      autoDismiss: false,
                      newestOnTop: true,
                      progressBar: false,
                      timeOut: 0,
                      extendedTimeOut:0,
                      //onclick: $scope.goToLink(payload.data.click_action),
                      closeHtml: '<button><i class="md md-clear"></i></button>',
                      iconClass: 'toast-edzance',
                      closeButton: true
                    });
              })
            }
          }); 
        }
      }
    }, 25000);

    messaging.onTokenRefresh(function() {
      messaging.getToken()
      .then(function(refreshedToken) {
        //console.log('Token refreshed.');
        // Indicate that the new Instance ID token has not yet been sent to the
        // app server.
        //setTokenSentToServer(false);
        // Send Instance ID token to app server.
        sendTokenToServer(refreshedToken);
        $scope.sendToken();
        // ...
      })
      .catch(function(err) {
        //console.log('Unable to retrieve refreshed token ', err);
        showToken('Unable to retrieve refreshed token ', err);
      });
    })
    messaging.onMessage(function(payload) {
      //console.log("Message received. ", payload);
      $scope.not.push(payload.data);
      //console.log($scope.dat);
      $rootScope.me.un_seen_notifications++;
      toastr.info('<a href="'+payload.data.click_action+'">' + payload.data.body + '</a>', payload.data.title,{
        allowHtml: true,
        autoDismiss: false,
        newestOnTop: true,
        progressBar: false,
        timeOut: 0,
        extendedTimeOut:0,
        //onclick: $scope.goToLink(payload.data.click_action),
        closeHtml: '<button><i class="md md-clear"></i></button>',
        iconClass: 'toast-edzance',
        closeButton: true
      });
      // ...
    });
    }
  $onInit () {};
}
export const NavComponent = {
    templateUrl: './views/app/components/nav/nav.component.html',
    controller: NavController,
    controllerAs: 'vm',
    bindings: {}
}