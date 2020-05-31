class GroupAttachmentsVideosController{
    constructor($scope,$rootScope,API,$stateParams,Post,$timeout,moment,Upload,$log){
        'ngInject';
       this.$scope = $scope;
        this.Post = new Post.constructor($rootScope, API,$timeout,moment,Upload,$log);
        var Post = this.Post;
        this.Post.seturl('gr/video/'+$stateParams.groupid);
        this.Post.setskip(0);
        this.Post.settake(4);
        this.Post.getPost().then(function(response){
            $scope.dat=Post.getPostat();
            $scope.nopost = Post.getnopost();
            $rootScope.busy = false;
        });
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

export const GroupAttachmentsVideosComponent = {
    templateUrl: './views/app/components/group-attachments-videos/group-attachments-videos.component.html',
    controller: GroupAttachmentsVideosController,
    controllerAs: 'vm',
    bindings: {}
}


