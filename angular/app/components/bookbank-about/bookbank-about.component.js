class BookbankAboutController{
    constructor($stateParams,$scope,$rootScope,API){
        'ngInject';
        this.$scope = $scope
        this.$rootScope = $rootScope
        this.$stateParams = $stateParams
        //console.log($stateParams.bookId);
         
    }

    $onInit(){
    }
}

export const BookbankAboutComponent = {
    templateUrl: './views/app/components/bookbank-about/bookbank-about.component.html',
    controller: BookbankAboutController,
    controllerAs: 'vm',
    bindings: {}
}


