class RegisterErrorController{
    constructor($stateParams,$rootScope,$scope){
        'ngInject';
        this.stateParams = $stateParams;
        this.scope = $scope;
        this.rootScope = $rootScope;
        this.stateParams.back = 'logins.login.register.main'
        if (this.stateParams.type=='student') {
            this.stateParams.next = 'logins.login.register.class';
        }
        if(this.stateParams.type=='Teacher'){
            this.stateParams.next = 'logins.login.register.email';
        }else{
            this.stateParams.next = 'logins.login.register.error';       
        }
        console.log(this)
    }
    $onInit(){
    }
}

export const RegisterErrorComponent = {
    templateUrl: './views/app/components/register-error/register-error.component.html',
    controller: RegisterErrorController,
    controllerAs: 'vm',
    bindings: {}
}


