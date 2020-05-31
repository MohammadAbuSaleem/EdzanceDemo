class GroupController{
    constructor($scope,$stateParams,$rootScope,API,$state,Post,$timeout,moment,Upload,$log,toastr,$http){
        'ngInject';
        this.$scope = $scope;
        this.stateParams = $stateParams;
        this.rootScope = $rootScope;
        this.API = API;
        this.$scope.template =  0; 
        this.$scope.btnType =  0; 
        this.$state = $state;  
        this.skip = 0; 
        this.toastr = toastr
        this.$scope.showcovercrop = false;
        var self = this;
        self.rootScope.pageTitle = "المجموعات";
        angular.element('meta[name=Keywords]').attr('content','المجموعات,المجموعات ادزانس,Edzance Group');
        angular.element('meta[name=Description]').attr('content','تواصل مع مدرسيك وزملائك , احصل على ملفاتك الدراسية و على تنبيهات امتحانات , شارك الطلاب الجامعيين آرائك ونقاشاتك .');
        $scope.myCoverImage = '';
        $scope.myCroppedCover = '';
        $scope.join = function(userId,status) {
            if(status == 1){
                if(self.rootScope.groupObj.data.authorized == 1){
                    status = 6;
                }
            }
            self.API.all('gr/add-to-group/' + self.stateParams.groupid + '/' + userId + '/' + status).get('').then((response) => {
                self.rootScope.groupObj.member = response.data.add.type;
                self.$scope.template = response.data.add.template;
                if(response.data.add.type == 'in'){
                    self.$scope.btnType =  3;
                }else if(response.data.add.type == "out") {
                    self.$scope.btnType =  1;
                }else if(response.data.add.type == "waiting") {
                    self.$scope.btnType =  2;
                }
            });
        }
        //this.memberIndex = 0;
        $rootScope.req = this.API.all('group/' + this.stateParams.groupid).get('').then((response) => {
            this.rootScope.groupObj = response.data;
            if(this.rootScope.groupObj.member == 'in' || this.rootScope.groupObj.member == 'owner' || this.rootScope.groupObj.member == 'modirator'){
                if($state.current.name != 'app.group'){
                    $state.go($state.current.name);
                } else {
                    $state.go('app.group.discussion');
                }
                this.$scope.template =  1;
                this.$scope.btnType =  3;
            }else{
                if(this.rootScope.groupObj.template == 1){
                    this.$scope.template =  1;
                    if($state.current.name != 'app.group'){
                        this.$state.go($state.current.name);
                    }else {
                        this.$state.go('app.group.discussion');
                    };
                    if(this.rootScope.groupObj.canEnter == true){
                        if(this.rootScope.groupObj.member == 'waiting'){
                            this.$scope.btnType =  2;
                        } else if (this.rootScope.groupObj.member == 'invited') {
                            this.$scope.btnType =  4;
                        } else {
                            this.$scope.btnType =  1;
                        }
                    } else { 
                        this.$scope.btnType =  0;
                    }
                }else if(this.rootScope.groupObj.template == 2){
                    this.$scope.template =  2;
                    this.$state.go('app.group.members');
                    if(this.rootScope.groupObj.canEnter == true){
                        if(this.rootScope.groupObj.member == 'waiting'){
                            this.$scope.btnType =  2;
                        } else if (this.rootScope.groupObj.member == 'invited') {
                            this.$scope.btnType =  4;
                        } else {
                            this.$scope.btnType =  1;
                        }
                    }else{
                        this.$scope.btnType =  0;
                    }
                }else if (this.rootScope.groupObj.template == 3){
                    this.$scope.template =  3; 
                }
            }
        });
        API.all('gr/users/' + this.stateParams.groupid + "/0/6").get('').then((response) => {
            this.rootScope.groupMember = response.data;
        });
        API.all('gr/suggested-user/' + this.stateParams.groupid + '/' + this.skip + '/4').get('').then((response) => {
            this.rootScope.groupsuggested = response.suggested;
            this.rootScope.suggestedIds = response.suggested_ids;
            this.skip = 4;
            //this.memberIndex = 3;
        });
        API.all('gr/images/' + this.stateParams.groupid + '/0/6').get('').then((response) => {
            this.$scope.images = response.data;
        });
        // API.all('gr/video/' + this.stateParams.groupid + '/0/6').get('').then((response) => {
        //     this.$scope.video = response.data;
        // });
        $rootScope.usersearch = function(val) { 
            return $http.get('api/gr/search-user/' + $stateParams.groupid + '/' +  val).then(function(response){
              if(response.data.data != "no post"){ 
                return response.data.data.map(function(item){
                  return item;
                });
              }
            });
        }
        $scope.getLocation = function(val) {
            return $http.get('api/class/search/'+ $stateParams.classid + '/' + val).then(function(response){
              if(response.data.data != "no post"){
                return response.data.data.map(function(item){
                  return item;
                });
              }
            });
        };
        var handleCoverSelect = function(evt) {
            $scope.showcovercrop = true;
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function(evt) {
                $scope.$apply(function($scope) {
                    $scope.myCoverImage = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#coverInput')).on('change', handleCoverSelect);
    }
    addmember (userId,location,index,name,last_name) {
        var self = this;
        if(location == 2){
            this.rootScope.groupsuggested.splice(index,1);
            var a = this.rootScope.suggestedIds.indexOf(userId);
            this.rootScope.suggestedIds.splice(a,1);
        }
        this.API.all('gr/add-to-group/' + this.stateParams.groupid + '/' + userId + '/5').post(this.rootScope.suggestedIds).then((response) => {
            if(location == 2){
                angular.element('#friend-' + userId).hide();
                this.rootScope.groupsuggested.push(response.data.suggested);
                this.rootScope.suggestedIds.push(response.data.suggested.user_id);
            }
            this.toastr.success('تمت دعوة العضو ' + name + ' ' + last_name);
        });
    }
    changecover() {
        var data = {
            string_file: this.$scope.myCroppedCover,
            id: this.stateParams.groupid
        };
        this.API.all('gr/cover').post(data).then((response) => {
            this.rootScope.groupObj.data.cover = this.$scope.myCroppedCover
            this.$scope.showcovercrop = false;
            this.$scope.myCroppedCover = ''
            this.$scope.myCoverImage = ''
        });
    }
    $onInit(){
    }
}
 
export const GroupComponent = {
    templateUrl: './views/app/components/group/group.component.html',
    controller: GroupController,
    controllerAs: 'vm',
    bindings: {}
}