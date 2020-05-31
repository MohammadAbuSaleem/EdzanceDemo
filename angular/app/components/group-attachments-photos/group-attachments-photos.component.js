class GroupAttachmentsPhotosController{
    constructor($scope,$rootScope,API,$stateParams,Post,$timeout,moment,Upload,$log){
        'ngInject';
        this.$scope = $scope;
        this.Post = new Post.constructor($rootScope, API,$timeout,moment,Upload,$log);
        var Post = this.Post;
        this.Post.seturl('gr/images/'+$stateParams.groupid);
        this.Post.setskip(0);
        this.Post.settake(4);
        //this.Post.getPost();
        this.Post.getPost().then(function(response){
            $scope.dat=Post.getPostat();
            $scope.nopost = Post.getnopost();
            $rootScope.busy = false;
        });
        //this.$scope = $scope;
        //this.$scope.dat=this.Post.getPostat();
        this.$scope = $scope;
        $scope.getPost = function() {
            Post.getPost().then(function(response){
                $scope.dat=Post.getPostat();
                $scope.nopost = Post.getnopost();
                $rootScope.busy = false;
            });
        }
    }  

    $onInit(){
    }
}

export const GroupAttachmentsPhotosComponent = {
    templateUrl: './views/app/components/group-attachments-photos/group-attachments-photos.component.html',
    controller: GroupAttachmentsPhotosController,
    controllerAs: 'vm',
    bindings: {}
}


