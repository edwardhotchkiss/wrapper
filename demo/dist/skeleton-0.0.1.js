// wrapper v0.0.5 
// http://github.com/CandidBlend/wrapper/
(function(n){"use strict";function e(n){return n.charAt(0).toUpperCase()+n.slice(1)}var o={jquery:"$",lodash:"_",underscore:"_"};n.wrapper=function(r,t,i){var u="function"==typeof define&&define.amd?define:function(r,t,i){t=t.map(function(r){return void 0!==o[r.toLowerCase()]?n[o[r.toLowerCase()]]:n[e(r)]}),console.log(t),n[e(r)]=i.apply(null,t)};return function(n){n(r,t,i)}(u)}})(window);

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
