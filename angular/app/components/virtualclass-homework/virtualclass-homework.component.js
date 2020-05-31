class VirtualclassHomeworkController {
    constructor(Post, moment, $stateParams, $scope, $rootScope, ContextService, API, AclService, $interval, $uibModal, $log, Upload, $timeout) {
        'ngInject';

      let navSideBar = this
      this.$uibModal = $uibModal
      this.$log = $log
      this.$scope = $scope
      this.items = ['item1', 'item2', 'item3']
      $rootScope.dat = [];
      this.stateParams = $stateParams;
      this.file = []
      this.can = AclService.can
      $scope.user= []
      this.rootScope = $rootScope;
      this.API = API
      this.interval = $interval;
      this.uibModal = $uibModal;
      angular.element('html').scrollTop(0); 
      this.log = $log;
      this.timeout = $timeout;
      $scope.logs=''
      this.scope = $scope
      this.scope.moment = moment;
      this.scope.comment=[]
      this.scope.nohome = false
      this.files =[]
      this.Upload = Upload
      this.logs = ''
      var timeout = $timeout
      // var _self = this ;
      this.rootScope.mobileHeader = false
      this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
      var Post = this.Post;
      this.Post.setSection('vc');
      this.Post.seturl('class/get/' + $stateParams.classid + '/homeWork/all' );
      this.Post.setediturl('class/edit/'+ $stateParams.classid +'/homeWork');
      this.Post.setdeleteurl('class/delete/'+ $stateParams.classid +'/homeWork');
      //this.Post.setediturl('vc/edithomework');
      this.Post.setsubmiturl('class/set/' + $stateParams.classid + '/homeWork');
      this.Post.setuploadurl('api/me/upload-file/vc_homework_file');
      this.Post.setCommentDeleteUrl('social/delete/vc/comment');
      this.Post.setskip(0);
      this.Post.settype('homework');
      this.Post.settake(2);
      this.Post.getPost().then(function(response){
          $scope.dat=Post.getPostat();
          $scope.nopost = Post.getnopost();
          $rootScope.busy = false;
      });
      this.Post.settake(5);
      this.scope = $scope;
      //this.scope.dat = this.Post.getPostat();
      var con = this;
        $scope.getPost = function() {
          Post.getPost().then(function(response){
            $scope.dat=Post.getPostat();
            $scope.nopost = Post.getnopost();
            $rootScope.busy = false;
            $scope.dat.map(function(item) {
                item.handover = new Date(item.handover);
            })
          });
        }
        $scope.deleteNode = function(node, deleteType) {
            Post.deleteNode(node, deleteType, $scope.callback);
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
            data.handover = data.handover/1000;
            Post.updateData(data, id); 
        }
        $scope.correct = function(response, postat, self) {
            $scope.dat = Post.getPostat();
            $scope.dat.map(function(item) {
                item.handover = new Date(item.handover);
            });
            $scope.callback(self);
        }
        $scope.callback = function(self) {
            $scope.nopost = Post.getnopost();
        }
        $scope.addfile = function(form, files, self) {
            if (form.$valid) {
                $rootScope.newPost['class_id'] = $stateParams.classid;
                $rootScope.newPost['hw_date'] = $rootScope.newPost['hw_date']/1000;
                Post.NewNode($rootScope.newPost, $scope.correct, true, files, self);
                form.$submitted = false;
                con.modalOpen();
            }
        }
        $scope.type = [{
                value: 'presentation',
                text: 'عرض تقديمي'
            },
            {
                value: 'homework',
                text: 'واجب بيتي'
            },
            {
                value: 'project',
                text: 'مشروع'
            },
            {
                value: 'report',
                text: 'تقرير'
            },
            {
                value: 'research',
                text: 'بحث'
            }
        ];
        // if ($rootScope.vc.length==0) {
        // API.all('vc/class/' + $stateParams.classid).get('')
        //     .then((response) => {
        //         $rootScope.vc = response.data;
        //         $scope.student = response.data.vcuser;
        //     }, (response) => {
        //         console.log('VirtualclassHomeworkController:' + response.data.errors.message["0"])
        //     });
    }
    modalOpen(size) {
        let $uibModal = this.$uibModal
        let $scope = this.$scope
        let $log = this.$log
        let items = this.items

        var modalInstance = $uibModal.open({
            animation: this.animationsEnabled,
            templateUrl: 'homeworkModal.html',
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

    $onInit() {}
}
export const VirtualclassHomeworkComponent = {
    templateUrl: './views/app/components/virtualclass-homework/virtualclass-homework.component.html',
    controller: VirtualclassHomeworkController,
    controllerAs: 'vchw',
    bindings: {}
}