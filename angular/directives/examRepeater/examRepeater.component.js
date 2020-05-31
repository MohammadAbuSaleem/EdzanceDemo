examRepeaterClass.$inject = ['$rootScope','API','moment','$state']
function examRepeaterClass ($rootScope,API,moment,$state) {
 return {
    restrict: 'EA',
        priority: -15, 
        link: function(scope, elements, attr) {
                var id =$rootScope.last_id;
              if(attr.examRepeater=='form'){
                elements.attr('na-me',"markForm"+id);
                elements.attr('ng-show',"markForm"+id+'.$visible');
              }else if (attr.examRepeater=='edit') {
                elements.attr('ng-disabled',"markForm"+id+'.$waiting');
                elements.attr('ng-show',"markForm"+id+'.$cancel()');

              }else if (attr.examRepeater=='cancel') {
                elements.attr('ng-disabled',"markForm"+id+'.$waiting');
                elements.attr('ng-click',"markForm"+id+'.$cancel()');
              }else if (attr.examRepeater=='button') {
                elements.attr('ng-show',"markForm"+id+'.$visible');
                elements.attr('ng-click',"markForm"+id+'.$show()');
              }
        }
    }
}
export const examRepeaterClassComponent = examRepeaterClass
