routeHtmlClass.$inject = ['$rootScope']
function routeHtmlClass ($rootScope) {
  return {
    scope: {ngModel: '=ngModel'},
    link: function routeHtmlClassLink (scope, elem) {
      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) { // eslint-disable-line angular/on-watch
        let fromClassnames = angular.isDefined(fromState.data) && angular.isDefined(fromState.data.htmlClass) ? fromState.data.htmlClass : null
        let toClassnames = angular.isDefined(toState.data) && angular.isDefined(toState.data.htmlClass) ? toState.data.htmlClass : null

        if (fromClassnames != toClassnames) {
          if (fromClassnames) {
            elem.removeClass(fromClassnames)
          }

          if (toClassnames) {
            elem.addClass(toClassnames)
          }
        }
      })
    },
    restrict: 'EA'
  }
}

export const routeHtmlClassComponent = routeHtmlClass
