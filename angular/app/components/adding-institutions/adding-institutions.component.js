class AddingInstitutionsController{
    constructor(){
        'ngInject';
        angular.element('html').scrollTop(0);
        //
    }

    $onInit(){
    }
}

export const AddingInstitutionsComponent = {
    templateUrl: './views/app/components/adding-institutions/adding-institutions.component.html',
    controller: AddingInstitutionsController,
    controllerAs: 'vm',
    bindings: {}
}


