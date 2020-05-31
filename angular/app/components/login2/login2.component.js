class Login2Controller {
  constructor ($rootScope, $auth, $state, $stateParams, API, AclService,$scope) {
    'ngInject'

    delete $rootScope.me
    var d = new Date();
    $scope.year = d.getFullYear();

    $scope.month = 12;
    $scope.day = 31;
    this.scope = $scope;
    this.$auth = $auth
    this.$state = $state
    this.API = API
    this.$stateParams = $stateParams
    this.AclService = AclService


    this.password = ''
    this.password_confirmation = ''
    this.formSubmitted = false
    this.logSubmitted = false
    this.errors = []

    this.registerSuccess = $stateParams.registerSuccess
    this.successMsg = $stateParams.successMsg
    this.loginfailed = false
    this.unverified = false
  }

  $onInit () {
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
console.log(this)

  }
  checkemail(){
if (this.registerForm.password)
           this.API.all('me/check').post(this.email).then((response) => {
         //  this.scope.dat.push(response.data.post);
        //  $scope=this.scope;
           },(response) =>{
          console.log($scope.post_enabled);
            for (var error in response.data.errors) {
            this.errors[error] = response.data.errors[error][0]
            this.registerForm.$invalid = true
            this.registerForm[error].$invalid = true
           }
          });
  }
    checkphone(){

           this.API.all('me/post').post(this.telephone).then((response) => {
          // this.scope.dat.push(response.data.post);
          //$scope=this.scope;
           },(response) =>{
          console.log($scope.post_enabled);
            for (var error in response.data.errors) {
            this.errors[error] = response.data.errors[error][0]
            this.registerForm.$invalid = true
            this.registerForm[error].$invalid = true
           }
          });
  }
   getNumber(num) {
    return new Array(num);   
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
           // console.log(response.data);
            AclService.setAbilities(data.abilities)
            this.$auth.setToken(response.data)
            if(response.data.data.dataleak== true) {
              console.log(response)
               var user = {
        email: _self.logemail,
        password: _self.logpassword,
      }
      console.log(user)
    this.$state.go('logins.university-information',{id:response.data.data.user.id,user: response.data.data.user,email: this.logemail,password: this.logpassword})

            } else{
           // this.$state.go('app.landing')
            window.location.href = "/";
            }
          })
          .catch(this.failedLogin.bind(this))
  }else {
      this.logSubmitted = true
      console.log(this)
    }
}
  failedLogin (res) {
        if (res.status == 401) {
          this.loginfailed = true
        } else {
          if (res.data.errors.message[0] == 'Email Unverified')
           {this.unverified = true  }
        }
  }

    register (isValid) {
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
}

export const Login2Component = {
    templateUrl: './views/app/components/login2/login2.component.html',
    controller: Login2Controller,
    controllerAs: 'vm',
    bindings: {}
}


