fileUploadClass.$inject = ['$rootScope']
function fileUploadClass ($rootScope) {
return {
    restrict: "EA",
    transclude: true,
    scope: {
      onChange: "="
    },
    template: '<input type="file" name="file" id="file-upload"/><label for="file-upload" class="custom-file-upload"><i class="md md-attach-file upload-image-icon"></i></label>',
    link: function (scope, element, attrs) {
      element.bind("change", function () {
        scope.onChange(element.children()[0].files);
      });
    }
  }
}
export const fileUploadClassComponent = fileUploadClass