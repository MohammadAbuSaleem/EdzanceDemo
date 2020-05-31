class SidebarController {
    constructor(moment, $scope, $rootScope, ContextService, API, AclService, $uibModal, $log, $document, toastr,$http) {
        'ngInject';
        this.$scope = $scope;
        this.$scope.moment = moment;
        this.toastr = toastr;
        this.$rootScope = $rootScope;
        this.API = API;
        this.classEnabled = true;
        let navSideBar = this
        this.$scope.classes = []
        this.can = AclService.can
        this.newcoursecode = ''
        this.newclass = false
        $scope.membershipModal = false
        this.newuserclass = false
        this.classsubmit = false
        this.sclasssubmit = false
        $scope.membership = [];
        //$scope.membership.level = 4;
        if ($rootScope.me) $scope.membership.level = $rootScope.me.level;
        $scope.fromtime = new Date();
        $scope.totime = new Date();
        $scope.membership.from = new Date();
        $scope.membership.to = new Date();
        this.vday = false; 
        
        this.$scope.fromtime = $scope.fromtime;
        this.$scope.totime = $scope.totime;
        $scope.fromtime.setHours(0);
        $scope.fromtime.setMinutes(0);
        $scope.totime.setHours(0);
        $scope.totime.setMinutes(0); 

        $scope.membership.from.setHours(0);
        $scope.membership.from.setMinutes(0);
        $scope.membership.to.setHours(0);
        $scope.membership.to.setMinutes(0);
        $scope.membership.country = 14;
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
        angular.element('.uType input').on('change', function() {
            angular.element('.user-type').removeClass('active');
            angular.element(this.parentNode).addClass('active');
        });
        API.all('home/countries-list').post().then((response) => {
          $scope.countries = response.data;
        });
        $scope.getInstitute = function(val) {
            return $http.get('../api/inst/search-institute/'+$scope.membership.instype+'/'+val).then(function(response){
                if(response.data.data != "no post"){
                    var obj = response.data.data;
                    return Object.keys(obj).map(function (key) {
                        return {'id':key,'name':obj[key]}; 
                    });
                }
            });
        };
        $scope.onInsSelect = function(item) {
           $scope.membership.institute = item.id;
           $scope.membership.instituteName = item.name;
        };  
        $scope.shouldInsSelect = function(event) {
            if($scope.membership.institute != ''){
                $scope.membership.institute = '';
            }
        }; 
        $scope.changeType = function() {
            $scope.membership.institute = '';
            $scope.membership.instituteName = '';
            $scope.membership.specialty = '';
            $scope.membership.specialtyName = '';
        }; 
        $scope.getSpecialty = function(val) {
            return $http.get('../api/inst/search-institute/'+$scope.membership.institute+'/'+val).then(function(response){
                if(response.data.data != "no post"){
                    var obj = response.data.data;
                    return Object.keys(obj).map(function (key) {
                        return {'id':key,'name':obj[key]}; 
                    });
                }
            });
        };
        $scope.onSpeSelect = function(item) {
           $scope.membership.specialty = item.id;
           $scope.membership.specialtyName = item.name;
        };  
        $scope.shouldSpeSelect = function(event) {
            if($scope.membership.specialty != ''){
                $scope.membership.specialty = '';
            }
        }; 
        $scope.newMembership = function(membership,isValid) {

            var data = {};
            var doc = true;
            var payload = new FormData();
            if(membership.level == 5){
                doc = false;
                if(membership.from.getTime() == membership.to.getTime()){
                    $scope.timeErrorFlag = true;
                }else{
                    $scope.timeErrorFlag = false;
                }
                if(!membership.files){
                    $scope.fileErrorFlag = true;
                }else{
                    $scope.fileErrorFlag = false;
                }
                if(!$scope.fileErrorFlag && !$scope.timeErrorFlag){
                    doc = true;
                }
            }
            if( isValid && membership.institute != '' && doc){
                if(membership.level == 5){
                    data = 
                        {"institute": membership.institute,
                         "specialty": membership.specialty,
                         "from": membership.from/1000,
                         "to": membership.to/1000,
                         "file": membership.files 
                        };
                }else{
                    data = 
                        {"institute": membership.institute,
                         "specialty": membership.specialty
                        };
                }
                //var payload = new FormData();
                angular.forEach(data, function(value, key) {
                  payload.append(key, value);
                });
                API.all('home/add-information')
                    .withHttpConfig({transformRequest: angular.identity})
                    .customPOST(payload, undefined, undefined,{'Content-Type': undefined })
                    .then((response) => {
                        $scope.membershipModal = true
                        $scope.level = membership.level;
                        $scope.membership.country = 14;
                        $scope.membership.instituteName = '';
                        $scope.membership.specialtyName = '';
                        $scope.membership.institute = '';
                        $scope.membership.specialty = '';
                        $scope.membership.files = {};
                        $scope.membership.level = 5;
                        $scope.membership.instype = 1;
                });
            }
        }; 
    }
    // changeCountries(coun){    
    //     this.$scope.universities = uni.universities;
    // }
    // checkdays() {
    //     if (this.sat == false || this.sat == undefined) var sat = false;
    //     else var sat = true;
    //     if (this.sun == false || this.sun == undefined) var sun = false;
    //     else var sun = true;
    //     if (this.mon == false || this.mon == undefined) var mon = false;
    //     else var mon = true;
    //     if (this.tus == false || this.tus == undefined) var tus = false;
    //     else var tus = true;
    //     if (this.wed == false || this.wed == undefined) var wed = false;
    //     else var wed = true;
    //     if (this.thu == false || this.thu == undefined) var thu = false;
    //     else var thu = true;
    //     if (sat || sun || mon || tus || wed || thu) return false;
    //     else return true;
    // }
    $onInit() {}
}

export const SidebarComponent = {
    templateUrl: './views/app/components/sidebar/sidebar.component.html',
    controller: SidebarController,
    controllerAs: 'side',
    bindings: {}
}