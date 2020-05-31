class VirtualclassesArchivedController{
    constructor($scope,$rootScope,API,$stateParams,Post,$timeout,moment,Upload,$log){
        'ngInject';
        //
        $rootScope.pageTitle = 'المواد الدراسية';
        angular.element('meta[name=Keywords]').attr('content', 'المواد الدراسية ادزنس');
        angular.element('meta[name=Description]').attr('content', 'تواصل مع مدرسيك وزملائك , احصل على ملفاتك الدراسية و على تنبيهات امتحانات , شارك الطلاب الجامعيين آرائك ونقاشاتك .');
        angular.element('html').scrollTop(0);
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.Post = new Post.constructor($rootScope, API,$timeout,moment,Upload,$log);
        var Post = this.Post;
        this.Post.seturl('home/archived');
        this.Post.setskip(0);
        this.Post.settake(4);
        angular.element('html').scrollTop(0);
        this.Post.getPost().then(function(response){
            $scope.archived=Post.getPostat();
            $scope.nopost = Post.getnopost();
            $rootScope.busy = false;
        });
        this.$scope = $scope;
        //this.$scope.dat=this.Post.getPostat();
        this.$scope = $scope;
        $scope.getPost = function() {
          Post.getPost().then(function(response){
            $scope.archived = Post.getPostat();
            $scope.nopost = Post.getnopost();
            $rootScope.busy = false;
          });
        }
        $scope.callback = function() {
           $scope.nopost = Post.getnopost();
        }
    }

    $onInit(){
    }
}

export const VirtualclassesArchivedComponent = {
    templateUrl: './views/app/components/virtualclasses-archived/virtualclasses-archived.component.html',
    controller: VirtualclassesArchivedController,
    controllerAs: 'vm',
    bindings: {}
}


