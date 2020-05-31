edViewClass.$inject = ['$rootScope']
function edViewClass ($rootScope) {
 return {
    restrict: 'EA',
        priority: -1, // give it lower priority than built-in ng-model
        link: function(scope, elements, attr) {
                  elements.trigger("change"); //use this for jQuery
              elements.on('change', function (e) {
                //console.log('change' + e.target.value);
                $rootScope.posttitle = e.target.attributes[6].value;
                $rootScope.postdescription =e.target.attributes[7].value;
                $rootScope.posturl = e.target.attributes[8].value;
                $rootScope.postimage = e.target.attributes[11].value;
                $rootScope.post = e.target.value;                
                })
              elements.on('keyup', function (e) {
                //console.log('keyup' + e.target.value);
                $rootScope.posttitle = e.target.attributes[6].value;
                $rootScope.postdescription =e.target.attributes[7].value;
                $rootScope.posturl = e.target.attributes[8].value;
                $rootScope.postimage = e.target.attributes[11].value;
                $rootScope.post = e.target.value;                
                })
        }
    }
}
export const edViewClassComponent = edViewClass
