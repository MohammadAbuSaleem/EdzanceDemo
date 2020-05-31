class RegisterMainController{
    constructor($state,$stateParams,$rootScope,$scope){
        'ngInject';
           $scope.showHints = true;

   
        this.stateParams = $stateParams;
        this.$state = $state;
        this.scope = $scope;
        this.scope.showHints = true;
        this.rootScope = $rootScope;
        this.stateParams.back = 'logins.login.register'
        // this.stateParams.name = '';
        // this.stateParams.phone = '';
        // this.stateParams.email = '';
        // this.stateParams.password = '';
          $scope.user = {
              name: this.stateParams.name,
              email: this.stateParams.email,
              social: this.stateParams.password,
              phone: this.stateParams.phone
        };
        if(this.stateParams.type=='Teacher'){
            this.stateParams.next = 'logins.login.register.information';
        }else{
            this.stateParams.next = 'logins.login.register.information';       
        }


     $scope.getLocation = function(val) {
        return $http.get('auth-debug/university-information/'+val, {
          params: {
          }
        }).then(function(response){
         // console.log(response)
          return response.data.data.u.map(function(item){
            return item;
          });
        });
      };
//console.log(this)
}
    $onInit(){
    }
        test(reg){
    //  console.log(reg)
    }
}

export const RegisterMainComponent = {
    templateUrl: './views/app/components/register-main/register-main.component.html',
    controller: RegisterMainController,
    controllerAs: 'regmain',
    bindings: {}
}


