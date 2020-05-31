class LoginBoxController {
    constructor($http, AclService, API, $auth, $stateParams, $rootScope, $scope, $state, toastr) {
        'ngInject';
        this.scope = $scope;
        this.$state = $state;
        this.rootScope = $rootScope;
        this.$auth = $auth;
        this.API = API;
        this.$stateParams = $stateParams;
        this.AclService = AclService;
        this.toastr = toastr;
        // $rootScope.throttle = false;

        console.log("state:",$state.current.name,'and throttle:',$rootScope.throttle);
        if ($state.current.name == "logins.login.retry" ) {
            $rootScope.throttle = true;
        }
        if ($state.current.name != "logins.login.retry" &&  $rootScope.throttle == true) {
            this.$state.go('logins.login.retry');
            $rootScope.throttle = true;
        }

        // if (this.rootScope.redirecFlag == 1) {
        //     this.$state.go('logins.login.retry');
        // }
        // Retrieve Firebase Messaging object.
        const messaging = firebase.messaging();
        messaging.requestPermission()
            .then(function() {
                // console.log('Notification permission granted.');
                // console.log(messaging.getToken());
                return messaging.getToken();
            }).then(function(Token) {
                $rootScope.token = Token;
            })
            .catch(function(err) {
                // console.log('Unable to get permission to notify.', err);
            });
    }
    login(isValid, _self) {
        //this.rootScope.redirecFlag = 0;
        if (isValid) {
            this.loginfailed = false
            this.unverified = false
            let user = {
                email: this.logemail,
                password: this.logpassword,
                recaptcha: this.gRecaptchaResponse,
                token: this.rootScope.token,
                platform: "web"
            }
            this.$auth.login(user)
                .then((response) => {
                    if (response.data.data.sucess == false) {
                        if (this.$state.current.name != "logins.login.retry") {
                            this.$state.go('logins.login.retry');
                            this.rootScope.throttle = true;

                            //this.rootScope.redirecFlag = 1;
                        }
                        // _self.scope.show_captcha = response.data.data.result.show_captcha ;
                        this.toastr.error(response.data.data.result);
                    } else {
                        this.$auth.setToken(response.data);
                        window.location.href = "/#/";
                    }
                }) 
                .catch(this.failedLogin.bind(this))
        } else {
            this.logSubmitted = true
            // console.log(this)
        }
    }
    failedLogin(res) {
        if (res.status == 401) {
            this.loginfailed = true
        } else {
            if (res.data.errors.message[0] == 'Email Unverified') {
                this.unverified = true
            }
        }
    }
    $onInit() {}
}

export const LoginBoxComponent = {
    templateUrl: './views/app/components/login-box/login-box.component.html',
    controller: LoginBoxController,
    controllerAs: 'vm',
    bindings: {}
}