
closeMenuClass.$inject = ['$rootScope','$window']
function closeMenuClass ($rootScope,$window) {
 return {
     restrict: 'EA',
        priority: 1, 
        link: function(scope, element, attrs) {
            $(".close-menu").click(function() {
                $(".dropdown").removeClass("open");
            });
        }
    }

}

export const closeMenuClassComponent = closeMenuClass

