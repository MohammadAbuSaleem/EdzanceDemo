function myEnterClass () {
    return function (scope, element, attrs) {
        element.bind(" keypress", function (event) {
           //var code = event.keyCode || event.which;
            if(event.which === 13) {
                if (!event.shiftKey) {   
                   event.preventDefault();
                  // scope.$apply(function (){
                   scope.$eval(attrs.myEnter);
                  element[0].value='';
               //});
            }
        }

        });
    };
}
export const myEnterClassComponent = myEnterClass
