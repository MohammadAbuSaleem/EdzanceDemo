class VirtualclassOptionsController {
    constructor($rootScope, $scope, API, $stateParams,$state) {
        'ngInject';
        this.rscope = $rootScope;
        this.rscope.mobileHeader = false;
        this.$state = $state;
        angular.element('html').scrollTop(0); 
        $scope.deleteClass = function() {
            var modelTitle = 'هذه المادة';
            swal({
                title: "هل انت متأكد من حذف " + modelTitle + " ؟",
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
                    API.all('class/delete/' + $stateParams.classid).post('')
                        .then((response) => {
                            if (response.data.sucess) {
                                swal({
                                    title: "تم حذف " + modelTitle,
                                    type: "success",
                                    timer: 2000,
                                    showConfirmButton: false
                                });
                                $state.go('app.landing');
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
        $scope.archiveClass = function(status) {
            var modelTitle = 'هذه المادة';
            var status = status;
            if(status == 'archiving'){
                var title = "هل متاكد انك تريد ارشفة هذه المادة؟";
                var successMsg = "تم ارشفة هذه المادة"
            }else{
                var title = "هل متاكد انك تريد الغاء ارشفة هذه المادة؟";
                var successMsg = "تم الغاء ارشفة هذه المادة"
            }
            swal({
                title: title,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: "نعم",
                cancelButtonText: "الغاء العمليه",
                closeOnConfirm: false,
                closeOnCancel: true,
                showLoaderOnConfirm: true
            }, (isConfirm) => {
                if (isConfirm) {
                    API.all('class/'+status+'/' + $stateParams.classid).post('')
                        .then((response) => {
                            if (response.data.sucess) {
                                swal({
                                    title: successMsg,
                                    type: "success",
                                    timer: 2000,
                                    showConfirmButton: false
                                });
                                $state.go('app.landing');
                            } else {
                                if (response.data.result == 'condition erorr') {
                                    swal({
                                        title: "انت لا تملك الصلاحية ",
                                        type: "error",
                                        timer: 2000,
                                        showConfirmButton: false
                                    });
                                } else {
                                    swal({
                                        title: "حدث خطأ في العملية ",
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
        $scope.leaveClass = function() {
            swal({
                title: "هل انت متأكد من مغادرة المادة ؟",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: "نعم, متاكد",
                cancelButtonText: "لا, الغاء العمليه",
                closeOnConfirm: false,
                closeOnCancel: true,
                showLoaderOnConfirm: true
            }, (isConfirm) => {
                if (isConfirm) {
                    API.all('class/leave/' + $stateParams.classid).post('')
                        .then((response) => {
                            if (response.data.sucess) {
                                swal({
                                    title: "تمت مغادرة من المادة", 
                                    type: "success",
                                    timer: 2000,
                                    showConfirmButton: false
                                });
                                $state.go('app.virtualclasses');
                            } else {
                                if (response.data.result == 'condition erorr') {
                                    swal({
                                        title: "انت لا تملك الصلاحية المغادره المادة",
                                        type: "error",
                                        timer: 2000,
                                        showConfirmButton: false
                                    });
                                } else {
                                    swal({
                                        title: "حدث خطأ في عملية المغادرة المادة",
                                        type: "error",
                                        timer: 2000,
                                        showConfirmButton: false
                                    });
                                }
                            }
                        });
                }
            });
        }
    }
    $onInit() {}
}
export const VirtualclassOptionsComponent = {
    templateUrl: './views/app/components/virtualclass-options/virtualclass-options.component.html',
    controller: VirtualclassOptionsController,
    controllerAs: 'vm',
    bindings: {}
}