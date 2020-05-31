class ForgotPasswordController {
  constructor (API, $state, toastr) {
    'ngInject'

    this.API = API
    this.$state = $state
    this.toastr = toastr
  }

  $onInit () {
    this.email = ''
  }

  submit () {
    this.API.all('auth/password/email').post({
      email: this.email
    }).then(() => {
      this.$state.go('logins.login.index', { successMsg: `لقد ارسلنا لك رسالة لتغيير كلمة المرور ، الرجاءمراجعة بريدك الالكترونيلاتمام العملية.` })
    }, (response) => {
       this.toastr.error(response.data.errors.email[0]);
    })
  }
}

export const ForgotPasswordComponent = {
  templateUrl: './views/app/components/forgot-password/forgot-password.component.html',
  controller: ForgotPasswordController,
  controllerAs: 'vm',
  bindings: {}
}
