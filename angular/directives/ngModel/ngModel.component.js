ngModelClass.$inject = ['$rootScope']
function ngModelClass ($rootScope) {
 return {
    require: 'ngModel',
		restrict: 'EA',
        priority: -1, // give it lower priority than built-in ng-model
        scope: {ngModel: '=ngModel'},
        link: function(scope, element, attr) {
                  element.trigger("change"); //use this for jQuery
              element.on('change', function (e) {
                console.log(e.target.value);
                if(element.attr('name') == 'url123')
                {
                $rootScope.url = e.target.value;
                console.log($rootScope)
               console.log('finally 1 !! :'+ scope.url);
                scope.url=JSON.parse(attrs.urlUrl);
                console.log('finally 2 !! :'+ scope.url);
               scope.$apply();
                console.log('finally 3 !! :'+ scope.url);
                }
                })
        }
    }
}
export const ngModelClassComponent = ngModelClass
