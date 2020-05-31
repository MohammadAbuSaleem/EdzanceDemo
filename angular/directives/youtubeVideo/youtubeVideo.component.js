youtubeVideoClass.$inject = ['$rootScope']
function youtubeVideoClass ($rootScope) {
 return {
    restrict: 'EA',
        priority: 1, 
        link: function(scope, elements, attr) {
		// impostiamo gli attributi da aggiungere all'iframe es: data-src andrà ad impostare l'url dell'iframe
		elements.on('click', function(e) {
			var src = elements.attr('data-src'); 
			src = src.replace("watch?v=", "embed/");
			// stampiamo i nostri dati nell'iframe
			$("#myModal iframe").attr({
				'src': src,
			});
		});
		// se si chiude la modale resettiamo i dati dell'iframe per impedire ad un video di continuare a riprodursi anche quando la modale è chiusa
		$('#myModal').on('hidden.bs.modal', function(){
			$('#myModal').find('iframe').html("");
			$('#myModal').find('iframe').attr("src", "");
		});
        }
    }
}
export const youtubeVideoClassComponent = youtubeVideoClass
