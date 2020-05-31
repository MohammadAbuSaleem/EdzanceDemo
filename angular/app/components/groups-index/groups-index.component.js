class GroupsIndexController{
      constructor($rootScope,API,$uibModal,$scope,$log){
        'ngInject';
        this.rootScope = $rootScope
        this.rootScope.pageTitle = "المجموعات";
        angular.element('meta[name=Keywords]').attr('content','المجموعات,مجموعات ادزانس,Edzance Groups');
        angular.element('meta[name=Description]').attr('content','تواصل مع مدرسيك وزملائك , احصل على ملفاتك الدراسية و على تنبيهات امتحانات , شارك الطلاب الجامعيين آرائك ونقاشاتك .');
        angular.element('html').scrollTop(0);
        this.classEnabled = true;
        this.API = API;
        this.$scope = $scope;
        this.$uibModal = $uibModal;
        this.$log = $log;
        this.items = ['item1', 'item2', 'item3'];
        //
        this.$scope.megroups = [];

        var self = this; 
        API.all('gr/me').get('').then((response) => {
            this.rootScope.megroups = response.data;
        },(response) =>{ 
        }); 
        API.all('gr/entered').get('').then((response) => {
            this.$scope.engroups = response.data;
        },(response) =>{
        });
        API.all('gr/suggested').get('').then((response) => {
            this.$scope.sggroups = response.data;
        },(response) =>{
        });
    }
    modalOpen (size) {
        let $uibModal = this.$uibModal
        let $scope = this.$scope
        let $log = this.$log
        let items = this.items
        var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'newGroup.html',
        controller: this.modalcontroller,
        controllerAs: 'mvm',
        windowClass: 'small-modal',
        size: size,
        resolve: {
          items: () => {
            return items
          }
        }
        })

        modalInstance.result.then((selectedItem) => {
        $scope.selected = selectedItem
        }, () => {
        $log.info('Modal dismissed at: ' + new Date())
        })
    }
    modalcontroller ($rootScope,$scope, $uibModalInstance, items,API) {
        'ngInject'
       this.rootScope = $rootScope
       this.scope = $scope
       //console.log(this.scope);
         this.items = items
         this.API = API;
          var self = this;
          
        this.classEnabled = true;
        $scope.selected = {
          item: items[0]
        }

           this.addNewGroup  = (form) => {

                if(form.$valid){
                if(this.classEnabled == true){
                  this.classEnabled = false;
                  var mynewclass = {
                    name: this.rootScope.newPost.name,
                    description: this.rootScope.newPost.description,
                    permission: this.rootScope.newPost.permission,
                    tags: this.rootScope.newPost.type,
                    auth: this.rootScope.newPost.auth
                  }
                  this.rootScope.newPost.name = '';
                  this.rootScope.newPost.description = '';
                  this.rootScope.newPost.permission = '';
                  this.rootScope.newPost.type = '';
                  this.rootScope.newPost.auth = '';
                  this.cancel();
                this.API.all('gr/addgroup').post(mynewclass).then((response) => {
                  self.rootScope.megroups.push(response.data);
                  // self.scope.$parent.megroups.push(response.data);
                   self.classEnabled = true
                    },(response) => {
                      self.classEnabled = true
                    });
                  }
               
                }
            }
        this.ok = () => {
          $uibModalInstance.close($scope.selected.item)
        }

        this.cancel = () => {
          $uibModalInstance.dismiss('cancel')
        }
    }
    cancel() {
         this.dismiss({$value: 'cancel'});
    };
    toggleModalAnimation () {
        this.animationsEnabled = !this.animationsEnabled
    }
    $onInit(){
    }
}

export const GroupsIndexComponent = {
    templateUrl: './views/app/components/groups-index/groups-index.component.html',
    controller: GroupsIndexController,
    controllerAs: 'vm',
    bindings: {}
}


