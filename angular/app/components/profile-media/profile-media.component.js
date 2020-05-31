class ProfileMediaController{
    constructor($scope,$rootScope, ContextService,API){
        'ngInject';
        
    let navHeader = this

    ContextService.me(function (data) {
      navHeader.userData = data
    })
        this.scope = $scope;
       this.rootScope = $rootScope;
       this.API = API
    }

    $onInit(){
        console.log(this)
    }
}

export const ProfileMediaComponent = {
    templateUrl: './views/app/components/profile-media/profile-media.component.html',
    controller: ProfileMediaController,
    controllerAs: 'vm',
    bindings: {}
}


