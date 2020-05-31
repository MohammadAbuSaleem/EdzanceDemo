emojoFaceClass.$inject = ['$rootScope']
function emojoFaceClass ($rootScope) {
 return {
    restrict: 'EA',
        priority: 9, 
        link: function(scope, elements, attr) {
        var id = attr.roomId;
        var message = $(".emojionearea-editor").html();
        elements.emojioneArea({
            pickerPosition: "top",
            filtersPosition: "bottom",
            autocomplete: false,
            hidePickerOnBlur: true,
            events: {
                keypress: function (editor, event) {
                    var message = $(".emojionearea-editor").html();
                    if(event.which == 13) {
                        event.preventDefault();
                        scope.addMessage(message,id);
                        $(".emojionearea-editor").html('');
                    }   
                    $('.emojionearea-button').removeClass('active');
                    $('.emojionearea-picker').addClass('hidden');
                },
              }
        });
        $('.send-chat-btn').click(function(){
            var message = $(".emojionearea-editor").html();
            scope.addMessage(message,id);
            $(".emojionearea-editor").html('');
        });
        $(".emojionearea-editor").html('');
        }
    }
}
export const emojoFaceClassComponent = emojoFaceClass
