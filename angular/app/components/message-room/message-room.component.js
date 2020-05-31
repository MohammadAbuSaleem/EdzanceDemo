class MessageRoomController{
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
        this.RoomNow = null;
        this.$scope.hasRoom = 0;
        $rootScope.$watch('messaging_enabled', function() {
            if ($rootScope.messaging_enabled == true) {
                    self.$scope.messages_showed = true
                    self.$rootScope.messages[self.RoomNow] =[];
                    var FirstRoom = chatMessages.FirstRoom(self.stateParams.Room);
                    FirstRoom.then(function(data){
                       self.$scope.limit = chatMessages.getMessageCount(data.FirstRoom)-20;
                       var getRoom = chatMessages.getRoom(data.FirstRoom,10);
                        Promise.all([FirstRoom, getRoom]).then(values => { 
                          self.RoomNow = data.FirstRoom;
                          self.$scope.roomName=data.roomName;
                          self.$scope.selected = data.selected;
                            var Room = values[1];
                            self.$rootScope.messages[self.RoomNow] = Room;
                                Room.$loaded()
                                  .then(function(x) {
                                    // x.forEach(function(value, key) {
                                    //     self.$rootScope.messages[self.RoomNow].push(value);
                                    // });
                                });
                            self.$scope.roomName = $rootScope.Rooms.$getRecord(data.FirstRoom).display;
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
                        // console.log("rootScope.messages.length:"+$rootScope.messages[self.RoomNow].length)
                           if ($rootScope.messages[self.RoomNow].length >=(count-chatMessages.RoomData[self.RoomNow])) 
                            return;
                            if (count>=10 && $scope.limit>=0) {
                                chatMessages.infiniteScroll(self.RoomNow,$scope.limit,false).then(function(moreMessages){
                                    var exist_message = $rootScope.messages[self.RoomNow].length;
                                    var new_message = moreMessages.length
                                    moreMessages.splice(new_message-exist_message,exist_message)
                                        moreMessages.reverse();
                                        moreMessages.forEach(function(value, key) {
                                            $rootScope.messages[self.RoomNow].unshift(value);
                                        });
                                    $scope.loadmore = false;
                                    if ( $scope.limit>=chatMessages.RoomData[self.RoomNow]){
                                         $scope.limit =  $scope.limit - moreMessages.length;
                                    }else
                                    {
                                         $scope.limit = -1;
                                    }
                                    success(670);
                                });  
                            }
                    }
                }
            });
        }
        $scope.deleteRoom = function() {
            chatMessages.deleteRoom($rootScope.RoomNow,$scope.mCount,$rootScope.messages[self.RoomNow]);
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
                        self.$rootScope.messages[self.RoomNow] = Room
                        // self.$scope.messages = Room;
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

export const MessageRoomComponent = {
    templateUrl: './views/app/components/message-room/message-room.component.html',
    controller: MessageRoomController,
    controllerAs: 'mc',
    bindings: {}
}


