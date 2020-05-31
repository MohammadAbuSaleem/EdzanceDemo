class GroupMembersController{
    constructor($scope,$stateParams,$rootScope,API,$state,Post,$timeout,moment,Upload,$log,toastr){
        'ngInject';
        this.$scope = $scope;
        this.stateParams = $stateParams;
        this.rootScope = $rootScope;
        this.API = API;
        this.$state = $state;
        this.toastr = toastr;
        this.Post = new Post.constructor($rootScope, API,$timeout,moment,Upload,$log);
        var Post = this.Post;
        this.Post.seturl('gr/users/' + this.stateParams.groupid);
        this.Post.setskip(0);
        this.Post.settake(5);
        //this.Post.getPost(); 
        this.Post.getPost().then(function(response){
            $scope.dat=Post.getPostat();
            $scope.nopost = Post.getnopost();
            $rootScope.busy = false;
        });
        //this.$scope.dat=this.Post.getPostat();
        this.memberloadmore = false;
        this.$scope.groupModirator = [];
        $scope.modirator = [];
        $scope.postat = [];
       API.all('gr/modirator/' + this.stateParams.groupid).get('').then((response) => {
            this.$scope.groupModirator = response.data;
            if($scope.groupModirator == 'no Modirator') {
                $scope.groupModirator = [];
            }
            this.$scope.groupModirator.map(function(item,key){
              $scope.modirator[item.id] = key;
            });
        });
        $scope.getPost = function() { 
            this.member = $scope.dat;
            Post.getPost().then(function(response){
                $scope.dat=Post.getPostat();
                $scope.nopost = Post.getnopost();
                $rootScope.busy = false;
                if(this.member.length == $scope.dat.length){
                    this.memberloadmore = true;
                } 
                $scope.dat.map(function(item,key){
                  $scope.postat[item.id] = key;
                });
            });
        }
      
        $scope.join = function(userId,status,index,location) {
            if($scope.groupModirator == 'no Modirator') {
                $scope.groupModirator = [];
            }
            $scope.dat.map(function(item,key){
              $scope.postat[item.id] = key;
            });
             $scope.groupModirator.map(function(item,key){
              $scope.modirator[item.id] = key;
            });
            
            API.all('gr/add-to-group/' + $stateParams.groupid + '/' + userId + '/' + status).get('').then((response) => {
                toastr.success(response.data.add.message);
                if(status == 4){
                    if($scope.groupModirator == 'no Modirator') {
                        $scope.groupModirator = [];
                    }

                    $scope.groupModirator.push(response.data.add);
                    $scope.dat.splice($scope.postat[userId],1);
                    if(!$scope.dat){
                        $scope.nopost = 3;
                    }
                } else if(status == 1){
                    if(location == 1){ 
                        $scope.dat.push(response.data.add);
                    }else if(location == 2){
                        $scope.groupModirator.splice($scope.modirator[userId],1);
                        $scope.nopost = 1;
                        $scope.dat.push(response.data.add);
                    }
                } else if(status == 2){
                    if(location == 2){
                        $scope.groupModirator.splice($scope.modirator[userId],1);
                    }else if(location == 3){
                        $scope.dat.splice($scope.postat[userId],1);
                       if(!$scope.dat){
                            $scope.nopost = 3;
                        }
                    }
                }
                this.query = '';
            });
        }
        // $scope.membersearch = function(val) { 
        //     API.all('gr/search-user/' + $stateParams.groupid + '/' +  val).get('').then((response) => {
        //     $scope.b = [];
        //     response.data.u.map(function(item){
        //         $scope.b.push(item);
        //     });
        //     },(response) =>{
        //         $scope.b = response.data;
        //     }); 
        //     return $scope.b;
        // }
    }
    $onInit(){
    }
}

export const GroupMembersComponent = {
    templateUrl: './views/app/components/group-members/group-members.component.html',
    controller: GroupMembersController,
    controllerAs: 'vm',
    bindings: {}
}


