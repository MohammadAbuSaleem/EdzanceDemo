var ngModule;
try {
  ngModule = angular.module('testApp');
} catch (e) {
  ngModule = angular.module('testApp', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('test/fixtures/test2.html',
    '<div>\n' +
    '  hello world 2\n' +
    '  <div ng-repeat="item in items">\n' +
    '    {{ item }} it\'s value is great\n' +
    '  </div>\n' +
    '</div>');
}]);
