scrollBottomOnClass.$inject = ['$rootScope','$timeout']
function scrollBottomOnClass ($rootScope,$timeout) {
 return {
    restrict: 'EA',
        priority: 1, 
        link: function(scope, elm, attr) {
            scope.$watch(attr.scrollBottomOn, function(value) {
                if (value) {
                    $timeout(function() {
                        elm[0].scrollTop = elm[0].scrollHeight;
                    });
                }
            });
        }
    }
}
export const scrollBottomOnClassComponent = scrollBottomOnClass
