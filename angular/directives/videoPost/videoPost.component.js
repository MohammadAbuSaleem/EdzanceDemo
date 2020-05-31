videoPostClass.$inject = ['$rootScope']
function videoPostClass ($rootScope) {
 return {
    restrict: 'EA',
        priority: 1, 
        link: function(scope, elements, attr) {
		// impostiamo gli attributi da aggiungere all'iframe es: data-src andrà ad impostare l'url dell'iframe
		elements.on('click', function(e) {
			$('.vpost').removeClass('hidden-element');
			$('iframe').addClass('hidden-element');
			$('iframe').attr('src','');
			var src = elements.attr('data-src');
			var videoifram = elements.attr('data-post-video');

			elements.addClass('hidden-element');
			$('#' + videoifram).removeClass('hidden-element');
			// stampiamo i nostri dati nell'iframe
			$('#' + videoifram).attr({
				'src': src + '?autoplay=1'
			});
		});
		// // se si chiude la modale resettiamo i dati dell'iframe per impedire ad un video di continuare a riprodursi anche quando la modale è chiusa
        }
    }
}
export const videoPostClassComponent = videoPostClass
