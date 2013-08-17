// wrapper v0.0.3 
// http://github.com/CandidBlend/wrapper
(function(n){"use strict";function e(n){return n.charAt(0).toUpperCase()+n.slice(1)}n.wrapper=function(t,i,r){var u="function"==typeof define&&define.amd?define:function(t,i,r){i=i.map(function(t){return"jquery"===t?n[$]:n[e(t)]}),n[e(t)]=r.apply(null,i)};return function(n){n(t,i,r)}(u)}})(window);

wrapper('logger', [], function() {
  'use strict';
  var _hasConsole = (typeof(window.console) === 'object');
  return {
    log: function(msg) {
      if (!_hasConsole) {
        return;
      }
      var log, args;
      args = Array.prototype.slice.call(arguments);
      log = Function.prototype.bind.call(console.log, console);
      log.apply(console, args);
    }
  };
});


wrapper('skeleton', ['logger'], function(Logger) {
  'use strict';
  function Skeleton(params) {
    params = params || {};
    this.name = params.name || 'default';
    this.initialize();
  }
  Skeleton.prototype = {
    initialize: function() {
      Logger.log('this skeleton\'s name is %s', this.name);
    }
  };
  return Skeleton;
});
