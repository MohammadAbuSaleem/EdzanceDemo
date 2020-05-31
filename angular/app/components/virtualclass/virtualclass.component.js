class VirtualclassController {
    constructor(Post,$stateParams, $state, $scope, $rootScope, ContextService, API, AclService) {
        'ngInject'; 
        this.Post = Post
        let navSideBar = this
        this.API = API;
        this.rscope = $rootScope;
        this.scope = $scope;
        this.stateParams = $stateParams;
        this.scope.$state = $state;
        this.$state = $state;
        this.rscope.prouser = []
        this.rscope.student = []
        this.userData = []
        this.counter = 0 
        this.can = AclService.can
        this.rscope.mobileHeader = false
        this.Post.setSection('class'); 
        this.scope.loader = 0;
        $rootScope.req = API.all('class/get/' + $stateParams.classid).get('')
            .then((response) => {
                if (response.data.access == false) {
                        this.$state.go('app.unauthorized');
                }else{
                    $scope.loader = 1;
                }
                $rootScope.vc = response.data;
                $scope.student = response.data.vcuser;
                this.rscope.pageTitle = $rootScope.vc.name + ' | ' + $rootScope.vc.u_name;
                angular.element('meta[name=Keywords]').attr('content', 'الصف الافتراضي' + $rootScope.vc.name + ',' + $rootScope.vc.u_name);
                angular.element('meta[name=Description]').attr('content', '');
                
            });
    }
    $onInit() {
    }
}
export const VirtualclassComponent = {
    templateUrl: './views/app/components/virtualclass/virtualclass.component.html',
    controller: VirtualclassController,
    controllerAs: 'vc',
    bindings: {}
}