class VirtualclassStudentController {
    constructor($http, $stateParams, $scope, $rootScope, API,toastr) {
        'ngInject';
        $scope.a = [];
        let navSideBar = this
        this.API = API;
        this.rootScope = $rootScope;
        this.scope = $scope;
        this.stateParams = $stateParams;
        //this.rootScope.prouser = []
        //this.rootScope.vc = []
        this.userData = []
        this.counter = 0;   
        this.rootScope.mobileHeader = false
        this.toastr = toastr
        angular.element('html').scrollTop(0); 
        var _selected;
        $scope.selected = undefined;

        // $scope.getLocation = function(val) {
        //     API.all('class/search/'+ $stateParams.classid + '/' + val).get('')
        //     .then((response) => {
        //         $scope.a = [];
        //         console.log(response.data);
        //         response.data.map(function(item) {
        //             $scope.a.push(item)
        //         });
        //     }, (response) => {
        //         var a = response.data;
        //     });
        //     return $scope.a;
        // }
         $scope.getLocation = function(val) {
            return $http.get('api/class/search/'+ $stateParams.classid + '/' + val).then(function(response){
              if(response.data.data != "no post"){
                return response.data.data.map(function(item){
                  return item;
                });
              }
            });
          };
        API.all('class/requests/' + $stateParams.classid).get('')
            .then((response) => {
                $scope.waitingStudent = response.data;
                $scope.noWaitingStudent = false;
                if (response.data.success == false) {
                    $scope.noWaitingStudent = true;
                }
            });
    }
    addclasses($item) {
        var mynewclass = {
            code: this.rootScope.vc.class_code,
            student: $item.id
        }
        var self = this;
        this.API.all('class/add/'+self.rootScope.vc.id).post(mynewclass).then((response) => {
            if(response.data.sucess == false){
                self.toastr.error(response.data.message);
            }else{
                self.toastr.success(response.data.message);
                self.rootScope.vc.vcuser = response.data.result;
                self.scope.a = [];
                self.scope.query = '';
            }
        });

    }
    removeclassuser($id) {
        var mynewclass = {  
            user: $id,
            class: this.rootScope.vc.id
        }
        var self = this;
        this.API.all('class/remove/'+self.rootScope.vc.id).post(mynewclass).then((response) => {
            if(response.data.sucess == true){
                self.toastr.success(response.data.message);
                self.rootScope.vc.vcuser = response.data.result;
                self.scope.asyncSelected = '';
            }
            //this.newcoursecode = response.data.code.class_code
            //this.newname = response.data.code.name
            //console.log(response)
        });

    }
    acceptStudent(status,student,index) {
        var data = {
            status: status,
            class_id: this.stateParams.classid,
            user_id: student.user_id,
            join_id: student.join_id
        }
        var self = this;
        this.API.all('class/accept/'+self.rootScope.vc.id).post(data).then((response) => {
            if(response.errors == true){
                self.toastr.error(response.data.message);
            }else if(response.errors == false){
                self.toastr.success(response.data.message);
            }
            if(status == 1){
                self.scope.waitingStudent.splice(index,1);
                self.rootScope.vc.vcuser.push(student);
            }else if(status == 0){
                self.scope.waitingStudent.splice(index,1);
            }
            if (self.scope.waitingStudent.length == 0) {
                self.scope.noWaitingStudent = true;
            }
        });
    }
    $onInit() {}
}

export const VirtualclassStudentComponent = {
    templateUrl: './views/app/components/virtualclass-student/virtualclass-student.component.html',
    controller: VirtualclassStudentController,
    controllerAs: 'vm',
    bindings: {}
}