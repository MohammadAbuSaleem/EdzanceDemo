
scrollHereClass.$inject = ['$rootScope','$window']
function scrollHereClass ($rootScope,$window) {
 return {
    scope: { method:'&myMethod'  , var1 :'&firstVar', var2 :'&secondVar' },
     restrict: 'EA',
        priority: 1, 
        link: function(scope, element, attrs) {
           var raw = element[0];
            console.log('loading directive');
             console.log(raw);  
            element.scroll( function () {
                console.log('in scroll');
                console.log(raw.scrollTop + raw.offsetHeight);
                console.log(raw.scrollHeight);
                if (raw.scrollTop + raw.offsetHeight > raw.scrollHeight) {
                    scope.$apply(attrs.scrolly);
                }
            });
                // jQuery(
                //   function($)
                //   {
                //     console.log(111);
                //     $('.scroll-here').scroll( function()
                //       {
                //         console.log(2222);
                //         if($(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight)
                //         {
                //             console.log(333);
                //           alert('end reached');
                //         }
                //       })
                //     }
                // );

        }
    }

}

export const scrollHereClassComponent = scrollHereClass
