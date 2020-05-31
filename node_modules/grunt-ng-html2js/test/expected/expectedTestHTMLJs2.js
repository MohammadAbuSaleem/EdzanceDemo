var module = angular.module('test/fixtures/test.html', []);
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('test/fixtures/test.html',
    '<div>\n' +
    '  hello world\n' +
    '  <div ng-repeat="item in items">\n' +
    '    {{ item }} it\'s value is great\n' +
    '  </div>\n' +
    '</div>');
}]);
