class JobsController{
    constructor(Post,moment,$scope,$rootScope,API,$log,$timeout,Upload){
        'ngInject';
        this.$scope = $scope;
        this.rootScope = $rootScope;
        this.API = API;
        this.$scope.moment = moment;
        this.Post = new Post.constructor($rootScope, API,$timeout,moment,Upload,$log);
        var Post = this.Post;
        this.Post.seturl('jobs/get/all');
        this.Post.setskip(0);
        this.Post.settype('jobs');
        this.Post.settake(2);
        //this.Post.getPost();
        this.Post.getPost().then(function(response){
            $scope.dat=Post.getPostat();
            $scope.nopost = Post.getnopost();
            $rootScope.busy = false;
        });
        this.Post.settake(5);   
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

export const JobsComponent = {
    templateUrl: './views/app/components/jobs/jobs.component.html',
    controller: JobsController,
    controllerAs: 'vm',
    bindings: {}
}


