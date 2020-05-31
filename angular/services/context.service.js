export class ContextService {
  constructor ($auth, $rootScope, API ,chatMessages) {
    'ngInject'
    this.$auth = $auth;
    this.API = API;
    this.$rootScope = $rootScope;
    $rootScope.chatMessages = chatMessages;
    $rootScope.messaging_enabled = false;
    if (!this.enteredCaht)
    this.enableCaht = false;
  }
  getContext () {
    let $auth = this.$auth
    let $rootScope = this.$rootScope;
    if ($auth.isAuthenticated()) {
      do {
         let API = this.API
         let UserData = API.service('me', API.all('home')) 
         return UserData.one().get()
        }while (UserData.one().get().errors != 'false')
     
    } else {
      return null
    }
  }
  me (cb) {
    var self = this
    var $rootScope = self.$rootScope;
    
    $rootScope.$watch('me', function (nv, $rootScope) {
      if(nv){
        
        if (!(self.enableCaht && self.enteredCaht)) {
            self.$rootScope.chatMessages.init().then(function(user){
                  console.log('init then');
                  self.$rootScope.chatMessages.getRooms().then(function(Rooms){

                    self.$rootScope.chatMessages.Rooms = Rooms;
                    self.$rootScope.Rooms =  Rooms;
                    self.$rootScope.messaging_enabled = true;
                    self.$rootScope.chatMessages.checkStatus();
                  });
            });
            self.enableCaht = true;
            self.enteredCaht = true;
           }
         // if (nv.activated_at) {self.$rootScope.meFlag = false;}else{self.$rootScope.meFlag = true;}
            cb(nv)
        }  
    });
  
  }
}
