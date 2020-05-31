class LoginLoaderController {
  constructor ($state, $auth, API, AclService) {
    'ngInject'

    API.oneUrl('authenticate').one('user').get().then((response) => {
      if (!(response.status_code==401)) {
        let data = response.data
        angular.forEach(data.userRole, function (value) {
          AclService.attachRole(value)
        })
        AclService.setAbilities(data.abilities)
        $auth.setToken(data.token)
        console.log(document.referrer)
       // $state.go('app.landing')
      window.location.href = "/";
      }
    })
  }
  
    $onInit(){
    }

}

export const LoginLoaderComponent = {
  templateUrl: './views/app/components/login-loader/login-loader.component.html',
  controller: LoginLoaderController,
  controllerAs: 'vm',
  bindings: {}
}
