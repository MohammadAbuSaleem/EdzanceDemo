commentRepeatClass.$inject = ['$rootScope','API','moment']
function commentRepeatClass ($rootScope,API,moment) {
    // this.dat = $rootScope.getPost('me/post'); 
        
 return {
    restrict: 'EA',        
    link: function(scope, elements, attr) {
      var a = [];
      scope.comment_type =attr.reqUrl;
      // API.all('me/comment/'+attr.commentId +'/'+ attr.reqUrl).get('').then((response) => {
      //     a=response.data;
      //    //console.log(a);
      //    if (a.length>0) {
      //      // console.log(moment(response.data[0].created_at, "YYYY-MM-DD hh:mm:ss").fromNow());
      //       } 
      //       // console.log(response.data)
      //     // console.log('getting comments');
      //      // scope.dat[attr.commentIndex].comment =a; 
      //    //  console.log('scope');
      //   //  console.log(scope);
      //   //  console.log(attr.reqUrl); 
      //    // console.log(attr.commentId); 
      //      },(response) =>{
      //     a = response.data;
      //      console.log('error in getting comments');
      //     }); 
          
           
  
        },
    templateUrl:`./pages/comment/comment.page.html`
    }
}
export const commentRepeatClassComponent = commentRepeatClass
