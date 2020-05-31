class VirtualclassUnauthorizedController {
    constructor($http, $scope, $log) {
        'ngInject';
        $scope.a = [];
        angular.element('html').scrollTop(0); 
        $scope.getLocation = function(val) {
            return $http.get('vc-debug/university-information/' + val + '/2065', {
                params: {}
            }).then(function(response) {
                response.data.data.u.map(function(item) {
                    $scope.a.push(item)
                });
                return $scope.a;
            });
        };
        $scope.test = function(val) {
            $scope.getLocation(val);
        };
    }

    $onInit() {

    }
}

export const VirtualclassUnauthorizedComponent = {
    templateUrl: './views/app/components/virtualclass-unauthorized/virtualclass-unauthorized.component.html',
    controller: VirtualclassUnauthorizedController,
    controllerAs: 'vm',
    bindings: {}
}