(function() {
  angular.module("edzance", []).config(function($httpProvider) {
    return $httpProvider.interceptors.push("edzance");
  }).provider("edzance", {
    $get: function($q) {
      return {
        request: (function(_this) {
          return function(config) {
            var _ref;
            if (typeof _this.canDisableCache === "function" ? _this.canDisableCache(config.url) : void 0) {
              config.url += config.url.indexOf("?") >= 0 ? "&" : "?";
              config.url += "" + ((_ref = _this.queryStringKey) != null ? _ref : "dc") + "=" + (new Date().getTime());
            }
            return config || $q.when(config);
          };
        })(this)
      };
    }
  });

}).call(this);
