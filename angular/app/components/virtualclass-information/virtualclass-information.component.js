class VirtualclassInformationController {
    constructor($stateParams, $scope, $rootScope, ContextService, API, AclService, Upload, $timeout) {
        'ngInject';
        this.Upload = Upload;
        this.rscope = $rootScope;
        this.$timeout = $timeout;
        this.scope = $scope;
        this.API = API;
        this.stateParams = $stateParams;
        //this.rscope.mobileHeader = false
        angular.element('html').scrollTop(0); 
        $scope.vc_info = {
            name: '',
            Description: '',
            class_number: '',
            class_hall: '',
            book: '',
            syllabus: '',
            days: '',
            Hours: '',
            season: '',
            Privacy: '',
            from:new Date(),
            to:new Date(),
            Permission:false
        }
        //$scope.vc_info.to = new Date(); 
        $scope.vc_info.to.setHours(0);
        $scope.vc_info.to.setMinutes(0); 
        //$scope.vc_info.from = new Date(); 
        $scope.vc_info.from.setHours(0);
        $scope.vc_info.from.setMinutes(0); 
        $scope.to_changed = function (to) {
            $scope.vc_info.to.setHours(to.getHours() );
            $scope.vc_info.to.setMinutes( to.getMinutes() )
        };
        $scope.vc_info.from = $rootScope.from;
        $scope.from_changed = function (from) {
            $scope.vc_info.from.setHours(from.getHours() );
            $scope.vc_info.from.setMinutes( from.getMinutes() )
        };
        $scope.hstep = 1;
        $scope.mstep = 1;
        $scope.myday = [];
        
        $scope.Hours = [{
                value: "1",
                text: '1'
            },
            {
                value: "2",
                text: '2'
            },
            {
                value: "3",
                text: '3'
            },
            {
                value: "4",
                text: '4'
            },
            {
                value: "5",
                text: '5'
            },
            {
                value: "6",
                text: '6'
            }
        ];
        $scope.season = [{
                value: 'first',
                text: 'الأول'
            },
            {
                value: 'second',
                text: 'الثاني'
            },
            {
                value: 'summer',
                text: 'الصيفي'
            }
        ];
        $scope.Privacy = [{
                value: 'private',
                text: 'خاصة'
            },
            {
                value: 'public',
                text: 'عامة'
            },
            {
                value: 'custom',
                text: 'مخصصة'
            }
        ];
        $scope.days = [{
                value: 'الاحد',
                text: 'الاحد'
            },
            {
                value: 'الاثنين',
                text: 'الاثنين'
            },
            {
                value: 'الثلاثاء',
                text: 'الثلاثاء'
            },
            {
                value: 'الاربعاء',
                text: 'الاربعاء'
            },
            {
                value: 'الخميس',
                text: 'الخميس'
            },
            {
                value: 'السبت',
                text: 'السبت'
            }
        ];
        $scope.privacyAr = function (data) {
            switch (data) {
                case "private":
                    return "خاصة";
                    break;
                case "public":
                    return "عامة";
                    break;
                case "custom":
                    return "مخصصة";
                    break;
            }
        };
        $scope.seasonAr = function (data) {
            switch (data) {
                case "first":
                    return "الأول";
                    break;
                case "second":
                    return "الثاني";
                    break;
                case "summer":
                    return "الصيفي";
                    break;
            }
        };
        $scope.showDays = function() {
            var selected = [];
            angular.forEach($scope.days, function(s) {
                if ($scope.myday.indexOf(s.value) >= 0) {
                    selected.push(s.text);
                }
            });
            return selected.length ? selected.join(', ') : 'لم يتم اختيار الايام';
        };
        API.all('class/get/' + $stateParams.classid).get('')
            .then((response) => {
                $scope.myday = response.data.days.split(',');
                $scope.vc_info = {
                    name: response.data.name,
                    Description: response.data.Description,
                    class_number: response.data.class_number,
                    class_hall: response.data.class_hall,
                    book: response.data.Books,
                    syllabus: response.data.syllabus,
                    days: response.data.days,
                    Hours: response.data.Hours,
                    from: new Date(response.data.from),
                    to: new Date(response.data.to),
                    season: response.data.season,
                    Privacy: response.data.Privacy,
                    Permission: response.data.Permission
                }
            });
    }
    editableForm(form) {
        if (form.$valid) {
            let self = this
                var payload = new FormData();
                //console.log(self.scope.myday);
                var data = self.scope.vc_info;
                data.days = self.scope.myday.join(',');
                data.from = self.scope.vc_info.from /1000;
                data.to = self.scope.vc_info.to /1000;
                angular.forEach(data, function(value, key) {
                   payload.append(key, value);
                });
                self.API.all('class/edit/' + self.stateParams.classid + '/info')
                    .withHttpConfig({transformRequest: angular.identity})
                    .customPOST(payload, undefined, undefined,{'Content-Type': undefined })
                    .then((response) => {
                        self.scope.vc_info.from = new Date(response.data.from);
                        self.scope.vc_info.to =  new Date(response.data.to);
                        self.scope.vc_info.syllabus = response.data.syllabus;
                        self.scope.vc_info.book = response.data.Books;
                });
        } else {
            form.$visible = true;
        }
    }
    $onInit() {
    }
}
export const VirtualclassInformationComponent = {
    templateUrl: './views/app/components/virtualclass-information/virtualclass-information.component.html',
    controller: VirtualclassInformationController,
    controllerAs: 'vm',
    bindings: {}
}