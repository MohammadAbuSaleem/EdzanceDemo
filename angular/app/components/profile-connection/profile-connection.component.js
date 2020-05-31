class ProfileConnectionController{
    constructor($scope,$rootScope, ContextService,API,$stateParams){
        'ngInject';
    let navHeader = this
        this.scope = $scope;
        this.$stateParams = $stateParams;
       this.rootScope = $rootScope;
       this.API = API
    }
    $onInit(){
    }
}

export const ProfileConnectionComponent = {
    templateUrl: './views/app/components/profile-connection/profile-connection.component.html',
    controller: ProfileConnectionController,
    controllerAs: 'vm',
    bindings: {}
}


