class ResultsClasshomeworkController{
    constructor(Post, moment, $stateParams, $scope, $rootScope, API, $log, Upload, $timeout, $state){
        'ngInject';
        this.$scope = $scope;
        this.$scope.moment = moment;
        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
        var Post = this.Post;
        this.Post.seturl('solo/homework/' + $stateParams.resultsid);
        this.Post.setediturl('vc/edithomework');
        this.Post.setdeleteurl('class/delete/'+ $stateParams.resultsid +'/homeWork');
        this.Post.setCommentDeleteUrl('social/delete/vc/comment');
        this.Post.setskip(0);
        this.Post.setSection('vc');
        this.Post.settype('homework');
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
                    $scope.dat.map(function(item) {
                        item.handover = new Date(item.handover);
                    })
                    if($scope.nopost == 3){
                        $state.go('app.otherwise');
                    }
                });
                
            }
        }
        $scope.deleteNode = function(node, deleteType) {
            Post.deleteNode(node, deleteType, $scope.callback);
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
        $scope.submitComment = function($id, $index, $body, place) {
            Post.submitComment($id, $index, this, $body, place);
            this.comment[$id] = "";
            if (this.comment2 != undefined)
                this.comment2[$id] = "";
            // $scope.dat = Post.getPostat();
        }
        $scope.updateData = function(data, id) {
            Post.updateData(data, id);
        }
        //
    } 

    $onInit(){
    }
}

export const ResultsClasshomeworkComponent = {
    templateUrl: './views/app/components/results-classhomework/results-classhomework.component.html',
    controller: ResultsClasshomeworkController,
    controllerAs: 'vm',
    bindings: {}
}


