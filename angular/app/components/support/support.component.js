class SupportController{
    constructor(API,Post,$rootScope,moment,Upload,$scope,$timeout,$log){
        'ngInject';
        //this.$http = $http;
        this.$rootScope = $rootScope;
        this.$rootScope.pageTitle = "الدعم";
        this.$scope = $scope;
        this.timeout = $timeout;
        this.API = API; 
        this.Upload = Upload
        this.$scope.moment = moment;
        this.files =[]
        this.Post = new Post.constructor($rootScope, API,$timeout,moment,Upload);
        var Post = this.Post;
        this.Post.seturl('home/contact-us-messages');
        this.Post.setskip(0);
        this.Post.settake(5);
        //console.log('$rootScope.newPost');
        this.Post.getPost().then(function(response){
            $scope.dat=Post.getPostat();
            $scope.nopost = Post.getnopost();
            $rootScope.busy = false;
        });
        this.Post.setsubmiturl('home/contact-us');
        this.Post.setuploadurl('api/wvc/uploadhw');
        this.Post.settype('support');
        this.scope = $scope;

        $scope.getPost = function() {
            Post.seturl('home/contact-us-messages');
            Post.getPost().then(function(response){
              $scope.dat=Post.getPostat();
              $scope.nopost = Post.getnopost();
              $rootScope.busy = false;
            });
        }
         $scope.correct = function(response,postat) {
          $scope.dat = Post.getPostat();
          $scope.nopost = Post.getnopost();
        } 
        $scope.addTicket = function(form,files,self) {
            var hasFile = false;
            if(form.$valid){ 
              Post.NewNode($rootScope.newPost,$scope.correct,hasFile,files);
              form.$submitted = false;
            }
        } 
    }
    $onInit(){
    }
}

export const SupportComponent = {
    templateUrl: './views/app/components/support/support.component.html',
    controller: SupportController,
    controllerAs: 'sup',
    bindings: {}
}


