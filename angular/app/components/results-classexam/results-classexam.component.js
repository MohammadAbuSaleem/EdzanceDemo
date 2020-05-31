class ResultsClassexamController{
    constructor(Post,moment,$stateParams,$scope,$rootScope,API,$log,Upload,$timeout,$state){
        'ngInject';
        this.$scope = $scope;
        this.$scope.moment = moment;
        this.Post = new Post.constructor($rootScope, API,$timeout,moment,Upload,$log);
        var Post = this.Post;
        this.Post.seturl('solo/exam/'+$stateParams.resultsid);
        this.Post.setediturl('vc/editexam');
        this.Post.setsubmiturl('wvc/exam');
        this.Post.setdeleteurl('class/delete/'+ $stateParams.resultsid +'/exam');
        this.Post.setCommentDeleteUrl('social/delete/vc/comment');
        this.Post.setskip(0);
        this.Post.settype('exam');
        this.Post.setSection('vc');
        this.Post.settake(1);
        this.Post.getPost().then(function(response){
            $scope.dat=Post.getPostat();
            $scope.nopost = Post.getnopost();
            $rootScope.busy = false;
        });
        this.scope = $scope;

        $scope.getPost = function() {
            if($scope.dat.length == 0){
                Post.getPost().then(function(response){
                    $scope.dat=Post.getPostat();
                    $scope.nopost = Post.getnopost();
                    $rootScope.busy = false;
                    $scope.dat.map(function(item){
                        item.exam_date = new Date(item.exam_date);
                        item.exam_time = new Date(item.exam_date);
                    }) 
                    if($scope.nopost == 3){
                        $state.go('app.otherwise');
                    }
                });
            }
        }
        $scope.deleteNode = function(node,deleteType) {
           Post.deleteNode(node,deleteType,$scope.callback);
           // $scope.dat = Post.getPostat();
        }
        $scope.permission = function(post) {
            return ($rootScope.me.permission.social.indexOf(post) >= 0);
        }
        $scope.postPermission = function(permission,post,me) {
            return (($rootScope.me.permission.social.indexOf(permission) >= 0 && post == me));
        }
        $scope.commentPermission = function(permission,comment,me,post) {
            return ($rootScope.me.permission.social.indexOf(permission) >= 0 && (comment == me || post == me));
        }
        $scope.submitComment = function($id,$index,$body,place) {
            Post.submitComment($id,$index,this,$body,'exams');
        }
        $scope.updateData = function(data ,id) {
            Post.updateData(data ,id);
        }
        //
    }

    $onInit(){
    }
}

export const ResultsClassexamComponent = {
    templateUrl: './views/app/components/results-classexam/results-classexam.component.html',
    controller: ResultsClassexamController,
    controllerAs: 'vm',
    bindings: {}
}


