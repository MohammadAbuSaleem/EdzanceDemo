class RegistrationBoxController{
 constructor(chatMessages,$http,AclService,API,$auth,$stateParams,$rootScope,$scope,$state,toastr){
      'ngInject';
        $rootScope.user = [];
        this.scope = $scope;
        this.$state = $state;
        this.rootScope = $rootScope;
        this.$auth = $auth
        this.API = API 
        this.toastr = toastr
        this.$stateParams = $stateParams
        this.AclService = AclService
        this.registerSuccess = $stateParams.registerSuccess
        this.successMsg = $stateParams.successMsg
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
        angular.element('meta[name=Description]').attr('content','تواصل مع مدرسيك وزملائك , احصل على ملفاتك الدراسية و على تنبيهات الامتحانات , شارك زملائك آرائك ونقاشاتك وتطلعاتك .');
        angular.element('meta[name=Keywords]').attr('content','دزانس,ادزنس,ed-zance,edzance');  
        $http.get('/api/auth/get-countries-list', {
        }).then(function(response){
            $scope.unvcountries = response.data.data;
        });
        const messaging = firebase.messaging();
        messaging.requestPermission()
        .then(function() {
          // console.log('Notification permission granted.');
          // console.log(messaging.getToken());
          return messaging.getToken();

        }).then(function(Token) {
          // console.log(Token);
          $rootScope.token = Token;
        })
        .catch(function(err) {
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
    register (isValid,vm) {
        var self = this;
        if(isValid){
            var data = { email: this.rootScope.user.email};
            this.API.all('/auth/check-registered-email').post(data).then((response) => {
                if(response.data == "success"){
                    self.checkEmail = true;
                    self.signup();
                }  
                },(response) =>{ 
                  if(response.data.status_code == 422){
                    self.checkEmail = false;
                    //this.formErrorData = response.data.errors;
                    this.toastr.error(response.data.errors.email[0]);
                    //this.formError = true;
                  }
                });
        }else{
            this.regsubmit = true
            console.log('notVaild');   
        }
    }
    signup () {
        var self = this;
        var user = {  
            name:this.rootScope.user.name,
            email: this.rootScope.user.email,
            password: this.rootScope.user.password,
            country_id: this.rootScope.user.countries,
            //university: this.rootScope.user.university,
            token: self.rootScope.token,
            platform: 'web'
        };
        self.$auth.signup(user) 
            .then((response) => {
                self.chatMessages.init(response.data.data.user).then(function(user){
                    self.rootScope.chatMessages.getRooms().then(function(Rooms){
                        self.rootScope.chatMessages.Rooms = Rooms;
                        self.rootScope.Rooms =  Rooms;
                        self.rootScope.messaging_enabled = true;
                        self.rootScope.chatMessages.checkStatus();
                        self.$auth.setToken(response.data.data.token);
                        window.location.href = "/";
                    });
                });
            })
    }
    go(url){
        if (url=='') {
            url = 'logins.register.error';
        }
        this.$state.go(url,{back:this.$stateParams.back,next:this.$stateParams.next,type: this.$stateParams.type})
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
    $onInit(){
    }
}

export const RegistrationBoxComponent = {
    templateUrl: './views/app/components/registration-box/registration-box.component.html',
    controller: RegistrationBoxController,
    controllerAs: 'vm',
    bindings: {}
}


