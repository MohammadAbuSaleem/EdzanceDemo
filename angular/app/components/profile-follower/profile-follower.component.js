class ProfileFollowerController{
    constructor($scope,$rootScope,API,$stateParams,Post,$timeout,moment,Upload,$log){
        'ngInject';
        this.$scope = $scope;
        this.Post = new Post.constructor($rootScope, API,$timeout,moment,Upload,$log);
        var Post = this.Post;
        this.Post.seturl('profile/followers/'+$stateParams.id);
        this.Post.setskip(0);
        this.Post.settake(5);
        angular.element('html').scrollTop(0);
        $rootScope.busy = false;
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
        console.log(this)
    }
}

export const ProfileFollowerComponent = {
    templateUrl: './views/app/components/profile-follower/profile-follower.component.html',
    controller: ProfileFollowerController,
    controllerAs: 'pfr',
    bindings: {}
}


