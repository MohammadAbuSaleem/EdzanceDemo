class VirtualclassMarksController{
    constructor($scope, $filter, $http, $q, API, $stateParams,$state,DTOptionsBuilder, DTColumnDefBuilder){
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        this.API = API;
        this.$stateParams = $stateParams;
        this.$scope.status = false;
        this.$scope.DTOptionsBuilder = DTOptionsBuilder;
        this.$scope.DTColumnDefBuilder = DTColumnDefBuilder;
        this.$scope.dtOptions = this.$scope.DTOptionsBuilder.newOptions()
        .withLanguage({
            "sProcessing":   "جارٍ التحميل...",
            "sLengthMenu":   "أظهر _MENU_ مدخلات",
            "sZeroRecords":  "لم يعثر على أية نتائج",
            "sInfo":         "إظهار _START_ إلى _END_ من أصل _TOTAL_ مدخل",
            "sInfoEmpty":    "يعرض 0 إلى 0 من أصل 0 سجل",
            "sInfoFiltered": "(منتقاة من مجموع _MAX_ مُدخل)",
            "sInfoPostFix":  "",
            "sSearch":       "ابحث:",
            "sUrl":          "",
            "oPaginate": {
                "sFirst":    "الأول",
                "sPrevious": "السابق",
                "sNext":     "التالي",
                "sLast":     "الأخير"
            }
        });
        $scope.dtColumnDefs = [
            $scope.DTColumnDefBuilder.newColumnDef(0),
            $scope.DTColumnDefBuilder.newColumnDef(1).notVisible(),
            $scope.DTColumnDefBuilder.newColumnDef(2).notSortable()
        ];
        $scope.users = [
            {id: 1, 
             name: 'أحمد عدنان', 
             marks: {1:{mark:'1',assessments_id:1,exam_name:'ds'},
                     2:{mark:'2',assessments_id:2,exam_name:'rs'},
                     3:{mark:'3',assessments_id:3,exam_name:'tg'}
                     }
            },
            {id: 2, 
             name: 'حمزه النتشة', 
             marks: {1:{mark:'4',assessments_id:1,exam_name:'ds'},
                     2:{mark:'5',assessments_id:2,exam_name:'rs'},
                     3:{mark:'6',assessments_id:3,exam_name:'tg'}
                     }
            },
            {id: 3, 
             name: 'محمد محمود', 
             marks: {1:{mark:'7',assessments_id:1,exam_name:'ds'},
                     2:{mark:'8',assessments_id:2,exam_name:'rs'},
                     3:{mark:'9',assessments_id:3,exam_name:'tg'}
                     }
            }
        ];
        API.all('class/get/'+ $stateParams.classid +'/mark').get('').then((response) => {
            $scope.users = response.data;
        });
        $scope.addNewMark = function() { 
            var size = Object.keys($scope.users[0].marks).length;
            angular.forEach($scope.users, function(value, key){
                value.marks[size+1] = {mark:'0',assessments_id:0,exam_name:'علامه'+(size+1)};
            });
        }
        $scope.saveColumn = function(index) {   
            var mark = [];
            angular.forEach($scope.users, function(value, key){
                value.marks[index]['id'] = key;
                mark.push(value.marks[index]);
            }); 
            angular.element('.e'+index).addClass('enable');
            angular.element('.edit'+index).removeClass('hidden');
            angular.element('.save'+index).addClass('hidden');
        }   
        $scope.showColumn = function(status,index) { 
            if(status){
                angular.element('.e'+index).removeClass('enable');
                angular.element('.edit'+index).addClass('hidden');
                angular.element('.save'+index).removeClass('hidden');
            }else{
                angular.element('.e'+index).addClass('enable');
                angular.element('.edit'+index).removeClass('hidden');
                angular.element('.save'+index).addClass('hidden');
            }
        }
    }

    $onInit(){
    }
}

export const VirtualclassMarksComponent = {
    templateUrl: './views/app/components/virtualclass-marks/virtualclass-marks.component.html',
    controller: VirtualclassMarksController,
    controllerAs: 'vm',
    bindings: {}
}