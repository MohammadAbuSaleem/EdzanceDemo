chatBoxClass.$inject = ['$rootScope']
function chatBoxClass ($rootScope) {
 return {
    restrict: 'EA',
        priority: 1, 
        link: function(scope, elem, attr) {
        }
    }
}
export const chatBoxClassComponent = chatBoxClass
