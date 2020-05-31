class GroupInformationController{
    constructor($stateParams,$scope,$rootScope,API,$state){
        'ngInject';
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.rootScope = $rootScope;
        this.$state = $state;
        this.API = API;
        //
        $scope.type = [];
         this.rootScope.groupObj.data.taxonomies.map(function(item,key){
             $scope.type.push({text:item.body})
        });
        switch (this.rootScope.groupObj.data.privacy) {
            case 'public':
                $scope.privacy = {value:1,text:'عامة للجميع'};
                break;
            case 'closed':
                $scope.privacy = {value:2,text:'للأعضاء الذين أقوم بدعوتهم'};
                break;
            case 'same_university':
                $scope.privacy = {value:3,text:'أي مستخدم ضمن جامعتك'};
                break;
            case 'same_specialization':
                $scope.privacy = {value:4,text:'طلاب تخصصك الدراسي من نفس الجامعة'};
                break;
            case 'same_specialization_all_world':
               $scope.privacy = {value:5,text:'أي طالب ينتمي الى نفس تخصصك'};
                break;
        }
         $scope.group = {
            name: this.rootScope.groupObj.data.name,
            description: this.rootScope.groupObj.data.description,
            privacy: $scope.privacy.value,
            tags: $scope.type
          }; 
        $scope.privacytype = [
            {value:1,text:'عامة للجميع'},
            {value:2,text:'للأعضاء الذين أقوم بدعوتهم'},
            {value:3,text:'أي مستخدم ضمن جامعتك'},
            {value:4,text:'طلاب تخصصك الدراسي من نفس الجامعة'},
            {value:5,text:'أي طالب ينتمي الى نفس تخصصك'}
          ];
        }
        deleteGroup() { 
            var self = this;
            var modelTitle = 'هذه المجموعه';
            swal({
                title: "هل انت متأكد من حذف المجموعه ؟",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: "نعم, احذفه",
                cancelButtonText: "لا, الغاء العمليه",
                closeOnConfirm: false,
                closeOnCancel: true,
                showLoaderOnConfirm: true
            }, (isConfirm) => {
                if (isConfirm) {
                    self.API.all('gr/delete/' + this.$stateParams.groupid).post('')
                        .then((response) => {
                            if (response.data.sucess) {
                                swal({
                                    title: "تم حذف " + modelTitle,
                                    type: "success",
                                    timer: 2000,
                                    showConfirmButton: false
                                });
                                self.$state.go('app.groups.index');
                            } else {
                                if (response.data.result == 'condition erorr') {
                                    swal({
                                        title: "انت لا تملك الصلاحية لحذف " + modelTitle,
                                        type: "error",
                                        timer: 2000,
                                        showConfirmButton: false
                                    });
                                } else {
                                    swal({
                                        title: "حدث خطأ في عملية حذف " + modelTitle,
                                        type: "error",
                                        timer: 2000,
                                        showConfirmButton: false
                                    });
                                }

                            }
                        }, (response) => {});
                }
            });
        } 
        editableForm(form){
             if(form.$submitted){
                var self = this;
                this.API.all('gr/editgr/' + this.$stateParams.groupid).post(this.$scope.group).then((response) => {
                    console.log(response.data.group);
                    self.$scope.type = [];
                    response.data.group.taxonomies.map(function(item,key){
                        self.$scope.type.push({text:item.body})
                    });
                    self.$scope.group = {
                        name: response.data.group.name,
                        description: response.data.group.description,
                        privacy: response.data.group.privacy_num,
                        tags: self.$scope.type
                     };
                    this.rootScope.groupObj.data.name = response.data.group.name;
                    this.rootScope.groupObj.data.description = response.data.group.description;
                    this.rootScope.groupObj.data.privacy = response.data.group.privacy;
                    this.rootScope.groupObj.data.taxonomies = response.data.group.taxonomies;
                    this.$scope.privacy=this.$scope.privacytype[response.data.group.privacy_num-1];
                });
            }
        }
    $onInit(){ 
    }
}

export const GroupInformationComponent = {
    templateUrl: './views/app/components/group-information/group-information.component.html',
    controller: GroupInformationController,
    controllerAs: 'vm',
    bindings: {}
}


