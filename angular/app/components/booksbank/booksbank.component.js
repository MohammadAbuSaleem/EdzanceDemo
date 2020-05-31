class BooksbankController{
    constructor(Post,moment,$rootScope,API,$uibModal,$scope,$log,$timeout,Upload,$state){
        'ngInject';
        this.$uibModal = $uibModal
        this.$scope = $scope
        //this.$scope.$state = $state
        this.$log = $log
        this.$scope.$state = $state;
        this.items = ['item1', 'item2', 'item3'];
        this.$rootScope = $rootScope;
        this.API = API;
        this.$scope.moment = moment;
        this.classEnabled = true;
        this.$rootScope.pageTitle = "بنك الكتب";
        angular.element('meta[name=Keywords]').attr('content','بنك الكتب,بنك الكتب ادزانس,Edzance book bank');
        angular.element('meta[name=Description]').attr('content','تواصل مع مدرسيك وزملائك , احصل على ملفاتك الدراسية و على تنبيهات امتحانات , شارك الطلاب الجامعيين آرائك ونقاشاتك .');
        this.Post = new Post.constructor($rootScope, API,$timeout,moment,Upload,$log);
        var Post = this.Post;
        this.Post.seturl('books/get/all');
        this.Post.setskip(0);
        this.Post.settype('jobs');
        this.Post.settake(7);
        //this.Post.getPost();
        $rootScope.books = "";
        this.Post.getPost().then(function(response){
           $rootScope.books = Post.getPostat();
            $scope.nopost = Post.getnopost();
            $rootScope.busy = false;
        });
        this.Post.settake(4);   
        this.$scope = $scope;
        $scope.getPost = function() {
            Post.getPost().then(function(response){
                $rootScope.books=Post.getPostat();
                $scope.nopost = Post.getnopost();
                $rootScope.busy = false;
            });
        }
        $scope.status = function(status) {
          switch (status) {
              case 'sale':
                  return "للبيع";
                  break; 
              case 'swap':
                  return "تبادل";
                  break;
              case 'borrow':
                  return "استعاره";
                  break; 
              case 'gift':
                  return "دون مقابل";
                  break; 
          }
        }
        var scope = this.$scope;
    }
    modalOpen (size) {
        let $uibModal = this.$uibModal
        let $scope = this.$scope
        let $log = this.$log
        let items = this.items
        var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'newBook.html',
        controller: this.modalcontroller,
        controllerAs: 'mvm',
        size: size,
        windowClass: 'small-modal',
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
    modalcontroller ($rootScope,$scope, $uibModalInstance, items,API,Upload) {
        'ngInject'
       this.$rootScope = $rootScope
       this.$scope = $scope
       this.Upload = Upload
       //console.log(this.scope);
         this.items = items
         this.API = API;
          var self = this;
          
        this.classEnabled = true;
           this.addNewBook  = (form,files) => {
            //console.log(sc);
            this.files = files;
                if(form.$valid){
                if(this.classEnabled == true){
                  this.classEnabled = false;
                  var mynewbook = {
                    book_name: this.$rootScope.newBook.name,
                    description: this.$rootScope.newBook.description,
                    price: this.$rootScope.newBook.price,
                    tags: this.$rootScope.newBook.tags,
                    type: this.$rootScope.newBook.type,
                    contact: this.$rootScope.newBook.contact
                    //book_image: this.files
                  }
                  
                  this.$rootScope.newBook.name = '';
                  this.$rootScope.newBook.description = '';
                  this.$rootScope.newBook.type = '';
                  this.$rootScope.newBook.price = 0;
                  this.$rootScope.newBook.tags = '';
                  this.$rootScope.newBook.contact = '';
                  this.cancel();
                self.Upload.upload({
                  url: '/api/books/set',
                  method: 'POST',
                  data: mynewbook,
                  file: files
                }).then(function (resp) {
                    self.$rootScope.books.push(resp.data.data);
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

export const BooksbankComponent = {
    templateUrl: './views/app/components/booksbank/booksbank.component.html',
    controller: BooksbankController,
    controllerAs: 'vm',
    bindings: {}
}


