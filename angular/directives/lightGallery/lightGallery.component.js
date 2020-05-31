lightGalleryClass.$inject = ['$rootScope']
function lightGalleryClass ($rootScope) {
 return {
    restrict: 'EA',
        priority: 1, 
        link: function(scope, elements, attr) {
        	elements.ready(function() {
			  	$('#lightgallery').lightGallery({
				    thumbnail:true
				}); 
			}); 
        }
    }
}
export const lightGalleryClassComponent = lightGalleryClass
