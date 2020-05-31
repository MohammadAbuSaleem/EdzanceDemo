class RegistrationEducationController{
    constructor(chatMessages,moment,$http,AclService,API,$auth,$stateParams,$rootScope,$scope,$state,Upload,$timeout){
        'ngInject';
        this.$state = $state;
        this.rootScope = $rootScope;
        this.$auth = $auth
        this.$stateParams = $stateParams;
        this.scope = $scope;
        this.scope.fromtime = new Date();
        this.scope.totime = new Date();
        this.Upload =Upload;
        this.timeout = $timeout;
        this.regsubmit = false;
        this.$http = $http
        this.chatMessages = chatMessages;
        $scope.fromtime.setHours(0);
        $scope.fromtime.setMinutes(0);
        $scope.totime.setHours(0);
        $scope.totime.setMinutes(0);
        $scope.unvcountries = [];
        this.files = [];
        this.scope.fileErrorFlag = false;
        this.scope.timeErrorFlag = false;
        if(this.rootScope.user == undefined) {
            $state.go('logins.login.index');
        } 
        $scope.fromChanged = function (fromtime,files) {
            $scope.fromtime.setHours($scope.fromtime.getHours());
            $scope.fromtime.setMinutes($scope.fromtime.getMinutes());
            this.doctorValid(files);
        };
        $scope.totimeChanged = function (totime,files) {
            $scope.totime.setHours($scope.totime.getHours());
            $scope.totime.setMinutes($scope.totime.getMinutes());
            this.doctorValid(files);
        };
        // Retrieve Firebase Messaging object.
        const messaging = firebase.messaging();
        messaging.requestPermission()
        .then(function() {
          console.log('Notification permission granted.');
          // console.log(messaging.getToken());
          return messaging.getToken();

        }).then(function(Token) {
          // console.log(Token);
          $rootScope.token = Token;
        })
        .catch(function(err) {
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
        
        $http.get('/api/auth/get-countries-list', {
        }).then(function(response){
            $scope.unvcountries = response.data.data;
        });
        $scope.doctorValid = function(files) {
            var self = this;

            if(!files){
                self.fileErrorFlag = true;
            }else{
                self.fileErrorFlag = false;
            }
            if(self.fromtime.getTime() == self.totime.getTime()){
                self.timeErrorFlag = true;
            }else{
                self.timeErrorFlag = false;
            }
            if(self.fileErrorFlag && self.timeErrorFlag){
                return false;
            }else{
                return true;
            }
            
        }   
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
                                                                                                                                                                                                                                                                                                                           
    eduRegister (isValid,files,_self) {
        var self = this;
        if(self.rootScope.user.status == 2) {
            var doctorValid = false;
            doctorValid = this.scope.doctorValid(files);
            isValid = doctorValid;
        }
        if(isValid){
        //_self.fileUrl = '';
        if(self.rootScope.user.status == 2) {
            var from = new Date();
                from.setHours(self.scope.fromtime.getHours()+2);
                from.setMinutes(self.scope.fromtime.getMinutes());
            var to = new Date();
                to.setHours(self.scope.totime.getHours()+2);
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
                    }  
                    // console.log(user); 
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
                    .catch(self.failedRegistration.bind(self));
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
                }  
                // console.log(user); 
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
                .catch(self.failedRegistration.bind(self));
            }
        }else{
            this.regsubmit = true
         console.log('notVaild');   
        }
    }
    failedRegistration (response) {
        if (response.status === 422) {
          for (var error in response.data.errors) {
           this.errors[error] = response.data.errors[error][0]
           this.registerForm.$invalid = true
           this.registerForm[error].$invalid = true
           }
        }
      }
    changeCountry (self) {
        this.rootScope.user.university = '';
        this.rootScope.user.specialization = '';
        self.scope.unvrepeat = '';
        self.scope.sperepeat = '';
        var counId = this.rootScope.user.countries;
        if(counId){
            this.$http.get('/api/auth/university-by-name/'+counId, {
            }).then(function(response){
                self.scope.unvrepeat = response.data.data.universities; 
            });
        }
    }
    changeUniversity (self) {
        this.rootScope.user.collages = '';
        this.rootScope.user.specialization = '';
        var unvId = this.rootScope.user.university;
        // console.log(unvId);
        if(unvId){
            this.$http.get('/api/auth/colleges-by-university/'+unvId, {
            }).then(function(response){
                // console.log(response);
                self.scope.colrepeat = response.data.data.colleges;
            });
        }
    }
    changeCollages (self) {
        this.rootScope.user.specialization = '';
        var colId = this.rootScope.user.collages;
        // console.log(colId);
        if(colId){
            this.$http.get('/api/auth/specialition-by-name/'+colId, {
            }).then(function(response){
                // console.log(response);
                self.scope.sperepeat = response.data.data.specialitions;
            });
        }
    }
    $onInit(){
    }
}

export const RegistrationEducationComponent = {
    templateUrl: './views/app/components/registration-education/registration-education.component.html',
    controller: RegistrationEducationController,
    controllerAs: 'vm',
    bindings: {}
}
