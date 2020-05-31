hAClass.$inject = ['$rootScope']
function hAClass ($rootScope) {
 return {
    restrict: 'EA',
        priority: -1, 
        link: function(scope, elements, attr) {
            elements.trigger("change"); 
            elements.on('change keyup paste blur', function (e) {
            // $rootScope.posttitle = e.target.attributes[6].value;
            // $rootScope.postdescription =e.target.attributes[7].value;
            // $rootScope.posturl = e.target.attributes[8].value;
            // $rootScope.postimage = e.target.attributes[9].value;
            $rootScope.post = e.target;
          //  console.log($rootScope);                
            })
          $('.close').on('click', function (e) {
            //console.log('keyup' + e.target.value);
            $rootScope.posttitle = '';
            $rootScope.postdescription ='';
            $rootScope.posturl = '';
            $rootScope.postimage = '';
            $rootScope.post ='';
          //  console.log( $rootScope);
            })
        }
    }
}
export const hAClassComponent = hAClass
