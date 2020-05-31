activeFaceClass.$inject = ['$rootScope']
function activeFaceClass ($rootScope) {
 return {
    restrict: 'EA',
        priority: 9, 
        link: function(scope, elements, attr) {
             elements.on('click', function (e) {
             // console.log(e);
              var a= e.currentTarget;
                if($(a).hasClass("active")){
                  a.attributes[1].value='facs-size';
                }else{
                  a.attributes[1].value='facs-size active';
                }
            });
        }
    }
}
export const activeFaceClassComponent = activeFaceClass
