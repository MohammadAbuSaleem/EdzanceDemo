class GroupMembersRequestsController{
    constructor($scope,$stateParams,$rootScope,API,$state){
        'ngInject';
        this.$scope = $scope;
        this.stateParams = $stateParams;
        this.rootScope = $rootScope;
        this.API = API;
        this.$state = $state;
        //
        API.all('gr/users-waiting/' + this.stateParams.groupid).get('').then((response) => {
            this.$scope.waiting = response.data;
        });
        $scope.join = function(userId,status) {
            $scope.member = [];
             $scope.waiting.map(function(item,key){
              $scope.member[item.id] = key;
            });
            API.all('gr/add-to-group/' + $stateParams.groupid + '/' + userId + '/' + status).get('').then((response) => {
                $scope.waiting.splice($scope.member[userId],1);
            });
        }
    } 

    $onInit(){
    }
}
 
export const GroupMembersRequestsComponent = {
    templateUrl: './views/app/components/group-members-requests/group-members-requests.component.html',
    controller: GroupMembersRequestsController,
    controllerAs: 'vm',
    bindings: {}
}


