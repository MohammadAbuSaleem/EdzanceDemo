autoGrowClass.$inject = ['$rootScope','$timeout']
function autoGrowClass ($rootScope,$timeout) {
 return {
    restrict: 'EA',
        priority: 1, 
        link: function($scope, element) {
            $scope.initialHeight = $scope.initialHeight || element[0].style.height;
            var resize = function() {
                element[0].style.height = $scope.initialHeight;
                element[0].style.height = "" + element[0].scrollHeight + "px";
            };
            element.on("input change", resize);
            $timeout(resize, 0);
            element.bind(" keypress", function (event) {
                if(event.which === 13) {
                  resize();
                }
            });
        }
    }
}
export const autoGrowClassComponent = autoGrowClass
