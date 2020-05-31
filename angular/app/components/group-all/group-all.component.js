class GroupAllController{
    constructor(Post,moment,$state,$sce,$scope,$stateParams,$rootScope,API,$log,$timeout,Upload){
        'ngInject';
        this.$state = $state;
        this.scope = $scope;
        this.stateParams = $stateParams;
        this.rootScope = $rootScope;
        this.API = API;
        this.sce = $sce;
        this.log = $log; 
        this.timeout = $timeout;
        this.Upload = Upload;
        this.Post = new Post.constructor($rootScope, API,$timeout,moment,Upload,$log);
        var Post = this.Post;
        this.Post.seturl('gr/all-' + this.stateParams.groupcategory);
        this.Post.setskip(0);
        this.Post.settype('group');
        this.Post.settake(2);
        //this.Post.getPost();
        this.Post.getPost().then(function(response){
            $scope.dat=Post.getPostat();
            $scope.nopost = Post.getnopost();
            $rootScope.busy = false;
        });
        this.Post.settake(5);   
        this.scope = $scope;
        //$scope.dat=this.Post.getPostat();

         $scope.getPost = function() {
            Post.getPost().then(function(response){
                $scope.dat=Post.getPostat();
                $scope.nopost = Post.getnopost();
                $rootScope.busy = false;
            });
        }
        //
    }

    $onInit(){
    }
}

export const GroupAllComponent = {
    templateUrl: './views/app/components/group-all/group-all.component.html',
    controller: GroupAllController,
    controllerAs: 'vm',
    bindings: {}
}


