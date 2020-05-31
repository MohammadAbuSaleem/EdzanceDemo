class LoginUniversitySocialController{
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
    this.type=2;
    this.registerSuccess = $stateParams.registerSuccess
    this.successMsg = $stateParams.successMsg
    this.loginfailed = false
    this.unverified = false
  }

    $onInit(){
        this.API.all('auth/university-information/jor').get('').then((response) => {
          this.scope.university = response.data.university;
          this.email = this.$stateParams.email;
          this.id = this.$stateParams.id;
         console.log(this)
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

    register (isValid) {
     //console.log( this.$stateParams);
     //console.log(isValid);
     console.log(this)
   
     if (isValid) {
      var user = {
        email: this.email,
        id: this.id,
        country: this.country,
        university: this.university,
        college: this.college,
        specialize: this.specialize,
        type: this.type,
        ids:this.$stateParams.id,
        user:this.$stateParams.user,
         }
         //console.log(this.$stateParams.user);
  this.API.all('auth/university-inf-social').post(user).then((response) => {
      console.log("There are  saving successfull");
     // console.log(response);

    this.API.oneUrl('authenticate').one('user').get().then((response) => {
      if (!response.error) {
        let data = response.data

        angular.forEach(data.userRole, function (value) {
          this.AclService.attachRole(value)
        })

        this.AclService.setAbilities(data.abilities)
        this.$auth.setToken(data.token)
        this.$state.go('app.landing')
      }
    })
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

export const LoginUniversitySocialComponent = {
    templateUrl: './views/app/components/login-university-social/login-university-social.component.html',
    controller: LoginUniversitySocialController,
    controllerAs: 'logs',
    bindings: {}
}




