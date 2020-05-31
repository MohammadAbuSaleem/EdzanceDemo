'use strict';

edzance.controller('CustomerProfileController', function($rootScope, $scope, $http, $timeout, $state) {
    $scope.$on('$viewContentLoaded', function() {   
        Metronic.initAjax(); // initialize core components
        Layout.setSidebarMenuActiveLink('set', $('#sidebar_menu_link_profile')); // set profile link active in sidebar menu 
   // $scope.uid = uid;
});
 		     // get the location
            //$scope.location = $stateParams.partyLocation;   
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageSidebarClosed = true;

          
}); 
