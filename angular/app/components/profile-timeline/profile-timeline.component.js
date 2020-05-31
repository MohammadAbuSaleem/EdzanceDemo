class ProfileTimelineController{
  constructor(moment,$scope,$stateParams,$rootScope, ContextService,API,$state,Post,$timeout,Upload,$log){
    'ngInject';
    this.rootScope = $rootScope;
    this.scope = $scope;
    this.scope.moment = moment;
    this.stateParams = $stateParams;
    angular.element('html').scrollTop(0);
    $rootScope.liveUrlFlag = false;
    this.API = API;    
    this.Post = new Post.constructor($rootScope, API,$timeout,moment,Upload,$log);
    var Post = this.Post;
    this.Post.seturl('profile/post/'+this.stateParams.id);
    this.Post.setediturl('social/edit/profile/post');
    this.Post.setskip(0);
    this.Post.settype('post');
    this.Post.setSection('home');
    this.Post.setsubmiturl('social/set/home/post');
    this.Post.setimageurl('social/set/home/post');
    this.Post.setdeleteurl('social/delete/profile/post');
    this.Post.setCommentDeleteUrl('social/delete/vc/comment');
    this.Post.settake(2);
    this.Post.getPost().then(function(response){
        $scope.dat=Post.getPostat();
        $scope.nopost = Post.getnopost();
        $rootScope.busy = false;
    });
    this.Post.settake(5);
    this.scope = $scope;
    this.scope = $scope;
    this.scope.post_enabled = true;
    this.scope.comment_enabled = true;
    this.scope.commentlimit =2;
    this.scope.files =[] 

    $scope.getPost = function() {
      Post.getPost().then(function(response){
        $scope.dat = Post.getPostat();
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
   console.log($scope.exprissions);
  } 
  $scope.permission = function(post) {
    return ($rootScope.me.permission.social.indexOf(post) >= 0);
  }
  $scope.postPermission = function(permission,post,me) {
      return (($rootScope.me.permission.social.indexOf(permission) >= 0 && post == me));
  }
  $scope.commentPermission = function(permission,comment,me,post) {
      return ($rootScope.me.permission.social.indexOf(permission) >= 0 && (comment == me || post == me));
  }
  $scope.submitComment = function($id,$index,$body,place) {
    Post.submitComment($id,$index,this,$body,place);
    this.comment[$id] = "";
    if (this.comment2 != undefined)
      this.comment2[$id] = "";
    $scope.dat = Post.getPostat();
  }
  $scope.updateData = function(data ,id) {
    Post.updateData(data ,id);
  }
  $scope.submitPost = function(files) {
    Post.submitPost(files,$stateParams.classid,this.textpost,$scope.callback);
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
    scope.files = '';
    scope.textpost = ''
    scope.live_title = '';
    scope.live_description = '';
    scope.live_url = '';
    scope.live_image = '';
    scope.media = ''; 
    scope.showlive=0;
    scope.closeUrl = false
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
  this.API.all('profile/wall/'+this.stateParams.id).get('')
    .then((response) => {
      this.scope.timeline = response.data;
      if(response.data.sex =='male')
        response.data.sex = 'ذكر';
      if(response.data.sex =='female')
        response.data.sex = 'انثى';
  });
    this.scope.me = $rootScope.me;            
  }
  yvideo(url) {
    this.scope.yurl = url;
  }
  $onInit(){
  }
}

export const ProfileTimelineComponent = {
    templateUrl: './views/app/components/profile-timeline/profile-timeline.component.html',
    controller: ProfileTimelineController,
    controllerAs: 'vm',
    bindings: {}
}


