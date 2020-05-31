class NotificationsController{
    constructor($rootScope,API,$timeout,moment,Upload,$log,$scope,Post){
        'ngInject';
        this.rootScope = $rootScope
        this.rootScope.pageTitle = "الإشعارات"
        this.$scope = $scope
        this.$scope.moment = moment;
        const messaging = firebase.messaging();
        console.log(messaging);
        messaging.onMessage(function(payload) {
          console.log("Message received. ", payload);
          $scope.dat.push(payload.data);
          // ...
        });
        this.Post = new Post.constructor($rootScope,API,$timeout,moment,Upload,$log);
        var Post = this.Post;
        this.Post.seturl('misc/user-notifications');
        this.Post.setskip(0);
        this.Post.settake(10);
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
        $scope.callback = function() {
           $scope.nopost = Post.getnopost();
        }
    }

    $onInit(){
    }
}

export const NotificationsComponent = {
    templateUrl: './views/app/components/notifications/notifications.component.html',
    controller: NotificationsController,
    controllerAs: 'vm',
    bindings: {}
}


