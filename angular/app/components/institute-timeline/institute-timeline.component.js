class instituteTimelineController{
    constructor($scope){
        'ngInject';
        $scope.showEvent = function() {
            angular.element('.event-div').removeClass('hidden');
            angular.element('.referendum-div').addClass('hidden');
        }
        $scope.showReferendum = function() {
            angular.element('.event-div').addClass('hidden');
            angular.element('.referendum-div').removeClass('hidden');
        }
        $scope.closePost = function() {
            angular.element('.event-div').addClass('hidden');
            angular.element('.referendum-div').addClass('hidden');
        }
    }

    $onInit(){
    }
}

export const instituteTimelineComponent = {
    templateUrl: './views/app/components/institute-timeline/institute-timeline.component.html',
    controller: instituteTimelineController,
    controllerAs: 'vm',
    bindings: {}
}