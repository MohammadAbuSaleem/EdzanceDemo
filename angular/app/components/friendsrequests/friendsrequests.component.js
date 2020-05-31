class FriendsrequestsController{
    constructor(API,Post,$rootScope,$timeout,moment,Upload,$log,$scope){
        'ngInject';
        this.Post = new Post.constructor($rootScope, API,$timeout,moment,Upload,$log);
        this.API = API;
        var Post = this.Post;
        this.Post.seturl('api/home/friend-requests');
        this.Post.setediturl('me/post-update');
        this.Post.settype('friend');
        this.Post.setskip(0);
        this.Post.settake(6);
        this.Post.getPost().then(function(response){
          $scope.dat=Post.getPostat();
          $scope.nopost = Post.getnopost();
          $rootScope.busy = false;
        });
        $scope.getPost = function() {
          Post.getPost().then(function(response){
            $scope.dat=Post.getPostat();
            $scope.nopost = Post.getnopost();
            $rootScope.busy = false;
          });
        }
        // $scope.friend = [
        //     {
        //       avatar: 'img/icons/infinity.svg',
        //       id: 100158,
        //       name: "Hamzeh Alnatsheh",
        //       created_at: "2018-02-08 13:03:08"
        //     },
        //     {
        //       avatar: 'img/icons/infinity.svg',
        //       id: 100158,
        //       name: "Hamzeh Alnatsheh",
        //       created_at: "2018-02-08 13:03:08"  
        //     }
        // ];
        // 
    }

    $onInit(){
    }
}

export const FriendsrequestsComponent = {
    templateUrl: './views/app/components/friendsrequests/friendsrequests.component.html',
    controller: FriendsrequestsController,
    controllerAs: 'vm',
    bindings: {}
}


