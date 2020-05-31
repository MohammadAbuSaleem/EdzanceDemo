class SuggestionsfriendsController{
    constructor(API,Post,$rootScope,$timeout,moment,Upload,$log,$scope){
        'ngInject';
          this.Post = new Post.constructor($rootScope, API,$timeout,moment,Upload,$log);
          this.API = API;
          var Post = this.Post;
          this.Post.seturl('home/suggest-all');
          this.Post.setediturl('me/post-update');
          this.Post.settype('result');
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
          $scope.friendRequest = function(friendId,type){
            if(type == 'add'){
              API.all('home/friend-request/'+ friendId ).post('').then((response) => {
                $rootScope.me.friend.push(friendId);
              });
            } else if(type == 'remove'){
              API.all('home/friend-remove/'+ friendId).post('').then((response) => {
                $rootScope.me.friend.splice(friendId,1);
              });
            } else {
              API.all('home/friend-response'+ friendId +'/'+ type ).post('').then((response) => {
                if(type == 'accepted'){
                  $rootScope.me.friend.push(friendId);
                }
              });
            }
          };
    }

    $onInit(){
    }
}

export const SuggestionsfriendsComponent = {
    templateUrl: './views/app/components/suggestionsfriends/suggestionsfriends.component.html',
    controller: SuggestionsfriendsController,
    controllerAs: 'vm',
    bindings: {}
}


