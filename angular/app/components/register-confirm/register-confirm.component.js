class RegisterConfirmController{
    constructor($state,$stateParams,$rootScope,$scope){
        'ngInject';
        this.stateParams = $stateParams;
        this.state = $state;
        this.scope = $scope;
        this.rootScope = $rootScope;
        //this.stateParams = $stateParams;
        this.stateParams.back = 'logins.login.register.information'
        if (this.stateParams.type=='student') {
            this.stateParams.next = 'logins.login.register.mail';
        }else{
          if(this.stateParams.type=='Teacher'){
              this.stateParams.next = 'logins.login.register.mail';
          }else{
              this.stateParams.next = 'logins.login.register.error';       
          }
        }

  }
check(){
    console.log(this.stateParams)
    console.log( this.state.current.name)

}
}

export const RegisterConfirmComponent = {
    templateUrl: './views/app/components/register-confirm/register-confirm.component.html',
    controller: RegisterConfirmController,
    controllerAs: 'regconf',
    bindings: {}
}


