class EducationalInstitutionsController{
    constructor(){
        'ngInject';
        angular.element('html').scrollTop(0);
        //
    }

    $onInit(){
    }
}

export const EducationalInstitutionsComponent = {
    templateUrl: './views/app/components/educational-institutions/educational-institutions.component.html',
    controller: EducationalInstitutionsController,
    controllerAs: 'vm',
    bindings: {}
}


