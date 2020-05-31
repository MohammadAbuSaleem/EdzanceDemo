class RegisterInformationController{
     constructor($http,$stateParams,$scope,$rootScope, ContextService,API,$interval,$uibModal,$log,Upload,$timeout){
        'ngInject';

        this.file = []
        this.API = API
        this.interval = $interval;
        this.uibModal = $uibModal;
        this.log = $log;
        this.timeout = $timeout;
        $scope.logs=''
        this.Upload = Upload
        this.logs = ''
        var timeout = $timeout
        this.stateParams = $stateParams;
        this.scope = $scope;
        this.rootScope = $rootScope;
        this.scope.files =[]
        this.stateParams.back = 'logins.login.register.main'
        if (this.stateParams.type=='student') {
            this.stateParams.next = 'logins.login.register.mail';
        }else{
          if(this.stateParams.type=='Teacher'){
              this.stateParams.next = 'logins.login.register.mail';
          }else{
              this.stateParams.next = 'logins.login.register.error';       
          }
        }
      
     $scope.getLocation = function(val) {
        return $http.get('auth-debug/university-information/'+val, {
          params: {
          }
        }).then(function(response){
          return response.data.data.u.map(function(item){
            return item;
          });
        });
      };
  }
    $onInit(){
    }

}

export const RegisterInformationComponent = {
    templateUrl: './views/app/components/register-information/register-information.component.html',
    controller: RegisterInformationController,
    controllerAs: 'reginf',
    bindings: {}
}


