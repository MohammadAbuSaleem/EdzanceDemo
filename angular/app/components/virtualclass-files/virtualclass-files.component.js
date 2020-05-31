class VirtualclassFilesController {
    constructor(Post, moment, $stateParams, $scope, $rootScope, ContextService, API, $interval, $uibModal, $log, Upload, $timeout, $document, $state) {
        'ngInject'; 
        angular.element('html').scrollTop(0);     
        this.$uibModal = $uibModal
        this.$log = $log
        this.$scope = $scope 
        this.$state = $state
        this.items = ['item1', 'item2', 'item3']
        this.animationsEnabled = true
        $rootScope.dat = [];
        $scope.uibModal = $uibModal;
        this.rootScope = $rootScope;
        this.API = API;
        this.stateParams = $stateParams;
        this.interval = $interval;
        this.uibModal = $uibModal;
        this.Upload = Upload;
        this.log = $log; 
        this.timeout = $timeout;
        $scope.logs = '';
        this.scope = $scope
        this.scope.moment = moment;
        this.scope.file = []
        this.Upload = Upload
        this.logs = ''
        this.scope.hasFile = false
        var timeout = $timeout
        this.rootScope.mobileHeader = false

        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
        var Post = this.Post;
        this.Post.setSection('vc');
        this.Post.seturl('class/get/'+ $stateParams.classid +'/files/all' );
        this.Post.setediturl('class/edit/'+ $stateParams.classid +'/files');
        this.Post.setdeleteurl('class/delete/'+ $stateParams.classid +'/files');
        this.Post.setsubmiturl('class/set/'+ $stateParams.classid + '/file');
        this.Post.setuploadurl('api/me/upload-file/vc_file');
        this.Post.setCommentDeleteUrl('social/delete/vc/comment');
        this.Post.setskip(0);
        this.Post.settype('file');
        this.Post.settake(2);
        this.Post.getPost().then(function(response){
            $scope.dat=Post.getPostat();
            $scope.nopost = Post.getnopost();
            $rootScope.busy = false;
        });
        this.Post.settake(5);
        this.scope = $scope;
        //this.scope.dat = this.Post.getPostat();
        var con = this ;
        $scope.getPost = function() {
            Post.getPost().then(function(response){
              $scope.dat=Post.getPostat();
              $scope.nopost = Post.getnopost();
              $rootScope.busy = false;
            });
        }
        $scope.exprissionUser = function() {
            Post.getPost();
            $scope.exprissions = Post.getExprissions();
        }
        $scope.deleteNode = function(node, deleteType) {
            Post.deleteNode(node,deleteType,$scope.correct);
            $scope.dat = Post.getPostat();
        }
        $scope.permission = function(post) {
            return ($rootScope.vc.permissions.class.indexOf(post) >= 0);
        }
        $scope.postPermission = function(permission,post,me) {
            return (($rootScope.vc.permissions.class.indexOf(permission) >= 0 && post ==me) || ($rootScope.me.id == $rootScope.vc.instructor));
        }
        $scope.commentPermission = function(permission,comment,me,post) {
            return (($rootScope.vc.permissions.class.indexOf(permission) >= 0 && (comment == me || post == me)) || ($rootScope.me.id == $rootScope.vc.instructor));
        }
        $scope.submitComment = function($id, $index, $body, place) {
            Post.submitComment($id, $index, this, $body, place);
            this.comment[$id] = "";
            if (this.comment2 != undefined)
                this.comment2[$id] = "";
            $scope.dat = Post.getPostat();
        }
        $scope.updateData = function(data, id) {
            Post.updateData(data, id);
        }
        $scope.correct = function(response, postat, self) {
            $scope.nopost = Post.getnopost();
            $scope.dat = Post.getPostat();
            //if(self){
                //con.modalOpen();
            //}
        }
        $scope.addfile = function(form, file, self) {
            console.log(file);
            if (form.$valid) {
                $rootScope.newPost['class_id'] = $stateParams.classid;
                Post.NewNode($rootScope.newPost, $scope.correct, true, file, self);
                form.$submitted = false;
                con.modalOpen();
            }
        }
    }
    // watch(file) {
    //     this.upload(this.scope.file);
    // }
    $onInit() {
    }
    modalOpen(size) {
        let $uibModal = this.$uibModal
        let $scope = this.$scope
        let $log = this.$log
        let items = this.items
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'fileModal.html',
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

    modalcontroller($scope, $uibModalInstance, items) {
        'ngInject'

        this.items = items

        $scope.selected = {
            item: items[0]
        }

        this.ok = () => {
            $uibModalInstance.close($scope.selected.item)
        }

        this.cancel = () => {
            $uibModalInstance.dismiss('cancel')
        }
    }

    toggleModalAnimation() {
        this.animationsEnabled = !this.animationsEnabled
    }

    swalConfirm() {
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
            closeOnConfirm: false
        }, () => {
            swal('Deleted!', 'Your imaginary file has been deleted.', 'success')
        })
    }

    swalBasic() {
        swal("Here's a message!", "It's pretty, isn't it?")
    }

    swalSuccess() {
        swal('Good job!', 'You clicked the button!', 'success')
    }

    swalDecide() {
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel plx!',
            closeOnConfirm: false,
            closeOnCancel: false
        }, (isConfirm) => {
            if (isConfirm) {
                swal('Deleted!', 'Your imaginary file has been deleted.', 'success')
            } else {
                swal('Cancelled', 'Your imaginary file is safe :)', 'error')
            }
        })
    }

    swalImage() {
        swal({
            title: 'Sweet!',
            text: "Here's a custom image.",
            imageUrl: '/img/avatar5.png'
        })
    }

    swalHtmlMessage() {
        swal({
            title: 'HTML <small>Title</small>!',
            text: 'A custom <span style="color:#F8BB86">html<span> message.',
            html: true
        })
    }

    swalAutoClose() {
        swal({
            title: 'Auto close alert!',
            text: 'I will close in 2 seconds.',
            timer: 2000,
            showConfirmButton: false
        })
    }

    swalPrompt() {
        swal({
            title: 'An input!',
            text: 'Write something interesting:',
            type: 'input',
            showCancelButton: true,
            closeOnConfirm: false,
            animation: 'slide-from-top',
            inputPlaceholder: 'Write something'
        }, (inputValue) => {
            if (inputValue === false)
                return false
            if (inputValue === '') {
                swal.showInputError('You need to write something!')
                return false
            }
            swal('Nice!', 'You wrote: ' + inputValue, 'success')
        })
    }

    swalAjax() {
        let API = this.API

        swal({
            title: 'Ajax request example',
            text: 'Submit to run ajax request',
            type: 'info',
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        }, () => {
            let UserData = API.service('me', API.all('users'))

            UserData.one().get()
                .then((response) => {
                    let userdata = response.plain()
                    swal('Your Name is: ' + userdata.data.name)
                })
        })
    }
}
export const VirtualclassFilesComponent = {
    templateUrl: './views/app/components/virtualclass-files/virtualclass-files.component.html',
    controller: VirtualclassFilesController,
    controllerAs: 'vcfl',
    bindings: {}
}