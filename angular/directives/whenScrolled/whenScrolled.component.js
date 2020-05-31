whenScrolledClass.$inject = ['$rootScope','$timeout']
function whenScrolledClass ($rootScope,$timeout) {
 return {
    restrict: 'EA',
        priority: 1,  
        link: function(scope, elm, attr) {
            var raw = elm[0];
            elm.bind('scroll', function() {
                 if (raw.scrollTop <= 100) {
                    var sh = raw.scrollHeight;
                    if ($rootScope.past_scrollTop > raw.scrollTop) {
                        scope.$apply(attr.whenScrolled).then(function(x) {
                            $timeout(function() {
                                raw.scrollTop = raw.scrollHeight - sh + x;
                            })
                        });
                    }
                }
                $rootScope.past_scrollTop = raw.scrollTop;
            });
        }
    }
}
export const whenScrolledClassComponent = whenScrolledClass