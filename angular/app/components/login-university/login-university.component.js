class LoginUniversityController{

  constructor ($rootScope, $auth, $state, $stateParams, API, AclService,$scope) {
    'ngInject'
    this.scope = $scope;
    this.API = API
    this.$auth = $auth
    this.$state = $state
    this.$stateParams = $stateParams
    this.AclService = AclService
    this.formSubmitted = false
    this.errors = []
    this.type=0;
    this.status=0;
    this.registerSuccess = $stateParams.registerSuccess
    this.successMsg = $stateParams.successMsg
    this.loginfailed = false
    this.unverified = false
  }

    $onInit(){
        this.API.all('auth/university-information/jor').get('').then((response) => {
          this.scope.university = response.data.university;
          this.email = this.$stateParams.email;
         this.password = this.$stateParams.password;
        // console.log(this)
        })
         }
    getcollege($id){
      this.API.all('auth/college-information/'+ $id).get('').then((response) => {
          this.scope.univ = response.data.university;
         // console.log(this.scope)
        })
    }
    getspecialize($id){
      this.API.all('auth/specialize-information/'+$id).get('').then((response) => {
          this.scope.college = response.data.university;
         // console.log(this.scope)
        })
    }
   watch(file) {
        this.upload(this.scope.files);
    }
   watch(){
        if (this.scope.file != null) {
            this.scope.files = [this.scope.file]; 
        }
    }

    upload (files,$timeout,logs,$scope) {
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
                }).then(function (resp,$scope) {
                    $timeout(function() {
                        console.log('upload finished ')
                    });
                }, null, function (evt,$scope) {
                    var progressPercentage = parseInt(100.0 *
                            evt.loaded / evt.total);
                  logs  = 'progress: ' + progressPercentage + 
                        '% ' + evt.config.data.file.name + '\n' ;
                });
              }
            }
        }
    };


    addhomework (files,$timeout,logs,classid,_self) {
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
                       $timeout(function() {
                          var mynewhomework = {
                                          id:  _self.userData.id,
                                          textpost: _self.textpost,
                                          imgTag: _self.imgTag,
                                          file:resp.data.data.return[0]
                                          }
                                          _self.API.all('me/image').post(mynewhomework).then((response) => {
                                              _self.scope.dat.push(response.data.post) ;
                                             // _self.scope.dat.push(response.data.post);
                                          });
                      });
                  }, null, function (evt) {
                    var progressPercentage = parseInt(100.0 *
                              evt.loaded / evt.total);
                    logs  = 'progress: ' + progressPercentage + 
                          '% ' + evt.config.data.file.name + '\n' ;
                        console.log(logs)
                  });
                }
              }
        }
  }
    register (isValid) {
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
        id:this.$stateParams.id,
         }
      this.API.all('auth/university-inf').post(user).then((response) => {
            if (!response.error) {
                      let data = response.data
                      angular.forEach(data.userRole, function (value) {
                        this.AclService.attachRole(value)
                      })
                      this.AclService.setAbilities(data.abilities)
                      this.$auth.setToken(data.token)
                         window.location.href = "/";
            }
      });

    } else {
      this.formSubmitted = true
               console.log('Not Valid :(!!');
               console.log(this);
          
    }
  }

  failedRegistration (response) {
    if (response.status === 422) {
      for (var error in response.data.errors) {
                 console.log('Had Error :(!!');
                 console.log(this);
         
        this.errors[error] = response.data.errors[error][0]
        this.$scope.registerForm[error].$invalid = true
      }
    }
  }

}
export const LoginUniversityComponent = {
    templateUrl: './views/app/components/login-university/login-university.component.html',
    controller: LoginUniversityController,
    controllerAs: 'logu',
    bindings: {}
}


