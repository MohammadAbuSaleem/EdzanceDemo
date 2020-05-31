class VirtualclassExamController{
    constructor(Post,moment,$stateParams,$scope,$rootScope, ContextService,API,AclService,$interval,$uibModal,$log,Upload,$timeout){
        'ngInject';
      let navSideBar = this
      this.stateParams = $stateParams;
      if ($rootScope.newPost == undefined)
          $rootScope.newPost = new Object();
      $rootScope.newPost.mytime = new Date(); 
      $rootScope.newPost.mytime.setHours(0);
      $rootScope.newPost.mytime.setMinutes(0); 
      angular.element('html').scrollTop(0); 
      $scope.hstep = 1;
      $scope.mstep = 1;
      this.$uibModal = $uibModal
      this.$log = $log
      this.$scope = $scope
      this.items = ['item1', 'item2', 'item3']
      $rootScope.dat = [];
      this.file = []
      this.can = AclService.can
      $scope.post_enabled = true;
      $scope.comment_enabled = true;
      $scope.post_delete = true;
      this.rootScope = $rootScope;
      this.API = API
      this.interval = $interval;
      this.uibModal = $uibModal;
      this.log = $log;
      this.timeout = $timeout;
      $scope.logs=''
      this.scope = $scope
      this.$rootScope = $rootScope
      this.scope.moment = moment;
      this.$rootScope.dat = []
      this.scope.files =[]
      this.Upload = Upload
      this.logs = ''
      this.addExam = false
      this.noExam = false
      this.$rootScope.newPost.mytime = $rootScope.newPost.mytime;
      var timeout = $timeout
      this.rootScope.mobileHeader = false
      $scope.changed = function (mytime) {
        this.$rootScope.newPost.mytime.setHours(mytime.getHours() );
        this.$rootScope.newPost.mytime.setMinutes( mytime.getMinutes() )
      };
      this.scope = $scope
      this.Post = new Post.constructor($rootScope, this.API,$timeout,moment,Upload,$log);
      var Post = this.Post;
      this.Post.setSection('vc');
      this.Post.seturl('class/get/' + $stateParams.classid + '/exam/all' );
      this.Post.setediturl('class/edit/'+ $stateParams.classid +'/exam');
      this.Post.setdeleteurl('class/delete/'+ $stateParams.classid +'/exam');
      this.Post.setsubmiturl('class/set/' + $stateParams.classid + '/exam');
      this.Post.setCommentDeleteUrl('social/delete/vc/comment');
      this.Post.setskip(0);
      this.Post.settype('exam');
      this.Post.settake(2); 
      this.Post.getPost().then(function(response){
          $scope.dat=Post.getPostat();
          $scope.nopost = Post.getnopost();
          $rootScope.busy = false;
      });
      this.Post.settake(5);
      this.scope = $scope;
      //this.scope.dat=this.Post.getPostat();
      Date.prototype.yyyymmdd = function() {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();
        return [this.getFullYear(),
                (mm>9 ? '' : '0') + mm,
                (dd>9 ? '' : '0') + dd
               ].join('-');
      };

      $scope.getPost = function() {          
        Post.getPost().then(function(response){
          $scope.dat=Post.getPostat();
          $scope.nopost = Post.getnopost();
          $rootScope.busy = false;
          $scope.dat.map(function(item){
            item.exam_date = new Date(item.exam_date);
            item.exam_time = new Date(item.exam_time);
          })
        });
      }
      $scope.deleteNode = function(node,deleteType) {
       Post.deleteNode(node,deleteType,$scope.callback);
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
      $scope.submitComment = function($id,$index,$body,place) {
        Post.submitComment($id,$index,this,$body,'exams');
      }
      $scope.updateData = function(data ,id) {
        data.exam_date = data.exam_date / 1000;
        data.exam_time = data.exam_time / 1000;
        Post.updateData(data ,id);
      }
      $scope.correct = function(response,postat) {
          $scope.dat = postat;
          $scope.dat.map(function(item){
            item.exam_date = new Date(item.exam_date);
             item.exam_time = new Date(item.exam_date);
          });
          $scope.callback();
      } 
      $scope.callback = function() {
        $scope.nopost = Post.getnopost();
      } 
      $scope.addexam = function(form,self) {
        if(form.$valid){
          // var date =  $rootScope.newPost.date;
          //  var mytime =  $rootScope.newPost.mytime;
          $rootScope.newPost.date.setHours($rootScope.newPost.mytime.getHours());
          $rootScope.newPost.date.setMinutes( $rootScope.newPost.mytime.getMinutes() );
          $rootScope.newPost.date = $rootScope.newPost.date / 1000;
          $rootScope.newPost.mytime = $rootScope.newPost.mytime / 1000;
          // $rootScope.newPost.mytime = $rootScope.newPost.mytime / 1000;
          $rootScope.newPost['class_id'] = $stateParams.classid;
          Post.NewNode($rootScope.newPost,$scope.correct,false,' ');
          form.$submitted = false;
          self.modalOpen();
        //  $scope.dat = Post.getPostat();
        } 
      }
        $scope.types = [
          {value:'first' , text: 'الأول'},
          {value:'second' , text: 'الثاني'},
          {value:'final' , text: 'النهائي'},
          {value:'quiz' , text: 'قصير'},
          {value:'mackup' , text: 'تكميلي'}
        ];  
    }
      changed (mytime) {
        this.$rootScope.newPost.mytime.setHours(mytime.getHours() );
        this.$rootScope.newPost.mytime.setMinutes( mytime.getMinutes() );
      };
      update() {
          this.$rootScope.newPost.mytime.setFullYear(this.$rootScope.newPost.date.getFullYear());
          this.$rootScope.newPost.mytime.setDate( this.$rootScope.newPost.date.getDate() );
          this.$rootScope.newPost.mytime.setMonth(this.$rootScope.newPost.date.getMonth());
    };
      editableForm($data,$id){
        $data['id']= $id;
        var date = new Date();
        date.setFullYear($data['exam_date'].getFullYear());
        date.setDate($data['exam_date'].getDate() );
        date.setMonth($data['exam_date'].getMonth());
        date.setHours($data['exam_time'].getHours()+2);
        date.setMinutes($data['exam_time'].getMinutes());
        $data['exam_date'] = date;
        console.log($data);
        this.API.all('vc/editexam').post($data).then((response) => {
         //      this.scope.inf = response.data.user
         //      this.scope.inf.country = response.data.user.student_info.country
         //      var d = new Date(response.data.user.DOB)
         // this.scope.inf.DOB= d;
      // console.log(response)
         },(response) =>{
            //console.log("There was an error saving !! Not saved");
        });
    }
    exam (isValid,classid,_self) {
      if (isValid && ( this.scope.mytime.getHours()!=0 ||  this.scope.mytime.getMinutes()!=0 ) ) { 
      if(this.addExam == false){
        this.addExam = true
      var mynewexam = {
        id:  classid,
        date: this.scope.mytime,
        type: this.type,
        hall: this.hall,
      }
      this.API.all('vc/exam').post(mynewexam).then((response) => {
         console.log(this.scope);
         response.data.exam.exam_date = new Date(response.data.exam.exam_date);
        response.data.exam.exam_time = new Date(response.data.exam.exam_date)
        this.$rootScope.dat.push(response.data.exam);
        this.date = false;
        
        _self.scope.mytime.setHours(0);
        _self.scope.mytime.setMinutes(0);
        _self.scope.mytime = false;
        _self.modalOpen();
        this.type = ''
        this.hall = ''
        this.noExam = false
         this.examsubmit = false
      },(response) =>{
      //console.log("There was an error in deleting");
       $scope.post_delete=true;
       this.addExam = false
      // console.log($scope.post_delete);
      });
      }
      }else{
        this.examsubmit = true
      }
    }
    modalOpen (size) {
          let $uibModal = this.$uibModal
          let $scope = this.$scope
          let $log = this.$log
          let items = this.items

          var modalInstance = $uibModal.open({
            animation: this.animationsEnabled,
            templateUrl: 'examModal.html',
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
      modalcontroller ($scope, $uibModalInstance, items) {
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

    toggleModalAnimation () {
      this.animationsEnabled = !this.animationsEnabled
    }
    $onInit(){
    }
}

export const VirtualclassExamComponent = {
    templateUrl: './views/app/components/virtualclass-exam/virtualclass-exam.component.html',
    controller: VirtualclassExamController,
    controllerAs: 'vmex',
    bindings: {}
}


