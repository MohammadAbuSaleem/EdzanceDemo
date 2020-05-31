class ProfilePhotoController{
    constructor($scope,$rootScope,API,$stateParams,Post,$timeout,moment,Upload,$log){
        'ngInject';
        this.$scope = $scope;
        this.Post = new Post.constructor($rootScope, API,$timeout,moment,Upload,$log);
        var Post = this.Post;
        this.Post.seturl('social/get/profile/post/'+$stateParams.id+'/image');
        this.Post.setskip(0);
        this.Post.settake(4);
        angular.element('html').scrollTop(0);
        this.Post.getPost().then(function(response){
            $scope.dat=Post.getPostat();
            $scope.nopost = Post.getnopost();
            $rootScope.busy = false;
        });
        this.$scope = $scope;
        //this.$scope.dat=this.Post.getPostat();
        this.$scope = $scope;
        $scope.getPost = function() {
          Post.getPost().then(function(response){
            $scope.dat = Post.getPostat();
            $scope.nopost = Post.getnopost();
            $rootScope.busy = false;
          });
        }
        $scope.callback = function() {
           $scope.nopost = Post.getnopost();
        }
    }
    $onInit(){
   }
}

export const ProfilePhotoComponent = {
    templateUrl: './views/app/components/profile-photo/profile-photo.component.html',
    controller: ProfilePhotoController,
    controllerAs: 'vm',
    bindings: {}
}


