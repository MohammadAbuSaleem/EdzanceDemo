class VirtualclassAttendanceController{
    constructor($scope, API, $stateParams,$state,$rootScope,moment){
        'ngInject';
        this.$scope = $scope;
        this.API = API;
        this.$stateParams = $stateParams;
        this.$rootScope = $rootScope;
        this.$scope.openEdit = 0;
        this.$scope.allAttendanceDate = Date.now();
        this.$scope.moment = moment;
        
        angular.element('meta[name=Keywords]').attr('content', 'الحضور والغياب');
        angular.element('meta[name=Description]').attr('content', '');
        if($rootScope.vc.instructor != $rootScope.me.id){
            API.all('class/attendance/'+ $stateParams.classid +'/details/'+$rootScope.me.id).post('')
                .then((response) => { 
                $scope.stydentAtt = response.data;
            });
        }else{
            API.all('class/attendance/'+ $stateParams.classid +'/get').post('')
                .then((response) => {
                $scope.attendanceAll = response.data;
            });
            $scope.type = [
                {
                    value: 'absence',
                    text: 'غياب'
                },
                {
                    value: 'excuse', 
                    text: 'غياب بعذر'
                },
                {
                    value: 'delay',
                    text: 'تأخير'  
                }
            ];
            
            $scope.getAttendance = function(id,name) {
                $scope.student = {};
                $scope.student.id = id;
                $scope.student.name = name;
                API.all('class/attendance/'+ $stateParams.classid +'/details/'+id).post('')
                .then((response) => {
                    $scope.attendance = response.data;
                });
            } 
            $scope.addAttendance = function() {
                $scope.att = {
                  id: 0,
                  type: 'absence',
                  absence_date: Date.now(),
                  openEdit: 1
                };
                $scope.attendance.push($scope.att);
            };
            $scope.saveAttendance = function(att,index) {
                var data = [{
                    'user_id': $scope.student.id,
                    'type': att.type,
                    'absence_date': att.absence_date/1000,
                    'id': $scope.attendance[index].id
                }];
                var url;

                if($scope.attendance[index].id == 0){
                    url = 'class/attendance/'+ $stateParams.classid +'/add'; 
                    data = {
                        'absence_date': att.absence_date/1000,
                        'data': data
                    }
                }else{
                    url = 'class/attendance/'+ $stateParams.classid +'/edit';    
                }
                API.all(url).post(data)
                    .then((response) => {
                    $scope.attendance[index] = response.data;
                });
            };
            $scope.saveAllAttendance = function(att,attDate) { 
                var data = {
                    'absence_date': attDate/1000,
                    'data': att
                }
                API.all('class/attendance/'+ $stateParams.classid +'/add').post(data)
                    .then((response) => {
                    $scope.attendanceAll = response.data;
                    $scope.allAttendanceDate = Date.now();
                });
            };
            $scope.changeStatus = function(status,id,index) {
                var data = {
                    'user_id': id,
                    'status': status
                }
                API.all('class/attendance/'+ $stateParams.classid +'/editUserStatus').post(data)
                    .then((response) => {
                    $scope.attendanceAll[index].status = response.data.status;
                });
            };
            $scope.deleteAttendance = function(id,index) {
                var data = {
                    'id': id
                }
                if (id == 0) {
                    $scope.attendance.splice(index, 1);
                } else {
                    API.all('class/attendance/'+ $stateParams.classid +'/delete').post(data).then((response) => {
                        $scope.attendance.splice(index, 1);
                    });
                }
            }
        }
        $scope.getType = function(type) {
            switch (type) {
                case 'absence':
                    return "غياب";
                    break;
                case 'excuse':
                    return "غياب بعذر";
                    break;
                case 'delay':
                    return "تأخير";
                    break;
            }
        } 
    }
    
    $onInit(){ 
    }
}

export const VirtualclassAttendanceComponent = {
    templateUrl: './views/app/components/virtualclass-attendance/virtualclass-attendance.component.html',
    controller: VirtualclassAttendanceController,
    controllerAs: 'vm',
    bindings: {}
}