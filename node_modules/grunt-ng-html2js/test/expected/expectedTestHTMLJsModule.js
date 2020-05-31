var ngModule;
try {
  ngModule = angular.module('testApp');
} catch (e) {
  ngModule = angular.module('testApp', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('test/fixtures/test.html',
    '<div>\n' +
    '  hello world\n' +
    '  <div ng-repeat="item in items">\n' +
    '    {{ item }} it\'s value is great\n' +
    '  </div>\n' +
    '</div>');
}]);
