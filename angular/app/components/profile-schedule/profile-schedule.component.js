class ProfileScheduleController{
    constructor($scope,$rootScope,API,$stateParams,Post,$timeout,moment,Upload,$log){
        'ngInject';
        this.$scope = $scope;
        this.Post = new Post.constructor($rootScope, API,$timeout,moment,Upload,$log);
        var Post = this.Post;
        this.Post.seturl('profile/classes/' + $stateParams.id);
        this.Post.setskip(0);
        this.Post.settake(6);
        this.Post.getPost().then(function(response){
            $scope.dat=Post.getPostat();
            $scope.nopost = Post.getnopost();
            $rootScope.busy = false;
        });
        this.scope = $scope;
        angular.element('html').scrollTop(0);
        $scope.getPost = function() {
            Post.getPost().then(function(response){
              $scope.dat=Post.getPostat();
              $scope.nopost = Post.getnopost();
              $rootScope.busy = false;
              $scope.dat.map(function(item){
                item.from = new Date(item.from);
                item.to = new Date(item.to);
                });
            });
        }
        $scope.callback = function() {
           $scope.nopost = Post.getnopost();
        }
    }
    $onInit(){ 
    }
}

export const ProfileScheduleComponent = {
    templateUrl: './views/app/components/profile-schedule/profile-schedule.component.html',
    controller: ProfileScheduleController,
    controllerAs: 'pro',
    bindings: {}
}


