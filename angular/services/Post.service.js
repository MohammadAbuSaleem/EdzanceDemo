export class PostService {
    constructor($rootScope, API, $timeout, moment, Upload, $log, $state) {
        'ngInject';
        this.API = API;
        this.$rootScope = $rootScope;
        this.$state = $state;
        this.Upload = Upload;
        this.$timeout = $timeout;
        this.$log = $log
        this.postat = [];
        this.notifications = [];
        this.show_loadmore = true;
        //this.busy = false;
        this.oldSkip = -1;
        this.skip = 2;
        this.take = 5;
        this.notificationSkip = 2;
        this.notificationTake = 5;
        this.addpost_counter = 0;
        this.nopost = 2;
        this.nonotification = 2;
        $rootScope.busy = false;
        this.type = 'post';
        this.url = '';
        this.imageurl = '';
        this.postindex = [];
        this.notificationindex = [];
        this.exprissions = [];
        this.comment_enabled = true;
        this.postcommentindex = ''
        this.post_enabled = true;
        var _self = this;
    }
    setExprissions(exprissions) {
        this.exprissions = exprissions;
    }
    settype(type) {
        this.type = type;
    }
    setPostat(postat) {
        this.postat = postat;
    }
    setNotifications(notifications) {
        this.notifications = notifications;
    }
    setnopost(nopost) {
        this.nopost = nopost;
    }
    setnonotification(nonotification) {
        this.nonotification = nonotification;
    }
    setshow_loadmore(show_loadmore) {
        this.show_loadmore = show_loadmore;
    }
    setskip(skip) {
        this.skip = skip;
    }
    settake(take) {
        this.take = take;
    }
    setnotificationSkip(notificationSkip) {
        this.notificationSkip = notificationSkip;
    }
    setnotificationTake(notificationTake) {
        this.notificationTake = notificationTake;
    }
    seturl(url) {
        this.url = url;
    }
    setediturl(url) {
        this.editurl = url;
    }
    setdeleteurl(url) {
        this.deleteurl = url;
    }
    setCommentDeleteUrl(url) {
        this.commentDeleteUrl = url;
    }
    setsubmiturl(submiturl) {
        this.submiturl = submiturl;
    }
    setuploadurl(uploadurl) {
        this.uploadurl = uploadurl;
    }
    setimageurl(imageurl) {
        this.imageurl = imageurl;
    }
    setSection(section) {
        this.section = section
    }
    gettype() {
        return this.type;
    }
    getExprissions() {
        return this.exprissions;
    }
    getPostat() {
        return this.postat;
    }
    getNotifications() {
        return this.notifications;
    }
    getnopost() {
        return this.nopost;
    }
    getnonotification() {
        return this.nonotification;
    }
    getshow_loadmore() {
        return this.show_loadmore;
    }
    getskip() {
        return this.skip;
    }
    getnotificationSkip() {
        return this.notificationSkip;
    }
    getimagereaded() {
        return this.imagereaded;
    }
    gettake() {
        return this.take;
    }
    getnotificationTake() {
        return this.notificationTake;
    }
    geturl() {
        return this.url;
    }
    getpostcommentindex() {
        return this.postcommentindex;
    }
    getPost() {
        return new Promise((resolve, reject) => {
            this.getPostSecondary(resolve, reject);
        });
    }
    getPostSecondary(resolve, reject) {
        let API = this.API;
        let $rootScope = this.$rootScope;
        let postindex = this.postindex;
        if (this.show_loadmore) {
            if (!$rootScope.busy) {
                $rootScope.busy = true;
                this.show_loadmore = false;
                API.all(this.url + '/' + (this.skip + this.addpost_counter) + '/' + this.take).get('')
                    .then((response) => {
                        this.oldSkip = this.skip;
                        this.skip = this.skip + response.data.length;
                        if (response.data == "no post") {
                            this.show_loadmore = false;
                            $rootScope.busy = false;
                            this.checkPostat(2);
                        } else {
                            if (this.oldSkip != this.skip) {
                                if (this.postat) {
                                    var a = [];
                                    response.data.map(function(item) {
                                        a.push(item)
                                    });
                                    this.postat.map(function(item) {
                                        a.push(item)
                                    })
                                    this.nopost = 1;
                                    this.postat = a;
                                } else {
                                    this.postat = response.data;
                                    this.postat.map(function(item, key) {
                                        postindex[item.id] = key;
                                    });
                                }
                                //$rootScope.busy = false;
                                this.show_loadmore = true;
                            }
                        }
                        resolve(response)
                    }, (response) => {
                        $rootScope.busy = false;
                        this.show_loadmore = false;
                        if (this.postat) {
                            if (response.data.errors) {
                                if (response.data.errors.message[0] == 'no post') {
                                    $rootScope.busy = false;
                                }
                            }
                            this.checkPostat(2);
                        } else {
                            if (response.data.errors) {
                                if (response.data.errors.message[0] == 'no post') {
                                    $state.current.show_loadmore = false;
                                    $rootScope.busy = false;
                                }
                            }
                            this.checkPostat(2);
                        }
                        reject(response)
                    });
            } else {
                this.nopost = 2;
            }
        }
    };
    getNotification() {
        return new Promise((resolve, reject) => {
            this.getNotificationPromise(resolve, reject);
        });
    }
    getNotificationPromise(resolve, reject) {
        let API = this.API;
        let $rootScope = this.$rootScope;
        let notificationindex = this.notificationindex;
        if (this.show_loadmore) {
            if (!$rootScope.notificationBusy) {
                $rootScope.notificationBusy = true;
                API.all(this.url + '/' + (this.notificationSkip + this.addpost_counter) + '/' + this.notificationTake).get('').then((response) => {
                    if (response.data == "no post") {
                        this.show_loadmore = false;
                        $rootScope.notificationBusy = false;
                        if (this.notifications.length > 0) {
                            this.nonotification = 1;
                        } else if (this.notifications.length == 0) {
                            this.nonotification = 3;
                        }
                    } else {
                        $rootScope.notificationBusy = false;
                        this.show_loadmore = true;
                        if (this.notifications) {
                            var a = [];
                            response.data.map(function(item) {
                                a.push(item)
                            });
                            this.notifications.map(function(item) {
                                a.push(item)
                            })
                            //this.checknotifications(2);
                            this.nonotification = 1;
                            this.notifications = a;
                        } else {
                            this.notifications = response.data;
                            this.notifications.map(function(item, key) {
                                notificationindex[item.id] = key;
                            });
                        }
                        this.notificationSkip = this.notificationSkip + response.data.length;
                    }
                    return this.notifications;
                });
            } else {
                return this.notifications;
                this.nonotification = 2;
            }
        }
    };
    //function is delete any post,commit,file,exam,homework or support 
    deleteNode(node, deleteType, callback) {
        let API = this.API;
        let $rootScope = this.$rootScope;
        let postat = this.postat;
        let postindex = this.postindex;
        var nodeType = '';
        var deleteurl = this.deleteurl;
        var section = this.section;
        //console.log(this.section);
        postat.map(function(item, key) {
            postindex[item.id] = key;
        });
        if (deleteType == true) {
            nodeType = this.type + '_comment'; //'comment';
            var url = this.commentDeleteUrl;
        } else {
            nodeType = this.type;
            var url = deleteurl;
        }
        if ($rootScope.post_delete == undefined) $rootScope.post_delete = true;
        if ($rootScope.post_delete == true) {
            var modelTitle = ''
            var modelTitleConf = ''
            var Node = postat;
            var $post_index = postindex[node.id];
            switch (nodeType) {
                case 'file':
                    modelTitle = "الملف";
                    break;
                case 'homework':
                    modelTitle = "الواجب";
                    break;
                case 'exam':
                    modelTitle = "الامتحان";
                    break;
                case 'post':
                    modelTitle = "المنشور"
                    break;
                case 'comment':
                    modelTitle = "التعليق";
                    break;
                case 'books':
                    modelTitle = "الكتاب";
                    break;
            }
            swal({
                title: "هل انت متأكد من حذف " + modelTitle + " ؟",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: "نعم, احذفه",
                cancelButtonText: "لا, الغاء العمليه",
                closeOnConfirm: false,
                closeOnCancel: false,
                showLoaderOnConfirm: true
            }, (isConfirm) => {
                if (isConfirm) {
                    $rootScope.post_delete = false;
                    parent = []
                    var data = {
                        id: node.id,
                        place: nodeType
                    };
                    API.all(url).post(data).then((response) => {
                        if (response.data.sucess) {
                            switch (nodeType) {
                                case this.type + 'comment':
                                    parent[node.post_id] = [];
                                    $post_index = postindex[node.post_id];
                                    Node[$post_index].comment.map(function(item, key) {
                                        parent[node.post_id][item.id] = key;
                                    });
                                    var comment_index = parent[node.post_id][node.id];
                                    Node[$post_index].comment.splice(comment_index, 1);
                                    break;
                                default:
                                    Node.splice($post_index, 1);
                                    this.checkPostat(2);
                                    callback();
                            }
                            swal({
                                title: "تم حذف " + modelTitle,
                                type: "success",
                                timer: 2000,
                                showConfirmButton: false
                            });
                            $rootScope.post_delete = true;
                        } else {
                            swal({
                                title: "حدث خطأ في عملية حذف " + modelTitle,
                                type: "error",
                                timer: 2000,
                                showConfirmButton: false
                            });
                        }
                    });
                    $rootScope.post_delete = true;

                } else {
                    swal({
                        title: "لقد تم الغاء عملية الحذف",
                        type: "error",
                        timer: 2000,
                        showConfirmButton: false
                    });
                }
            });
            $rootScope.post_delete = true;
        } else {
            console.log('Deleting Disabled:))');
        }
    };
    //function is delete any post,commit,file,exam,homework or support 
    exprission($post, $exp) {
        let API = this.API;
        let postat = this.postat;
        let postindex = this.postindex;
        postat.map(function(item, key) {
            postindex[item.id] = key;
        });
        var $i = postindex[$post];
        API.all('social/changeExp/'+this.section+'/exprission/' + $post + '/' + $exp).post('').then((response) => {
            postat[$i].all = response.data.all;
            postat[$i].exprission = response.data.exprission;
        });
    };
    exprissionUser($index, liker) {
        let API = this.API;
        let $rootScope = this.$rootScope;
        let postat = this.getPostat();
        let postindex = [];
        postat.map(function(item, key) {
            postindex[item.id] = key;
        });
        var a = {
            id: liker
        };
        var $i = postindex[$index];
        //let exprissions = this.exprissions;
        //let $timeout = this.$timeout;
        this.exprissions = [];
        API.all('social/expressor/'+this.section+'/exprission/'+liker).post(a).then((response) => {
            //response.data.post.media= 'https://www.youtube.com/embed/' + response.data.post.media
            postat[$i].exprissions = response.data;
            this.setExprissions(response.data);
            this.exprissions = response.data;
            $rootScope.exprissions = response.data;
            $rootScope.happyexp = 1
            $rootScope.normalexp = 1
            $rootScope.sadexp = 1

            if (this.exprissions.happy.length < 1) {
                $rootScope.happyexp = 2
            }
            if (this.exprissions.normal.length < 1) {
                $rootScope.normalexp = 2
            }
            if (this.exprissions.sad.length < 1) {
                $rootScope.sadexp = 2
            }
            this.setExprissions(response.data);
            return response.data;
        }, (response) => {});
    }
    submitComment($id, $index, scope, $body, place) {
        let $rootScope = this.$rootScope;
        let API = this.API;
        let postat = this.postat;
        let postindex = this.postindex;
        let section = this.section;
        postat.map(function(item, key) {
            postindex[item.id] = key;
        });
        if (this.comment_enabled == undefined) this.comment_enabled = true;
        if (this.comment_enabled == true) {
            this.comment_enabled = false;
            this.comment = []
            this.index = $index;
            var data = {
                body: $body,
                user_id: $rootScope.me.id,
                post_id: $id,
                place: place,
                status: 'enabled'
            };
            var number = 0;
            if (this.addpost_counter > 0) {
                number = postat.length - 1 - $index;
            } else {
                number = $index
            }
            API.all('social/set/' + section + '/comment').post(data).then((response) => {
                this.comment_enabled = true;
                var $i = postindex[$id];
                //this.postcommentindex = $i
                //console.log(response.data.comment);
                postat[$i].comment.push(response.data.comment);
                // this.newcomment = response.data.comment;
                // return this.newcomment;
            }, (response) => {
                this.comment_enabled = true;
            });
        }
    }
    updateData(data, id) {
        let API = this.API;
        var dat = {
            data,
            id
        }
        var section = this.section;
        API.all(this.editurl).post(dat).then((response) => {}, (response) => {});
    }
    submitPost(files, class_id, textpost, callback) {
        if (class_id == undefined) {
            class_id = '';
        }
        let API = this.API;
        let $rootScope = this.$rootScope;
        let Upload = this.Upload;
        let logs = this.$log;
        let $timeout = this.$timeout;
        let postat = this.getPostat();
        let postindex = this.postindex;
        var imageurl = this.imageurl;
        let addpost_counter = this.addpost_counter;
        let post_enabled = this.post_enabled;
        var _self = this;
        postat.map(function(item, key) {
            postindex[item.id] = key;
        });
        if (post_enabled == true && $rootScope.post_disable != true) {
            post_enabled = false;
            if (files.length > 0 || files.name) {
                //var files = files;
                var file = files;
                if (!file.$error) {
                    var data = {
                        textpost: textpost,
                        file: file,
                        class_id: class_id,
                        type: "image"
                    }
                    var payload = new FormData();
                        angular.forEach(data, function(value, key) {
                           payload.append(key, value);
                        });
                    API.all(imageurl)
                       .withHttpConfig({transformRequest: angular.identity})
                       .customPOST(payload, undefined, undefined,{'Content-Type': undefined })
                        //.post(data)
                       .then((response) => {
                            postat.push(response.data);
                            // this.nopost = 1;
                            _self.checkPostat(1);
                            callback();
                            addpost_counter++;
                            $rootScope.posttitle = '';
                            $rootScope.postdescription = '';
                            // this.submiturl = '';
                            $rootScope.postimage = '';
                        }, null, function(evt) {
                            console.log(evt);
                        $rootScope.progressPercentage = parseInt(100.0 * (evt.loaded / evt.total));
                        logs = 'progress: ' + $rootScope.progressPercentage + '% ' + evt.config.file.name + '\n';
                        if ($rootScope.progressPercentage == 100) {
                            $timeout(function() {
                                $rootScope.progressPercentage = 0;
                            }, 2000);
                        }
                    });
                }
            } else {
                var type = '';
                var url = '';
                var url = $rootScope.posturl;

                var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
                var match = textpost.match(regExp);

                if (match && match[2].length == 11) {
                    type = "video";
                    textpost = textpost.replace(url, '   ');
                    var data = {
                        textpost: textpost,
                        title: $rootScope.posttitle,
                        description: $rootScope.postdescription,
                        media: 'https://www.youtube.com/embed/' + match[2],
                        mediatitle: $rootScope.posttitle,
                        mediadesc: $rootScope.postdescription,
                        mediaimage: $rootScope.postimage,
                        type: type,
                        place: this.type,
                        class_id: class_id
                    };
                }else {
                    if (url == undefined || url == '') {
                        type = "text";
                        var data = {
                            textpost: textpost,
                            media: '',
                            title: '',
                            description: '',
                            media: '',
                            mediatitle: '',
                            mediadesc: '',
                            mediaimage: '',
                            type: type,
                            place: this.type,
                            class_id: class_id
                        };
                    }else{
                        type = "url";
                        textpost = textpost.replace(url, '   ');
                        var data = {
                            textpost: textpost,
                            title: $rootScope.posttitle,
                            description: $rootScope.postdescription,
                            media: url,
                            mediatitle: $rootScope.posttitle,
                            mediadesc: $rootScope.postdescription,
                            mediaimage: $rootScope.postimage,
                            type: type,
                            place: this.type,
                            class_id: class_id

                        };
                    }
                }
                type = '';
                $rootScope.posturl = '';
                $rootScope.posttitle = '';
                $rootScope.postdescription = '';
                $rootScope.postimage = '';
                API.all(this.submiturl).post(data).then((response) => {
                    postat.push(response.data);
                    _self.checkPostat(1);
                    //this.nopost = 1;
                    callback();
                    post_enabled = true;
                    addpost_counter++;
                    $rootScope.liveUrlFlag = false;
                }, (response) => {
                    post_enabled = true;
                });
            }
        }
    } //end new post
    NewNode(data, correct, isFile, files, contr) {
        var payload = new FormData();
        angular.forEach(data, function(value, key) {
           payload.append(key, value);
        });
        let API = this.API;
        let self = this;
        let post_enabled = this.post_enabled;
        if (post_enabled == true) {
            post_enabled = false;
            //if (isFile) {
                //self.FileUpload(files, self.uploadurl, data, correct, contr);
            //} else {
                //data = JSON.stringify(data);
                API.all(self.submiturl)
                .withHttpConfig({transformRequest: angular.identity})
                .customPOST(payload, undefined, undefined,{'Content-Type': undefined })
                //.post(data)
                .then((response) => {
                    self.postat.push(response.data);
                    self.checkPostat(1);
                    correct(response, self.postat, self.nopost);
                    post_enabled = true;
                    self.addpost_counter++;
                    for (var key in self.$rootScope.newPost) {
                        self.$rootScope.newPost[key] = '';
                    }
                }, (response) => {
                    post_enabled = true;
                });
            //}
        }
    }
    checkPostat(counter) {
        if (this.postat.length > 0) {
            this.nopost = 1;
        } else if (this.postat.length == 0) {
            this.nopost = 3;
        }
    }
}