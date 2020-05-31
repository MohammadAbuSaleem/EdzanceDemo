classyLoaderClass.$inject = ['$rootScope']
function classyLoaderClass ($rootScope) {
	var percentage;
 return {
    restrict: 'EA',
        priority: 2, 
        link: function(scope, elements, attr) {
    	$(document).ready(function(){
    		percentage = parseInt($rootScope.vc.persantage);
    		//console.log(percentage);
		  	$('.classy-loader').ClassyLoader({
	            percentage: percentage,
	            speed: 20,
	            fontSize: '20px',
	            diameter: 40,
	            lineColor: '#337ab7',
	            remainingLineColor: 'rgba(200,200,200,0.4)',
	            lineWidth: 10,
	            width: 100,
	            height: 100,
	            fontColor:'#337ab7'
	        });
	  	});
        }
    }
}
export const classyLoaderClassComponent = classyLoaderClass
