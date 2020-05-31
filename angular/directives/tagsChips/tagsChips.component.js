tagsChipsClass.$inject = ['$rootScope']
function tagsChipsClass ($rootScope) {
 return {
    restrict: 'EA',
        priority: 1, 
        link: function(scope, elements, attr) {
		// impostiamo gli attributi da aggiungere all'iframe es: data-src andrà ad impostare l'url dell'iframe
		
        }
    }
}
export const tagsChipsClassComponent = tagsChipsClass
