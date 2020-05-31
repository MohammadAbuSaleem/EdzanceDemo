postInstituteClass.$inject = ['$rootScope','API','moment']
function postInstituteClass ($rootScope,API,moment) {
 return {
    restrict: 'EA',        
    link: function(scope, elements, attr) {
  		$rootScope.post_url =attr.reqUrl;
  		$rootScope.type =attr.reqType;
  		$rootScope.postlocation = attr.reqParent;
    },
    	templateUrl:`./pages/post/post-institute.html`
    }
}
export const postInstituteClassComponent = postInstituteClass