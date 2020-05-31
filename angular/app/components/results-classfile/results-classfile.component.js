class ResultsClassfileController{
    constructor(Post, moment, $stateParams, $scope, $rootScope, ContextService, API, $interval, $uibModal, $log, Upload, $timeout, $document, $state){
        'ngInject';
        this.$scope = $scope;
        this.$scope.moment = moment;
        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
        var Post = this.Post;
        this.Post.seturl('solo/files/' + $stateParams.resultsid);
        this.Post.setediturl('wvc/editfile');
        this.Post.setsubmiturl('wvc/files');
        this.Post.setuploadurl('api/me/upload-file/vc_file');
        this.Post.setdeleteurl('class/delete/'+ $stateParams.resultsid +'/files');
        this.Post.setCommentDeleteUrl('social/delete/vc/comment');
        this.Post.setskip(0);
        this.Post.setSection('vc');
        this.Post.settype('files');
        this.Post.settake(1);
        this.Post.getPost().then(function(response){
            $scope.dat=Post.getPostat();
            $scope.nopost = Post.getnopost();
            $rootScope.busy = false;
        });
        this.scope = $scope;
        // 
        $scope.getPost = function() {
            if($scope.dat.length == 0){
                //$scope.nopost = 1;
                Post.getPost().then(function(response){
                    $scope.dat=Post.getPostat();
                    $scope.nopost = Post.getnopost();
                    $rootScope.busy = false;
                    if($scope.nopost == 3){
                        $state.go('app.otherwise');
                    }
                });
            }
        }
        $scope.deleteNode = function(node, parent, deleteType) {
            Post.deleteNode(node,deleteType,$scope.correct);
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

    }

    $onInit(){
    }
}

export const ResultsClassfileComponent = {
    templateUrl: './views/app/components/results-classfile/results-classfile.component.html',
    controller: ResultsClassfileController,
    controllerAs: 'vm',
    bindings: {}
}


