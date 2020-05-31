class instituteAboutController{
    constructor($scope, $log, $timeout,$uibModal,API,$rootScope){
        'ngInject';
        this.API = API;
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$uibModal = $uibModal;
        this.$log = $log;
        this.$scope = $scope;
        this.items = ['item1', 'item2', 'item3'];
        this.$rootScope.newBox = {
          "name": "",
          "icon": "",
          "visible": true,
          "data": [{
            "title": "",
            "type": "",
            "value": ""
          }]
        };
        $rootScope.about = [
          {
            "name": "المعلومات العامة",
            "icon": "info",
            "visible": true,
            "data": [
              {
                "title": "اسم المؤسسه",
                "value":"الجامعه الاردنيه",
                "type":"text"
              },
              {
                "title": "تاريخ التاسيس",
                "value":"12/07/1992",
                "type":"date"
              }
            ]
          },
          {
            "name": "معلومات الاتصال",
            "icon": "phone",
            "visible": true,
            "data": [
              {
                "title": "الموقع الالكتروني",
                "value":"www.edazance.com",
                "type":"url"
              },
              {
                "title": "البريد الالكتروني",
                "value":"12/07/1992",
                "type":"date"
              }
            ]
          }
        ];
    }
    info() {
      console.log(2132);
    }
    modalOpen (size) {
        let $uibModal = this.$uibModal
        let $scope = this.$scope
        let $log = this.$log
        let items = this.items
        var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'newBox.html',
        controller: this.modalcontroller,
        controllerAs: 'mvm',
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
       this.$rootScope = $rootScope
       this.scope = $scope
       //console.log(this.scope);
         this.items = items
         this.API = API;
          var self = this;
          
        this.classEnabled = true;
        $scope.selected = {
          item: items[0]
        }
        this.addNewBox  = (form) => {
          //console.log(pro);
          this.$rootScope.about.push(this.$rootScope.newBox);
          console.log(this.$rootScope.newBox);
          console.log(this.$rootScope.about);
          this.$rootScope.newBox = {
            "name": "",
            "icon": "",
            "data": [{
              "title": "",
              "type": "",
              "value": ""
            }]
          };
          this.cancel();
        }
        this.ok = () => {
          $uibModalInstance.close($scope.selected.item)
        } 

        this.cancel = () => {
          $uibModalInstance.dismiss('cancel')
        }
        this.addNewItem = () => {
          var x = {
                "title": "",
                "type": "",
                "value": ""
              };
             this.$rootScope.newBox.data.push(x);
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

export const instituteAboutComponent = {
    templateUrl: './views/app/components/institute-about/institute-about.component.html',
    controller: instituteAboutController,
    controllerAs: 'vm',
    bindings: {}
}


