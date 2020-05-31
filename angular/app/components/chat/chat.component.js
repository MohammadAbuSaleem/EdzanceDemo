class ChatController {
    constructor(moment, $crypto, $scope, $rootScope, ContextService, API, chatMessages, $state) {
        'ngInject';
        this.API = API;
        this.$scope = $scope;
        this.$scope.$crypto = $crypto;
        this.$scope.chatMessages = chatMessages;
        this.$rootScope = $rootScope;
        this.$rootScope.chatMessages = chatMessages;
        this.$scope.popups = [];
        this.$scope.moment = moment;
        this.$scope.total_popups = 0;
        this.$scope.myObj = {};
        this.open = 0;
        this.$scope.messages = [];
        $rootScope.message = []
        $scope.loadmore = false;
        $scope.loaded = false;
        var self = this;
        window.addEventListener("resize", $scope.calculate_popups);
        window.addEventListener("load", $scope.calculate_popups);
        $rootScope.$watch('messaging_enabled', function() {
            if ($rootScope.messaging_enabled == true) {
                $scope.addMessage = function(message, id) {
                    $rootScope.message[id] = $rootScope.chatMessages.addMessage($rootScope.me.FB_UID, $rootScope.me.name, message, id)
                }
            }
        });
        $scope.infiniteScroll = function(id) {
            return new Promise((success, error) => {
                if ($scope.loadmore != true) {
                    $scope.loadmore = true;
                    chatMessages.Rooms.forEach(function(currentValue, index, arr) {
                        if (currentValue.name == id) {
                            chatMessages.myRoomInRooms = currentValue
                        }
                    });
                    if (id) {
                        var count = chatMessages.getMessageCount(id);
                        if ($rootScope.messages[id].length >= (count - chatMessages.RoomData[id]))
                            return;
                        if (count >= 10 && $scope.limit >= 0) {
                            chatMessages.infiniteScroll(id, $scope.limit, false).then(function(moreMessages) {
                                var exist_message = $rootScope.messages[id].length;
                                var new_message = moreMessages.length
                                moreMessages.splice(new_message - exist_message, exist_message)
                                moreMessages.reverse();
                                moreMessages.forEach(function(value, key) {
                                    $rootScope.messages[id].unshift(value);
                                });
                                $scope.loadmore = false;
                                $scope.limit = $scope.limit - moreMessages.length;
                                success(1);
                            });
                        } else {
                            $scope.loadmore = false;
                        }
                    }
                }
            });
        }
        $scope.GetRoom = function($id) {
            var count = chatMessages.getMessageCount($id);
            $scope.limit = count - 20;
            if ($rootScope.messages[$id]) {
                $rootScope.messages[$id] = [];
            }
            $rootScope.chatMessages.getRoom($id, 10).then(function(Room) {
                $rootScope.messages[$id] = Room;
                $rootScope.messages[$id].RoomNow = $id;
                angular.element('#' + $id + ' .popup-messages').scrollTop(angular.element('.popup-messages').prop('scrollHeight'));
            });
        }
        $scope.close_popup = function(id) {
            for (var iii = 0; iii < $scope.popups.length; iii++) {
                if (id == $scope.popups[iii].id) {
                    $scope.popups.splice(iii, 1);
                    $scope.calculate_popups();
                    return;
                }
            }
        }
        $scope.close_all_popup = function() {
            for (var iii = 0; iii < $scope.popups.length; iii++) {
                $scope.popups.splice(iii, 1);
                $scope.calculate_popups();
                return;
            }
        }
        $rootScope.register_popup = function(id, name) {
            for (var iii = 0; iii < $scope.popups.length; iii++) {
                //already registered. Bring it to front.
                if (id == $scope.popups[iii].id) {
                    $scope.popups.splice(iii, 1);
                    $scope.popups.unshift({
                        id: id,
                        name: name
                    });
                    $scope.calculate_popups();
                    return;
                }
            }
            $scope.popups.unshift({
                id: id,
                name: name
            });
            $scope.calculate_popups(id);
        }
        $scope.calculate_popups = function(id) {
            //let self = this;
            $rootScope.$on('$stateChangeSuccess', function() {
                if ($state.current.name == 'app.message.room')
                    $scope.close_all_popup();
            })
            var width = window.innerWidth;
            if (width < 540 || $state.current.name == 'app.message.room') {
                $scope.total_popups = 0;
                $state.go('app.message.room', {
                    Room: id
                });
                $scope.close_all_popup();
            } else {
                width = width - 450;
                //320 is width of a single popup box
                $scope.total_popups = parseInt(width / 320);
            }
            $scope.display_popups();
        }
        $scope.display_popups = function() {
            var self = this;
            var left = 270;

            var iii = 0;
            for (iii; iii < $scope.total_popups; iii++) {
                if ($scope.popups[iii] != undefined) {
                    $scope.myObj = {
                        "left": left + "px",
                        "display": "block"
                    }
                    left = left + 275;
                    $scope.popups[iii].myObj = $scope.myObj;
                }
            }
            for (var jjj = iii; jjj < $scope.popups.length; jjj++) {
                $scope.myObj = {
                    "display": "none"
                }
                $scope.popups[jjj].myObj = $scope.myObj;
            }
        }
    }
    toggleMenu(id) {
        if (angular.element('#' + id).hasClass("close-box")) {
            angular.element('#' + id).removeClass('close-box');
        } else {
            angular.element('#' + id).addClass("close-box");
        }
    }
    $onInit() {}
}
export const ChatComponent = {
    templateUrl: './views/app/components/chat/chat.component.html',
    controller: ChatController,
    controllerAs: 'vma',
    bindings: {}
}