imgModelClass.$inject = ['$rootScope']
function imgModelClass ($rootScope) {
 return {
    restrict: 'EA',
        priority: 1, 
        link: function(scope, elements, attr) {
                elements.click(function(){
                    var src = elements.attr("src");
                    $(".img-mirror").attr("src",src);
                });

        }
    }
}
export const imgModelClassComponent = imgModelClass
