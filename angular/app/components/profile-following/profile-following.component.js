class ProfileFollowingController{
     constructor($scope,$rootScope,API,$stateParams,Post,$timeout,moment,Upload,$log){
        'ngInject';
        this.$scope = $scope;
        this.Post = new Post.constructor($rootScope, API,$timeout,moment,Upload,$log);
        var Post = this.Post;
        this.Post.seturl('profile/friends/'+$stateParams.id);
        this.Post.setskip(0);
        this.Post.settake(5);
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

export const ProfileFollowingComponent = {
    templateUrl: './views/app/components/profile-following/profile-following.component.html',
    controller: ProfileFollowingController,
    controllerAs: 'pfg',
    bindings: {}
}


