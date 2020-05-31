angular.module('ui.bootstrap.demo', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('TypeaheadCtrl', function($scope, $http) {

  var _selected;

  $scope.selected = undefined;
  // Any function returning a promise object can be used to load values asynchronously
  $scope.getLocation = function(val) {
    return $http.get('../api/test/'+val, {
      params: {
        address: val,
        sensor: false
      }
    }).then(function(response){
      console.log(response.data);
      return response.data.data.map(function(item){
        return item.body;
      });
    });
  };

  $scope.ngModelOptionsSelected = function(value) {
    if (arguments.length) {
      _selected = value;
    } else {
      return _selected;
    }
  };

  $scope.modelOptions = {
    debounce: {
      default: 500,
      blur: 250
    },
    getterSetter: true
  };

});