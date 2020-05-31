// Code goes here

(function(angular, undefined) {
  'use strict';

  angular
    .module('mdVirtualRepeaterDemo', ['ngMaterial'])
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('pink');
    })
    .controller('VirtualRepeaterExampleController', VirtualRepeaterExampleController)
    .controller('DialogContentController', DialogContentController);

  VirtualRepeaterExampleController.$inject = ['$mdDialog','$http'];

  function VirtualRepeaterExampleController($mdDialog,$http) {
    var vm = this;
    // console.log($http);
    vm.$http = $http
    vm.items = [];
    vm.showRepeaterDialog = showRepeaterDialog;
    
    activate();

    function activate() {
      let self = this;
      vm.$http.get("../api/misc/post/0/10?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEwMDE1OCwiaXNzIjoiaHR0cDpcL1wvaW5pdGlhbC5kZXZcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE1MDE3NDc1NzQsImV4cCI6MjE0NzQ4MzY0NywibmJmIjoxNTAxNzQ3NTc0LCJqdGkiOiI1N2JlNTAzNDQ0ZGUxM2RhM2QyNDQxMWY5ZjNmODc3OCJ9.WFUHLjvnb61R6X9g3f2933RU5ITtLYAloiw5nsIJLNM")
      .then(function(response) {
          console.log(response);
          if (response.data.data == 'no post') {
              return;
          }
          // self.numLoaded_ = self.toLoad_;
          // Object.assign(obj1, obj2);
       for (var i = 1; i <= response.data.data.length; i++) {
            vm.items.push({
              'title': response.data.data[i-1].name,
              'selected': false,
              'index': i
            });    
          }

          // selfy.infiniteItems = response.data.data
      });


      // for (var i = 0; i < 1000; i++) {
      //   vm.items.push({
      //     'title': 'repeat item - ' + (i+1),
      //     'selected': false,
      //     'index': i
      //   });    
      // }
    }

    function showRepeaterDialog($event) {
      $mdDialog.show({
        templateUrl: 'vrepeater-dialog-template.html',
        controller: 'DialogContentController',
        controllerAs: 'dialogCtrl',
        locals: {
          dataItems: vm.items
        }
      }).then(function(response) {
        vm.selectedValue = JSON.stringify(response);
      }, function(cause) {
        vm.selectedValue = 'promise from mdDialog rejected';
      });
    }
  }

  DialogContentController.$inject = ['$mdDialog', 'dataItems'];

  function DialogContentController($mdDialog, dataItems) {
    var dialogCtrl = this;

    dialogCtrl.items = dataItems;

    dialogCtrl.saveAndClose = function() {
      $mdDialog.hide({
        'selectedItems': dialogCtrl.items.filter(function(item) {
          return item.selected;
        })
      });
    }
  }

})(angular);