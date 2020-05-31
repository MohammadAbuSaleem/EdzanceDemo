class ComingSoonController {
  constructor (Post,$http, AclService, API, $timeout, $stateParams, $rootScope, $scope, $state, toastr,Upload,$log) {
    'ngInject'
        this.scope = $scope;
        this.$state = $state;
        this.rootScope = $rootScope;
        this.$timeout = $timeout;
        this.$http = $http;
        this.API = API;
        this.$stateParams = $stateParams;
        this.AclService = AclService;
        this.toastr = toastr;
        $scope.show = "hidden";
        this.Post = new Post.constructor($rootScope, API, $timeout, moment, Upload, $log);
        var Post = this.Post;
        this.Post.seturl('misc/post');
        this.Post.setediturl('misc/post-update');
        this.Post.setskip(0);
        this.Post.settype('post'); 
        this.Post.setsubmiturl('misc/post');
        this.Post.setimageurl('misc/image');
        this.Post.settake(10);
        this.Post.setSection('misc');
        var selfy = this;

        Post.getPost().then(function(response) {
                $scope.dat = Post.getPostat();
		        console.log(131);
                $scope.nopost = Post.getnopost();
                $rootScope.busy = false;
            });
        console.log('aaa');
        $scope.getPost = function() {

            selfy.$http.get("api/misc/post/"+selfy.Post.getskip()+"/"+selfy.Post.gettake()+"?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEwMDE1OCwiaXNzIjoiaHR0cDpcL1wvaW5pdGlhbC5kZXZcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE1MDE3NDc1NzQsImV4cCI6MjE0NzQ4MzY0NywibmJmIjoxNTAxNzQ3NTc0LCJqdGkiOiI1N2JlNTAzNDQ0ZGUxM2RhM2QyNDQxMWY5ZjNmODc3OCJ9.WFUHLjvnb61R6X9g3f2933RU5ITtLYAloiw5nsIJLNM")
                .then(function(response) {
                    console.log(selfy.infiniteItems);
                    if (response.data.data == 'no post') {
                        return;
                    }
                    self.numLoaded_ = self.toLoad_;
                    // Object.assign(obj1, obj2);
                  selfy.infiniteItems = Object.assign(selfy.infiniteItems, response.data.data);

                    // selfy.infiniteItems = response.data.data
                });






            Post.getPost().then(function(response) {
                $scope.dat = Post.getPostat();
		        console.log(Post.getPostat().length);
                $scope.nopost = Post.getnopost();
                $rootScope.busy = false;
            });
        }
		$scope.toggleShow = function(){
		  $scope.show = "visible";
		}
        // In this example, we set up our model using a plain object.
        // Using a class works too. All that matters is that we implement
        // getItemAtIndex and getLength.
        var selfy = this;
        this.infiniteItems = {
          numLoaded_: 0,
          toLoad_: 0,
          items: [],

          // Required.
          getItemAtIndex: function(index) {
            if (index > this.numLoaded_) {
              this.fetchMoreItems_(index);
              return null;
            }

                  return this[index];
          },

          // Required.
          // For infinite scroll behavior, we always return a slightly higher
          // number than the previously loaded items.
          getLength: function() {
            return this.numLoaded_ + 2;
          },

          fetchMoreItems_: function(index) {
            // For demo purposes, we simulate loading more items with a timed
            // promise. In real code, this function would likely contain an
            // $http request.

            if (this.toLoad_ < index) {
              this.toLoad_ += 4;


                selfy.$timeout(angular.noop, 300).then(
                    angular.bind(this, function() {
                        let self = this;
                        selfy.$http.get("api/misc/post/"+this.numLoaded_+"/"+self.toLoad_+"?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEwMDE1OCwiaXNzIjoiaHR0cDpcL1wvaW5pdGlhbC5kZXZcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE1MDE3NDc1NzQsImV4cCI6MjE0NzQ4MzY0NywibmJmIjoxNTAxNzQ3NTc0LCJqdGkiOiI1N2JlNTAzNDQ0ZGUxM2RhM2QyNDQxMWY5ZjNmODc3OCJ9.WFUHLjvnb61R6X9g3f2933RU5ITtLYAloiw5nsIJLNM")
                        .then(function(response) {
                            console.log(selfy.infiniteItems);
                            if (response.data.data == 'no post') {
                                return;
                            }
                            self.numLoaded_ = self.toLoad_;
                            // Object.assign(obj1, obj2);
                          selfy.infiniteItems = Object.assign(selfy.infiniteItems, response.data.data);

                            // selfy.infiniteItems = response.data.data
                        });
                        // Post.getPost().then(function(response) {
                        //     console.log(response.data);
                        //     this.numLoaded_ = this.toLoad_;
                        // }).bind(this);
                    })
                );

              // $timeout(angular.noop, 300).then(angular.bind(this, function() {
              //   this.numLoaded_ = this.toLoad_;
              // }));
            }
          }
        };
  //
  }
sayyes(){console.log(111111)}

  $onInit () {}
}

export const ComingSoonComponent = {
  templateUrl: './views/app/components/coming-soon/coming-soon.component.html',
  controller: ComingSoonController,
  controllerAs: 'ctrl',
  bindings: {}
}
