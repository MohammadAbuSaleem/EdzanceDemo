class RegisterMailController{
   constructor ($rootScope, $auth, $state, $stateParams, API, AclService,$scope) {
     'ngInject';
           $scope.showHints = true;

   
        this.stateParams = $stateParams;
        this.scope = $scope;
        this.auth = $auth;
        this.scope.showHints = true;
        this.rootScope = $rootScope;
        this.stateParams.back = 'logins.login.register.information'
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
        if (this.stateParams.type=='Teacher') {
            this.stateParams.next = 'logins.login.register.confirm';
        }else{
          if(this.stateParams.type=='student'){
              this.stateParams.next = 'logins.login.register.loader';
          }else{
              this.stateParams.next = 'logins.login.register.loader';       
          }
          if (this.stateParams.type=='Teacher')
          {
            
          }

        }
       console.log('register from mail')
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



    $onInit(){
    }
}

export const RegisterMailComponent = {
    templateUrl: './views/app/components/register-mail/register-mail.component.html',
    controller: RegisterMailController,
    controllerAs: 'vm',
    bindings: {}
}


