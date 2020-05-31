class LogHeadController{
 constructor($http,AclService,API,$auth,$stateParams,$rootScope,$scope,$state,screenSize){
      'ngInject';
        this.scope = $scope;
        this.$state = $state;
        this.rootScope = $rootScope;
        this.$auth = $auth
        this.API = API
        this.$stateParams = $stateParams
        this.AclService = AclService

      $rootScope.mobile = screenSize.on('xs', function(match){
        $rootScope.mobile = match;
      });
      $scope.desktop = screenSize.on('sm, md, lg', function(match){
        $scope.desktop = match;
      }); 
    }

    $onInit(){
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
      failedLogin (res) {
        if (res.status == 401) {
          this.loginfailed = true
        } else {
          if (res.data.errors.message[0] == 'Email Unverified')
           {this.unverified = true  }
        }
  }
}

export const LogHeadComponent = {
    templateUrl: './views/app/components/log-head/log-head.component.html',
    controller: LogHeadController,
    controllerAs: 'vm',
    bindings: {}
}


