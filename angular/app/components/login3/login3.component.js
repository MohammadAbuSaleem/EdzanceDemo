class Login3Controller {
    constructor($http,AclService,API,$auth,$stateParams,$rootScope,$scope,$state){
      'ngInject';
        this.scope = $scope;
        this.$state = $state;
        this.rootScope = $rootScope;
        this.$auth = $auth
        this.API = API
        this.$stateParams = $stateParams
        this.AclService = AclService

        this.registerSuccess = $stateParams.registerSuccess
        this.successMsg = $stateParams.successMsg
        this.loginfailed = false
        this.unverified = false
        this.rootScope.pageTitle = 'مرحبًا بك في ادزانس';
        angular.element('meta[name=Description]').attr('content','تواصل مع مدرسيك وزملائك , احصل على ملفاتك الدراسية و على تنبيهات امتحانات , شارك الطلاب الجامعيين آرائك ونقاشاتك .');
        angular.element('meta[name=Keywords]').attr('content','إدزانس,ادزانس,ed-zance,edzance');
         $scope.getLocation = function(val) {
            return $http.get('auth-debug/university-information/'+val, {
              params: {
              }
            }).then(function(response){
              return response.data.data.u.map(function(item){
                return item;
              });
            });
          };
    }

      login (isValid,_self) {
        if (isValid) {
            this.loginfailed = false
            this.unverified = false

            let user = {
              email: this.logemail,
              password: this.logpassword
            }
            this.$auth.login(user)
              .then((response) => {
                    let data = response.data.data
                    let AclService = this.AclService
                    angular.forEach(data.userRole, function (value) {
                      AclService.attachRole(value)
                    })
                    AclService.setAbilities(data.abilities)
                    this.$auth.setToken(response.data)
                    if(response.data.data.dataleak== true) {
                        var user = {
                            email: _self.logemail,
                            password: _self.logpassword,
                          }
                        console.log(user)
                        this.$state.go('logins.university-information',{id:response.data.data.user.id,user: response.data.data.user,email: this.logemail,password: this.logpassword})

                    } else{
                        window.location.href = "/";
                    }
                })
                  .catch(this.failedLogin.bind(this))
        }else {
          this.logSubmitted = true
          console.log(this)
        }
    }

    register (isValid) {
        if (isValid) {
          var user = {
            name: this.name,
            university: this.university,
            status: this.status,
            email: this.email,
            password: this.password
          }

          this.$auth.signup(user)
            .then(() => {
              this.$state.go('logins.login.index', { registerSuccess: true })
            })
            .catch(this.failedRegistration.bind(this))
        } else {
          this.formSubmitted = true
        }
    }
  failedRegistration (response) {
    if (response.status === 422) {
      for (var error in response.data.errors) {
        this.errors[error] = response.data.errors[error][0]
       this.registerForm.$invalid = true
       this.registerForm[error].$invalid = true
       console.log(this)
       }
    }
  }
    go(url){
        if (url=='') {
            url = 'logins.register.error';
        }
            this.$state.go(url,{back:this.$stateParams.back,next:this.$stateParams.next,type: this.$stateParams.type})
    }
    $onInit(){
            this.firstname = ''
            this.lastname= '',
            this.phone= '',
            this.gender= '',
            this.day= '',
            this.month= '',
            this.year= '',
            this.logemail = ''
            this.logpassword = ''
            this.email = ''
            this.password = ''
            this.password_confirmation = ''
            this.mailcheck=''
            this.phonecheck=''
        }
}

export const Login3Component = {
    templateUrl: './views/app/components/login3/login3.component.html',
    controller: Login3Controller,
    controllerAs: 'vm',
    bindings: {}
}


