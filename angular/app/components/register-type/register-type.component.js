class RegisterTypeController{
    constructor($stateParams,$rootScope,$scope){
        'ngInject';
        this.stateParams = $stateParams;
        this.scope = $scope;
        this.rootScope = $rootScope;
        this.stateParams.back = 'logins.login.register.index'
        this.stateParams.next = 'logins.login.register.main'
       // console.log(this)

        //console.log('up is the constructor')
        //
    }

    $onInit(){
       // console.log(this)
    }
}

export const RegisterTypeComponent = {
    templateUrl: './views/app/components/register-type/register-type.component.html',
    controller: RegisterTypeController,
    controllerAs: 'regtype',
    bindings: {}
}


