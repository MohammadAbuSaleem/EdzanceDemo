rMClass.$inject = ['$rootScope']
function rMClass ($rootScope) {
 return {
    restrict: 'EA',
        priority: 9, 
        link: function(scope, elements, attr) {
              
               // elements.on('change', function (e) {
               //  $rootScope.post = e.target;
               // // console.log( this.scope);                
               //  })
                     $('.read-more').readmore({
                      collapsedHeight: 65,
                      moreLink: '<a href="#">إقرأ المزيد...</a>',
                      lessLink: '<a href="#">إقرا أقل...</a>',
                      blockCSS: 'padding: 0 12px;'
                      });
             // $scope=this.scope;
        }
    }
}
export const rMClassComponent = rMClass
