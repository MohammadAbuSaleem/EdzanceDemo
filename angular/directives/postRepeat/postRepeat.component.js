postRepeatClass.$inject = ['$rootScope','API','moment','$state']
function postRepeatClass ($rootScope,API,moment,$state) {
    // this.dat = $rootScope.getPost('me/post');
     var post_template = $state.current.data.template;
   console.log($state.current.data) 
  return {
    restrict: 'EA',        
    priority: -1, 
    scope: true,
    link: function(scope, elements, attr) {
     // console.log(scope) 
     $rootScope.dat = [];
        $rootScope.post_enabled = true;
        $rootScope.comment_enabled = true;
        $rootScope.post_delete = true;
        var a = [];
      $rootScope.post_url =attr.reqUrl;
      $rootScope.type =attr.reqType;
      //post_template = attr.template;
      $rootScope.post_template = attr.template;
      $rootScope.postlocation = attr.reqParent;
      $rootScope.getPost(attr.reqUrl,0,2);
      $rootScope.skip=2;
      $rootScope.take=5;
        },
    templateUrl:'./pages/post/'+  post_template +'.page.html'
    }
}
export const postRepeatClassComponent = postRepeatClass
