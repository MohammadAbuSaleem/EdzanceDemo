import { AclConfig } from './config/acl.config'
import { RoutesConfig } from './config/routes.config'
import { LoadingBarConfig } from './config/loading_bar.config'
import { SatellizerConfig } from './config/satellizer.config'

angular.module('app.config')
  .config(AclConfig)
  .config(RoutesConfig)
  .config(LoadingBarConfig) 
  .config(SatellizerConfig)
  .config(function($mdThemingProvider){})
  .config(function(toastrConfig) {
  angular.extend(toastrConfig, {
    autoDismiss: true,
    containerId: 'toast-container',
    maxOpened: 0,    
    newestOnTop: true,
    positionClass: 'toast-bottom-left',
    preventDuplicates: false,
    preventOpenDuplicates: false,
    target: 'body',
    progressBar:true
  });
}).config(['$cryptoProvider', function($cryptoProvider){
    $cryptoProvider.setCryptographyKey('fckgwrhqq2yxrkt8tg6w2b7q8');
}]).config(function(IdleProvider, KeepaliveProvider,TitleProvider) {
  // configure Idle settings
  IdleProvider.idle(5); // in seconds
  IdleProvider.timeout(0); // in seconds
  KeepaliveProvider.interval(2); // in seconds
  TitleProvider.enabled(false); // it is enabled by default
    
})
  .config(function($sceDelegateProvider,$locationProvider) {
    $locationProvider.html5Mode(true);
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from outer templates domain.
    'https://www.youtube.com/**'
  ]); 
});