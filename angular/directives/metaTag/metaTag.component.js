metaTagClass.$inject = ['$rootScope']
function metaTagClass ($rootScope) {
 return {
    restrict: 'E',
        //priority: 1, 
        //template: '',	
        link: function(scope, elements, attr) {
        	console.log(scope.description);
        	//$stateParams.description;
        	//var description = "123";
        	var descriptionhtml = '<meta name="Description" content="'+ $rootScope.description +'"></meta>';
        	elements.html(descriptionhtml);
        }
    }
}
export const metaTagClassComponent = metaTagClass