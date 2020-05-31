class VirtualclassChatController{
    constructor($stateParams, $state, chatMessages, $rootScope, $scope, $crypto, $firebaseArray, moment) {
        'ngInject';
        var ctrl = this; 
        this.stateParams = $stateParams;
        this.$state = $state;
        this.$scope = $scope;
        this.$scope.moment = moment;
        this.$scope.$crypto = $crypto;
        this.$rootScope = $rootScope;
        this.$firebaseArray = $firebaseArray;
        this.$rootScope.$firebaseArray = $firebaseArray;
        this.$scope.from = 0;
        this.$scope.to = 0;
        this.$scope.chatLoader = false;
        $scope.loadmore = false;
        $scope.loaded = false;
        this.$scope.mCount = 0;
        this.$scope.roomName='';
        $scope.selected = -1;
        var self = this;
        self.$rootScope.pageTitle = "الرسائل";
        angular.element('meta[name=Keywords]').attr('content','الرسائل,الرسائل ادزانس,Edzance Message');
        angular.element('meta[name=Description]').attr('content','تواصل مع مدرسيك وزملائك , احصل على ملفاتك الدراسية و على تنبيهات امتحانات , شارك الطلاب الجامعيين آرائك ونقاشاتك .');
        angular.element('html').scrollTop(0);  
        this.RoomNow = null;
        this.$scope.hasRoom = 0;
        $rootScope.$watch('messaging_enabled', function() {
            if ($rootScope.messaging_enabled == true) {
                    self.$scope.messages_showed = true
                    self.$scope.messages =[];
                $rootScope.req.then(function(response){
                    self.RoomNow = $rootScope.vc.Fire_Base_Chat_Room_name;
                    self.$rootScope.RoomNow = $rootScope.vc.Fire_Base_Chat_Room_name;
                    chatMessages.getRoom(self.RoomNow,10).then(function (Room) { 
                          // self.RoomNow = self.RoomNow;
                            // var Room = values[1];
                                Room.$loaded()
                                  .then(function(x) {
                                    $scope.messages = x;
                                });
                            self.$scope.roomName = $rootScope.Rooms.$getRecord(self.RoomNow).display;
                        });
                    });
                    $scope.addMessage = function(message,id) {
                        self.$scope.first_limit++;     
                        chatMessages.addMessage($rootScope.me.id, $rootScope.me.name, message, self.RoomNow);
                        self.$scope.mCount = self.$scope.mCount+1;  
                    }
            }
        });
        $scope.infiniteScroll = function() {
         return new Promise((success, error) => {
          if ($scope.loadmore != true) {
                $scope.loadmore = true;
                if (self.RoomNow) {
                    var count = chatMessages.getMessageCount(self.RoomNow);
                        $scope.from = (($scope.from == 0) ? count-10 : $scope.to);
                        $scope.to = (($scope.from <= 0) ? 0 : ($scope.from - 10));
                        if (count>=10 && $scope.to!=0) {
                            chatMessages.infiniteScroll(self.RoomNow,$scope.to,$scope.from-1,true).then(function(moreMessages){
                                if (chatMessages.enabler) {
                                    $scope.messages = moreMessages;
                                }  
                                $scope.loadmore = false;
                                success( $scope.messages);
                            });  
                        }
                }
            }
         });
        }
        $scope.deleteRoom = function() {
            chatMessages.deleteRoom($rootScope.RoomNow,$scope.mCount,$scope.messages);
            $scope.messages = [];
        }
    }
    GetRoom($id,self,index,display) {
        self.$scope.loadmore = false;
        self.$scope.mCount = 0;
        self.$scope.messages = [];
        self.RoomNow = $id;
        self.$scope.roomName = display;
        var ref = firebase.database().ref().child('chat').child($id).child('data')
        self.$scope.chatLoader = true;
        if (self.$scope.chatLoader == true) {
            self.$rootScope.chatMessages.getRoom($id, 10).then(function(Room){
                self.$scope.messages.$loaded()
                    .then(function(x) {   
                        self.$scope.messages = Room;
                        //angular.element('.lv-body').scrollTop(angular.element('.lv-body').prop('scrollHeight'));
                });
            }).catch(function(Room){
            });
            ref.on('value', function(childSnapshot) {
                //angular.element('.lv-body').scrollTop(angular.element('.lv-body').prop('scrollHeight'));
            });
            ref.on('child_added', function(childSnapshot, prevChildKey) {
                //angular.element('.lv-body').scrollTop(angular.element('.lv-body').prop('scrollHeight'));
            });
            this.$scope.chatLoader = false;
        }
        var a = self.$rootScope.chatMessages.RoomUsers[$id];
    }
    $onInit(){
    }
}

export const VirtualclassChatComponent = {
    templateUrl: './views/app/components/virtualclass-chat/virtualclass-chat.component.html',
    controller: VirtualclassChatController,
    controllerAs: 'vm',
    bindings: {}
}


