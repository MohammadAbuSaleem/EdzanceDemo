class SearchController{
    constructor(API,Post,$stateParams,$rootScope,$timeout,moment,Upload,$log,$scope){
      'ngInject';
        this.rootScope = $rootScope
        this.rootScope.pageTitle = "البحث"
          this.Post = new Post.constructor($rootScope, API,$timeout,moment,Upload,$log);
          this.API = API;
          var Post = this.Post;
          this.Post.seturl('search/'+$stateParams.value);
          // this.Post.settype('result');
          this.Post.setskip(0);
          this.Post.settake(4);
          this.Post.getPost().then(function(response){
            $scope.dat=Post.getPostat();
            $scope.nopost = Post.getnopost();
            $rootScope.busy = false;
          });
          $scope.getPost = function() {
            Post.seturl('search/'+$stateParams.value);
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

export const SearchComponent = {
    templateUrl: './views/app/components/search/search.component.html',
    controller: SearchController,
    controllerAs: 'vm',
    bindings: {}
}


