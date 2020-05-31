class UserVerificationController {
  constructor ($stateParams) {
    'ngInject'
    this.alerts = []

    if ($stateParams.status === 'success') {
      this.alerts.push({ type: 'success', 'title': 'تمت عملية التسجيل!', msg: 'تمت عملية تأكيد بريدك الالكتروني.' })
    } else {
      this.alerts.push({ type: 'danger', 'title': 'خطأ:', msg: 'خطأ في عملية تأكيد البريد الالكتروني ، حاول مرة اخرى ؟؟.' })
    }
  }

  $onInit () {}
}

export const UserVerificationComponent = {
  templateUrl: './views/app/components/user-verification/user-verification.component.html',
  controller: UserVerificationController,
  controllerAs: 'vm',
  bindings: {}
}
