userContentClass.$inject = ['$rootScope']
function userContentClass ($rootScope) {
 return {
    restrict: 'EA',
        priority: 1, 
        link: function(scope, elements, attr) {
			// elements.webuiPopover({placement:'auto',trigger:'hover'});
			elements.webuiPopover({placement:'auto',padding:false,height:'85',style:'border-radius: 0px',trigger:'hover'});
        }
    }
}
export const userContentClassComponent = userContentClass
