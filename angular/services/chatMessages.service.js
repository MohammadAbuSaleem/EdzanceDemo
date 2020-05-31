export class chatMessagesService {
    constructor($state,$stateParams,$firebaseObject, $firebaseAuth, $firebaseArray, $firebaseStorage, $timeout, $rootScope, $crypto, API, Idle) {
        'ngInject'
        this.API = API;
        this.stateParams = $stateParams;
        this.enabled = false;
        this.$rootScope = $rootScope;
        // var auth = $firebaseAuth();
        this.auth = firebase.auth();
        this.chatter = [];
        this.$crypto = $crypto;
        this.chatter.email
        this.chatter.password
        this.$rootScope = $rootScope;
        this.$firebaseStorage = $firebaseStorage;
        this.$firebaseAuth = $firebaseAuth;
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.RoomName = [];
        this.$rootScope.messages = [];
        this.RoomId = [];
        this.Room = [];
        this.temp = {};
        this.deleteCount = [];
        this.RoomUsers = [];
        this.RoomData = [];
        this.NowRoom = null;
        this.Online_Users = null;
        this.Online_UsersId = null;
        this.myfriends = [];
        this.friends = [];
        this.$rootScope.avatar = [];
        this.Count = [];
        this.loadmore = false;
        var self = this;
        $rootScope.messagesCount = 0;
        var $firebaseArray = this.$firebaseArray;
        this.ref = firebase.database().ref();
        $rootScope.sending = false;
        $rootScope.sendMessage = function(id, name, FB_UID) {
            if (!$rootScope.sending) {
                $rootScope.sending = true;
                this.newMessage = new Promise((resolve, reject) => {
                    self.checkIfUserExist(resolve, FB_UID, name, id);
                });
                this.newMessage.then((Room_name, name, id) => {
                    self.getRoom(self.getRoomNow(), 10).then(function(temp) {
                        $rootScope.register_popup(self.getRoomNow(), self.temp.name, self.getRoomNow());
                        // console.log(self.Room[self.getRoomNow()])
                        $rootScope.messages[self.getRoomNow()] = self.Room[self.getRoomNow()];
                            $timeout(function() {
                                $rootScope.sending = false;
                            }, 3000);
                    });
                });
            }
        }
    }
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
///////////////////////Getter & Setter ///////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
    setRoomName(RoomName, id) {
         this.RoomName[id] = RoomName;
    }
    getRoomName(id) {
         return this.RoomName[id];
    }
    getRoomData(id) {
         return this.RoomData[id];
    }
    getRoomNow() {
         return this.NowRoom;
    }
    getRoomsName() {
         return this.Rooms;
    }
    getLoadMore() {
         return this.loadmore;
    }
    getMessageCount($id) {
        var self = this;
        return self.Count[$id];
    }
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
////////////////// Connection Function ///////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
    init(user) {
        let self = this;
        if (!user) {
            user = {};
            user.id = self.$rootScope.me.id;
            user.FB_PASS = self.$rootScope.me.FB_PASS;
            user.from = 'from scope';
        }

        return new Promise(function(fulfill, reject) {
            self.token = user.token;
            var a = self.findOrCreate(fulfill, reject,user);
            
        });
    }
    getRooms() {
        var self = this;
        return new Promise(function(fulfill, reject) {
            var uid = null;
            self.$rootScope.messagesCount = 0
            if (self.chatter.uid != undefined)
                uid = self.chatter.uid;
            else if (self.$rootScope.me)
                uid = self.$rootScope.me.FB_UID;
            else return 'no uid';
            var $firebaseArray = self.$firebaseArray;
            var a = [];
            a[uid] = null;
            var ref = firebase.database().ref().child('Rooms').child(uid);
            self.Rooms = $firebaseArray(firebase.database().ref().child('Rooms').child(uid));
            self.Rooms.$loaded().then(function(data) {
                ref.on('value', function(Rooms) {

                    var a = Rooms.val();
                    self.$rootScope.messagesCount = 0
                        self.Rooms.forEach(function(currentValue) {
                        if(self.$rootScope.RoomNow){
                            if (currentValue.name == self.$rootScope.RoomNow){
                                self.myRoomInRooms = currentValue
                            }
                        }
                        self.Count[currentValue.name] = currentValue.count;
                        self.RoomData[currentValue.name]= currentValue.deleted_at; 
                        if (currentValue.unReaded != 0)
                            self.$rootScope.messagesCount = self.$rootScope.messagesCount + 1;
                        if (currentValue.unReaded > 0) {
                            self.$rootScope.addOne = " (" + self.$rootScope.messagesCount + ")";
                        } else {
                            self.$rootScope.addOne = " ";
                        }
                        });
                    // Object.keys(a).map(function(objectKey, index) {
                    //     if(!self.RoomData[objectKey])
                    //         self.RoomData[objectKey]=[];
                    //     self.Count[objectKey] = a[objectKey].count;
                    //     self.RoomData[objectKey]= a[objectKey].deleted_at
                    // });
                    self.RoomData.deleted = function(n) {
                        return 'test:'+n;
                        return this[Object.keys(this)[n]];
                    }
                    self.reloadFriend();
                    self.Rooms = $firebaseArray(firebase.database().ref().child('Rooms').child(uid));
                    self.Rooms.forEach(function(currentValue, index, arr) {
                        if (currentValue.hasNew == true) {}
                        if (currentValue.unReaded != 0)
                            self.$rootScope.messagesCount = self.$rootScope.messagesCount + 1;
                        if (currentValue.unReaded > 0) {
                            self.$rootScope.addOne = "(" + self.$rootScope.messagesCount + ")";
                        } else {
                            self.$rootScope.addOne = " ";
                        }
                    });
                    angular.element('.lv-body').scrollTop(100000, 0);
                    angular.element('#' + self.$rootScope.RoomNow + ' .popup-messages').scrollTop(angular.element('.popup-messages').prop('scrollHeight'));
                });
            })
            .catch(function(error) {
                console.error("Error:", error);
            });
            self.chatter.uid = uid;
            fulfill(self.Rooms);
      });
    }
    getRoom($id, limit) {
        var self = this;
        var $firebaseArray = this.$firebaseArray;
        var fb = firebase.database().ref();
        return new Promise(function(fulfill, reject) {
                self.$rootScope.avatar[$id] = [];
                self.$rootScope.RoomNow = $id;
                self.messagesPromise($id,limit,false).then((Room,status) => {
                    self.Room[$id] = Room;             
                    self.RoomUsers[$id] = $firebaseArray(fb.child('chat').child($id).child('users'));
                    angular.element('.lv-body').scrollTop(100000, 0);
                    self.Room[$id].$loaded()
                        .then(function(x) {
                            self.NowRoom = $id;
                            Object.keys(self.RoomUsers[$id]).map(function(objectKey, index) {
                                if (typeof(self.Rooms[objectKey]) == 'object') {
                                    self.$rootScope.avatar[$id][self.RoomUsers[$id].$keyAt(index)] = self.RoomUsers[$id][index].avatar;
                                }
                            });
                            // angular.element('.lv-body').scrollTop(angular.element('.lv-body').prop('scrollHeight'));
                            angular.element('.lv-body').scrollTop(100000, 0);
                            angular.element('#' + $id + ' .popup-messages').scrollTop(angular.element('.popup-messages').prop('scrollHeight'));
                            self.setReaded(self.chatter.uid, $id);
                            if (self.Room[$id].$resolved) {
                                fulfill(self.Room[$id]);
                            } else {
                                reject(self.Room[$id]);
                            }
                        })
                        .catch(function(error) {
                            console.log(error)
                        });
                    return self.Room[$id];
                });
        });
    }
    messagesPromise($id,limit,force) {
        let self = this;
        var status = 'not changed';
        var Room = null;
        var count = self.getMessageCount($id);
        var RoomData = self.getRoomData($id);
        var deleted_at =  self.RoomData[$id] ;
        if (count-limit>deleted_at) {var from = count - limit ;}else{var from = deleted_at;}
        return new Promise((fulfill, reject) => {
            var ref = firebase.database().ref("chat/"+$id+'/data');
            var Rooms = firebase.database().ref('Rooms/' + self.chatter.uid + '/' + $id);
            var chat = firebase.database().ref("chat/"+$id);
            ref.on('child_added', function(childSnapshot, prevChildKey) {
                 chat.once('value', function(dataSnapshot) {
                    if (prevChildKey && childSnapshot) {
                        if (childSnapshot.val().id == self.chatter.uid) {
                            if (!((childSnapshot.val().message_id-1) ==dataSnapshot.val().data[prevChildKey].message_id)) {
                               // console.log(childSnapshot.val().message_id,dataSnapshot.val().data[prevChildKey].message_id);
                               // console.log(childSnapshot.key)
                               var updates = {};
                               updates['/chat/' + $id + '/data/' + childSnapshot.key+'/message_id']= dataSnapshot.val().data[prevChildKey].message_id+1;
                               firebase.database().ref().update(updates);
                            }   
                        }
                    }
                });
            });
            Rooms.once("value", function(snap) {
             var deleted_at = snap.val().deleted_at;
              chat.once("value")
                .then(function(snapshot) {
                    var all_count = snapshot.child("data").numChildren();
                    if (snapshot.hasChild("data")) {
                        if (snapshot.child("data").hasChildren()) {
                             if ( all_count == count || force) {
                                Room = self.$firebaseArray(ref.orderByChild('message_id').startAt(from));
                                status = 'normal';
                             }else{
                                if (count == 0) {
                                  Room = self.$firebaseArray(ref.startAt(deleted_at));
                                  status = 'deleted and empty';      
                                }else{
                                  Room = self.$firebaseArray(ref.orderByChild('message_id').startAt(from));
                                  status = 'deleted and writed';  
                                }
                             }
                        }else{
                          Room = self.$firebaseArray(ref);
                          status = 'empty';  
                        }
                    }else{
                      Room = self.$firebaseArray(ref);
                      status = 'empty';  
                    }

                    Room.$loaded()
                        .then(function(messages) { 
                            fulfill(Room,status);
                        })
                        .catch(function(error) {reject(error);return Room;});
                });  
            });
        });
    }
    infiniteScroll($id,from,force) {
        let self = this;
        var status = 'not changed';
        var Room = null;
        var count = self.getMessageCount($id);
        var deleted_at = self.RoomData[$id];
        var limit = count - from;
        if (count-limit>deleted_at) {var from = count - limit ;}else{var from = deleted_at;}
             return new Promise((fulfill, reject) => {

                    var ref = firebase.database().ref("chat/"+$id+'/data').orderByChild('message_id');
                    var Rooms = firebase.database().ref('Rooms/' + self.chatter.uid + '/' + $id);
                    var chat = firebase.database().ref("chat/"+$id);
                    Rooms.once("value")
                      .then(function(snap) {
                       var deleted_at = snap.val().deleted_at;
                       chat.once("value")
                        .then(function(snapshot) {
                            var all_count = snapshot.child("data").numChildren();
                            if (snapshot.hasChild("data") && snapshot.child("data").hasChildren()) {
                                if ( all_count == count || force) {
                                        status = 'normal';
                                    }else{
                                        if (count == 0) {
                                          status = 'deleted and empty';      
                                        }else{
                                          status = 'deleted and writed';  
                                        }
                                     }
                            }else{
                              status = 'empty';  
                            }
                            // console.log("status:"+status);
                             switch(status) {
                                    case 'deleted and writed':
                                      Room = self.$firebaseArray(ref.startAt(from));
                                      // console.log("limit is:"+from);
                                        break;
                                    case 'empty':
                                    case 'deleted and empty':
                                      Room = self.$firebaseArray(ref.startAt(deleted_at));
                                      // console.log("limit is:"+deleted_at);
                                        break;
                                    default:
                                      Room = self.$firebaseArray(ref.startAt(from));
                                      // console.log("limit is:"+from);
                                }
                            Room.$loaded()
                                .then(function(messages) { 
                                     // console.log(messages.length)
                                   fulfill(messages);
                                })
                                .catch(function(error) {reject(error);});
                        });  
                    });
                // });
            });
    }
    FirstRoom(RoomName){
      let self = this;
      return new Promise((fulfill, reject) => {
        self.Rooms.$loaded()
          .then(function(Rooms) {
            if (Rooms) {
                var counter = 0;
                var data ={};
                if (RoomName) {
                     while(!data.FirstRoom){
                        Rooms.forEach(function(currentValue, index, arr) {
                            if (RoomName ==currentValue.name) {
                                if (!currentValue.deleted) {
                                    data.FirstRoom = currentValue.name
                                }else{
                                     self.unDeleteRoom(RoomName)
                                    data.FirstRoom = RoomName
                                }
                            }else{
                            }
                        });
                    }
                }
                if (!data.FirstRoom || !RoomName){
                    while(!data.FirstRoom){
                        if (Rooms[counter].deleted){
                            counter++;
                        }else{
                            data.FirstRoom = Rooms[counter].name;
                            data.selected = counter;
                            data.roomName=Rooms[counter].display;
                        }
                    }
                } 
                fulfill(data);
            }
        });
      })
    }
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////  check Function ///////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
    checkIfUserExist(resolve, FB_UID, name, id) {
        let self = this;
        var a = self.friends.indexOf(parseInt(FB_UID));
        if (self.friends[FB_UID] != id) {
            console.log('new!!')
            return self.registerRoom(self.$rootScope.me.id, id, 'personal', self.$rootScope.me.name + ' ' + self.$rootScope.me.last_name, resolve);
        } else {
            self.temp.name = name;
            self.temp.FB_UID = FB_UID;
            self.temp.Room_name = self.myfriends[FB_UID].Room;
            self.unDeleteRoom(self.temp.Room_name);
            self.NowRoom = self.temp.Room_name;
            console.log('exist!!')
            var count = self.getMessageCount(self.temp.Room_name);
                       self.getRoom(self.myfriends[FB_UID].Room, count).then(function(Room) {
                            var R = Room;
                            Room.$loaded()
                                .then(function(x) {
                                    // self.$rootScope.messages[self.NowRoom] = Room;
                                    // self.$rootScope.messages[self.NowRoom].RoomNow = self.NowRoom;
                                });
                            resolve(self.myfriends[FB_UID].Room, self.temp.name, self.getRoomNow())
                            return R;
                        }); 
            
        }
    }
    checkVariables(){
        
    }
    checkStatus() {
        let self = this;
          self.amOnline = firebase.database().ref('.info/connected');
          if (self.chatter.uid) {
              self.userRef = firebase.database().ref('Online_Users/' + self.chatter.uid);
          } else {
              self.userRef = firebase.database().ref('Online_Users/' + self.$rootScope.me.FB_UID);
          }
        self.amOnline.on('value', function(snapshot) {
            if (snapshot.val()) {
                self.userRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
                self.userRef.set(true);
                // console.log('â˜… online');
            }
        });
        self.$rootScope.$on('IdleStart', function() {
            self.userRef.set('â˜† idle');
            // console.log('â˜† idle');
        });
        self.$rootScope.$on('IdleWarn', function(e, countdown) {
            // self.userRef.set('â˜„ away');
            // console.log('â˜„ away');
        });
        self.$rootScope.$on('IdleEnd', function(isIdle, isAway) {
            self.userRef.set(true);
            // console.log('â˜… online');
        });
    }
    onlineUsers() {
        var self = this;
        var $firebaseArray = this.$firebaseArray;
        var fb = firebase.database().ref();
        self.Online_Users = $firebaseArray(fb.child('Online_Users'));
        self.checkStatus();
        self.Online_UsersId = self.Online_Users.$$getKey();
        self.Online_Users.forEach(function(item, index) {
            if (typeof(item) == 'object') {
                if (item.$value == true) {
                    Object.keys(self.Rooms[index].chatter).map(function(i, key) {
                        if (self.$rootScope.me.id != self.Rooms[index].participant[key]) {
                            friends.push(self.Rooms[index].participant[key]);
                            myfriends.push({
                                id: self.Rooms[index].participant[key],
                                uid: i,
                                Room: item.name,
                                data: self.Rooms[index]
                            });
                        }
                    });
                }
            }
        });
        return self.Online_Users;
    }
    reloadFriend() {
        var self = this;
        var myfriends = [];
        var friends = [];
        self.Rooms.forEach(function(item, index) {
            if (typeof(item) == 'object') {
                if (item.type == 'personal') {
                    // myfriends.push(self.Rooms[index]);
                    Object.keys(self.Rooms[index].chatter).map(function(i, key) {
                        if (self.$rootScope.me.FB_UID != i) {
                            friends[i] = parseInt(self.Rooms[index].participant[i]);
                            myfriends[i] = {
                                id: self.Rooms[index].participant[i],
                                uid: i,
                                Room: self.Rooms[index].name,
                                data: self.Rooms[index]
                            };
                            angular.element('.lv-body').scrollTop(100000, 0);
                            // friends[item.name] = self.Rooms[index].participant[key];
                            // friends[item.name] = {id:self.Rooms[index].participant[key],uid:i,Room:i};
                        }
                    });
                }
            }
        });
        self.myfriends = myfriends;
        self.friends = friends;
        return self.myfriends;
    }
    getMyFriendChat() {
        var self = this;
        self.reloadFriend();
        return self.myfriends;
    }
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
////////////////// services & send Function //////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
    registerRoom($owner, $participant, $type, $name, resolve) {
        let self = this;
        var data = {
            participant: $participant,
            owner: $owner,
            type: $type,
            name: $name
        }; 
        self.API.all('chat/add-new-room').post(data).then((response) => {
            var Room_name = response.Rooms[Object.keys(response.Rooms)[0]].name;
            var user_name = response.Rooms[Object.keys(response.Rooms)[0]].display;
            var owner_id = response.Rooms[Object.keys(response.Rooms)[0]].participant[0];
            self.RoomName[Room_name] = Room_name
            self.temp.Room_name = Room_name;
            self.temp.name = user_name;
            self.temp.id = owner_id;
            self.NowRoom = Room_name;
                resolve(Room_name, $name, owner_id)
            // self.getRoom(Object.keys(response.chat)[0], 10).then(function(Room) {
            //     // return self.Room[Object.keys(response.Rooms)[0].name] = Room;
            // });
        }, (response) => {});
    }
    addMessage($id, $from, $message, Room) {
        var self = this;
        if ($message.trim() != '&nbsp;'){

            return new Promise(function(fulfill, reject) {
                self.$rootScope.RoomNow = Room;
                var count = self.getMessageCount(Room);
                 if (!count) count = 0;
                    self.Room[Room].$add({
                        message_id:count,
                        from: $from,
                        id: self.chatter.uid,
                        content: self.$crypto.encrypt($message),
                        type: 'text',
                        seen: false,
                        timestamp: firebase.database.ServerValue.TIMESTAMP
                    }).then(function(ref) {
                        angular.element('.lv-body').scrollTop(100000, 0);
                        angular.element('#' + Room + ' .popup-messages').scrollTop(angular.element('.popup-messages').prop('scrollHeight'));
                        self.updateMessagesOption($message);
                        return "";
                    });
            });
        }
    };
    UploadFile(fileList, $id) {
        var self = this;
        var fileExt = fileList[0].name.split('.').pop();
        var fileName = fileList[0].name;
        if (fileExt == 'jpg' || fileExt == 'png' || fileExt == 'jpeg' || fileExt == 'gif') {
            var fileType = 'image';
        } else {
            var fileType = 'file';
        }
        var $firebaseArray = this.$firebaseArray;
        var fb = firebase.database().ref();
        self.fileToUpload = null;
        self.$rootScope.RoomNow = $id;
        var a = new Date().getTime()
        self.uploaded = "chat/" + $id + "/" + a;
        var storageRef = firebase.storage().ref(self.uploaded);
        var storage = self.$firebaseStorage(storageRef);
        self.fileToUpload = fileList[0];
        var file = self.fileToUpload
        var uploadTask = storage.$put(file);
        uploadTask.$complete(function(snapshot) {
            self.updateMessagesOption(fileName);
            var Room = $firebaseArray(fb.child('chat').child(self.$rootScope.RoomNow).child('data'))
             var count = self.getMessageCount($id);
                 Room.$add({
                    message_id:self.getMessageCount($id),
                    from: self.$rootScope.me.name,
                    id: self.$rootScope.me.FB_UID,
                    type: fileType,
                    fileName: fileName,
                    seen: false,
                    content: snapshot.downloadURL,
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                }); 
        });
    }
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
////////////////////Modify & Delete data//////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
    updateMessagesOption($message) {
        var self = this
        if (self.getRoomNow()) {self.$rootScope.RoomNow = self.getRoomNow();}
        self.Rooms.forEach(function(currentValue) {
            if(self.$rootScope.RoomNow){
                if (currentValue.name == self.$rootScope.RoomNow){
                    self.myRoomInRooms = currentValue
                }
            }
        });
        var myRoomInRooms = self.myRoomInRooms
        var Room = myRoomInRooms.name
        Object.keys(myRoomInRooms.chatter).forEach(function(currentValue, index, arr){
            var updates = {};
            var Rooms = firebase.database().ref('Rooms/' + currentValue + '/' + Room);
            Rooms.once('value', function(snapshot) {
                self.unReaded = snapshot.val().unReaded;
                if (Object.keys(updates).length == 0) {
                    updates['/Rooms/' + currentValue + '/' + Room + '/count'] = snapshot.val().count + 1;
                    updates['/Rooms/' + currentValue + '/' + Room + '/updatedAt'] = firebase.database.ServerValue.TIMESTAMP;
                    updates['/Rooms/' + currentValue + '/' + Room + '/lastMessage'] = self.$crypto.encrypt($message);
                    if (snapshot.val().name == Room && currentValue == self.chatter.uid) {
                        updates['/Rooms/' + currentValue + '/' + Room + '/unReaded'] = 0;
                    } else {
                        updates['/Rooms/' + currentValue + '/' + Room + '/unReaded'] = parseInt(snapshot.val().unReaded) + 1;
                    }
                    firebase.database().ref().update(updates);
                }
            });
        });
            var updates = {};
             var chat = firebase.database().ref('chat/' + Room );
            chat.once('value', function(snapshot) {
                if (Object.keys(updates).length == 0) {
                    // updates['chat/' + Room + '/option'+ '/count'] = snapshot.val().option.count + 1;
                    updates['chat/' + Room + '/option'+ '/lastMessageFrom'] = self.chatter.uid;
                    firebase.database().ref().update(updates);
                }
            });
    }
    deleteRoom(id, mCount, object) {
        let self = this;
        var updates = {};
        var ref = firebase.database().ref("chat/"+id+'/data');
        ref.once('value', function(Snapshot) {
            updates['/Rooms/' + self.chatter.uid + '/' + id + '/count'] = 0; 
            updates ['/Rooms/' + self.chatter.uid + '/' + id + '/deleted'] = true;
            updates ['/Rooms/' + self.chatter.uid + '/' + id + '/deleted_at'] =  Snapshot.numChildren();
        firebase.database().ref().update(updates);
        });
    }
    unDeleteRoom(id) {
        let self = this;
        var updates = {};
        updates['/Rooms/' + self.chatter.uid + '/' + id + '/deleted'] = false;
        // updates['/Rooms/' + self.chatter.uid + '/' + id + '/deleted_at'] = false;
        firebase.database().ref().update(updates);
    }
    deleteMessage(Room, id) {
        let self = this;
        var item = Room[Room.$indexFor(id)];
        Room.$remove(item);
    }
     updateUserData(id) {
    }
    setReaded(uid, Room) {
        var updates = {};
        updates['/Rooms/' + uid + '/' + Room + '/unReaded'] = 0;
        firebase.database().ref().update(updates);
        return updates;
    }
    setAddUnReaded(uid, Room, message) {
        var self = this;
        var updates = {};
        updates['/Rooms/' + uid + '/' + Room + '/unReaded'] = 0;
        updates['/Rooms/' + uid + '/' + Room + '/unReaded'] = parseInt(self.unReaded) + 1;
        firebase.database().ref().update(updates);
        return updates;
    }
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
////////////////////sign in & up users ///////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
    signOut() {
         var $firebaseAuth = this.$firebaseAuth();
         $firebaseAuth.$signOut();
         return 'sign Out successfully';
    }
    signIn(fulfill, reject,u) {
        var self = this;
        var $firebaseAuth = this.$firebaseAuth();
        // console.log(self.$rootScope.me.id + '@edzance.com', self.$rootScope.me.FB_PASS)
        $firebaseAuth.$signInWithEmailAndPassword(u.id + '@edzance.com', u.FB_PASS)
            .then(function(user) {
                self.chatter.uid = user.uid;
                self.chatter.entered = true;
                var data = {
                    uid: user.uid,
                    id: u.id
                };
                self.API.all('chat/set-uid').post(data);
                fulfill(user.uid);
                return user;
            }).catch(function(error) {
                reject(error);
            });
    }
    signIn2(id, pass) {
        var self = this;
        var $firebaseAuth = this.$firebaseAuth();
        self.auth.signInWithEmailAndPassword(id,pass)
            .then(function(user) {
                var data = {
                    uid: user.uid,
                    id: self.$rootScope.me.id
                };
                    console.log('signed In');

            }).catch(function(error) {
                console.log(error)
            });
    }
    signUp(fulfill, reject,u) {
        var self = this;
        var $firebaseAuth = this.$firebaseAuth();
        var API = this.API;
        if (u) console.log("user:",u);
        $firebaseAuth.$createUserWithEmailAndPassword(u.id + '@edzance.com', u.FB_PASS)
            .then(function(user) {
                self.chatter.uid = user.uid;
                var data = {
                    uid: user.uid,
                    id: u.id
                };
                API.all('chat/set-uid?token='+self.token).post(data);
                self.signIn(fulfill, reject,u);
                return user;
            }).catch(function(error) {
                // self.signIn(); 
                if (error.code == 'auth/email-already-in-use') {
                    self.signIn(fulfill, reject,u);
                } else {}
                // self.signIn(); 
            });
    }
    findOrCreate(fulfill, reject,u) {
        let self = this;
        var $firebaseAuth = this.$firebaseAuth();
        var auth = $firebaseAuth.$getAuth();
        firebase.auth().signInWithEmailAndPassword(u.id + '@edzance.com', " ").catch(function(error) {
            if(error.code === "auth/wrong-password") {
                self.signIn(fulfill,reject,u);
            } else if(error.code === "auth/user-not-found"){
                self.signUp(fulfill,reject,u);
            }
        });
        // if (!auth) {
        //     self.signUp(fulfill, reject,user);
        // } else {
        //     self.signIn(fulfill, reject,user);
        // }
        // return auth;
    }
}