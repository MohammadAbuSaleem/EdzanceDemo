class GroupDiscussionController{
     constructor(Post,moment,$state,$sce,$scope,$stateParams,$rootScope,API,$log,$timeout,Upload){
        'ngInject';
        this.$state = $state;
        this.scope = $scope;
        this.scope.moment = moment;
        this.stateParams = $stateParams;
        this.rootScope = $rootScope;
        this.API = API;
        this.sce = $sce;
        this.log = $log;
        this.timeout = $timeout;
        this.Upload = Upload;
        this.Post = new Post.constructor($rootScope, API,$timeout,moment,Upload,$log);
        var Post = this.Post;
        this.Post.seturl('gr/post/' + this.stateParams.groupid);
        this.Post.setediturl('gr/post/' + this.stateParams.groupid + '-update');
        this.Post.setskip(0);
        this.Post.settype('group');
        this.Post.setsubmiturl('gr/post/' + this.stateParams.groupid);
        this.Post.setimageurl('gr/post/' + this.stateParams.groupid);
        this.Post.settake(2);
        this.Post.setSection('group');
        this.Post.setdeleteurl('social/delete/group/post');
        this.Post.setCommentDeleteUrl('social/delete/group/comment');
        //this.Post.getPost();
        this.Post.getPost().then(function(response){
            $scope.dat=Post.getPostat();
            $scope.nopost = Post.getnopost();
            $rootScope.busy = false;
        });
        this.Post.settake(5);
        //this.scope.dat=this.Post.getPostat();
        this.scope.files =[];
        $rootScope.liveUrlFlag = false;
        $scope.getPost = function() {
            Post.getPost().then(function(response){
              $scope.dat=Post.getPostat();
              $scope.nopost = Post.getnopost();
              $rootScope.busy = false;
            });
        }
        $scope.exprissionUser = function($index,liker) {
           // Post.getPost();
            $rootScope.happyexp = 0
            $rootScope.normalexp = 0
            $rootScope.sadexp = 0
            Post.exprissionUser($index,liker);
            $scope.exprissions = Post.getExprissions();
            $timeout(function () {
              $scope.exprissions =Post.getExprissions();
            }, 1000);
        }
        $scope.exprission = function($post,$exp) {
            Post.exprission($post,$exp);
            $scope.dat = Post.getPostat();
        }
        $scope.deleteNode = function(node,deleteType) {
           Post.deleteNode(node,deleteType,$scope.callback);
           $scope.dat = Post.getPostat();
        }
        $scope.permission = function(post) {
           return ($rootScope.me.permission.social.indexOf(post) >= 0);
        }
        $scope.postPermission = function(permission,post,me) {
            return ((post == me) || ($rootScope.groupObj.member == 'owner' || $rootScope.groupObj.member == 'modirator'));
        }
        $scope.commentPermission = function(permission,comment,me,post) {
            return ((comment == me || post == me) || ($rootScope.groupObj.member == 'owner' || $rootScope.groupObj.member == 'modirator'));
        }
        $scope.submitComment = function($id,$index,$body,place) {
            Post.submitComment($id,$index,this,$body,place);
            this.comment[$id] = "";
            if (this.comment2 != undefined)
                this.comment2[$id] = "";
            $scope.dat = Post.getPostat();
        }
        $scope.updatepost = function(data ,id,url) {
            Post.updatepost(data ,id,url);
        }
        $scope.updateData = function(data, id) {
            Post.updateData(data, id);
        }
        $scope.submitPost = function(files) {
            Post.submitPost(files,$stateParams.groupid,this.textpost,$scope.callback);
            $scope.resetSubmit(this);
            $scope.dat = Post.getPostat();
        }  
        $scope.callback = function() {
           $scope.nopost = Post.getnopost();
        } 
        $scope.resetSubmit = function(scope) {
            angular.element(".image-readed").attr("ng-src" , "");
            angular.element(".image-readed").attr("src" , "");
            angular.element(".readed-con").attr("style" , "display: none");
            angular.element(".liveurl").attr("style" , "display: none");
            scope.files = '';
            scope.textpost = ''
            scope.live_title = '';
            scope.live_description = '';
            scope.live_url = '';
            scope.live_image = '';
            scope.media = ''; 
            scope.closeUrl = false;
        }
        $scope.imageUpload = function(element,files){
          var reader = new FileReader();
          reader.onload = $scope.imageIsLoaded;
          reader.readAsDataURL(files);
          angular.element(".readed-con").attr("style" , "display: block");
        }
        $scope.imageIsLoaded = function(e){
            $scope.$apply(function() {
                $scope.imagereaded=e.target.result;
            });
        }
        $scope.removeImg = function() {
            angular.element(".image-readed").attr("ng-src" , "");
            angular.element(".image-readed").attr("src" , "");
            angular.element(".readed-con").attr("style" , "display: none");
            this.files = '';
        }

    }
    $onInit(){
    }
}
export const GroupDiscussionComponent = {
    templateUrl: './views/app/components/group-discussion/group-discussion.component.html',
    controller: GroupDiscussionController,
    controllerAs: 'vm',
    bindings: {}
}


