class RegisterLoaderController{
  constructor ($rootScope, $auth, $state, $stateParams, API,$scope) {
    'ngInject'

    this.stateParams = $stateParams
    this.$state = $state
    console.log(this.stateParams)
     // this.$state.go('logins.register.main',{logtype:'social',name:this.stateParams.name,email:this.stateParams.email})
        
  }

    $onInit(){
    }


}

export const RegisterLoaderComponent = {
    templateUrl: './views/app/components/register-loader/register-loader.component.html',
    controller: RegisterLoaderController,
    controllerAs: 'reglod',
    bindings: {}
}


