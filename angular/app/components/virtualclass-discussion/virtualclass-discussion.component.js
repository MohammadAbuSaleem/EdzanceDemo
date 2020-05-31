class VirtualclassDiscussionController{
       constructor(Post,moment,$state,$sce,$scope,$stateParams,$rootScope,API,$interval,AclService,$uibModal, $log,$timeout,Upload, $q){
        'ngInject';
    //injection
    let navHeader = this 
    this.$state = $state;
    this.scope = $scope;
    this.stateParams = $stateParams;
    this.rootScope = $rootScope;
    this.API = API
    this.sce = $sce
    this.log = $log;
    this.timeout = $timeout
    this.q = $q
    this.Upload = Upload
    this.scope.moment = moment;
    this.can = AclService.can
    this.interval = $interval;    
    this.uibModal = $uibModal;
    $rootScope.liveUrlFlag = false;
    //initiation
    $scope.post_enabled = true;
    $scope.comment_enabled = true;
    this.rootScope.mobileHeader = true
    //post initiation
    this.Post = new Post.constructor($rootScope, API,$timeout,moment,Upload,$log);
    var Post = this.Post;
    this.Post.setSection('vc');
    this.Post.seturl('class/get/' + this.stateParams.classid + '/post');
    this.Post.setediturl('social/edit/vc/post');
    this.Post.setskip(0);
    
    this.Post.settype('post');
    this.Post.setsubmiturl('class/set/' + this.stateParams.classid + '/post');
    this.Post.setimageurl('class/set/' + this.stateParams.classid + '/post');
    this.Post.setdeleteurl('social/delete/vc/post');
    this.Post.setCommentDeleteUrl('social/delete/vc/comment');
    // this.Post.setPostDeleteUrl('vc/delete-post');
    this.Post.settake(2);
    this.Post.getPost().then(function(response){
      $scope.dat=Post.getPostat();
      $scope.nopost = Post.getnopost();
      $rootScope.busy = false;
    });
    this.Post.settake(5);
    this.scope = $scope;
    this.scope.dat=this.Post.getPostat();
    this.scope.post_enabled = true;
    this.scope.comment_enabled = true;
    this.scope.exprission =[];
    this.scope.commentlimit =2;
    this.scope.happyexp = 0
    this.scope.normalexp = 0
    this.scope.sadexp = 0
    this.scope.files =[];
    angular.element('html').scrollTop(0);
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
      return ($rootScope.vc.permissions.class.indexOf(post) >= 0);
  }
  $scope.postPermission = function(permission,post,me) {
      return (($rootScope.vc.permissions.class.indexOf(permission) >= 0 || post == me) || ($rootScope.me.id == $rootScope.vc.instructor));
  }
  $scope.commentPermission = function(permission,comment,me,post) {
      return (($rootScope.vc.permissions.class.indexOf(permission) >= 0 || (comment == me || post == me)) || ($rootScope.me.id == $rootScope.vc.instructor));
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
    //end post initiation
    var timeout = $timeout
   
    // if ($rootScope.vc == undefined) {
    // API.all('vc/class/'+$stateParams.classid).get('')
    //     .then((response) => {
    //       $rootScope.vc= response.data;
    //       $scope.student= response.data.vcuser;
    //        // console.log($scope)
    //     },(response) => {
    //    if (response.data.errors.message["0"]=='you are not in this class') {
    //        console.log('first done')
    //        if(!($rootScope.vc)){
    //         console.log('go to unauthorized')
    //           this.$state.go('app.unauthorized')
    //       }
    //     }         $scope.student= response.data.vcuser;
    //     });
    // }else{
    //   if ($rootScope.vc ) {
    //   API.all('vc/class/'+$stateParams.classid).get('')
    //       .then((response) => {
    //         $rootScope.vc= response.data;
    //         $scope.student= response.data.vcuser;
    //          // console.log($scope)
    //       },(response) => {
    //       //console.log('VirtualclassDiscussionController:'+response.data.errors.message["0"]);
    //       if (response.data.errors.message["0"]=='you are not in this class') {
    //         if(!($rootScope.vc)){
    //           console.log('go to unauthorized')
    //             this.$state.go('app.unauthorized')
    //         }
    //       }
    //      });
    //   }}
  }
    updatepost(data ,id ){
      var dat ={data , id} 
       this.API.all('vc/update-post').post(dat).then((response) => {
       });
    }
    autolink(str, attributes){
        attributes = attributes || {};
        var attrs = "";
        for(name in attributes)
            attrs += " "+ name +'="'+ attributes[name] +'"';
        
        var reg = new RegExp("(\\s?)((http|https|ftp)://[^\\s<]+[^\\s<\.)])", "gim");
        str = str.toString().replace(reg, '$1<a href="$2">$2</a>');
        this.vurl=str;
        return str;
    }


    addhomework (files,$timeout,logs,classid,_self) {
      var file = files;
      if (!file.$error) {
        this.Upload.upload({
            url: 'api/vc/uploadhw',
             method: 'POST',
            file: file,
            data: {
              id: _self.userData.id
            }
        }).then(function (resp) {
             $timeout(function() {
                console.log('timeout acativated :s')
                console.log(resp.data.data)
                var mynewhomework = {
                  class_id: _self.stateParams.classid,
                  id:  _self.userData.id,
                  textpost: _self.textpost,
                  imgTag: _self.imgTag,
                  file:resp.data.data.return[0]
                  }
                  _self.API.all('vc/image').post(mynewhomework).then((response) => {
                      _self.rootScope.dat.push(response.data.post) ;
                     // _self.scope.dat.push(response.data.post);
                  });
            });
        }, null, function (evt) {
          var progressPercentage = parseInt(100.0 *
                    evt.loaded / evt.total);
          logs  = 'progress: ' + progressPercentage + 
                '% ' + evt.config.data.file.name + '\n' ;
              console.log(logs)
        });
      }
        
  }
  $onInit(){
  }
}

export const VirtualclassDiscussionComponent = {
    templateUrl: './views/app/components/virtualclass-discussion/virtualclass-discussion.component.html',
    controller: VirtualclassDiscussionController,
    controllerAs: 'vm',
    bindings: {}
}


