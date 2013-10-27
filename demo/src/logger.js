
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
