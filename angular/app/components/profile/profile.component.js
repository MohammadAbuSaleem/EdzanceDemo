class ProfileController {
    constructor(Post,moment,$state,$timeout,$stateParams,$scope,$rootScope,API,Upload,screenSize) {
        'ngInject';

        let navSideBar = this;
        let _self = this;
        this.API = API;
        this.scope = $scope;
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.stateParams = $stateParams;
        $rootScope.prouser = [];
        this.userData = [];
        this.scope.Upload = Upload;
        this.Upload = Upload;
        $rootScope.itsme = false;
        this.rscope = $rootScope;
        this.counter = 0;
        //crop flag
        this.scope.showcrop = false;
        this.scope.showcovercrop = false;
        this.scope.myImage = '';
        this.scope.myCoverImage = '';
        this.scope.myCroppedImage = '';
        this.scope.myCroppedCover = '';
        this.scope.file = '';
        this.scope.canenter = false;
        this.Post = Post;
        this.Post.setSection('profile');
        API.all('profile/header/' + $stateParams.id).get('')
            .then((response) => {
                if(response.data.message == 'not_exists_user'){
                    this.rscope.pageTitle = 'إدزانس';
                    $state.go('app.otherwise');
                    this.scope.canenter = false;
                }else{
                    this.rscope.prodata = response.data;
                    this.rscope.pageTitle = this.rscope.prodata.name + ' | إدزانس';
                    angular.element('meta[name=Description]').attr('content', this.rscope.prodata.name + ' ' + this.rscope.prodata.last_name + ' يدرس ' + this.rscope.prodata.specialition + ' في جامعة ' + this.rscope.prodata.university + ' - ' + this.rscope.prodata.university_town);
                    angular.element('meta[name=Keywords]').attr('content', this.rscope.prodata.name + ' ' + this.rscope.prodata.last_name);
                    this.scope.canenter = true;
                }
            }, (response) => {
                this.rscope.pageTitle = 'إدزانس';
                $state.go('app.otherwise');
                this.scope.canenter = false;
            });
        this.$scope = $scope;
        var handleFileSelect = function(evt) {
            $scope.showcrop = true;
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function(evt) {
                $scope.$apply(function($scope) {
                    $scope.myImage = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
            this.scope = $scope;
        };
        angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);
        //cover
        $scope.myCoverImage = '';
        $scope.myCroppedCover = '';
        var handleCoverSelect = function(evt) {
            $scope.showcovercrop = true;
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function(evt) {
                $scope.$apply(function($scope) {
                    $scope.myCoverImage = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#coverInput')).on('change', handleCoverSelect);
        //
        $rootScope.scope = $scope;
        this.rscope.sSize = true;
        if (screenSize.is('xs, sm')) {
            this.rscope.sSize = false;
        }
    }
    changeavatar() {
        var data = {
            string_file: this.scope.myCroppedImage,
            id: this.scope.id
        };
        this.API.all('profile/changeavatar').post(data).then((response) => {
            location.reload();
            this.scope.showcrop = false;
        });
    }
    watch(file) {
        this.upload(this.scope.files);
    }
    watch() {
        if (this.scope.file != null) {
            this.scope.files = [this.scope.file];
        }
    }
    // upload(files, $timeout, $scope) {
    //     this.Upload.upload({
    //         url: 'api/me/upload-file/profile_cover',
    //         method: 'POST',
    //         file: files,
    //         data: {
    //             username: this.username,
    //             file: files
    //         }
    //     }).then(function(resp, $scope) {
    //     }, null, function(evt, $scope) {
    //         var progressPercentage = parseInt(100.0 *
    //             evt.loaded / evt.total);
    //         logs = 'progress: ' + progressPercentage +
    //             '% ' + evt.config.data.file.name + '\n';
    //     });
    // };
    changecover() {
        var data = {
            string_file: this.scope.myCroppedCover,
            id: this.scope.id
        };
        this.API.all('profile/changecover').post(data).then((response) => {
            this.rscope.prodata.showcase = this.scope.myCroppedCover;
            this.$rootScope.me.showcase = this.scope.myCroppedCover;
            this.scope.showcovercrop = false;
            this.scope.myCoverImage = '';
        });
    }
    $onInit() {}
}
export const ProfileComponent = {
    templateUrl: './views/app/components/profile/profile.component.html',
    controller: ProfileController,
    controllerAs: 'pro',
    bindings: {}
}