class VirtualclassesController{
    constructor($rootScope,$state,$scope,moment,API,toastr,$stateParams){
        'ngInject';
        this.$scope = $scope;
        this.$scope.moment = moment;
        this.$rootScope = $rootScope;
        this.API = API;
        this.toastr = toastr;
        this.classEnabled = true;
        this.newclass = false;
        this.newuserclass = false;
        this.newcoursecode = '';
        this.classsubmit = false;
        this.sclasssubmit = false;
        $rootScope.pageTitle = 'المواد الدراسية';
        angular.element('meta[name=Keywords]').attr('content', 'المواد الدراسية ادزنس');
        angular.element('meta[name=Description]').attr('content', 'تواصل مع مدرسيك وزملائك , احصل على ملفاتك الدراسية و على تنبيهات امتحانات , شارك الطلاب الجامعيين آرائك ونقاشاتك .');
        angular.element('html').scrollTop(0);
        // 
        $scope.fromtime = new Date();
        $scope.totime = new Date();
        this.vday = false; 
        
        this.$scope.fromtime = $scope.fromtime;
        this.$scope.totime = $scope.totime;
        $scope.fromtime.setHours(0);
        $scope.fromtime.setMinutes(0);
        $scope.totime.setHours(0);
        $scope.totime.setMinutes(0);
        API.all('home/classes').get('')
            .then((response) => {
                $scope.owened = response.data.owened;
                $scope.entered = response.data.entered;
                $scope.loader = 1;
        });  
        $scope.fromChanged = function(fromtime) {
            $scope.fromtime.setHours(fromtime.getHours());
            $scope.fromtime.setMinutes(fromtime.getMinutes());
        };
        $scope.totimeChanged = function(totime) {
            $scope.totime.setHours(totime.getHours());
            $scope.totime.setMinutes(totime.getMinutes());
        };
        $scope.fromMembership = function(fromtime) {
            $scope.membership.from.setHours(fromtime.getHours());
            $scope.membership.from.setMinutes(fromtime.getMinutes());
        };
        $scope.totimeMembership = function(totime) {
            $scope.membership.to.setHours(totime.getHours());
            $scope.membership.to.setMinutes(totime.getMinutes());
        };
    }
    addclass(isValid, _self) {
        this.vday = this.checkdays();
        if (isValid && !this.vday) {
            if (this.classEnabled == true) {
                this.classEnabled = false;
                var fromtime = this.toTimeZone(_self.$scope.fromtime);
                var totime = this.toTimeZone(_self.$scope.totime);
                var mynewclass = {
                    name: this.name,
                    specialition_id: this.$rootScope.me.specialition_id,
                    description: this.description,
                    class_number: this.class_number,
                    class_hall: this.class_hall,
                    Hours: this.Hours,
                    season: this.season,
                    privacy: this.privacy,
                    sat: this.sat,
                    sun: this.sun,
                    mon: this.mon,
                    tus: this.tus,
                    wed: this.wed,
                    thu: this.thu,
                    date: this.date,
                    from: fromtime,
                    to: totime,
                    permission: this.permission
                }
                this.API.all('home/addclass').post(mynewclass).then((response) => {
                    this.$scope.owened.push(response.data);
                    this.classEnabled = true
                    this.newclass = true
                    this.newcoursecode = response.data.class_code
                    this.newname = response.data.name
                    this.name = ''
                    this.description = ''
                    this.Hours = ''
                    this.season = ''
                    this.privacy = ''
                    this.class_number = ''
                    this.class_hall = ''
                    this.sat = ''
                    this.sun = ''
                    this.mon = ''
                    this.tus = ''
                    this.wed = ''
                    this.thu = ''
                    this.minutes1 = ''
                    this.hours1 = ''
                    this.dn1 = ''
                    this.hours2 = ''
                    this.dn2 = ''
                }, (response) => {
                    this.classEnabled = true
                });
            }
        } else {
            this.classsubmit = true
        }
    }
    addclasses(isValid) {
        if (isValid) {
            if (this.classEnabled == true) {
                this.classEnabled = false;
                var mynewclass = {
                    code: this.code
                }
                this.API.all('home/enterclass').post(mynewclass).then((response) => {
                    if (response.data.sucess == false) {
                        this.toastr.error(response.data.message);
                        this.classEnabled = true;
                    } else {
                        if(response.data.toPush == true){
                            this.$scope.entered.push(response.data.result);
                        }
                        this.$scope.sucessMsg = response.data.message;
                        this.newuserclass = true;
                        this.classEnabled = true;

                    }
                }, (response) => {
                    this.classEnabled = true
                    // this.newuserclass = true
                });
            }
        } else {
            this.sclasssubmit = true
        }
    }
    checkdays() {
        if (this.sat == false || this.sat == undefined) var sat = false;
        else var sat = true;
        if (this.sun == false || this.sun == undefined) var sun = false;
        else var sun = true;
        if (this.mon == false || this.mon == undefined) var mon = false;
        else var mon = true;
        if (this.tus == false || this.tus == undefined) var tus = false;
        else var tus = true;
        if (this.wed == false || this.wed == undefined) var wed = false;
        else var wed = true;
        if (this.thu == false || this.thu == undefined) var thu = false;
        else var thu = true;
        if (sat || sun || mon || tus || wed || thu) return false;
        else return true;
    }
    toTimeZone(time) {
        //moment.parseZone('2016-05-03T22:15:01+02:00').local().format()
        return this.$scope.moment.parseZone(time).add(2, 'h');
    }
    $onInit(){
    }
}

export const VirtualclassesComponent = {
    templateUrl: './views/app/components/virtualclasses/virtualclasses.component.html',
    controller: VirtualclassesController,
    controllerAs: 'vm',
    bindings: {}
}