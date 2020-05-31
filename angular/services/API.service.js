export class APIService {
  constructor (Restangular, $window,toastr,$state) {
    'ngInject'
    // content negotiation
    var headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/x.laravel.v1+json'
    }

    return Restangular.withConfig(function (RestangularConfigurer) {
      RestangularConfigurer
        .setBaseUrl('/api/')
        .setDefaultHeaders(headers)
        .setDefaultHeaders({isAngular: 'true'})
        .setErrorInterceptor(function (response) {
          // if (response.status === 422) {
          //   for (var error in response.data.errors) {
          //   return toastr.error(response.data.errors[error][0],error)
          //   }
          // }
          //  if (response.status === 500) {
          //   if (response.config.url == "/api/users/me") {
          //     $state.reload();
          //     toastr.error('خطأ في جلب معلوماتك الخاصة ستتم اعادة تحميل الصفحة');
          //     let UserData = this.service('me', API.all('users')) 
          //      return UserData.one().get()
            
          //   }
          //   console.log(response)
          //   return toastr.error(response.statusText)
          // }
        })
        .addFullRequestInterceptor(function (element, operation, what, url, headers) {
          var token = $window.localStorage.satellizer_token
          if (token) {
            headers.Authorization = 'Bearer ' + token
          }
        })
        .addResponseInterceptor(function (response, operation, what) {
          if (operation === 'getList') {
            var newResponse = response.data[what]
            newResponse.error = response.error
            return newResponse
          }

          return response
        })
    })
  }
}
