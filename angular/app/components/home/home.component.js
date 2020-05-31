class HomeController {
    constructor(Post, moment, $sce, $scope, $stateParams, $state, $rootScope, ContextService, API, $interval, AclService, $uibModal, $log, $timeout, Upload, $q, screenSize) {
        'ngInject';
        $state.current.show_loadmore = true
        $scope.mobile = screenSize.on('xs', function(match) {
            $scope.mobile = match;
        });
        $scope.desktop = screenSize.on('sm, md, lg', function(match) {
            $scope.desktop = match;
        }); 
        $rootScope.liveUrlFlag = false; 

        angular.element('html').scrollTop(0);
        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
        var Post = this.Post;
        this.Post.seturl('home/post'); 
        this.Post.setediturl('social/edit/home/post');
        this.Post.setskip(0);
        this.Post.settype('post'); 
        this.Post.setsubmiturl('social/set/home/post');
        this.Post.setimageurl('social/set/home/post');
        this.Post.settake(2);
        this.Post.setSection('home');
        this.Post.setdeleteurl('social/delete/home/post');
        this.Post.setCommentDeleteUrl('social/delete/home/comment');
        $scope.swiper = {}; 
        $scope.friendSliderFlag = false;
        this.Post.getPost().then(function(response) {
            $scope.dat = Post.getPostat();
            $scope.nopost = Post.getnopost();
            API.all('home/suggest').get('').then((response) => {
                $scope.univ = response.data;
                $scope.univ.map(function(item, key) {});
                $scope.friendSliderFlag = true;
            });
            $rootScope.busy = false;
        });
        this.Post.settake(5);

        this.scope = $scope;
        $scope.post_enabled = true;
        $scope.comment_enabled = true;
        $scope.post_delete = true;
        $scope.interval = $interval;
        $scope.uibModal = $uibModal;
        $scope.log = $log;
        $scope.timeout = $timeout;
        $scope.Upload = Upload

        var $scope = this.scope;
        this.$state = $state;
        this.scope.moment = moment;
        this.rootScope = $rootScope;
        this.scope.univ = []
        this.comment = []
        this.scope.comment = []
        this.API = API
        this.sce = $sce
        this.timeout = $timeout
        this.q = $q
        this.Upload = Upload
        this.scope.dataPost = false
        this.stateParams = $stateParams;
        this.file = []
        this.can = AclService.can
        this.scope.files = []
        var logs = ''
        var timeout = $timeout
        var $i
        //before showing the new page data
        /////////////////////////////////////////////
        /////////////////////////////////////////////
        /////////////////////////////////////////////
        /////////////////////////////////////////////
        this.scope.post_enabled = true;
        this.scope.comment_enabled = true;
        this.scope.exprission = Post.getExprissions();
        this.scope.commentlimit = 2;
        // $scope.items = {
        //     collection: getPost()
        // }; 
        // $scope.items.collection.forEach(function(it){
        //     it.childs = getPost();
        // }); 
        /////////////////////////////////////////////
        /////////////////////////////////////////////
        /////////////////////////////////////////////
        /////////////////////////////////////////////
        $scope.getPost = function() {
            Post.getPost().then(function(response) {
                $scope.dat = Post.getPostat();
                $scope.nopost = Post.getnopost();
                $rootScope.busy = false;
            });
        } 
        $scope.exprissionUser = function($index, liker) {
            $rootScope.happyexp = 0
            $rootScope.normalexp = 0
            $rootScope.sadexp = 0
            Post.exprissionUser($index, liker);
            $scope.exprissions = Post.getExprissions();
            $timeout(function() {
                $scope.exprissions = Post.getExprissions();
            }, 1000);
        }
        $scope.exprission = function($post, $exp) {
            Post.exprission($post, $exp);
            $scope.dat = Post.getPostat();
        }
        // $scope.exprissionUser = function($index,liker) {
        //   $scope.exprissions = Post.exprissionUser($index,liker);
        // }
        $scope.deleteNode = function(node, deleteType) {
            Post.deleteNode(node, deleteType, $scope.callback);
            $scope.dat = Post.getPostat();
        }
        $scope.callback = function() {
            $scope.nopost = Post.getnopost();
        }
        $scope.permission = function(post) {
                return ($rootScope.me.permission.social.indexOf(post) >= 0);
        }
        $scope.postPermission = function(permission,post,me) {
                return ($rootScope.me.permission.social.indexOf(permission) >= 0 && post == me);
        }
        $scope.commentPermission = function(permission,comment,me,post) {
                return ($rootScope.me.permission.social.indexOf(permission) >= 0 && (comment == me || post == me));
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
        $scope.submitPost = function(files) {
            Post.submitPost(files, $stateParams.classid, this.textpost, $scope.callback);
            $scope.resetSubmit(this);
            $scope.dat = Post.getPostat();
            $scope.nopost = Post.getnopost();
        }
        $scope.resetSubmit = function(scope) {
            angular.element(".image-readed").attr("ng-src", "");
            angular.element(".image-readed").attr("src", "");
            angular.element(".readed-con").attr("style", "display: none");
            scope.files = '';
            scope.textpost = ''
            scope.live_title = '';
            scope.live_description = ''; 
            scope.live_url = '';
            scope.live_image = '';
            scope.live_title = '';
            $rootScope.posturl = '';
            $rootScope.posttitle = '';
            $rootScope.postdescription = '';
            $rootScope.postimage = '';
            scope.media = '';
            scope.showlive = 0;
            scope.closeUrl = false;
        }
        $scope.imageUpload = function(element,files) {
            if (element.$error.maxSize) {
                this.fileMaxSize = 'حجم الصورة كبير جدا';
            } else if (element.$error.pattern) {
                this.fileMaxSize = 'الرجاء ادخال ملف من نوع صوره';
            } else {
                var reader = new FileReader();
                this.fileMaxSize = 'اضغط لرفع صوره / أو قم بادراجها';
                reader.onload = $scope.imageIsLoaded;
                reader.readAsDataURL(files);
                angular.element(".readed-con").attr("style", "display: block");
            }
        }
        $scope.imageIsLoaded = function(e) {
            $scope.$apply(function() {
                $scope.imagereaded = e.target.result;
            });
        }
        $scope.removeImg = function() {
            angular.element(".image-readed").attr("ng-src", "");
            angular.element(".image-readed").attr("src", "");
            angular.element(".readed-con").attr("style", "display: none");
            this.files = '';
        }
        this.friendIndex = 0;
        $scope.$on('bottom-reached-before', function() {
            API.all('me/post/' + this.skip + '/' + this.take).get('').then((response) => {
                a = response.data;
                //  $rootScope.dat =a; 
                $rootScope.dat.push(a)
            }, (response) => {
                a = response.data;
            });
        });
        //after showing the new page data
        $scope.$on('bottom-reached-after', function() {
            // do whatever you want
        });
        this.rootScope.pageTitle = 'الصفحة الرئيسة';
        angular.element('meta[name=Keywords]').attr('content', 'الصفحة الشخصية ادزنس');
        angular.element('meta[name=Description]').attr('content', 'تواصل مع مدرسيك وزملائك , احصل على ملفاتك الدراسية و على تنبيهات امتحانات , شارك الطلاب الجامعيين آرائك ونقاشاتك .');
    }
    autolink(str, attributes) {
        attributes = attributes || {};
        var attrs = "";
        for (name in attributes)
            attrs += " " + name + '="' + attributes[name] + '"';

        var reg = new RegExp("(\\s?)((http|https|ftp)://[^\\s<]+[^\\s<\.)])", "gim");
        str = str.toString().replace(reg, '$1<a href="$2">$2</a>');
        this.vurl = str;
        return str;
    }
    submitText($scope, data) {
        $scope = this.scope;
        if ($scope.post_enabled == true) {
            $scope.post_enabled = false;
            var type = "";
            var url = this.rootScope.posturl;
            if (url == undefined || url == '') {
                type = "text";

                var data = {
                    textpost: this.textpost,
                    tag: this.tag,
                    media: this.media,
                    title: this.title,
                    description: this.description,
                    media: '',
                    mediatitle: '',
                    mediadesc: '',
                    mediaimage: '',
                    type: type,
                    place: 'home',
                };
            } else {
                var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
                var match = url.match(regExp);
                if (match && match[2].length == 11) {
                    //console.logs('type is video');
                    type = "video";
                    this.textpost = this.textpost.replace(url, '<a href="' + url + '" >الرابط هنا</a>');

                    var data = {
                        textpost: this.textpost,
                        tag: this.tag,
                        media: this.media,
                        title: this.title,
                        description: this.description,
                        media: 'https://www.youtube.com/embed/' + match[2],
                        mediatitle: this.rootScope.posttitle,
                        mediadesc: this.rootScope.postdescription,
                        mediaimage: this.rootScope.postimage,
                        type: type,
                        place: 'home',
                    };
                } else {
                    type = "url";
                    this.textpost = this.textpost.replace(url, '<a href="' + url + '" >الرابط هنا</a>');
                    var data = {
                        textpost: this.textpost,
                        tag: this.tag,
                        media: this.media,
                        title: this.title,
                        description: this.description,
                        media: url,
                        mediatitle: this.rootScope.posttitle,
                        mediadesc: this.rootScope.postdescription,
                        mediaimage: this.rootScope.postimage,
                        type: type,
                        place: 'home',
                    };
                }
            }
            this.postC++;
            this.textpost = '';
            this.tag = '';
            this.title = '';
            this.description = '';
            this.media = '';
            this.scope.showlive = 0;
            this.API.all('me/post').post(data).then((response) => {
                //response.data.post.media= 'https://www.youtube.com/embed/' + response.data.post.media
                this.rootScope.dat.push(response.data.post);
                $scope = this.scope;
                this.lived = this.live;
                $scope.post_enabled = true;
                //console.log(response.data);
                this.scope.dataPost = false
                this.textpost = ''
                this.tag = ''
            }, (response) => {
                $scope.post_enabled = true;
            });
        }
    }
    addhomework(files, $timeout, logs, classid, _self) {
        if (files) {
            //for (var i = 0; i < files.length; i++) {
            var file = files;
            if (!file.$error) {
                this.Upload.upload({
                    url: 'api/me/uploadhw',
                    method: 'POST',
                    file: file,
                    data: {
                        id: _self.userData.id
                    }
                }).then(function(resp) {
                    $timeout(function() {
                        var mynewhomework = {
                            id: _self.userData.id,
                            textpost: _self.textpost,
                            imgTag: _self.imgTag,
                            file: resp.data.data.return[0]
                        }
                        _self.API.all('me/image').post(mynewhomework).then((response) => {
                            _self.scope.dat.push(response.data.post);
                            // _self.scope.dat.push(response.data.post);
                        });
                        _self.textpost = ''
                        _self.imgTag = ''
                        _self.scope.files = ''
                    });
                }, null, function(evt) {
                    var progressPercentage = parseInt(100.0 *
                        evt.loaded / evt.total);
                    logs = 'progress: ' + progressPercentage +
                        '% ' + evt.config.data.file.name + '\n';
                });
            }
            //}
        }
    }
    follow($friend, $update, $idx) {
        this.API.all('home/friend/'+ $friend +'/' + $update).post('').then((response) => {
            this.fr[$friend] = null;
            this.scope.univ.splice($idx, 1);
            angular.element('#friend-' + $friend).hide();
            this.friendIndex++;
        });
        if (this.friendIndex == 7) {
            this.API.all('me/university').get('').then((response) => {
                this.scope.univ = response.data;
                this.friendIndex = 0;
            });
        }
    }
    followMobile($friend, $update, $idx) {
        this.API.all('home/friend/' + $friend + '/' + $update).post('').then((response) => {
            this.fr[$friend] = null;
            this.scope.univ.splice($idx, 1);
            angular.element('#friend-' + $friend).hide();
        });
    }
    $onInit() {
       
    }
}
export const HomeComponent = {
    templateUrl: './views/app/components/home/home.component.html',
    controller: HomeController,
    controllerAs: 'vm',
    bindings: {}
}