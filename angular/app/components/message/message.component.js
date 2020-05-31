class MessageController {
    constructor($stateParams, $state, chatMessages, $rootScope, $scope, $crypto, $firebaseArray, moment) {
        'ngInject';
        this.$scope = $scope;
        this.$scope.moment = moment;
        this.$scope.$crypto = $crypto;
        this.$rootScope = $rootScope;
    }

    $onInit() {}
}
export const MessageComponent = {
    templateUrl: './views/app/components/message/message.component.html',
    controller: MessageController,
    controllerAs: 'mc',
    bindings: {}
}