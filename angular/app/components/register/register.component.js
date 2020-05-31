class RegisterController{
     constructor($http,$stateParams, $auth,$scope,$rootScope,$state, ContextService,API,$interval,$uibModal,$log,Upload,$timeout){
     'ngInject';
        this.stateParams = $stateParams;
        this.API = API;
        this.$auth = $auth;
        this.scope = $scope;
        this.$state = $state;
        this.rootScope = $rootScope;
        this.file = []
        this.API = API
        this.interval = $interval;
        this.uibModal = $uibModal;
        this.log = $log;
        this.timeout = $timeout;
        $scope.logs=''
        this.scope.files =[]
        this.Upload = Upload
        this.logs = ''
        var timeout = $timeout


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
          this.API.all('auth/user-inf/'+this.stateParams.id).get('').then((response) => {
            this.stateParams.name = response.data.user.name
            this.stateParams.email = response.data.user.email 
             this.$state.go('logins.login.register')
                  
           },(response) =>{
          this.$state.go('logins.login')
        });
         }else{
        if (this.stateParams.type== null) {
       this.$state.go('logins.login.register')
         }else{
           if (this.stateParams.email == null || this.stateParams.name == null || this.stateParams.password == null || this.stateParams.phone == null) {
        this.$state.go('logins.login.register.main')
         }else{
           if (this.stateParams.university == null) {
        this.$state.go('logins.login.register.information')
         }}}}           
        //
    }
    test(reg){
      console.log('hi this is reg')
      console.log(reg)
    }
    go(url){
          if (this.stateParams.type== null) {
       this.stateParams.type = ""
         }
      //console.log(url)
        if (url=='') {
              url = 'logins.login.register.error';
            }
        if (url ==='logins.login.register.confirm' && this.stateParams.type ==='Teacher') {
              // console.log(this.stateParams)
               //this.$state.go(url,{back:this.stateParams.back,next:'logins.login.register.mail',type: this.stateParams.type})
               this.$state.go(url,{back:'logins.login.register.information',next:'logins.login.register.mail',type: this.stateParams.type})
               this.addhomework(this.stateParams.files,this.timeout,this.logs, this.stateParams.classid,this)
          }else{
            if (url ==='logins.login.register.mail' || url ==='logins.login.register.information') {
                  var user = {
              name: this.stateParams.name,
              email: this.stateParams.email,
              university: this.stateParams.university,
              type: this.stateParams.type,
              password: this.stateParams.password,
              telephone: this.stateParams.phone
              };
              console.log('register from register')
              ////////////////////////////////////////////////
              this.$auth.signup(user)
              .then(() => {
                this.$state.go('logins.login.index', { registerSuccess: true })
              })
              .catch(this.failedRegistration.bind(this))
              ///////////////////////////////////////////////////

            }else{
            this.$state.go(url,{back:'logins.login.register.information',next:'logins.login.register.mail',type: this.stateParams.type})
            ////console.log('hi we are going to :' + url )
           } 
         }
    }
  failedRegistration (response) {
    if (response.status === 422) {
      for (var error in response.data.errors) {
       this.rootScope.errors[error] = response.data.errors[error][0]
       this.rootScope['errorDes'+(error+1)] =  response.data.errors[error][0]
       this.registerForm.$invalid = true
       this.registerForm[error].$invalid = true
       //console.log(this)
       }
       this.rootScope.rerror = true
      $timeout(function () {
        this.rootScope.rerror = false
      }, 5000);
    }
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
                    url: 'api/vc/upload',
                     method: 'POST',
                    file: file,
                    data: {
                      username: this.username,
                      file: this.scope.files[i]  
                    }
                }).then(function (resp,$scope) {
                    $timeout(function() {
                       // console.log('upload finished ')
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
                       $timeout(function() {
                        //  console.log('timeout acativated :s')
                        //  console.log(resp.data.data)
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

    $onInit(){
     //   console.log(this)
    }
}

export const RegisterComponent = {
    templateUrl: './views/app/components/register/register.component.html',
    controller: RegisterController,
    controllerAs: 'reg',
    bindings: {}
}


