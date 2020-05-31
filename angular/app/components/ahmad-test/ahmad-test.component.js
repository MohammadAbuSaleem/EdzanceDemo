class AhmadTestController{
    constructor ($scope,$firebaseObject,$firebaseAuth,$firebaseArray, $firebaseStorage,$timeout, $rootScope,$crypto,API,Idle) {
    'ngInject'
      this.API = API;
      this.enabled = false;
      this.$rootScope = $rootScope;
      var auth = $firebaseAuth();
      this.chatter = [];
      this.$scope = $scope;
      this.chatter.email
      this.chatter.password
      this.$rootScope = $rootScope;
      this.$firebaseStorage = $firebaseStorage;
      this.$firebaseAuth = $firebaseAuth;
      this.$firebaseArray = $firebaseArray;
      this.$firebaseObject = $firebaseObject;
      $scope.users = [];
      $scope.skip=0;
      $scope.take=10;
      $scope.counter = 0;
      $scope.enabled = true;
      this.API.all('ahmad').get('').then(function(response){cosole.log(response);});
        //
    }
    stop(){
        this.$scope.enabled = false;
    }
    Register() {
          let self =this;
         self.API.all('talk/set-all-uid').post({skip: parseInt(self.$scope.skip),take: parseInt(self.$scope.take)}).then(function(response){
            self.$scope.users = response.users;
            self.$scope.counter = response.users.length-1;
             console.log(self.signOut());
             console.log(self.$scope.counter);
            self.signUp(response.users[self.$scope.counter].email,response.users[self.$scope.counter].password,self.$scope.counter);
            // self.$scope.skip=parseInt(self.$scope.skip)+parseInt(self.$scope.take);
            // Object.keys(response.users).map(function(objectKey, index) {
            //     var value = response.users[objectKey];
            // });
         }).catch(function(error){
            console.log(error)
         });
      }  
  signUp(user,pass,key){
     var self= this;
     var $firebaseAuth = self.$firebaseAuth();
     // var API = self.API;
      console.log('registering user :'+user);
      $firebaseAuth.$createUserWithEmailAndPassword(user, pass).then(function(user) {
        console.log('signUp successfully with'+user.uid);
        self.$scope.users[key].new_uid = user.uid;
         self.API.all('talk/set-uid/'+self.$scope.users[key].id+'/'+user.uid).get('').then(function(response){
            if(self.$scope.counter>=0 && self.$scope.enabled == true)
                self.signUp(self.$scope.users[self.$scope.counter].email,self.$scope.users[self.$scope.counter].password,self.$scope.counter);
            self.$scope.enabled = true;
         });
        // self.signIn(); 
          self.$scope.users[self.$scope.counter].counter = self.$scope.counter;
        self.$scope.counter--;
        self.$scope.skip++;


        // return user;
      }).catch(function(error) {
       // self.signIn(); 
       console.log(error);
       if(error.code =='auth/email-already-in-use'){
         console.log('already registered :(');
        if(self.$scope.counter>=0 && self.$scope.enabled == true)
            self.signIn(self.$scope.users[self.$scope.counter].email,self.$scope.users[self.$scope.counter].password,self.$scope.counter);
        self.$scope.enabled = true;
       }

      }); 
  }
  signOut(){
     var $firebaseAuth = this.$firebaseAuth(); 
      $firebaseAuth.$signOut();
      return 'sign Out successfully';
  }
  signIn(user,pass,key){
    var self= this;
    var $firebaseAuth = self.$firebaseAuth();
    $firebaseAuth.$signInWithEmailAndPassword(user, pass).then(function(user) {
         self.$scope.users[key].new_uid = user.uid;
          self.API.all('talk/set-uid/'+self.$scope.users[key].id+'/'+user.uid).get('').then(function(response){
          // console.log('signIn successfully')
          console.log(self.$scope.counter)
          console.log(self.signOut());
           if(self.$scope.counter>=0 && self.$scope.enabled == true)
                self.signUp(self.$scope.users[self.$scope.counter].email,self.$scope.users[self.$scope.counter].password,self.$scope.counter);
          });
          self.$scope.users[self.$scope.counter].counter = self.$scope.counter;
          self.$scope.counter--;
          self.$scope.skip++;
    }).catch(function(error) {
         console.log(error); 
    });
  }
    $onInit(){
    }
}

export const AhmadTestComponent = {
    templateUrl: './views/app/components/ahmad-test/ahmad-test.component.html',
    controller: AhmadTestController,
    controllerAs: 'vm',
    bindings: {}
}


