class LoginRedirectController{
    constructor(){
        'ngInject';

        //  this.$state.go(url)
            
    }

    $onInit(){
    }
}

export const LoginRedirectComponent = {
    templateUrl: './views/app/components/login-redirect/login-redirect.component.html',
    controller: LoginRedirectController,
    controllerAs: 'vm',
    bindings: {}
}


