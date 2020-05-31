videoPostPopupClass.$inject = ['$rootScope']
function videoPostPopupClass ($rootScope) {
 return {
    restrict: 'EA',
        priority: 1, 
        link: function(scope, elements, attr) {
		// impostiamo gli attributi da aggiungere all'iframe es: data-src andrà ad impostare l'url dell'iframe
		elements.on('click', function(e) {
			var src = elements.attr('data-src');
			var videopopup = elements.attr('data-video-id');
			// stampiamo i nostri dati nell'iframe
			$('.videopopup' + videopopup).attr({
				'src': src
			});
			$('#commentModel'+ videopopup).on('hidden.bs.modal', function(){
				$('.videopopup' + videopopup).find('iframe').html("");
				$('.videopopup' + videopopup).find('iframe').attr("src", "");
			});
			$('#commentModel' + videopopup).on('hidden.bs.modal', function(){
				$('#commentModel' + videopopup).find('iframe').html("");
				$('#commentModel' + videopopup).find('iframe').attr("src", "");
			});
		});
		// // se si chiude la modale resettiamo i dati dell'iframe per impedire ad un video di continuare a riprodursi anche quando la modale è chiusa
        
        }
    }
}
export const videoPostPopupClassComponent = videoPostPopupClass