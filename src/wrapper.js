
/**
 * @library wrapper
 * @author Edward Hotchkiss <edward@edwardhotchkiss.com>
 * @contributor Avi Deitcher <avi@deitcher.net>
 * @description amd is lovely. requirejs is total bullshit, 
 * along with its disgusting child r.js. let's fix that
 * @license MIT
 */

(function(root) {

  'use strict';

  var _modules = {}

  /**
   * @private _processDeps
   * @description find and attach dependencies as module defs
   */

  function _processDeps(deps) {
    return _.map(deps, function(dep, index) {
      return (root[dep] || _modules[dep]) ||
        new Error('Unknown Module - ("' + dep + '")!');
    });
  }

  /*
   * @private _define
   * @description determines define function and deps
   */

  var _define = (typeof(define) === 'function') ? 
    define : function(id, deps, fn) {
      var args = [].slice.call(arguments);
      id = (typeof(args[0]) === 'string') ? args.shift() : null;
      deps = (args.length > 1) ? _processDeps(args.shift()) : [];
      fn = args[0];
      if (id) {
        _modules[id] = fn.apply(this, deps);
      } else {
        return fn.apply(this, deps)
      }
    };

  /*
   * @globals define/require
   * @description blast that
   */

  root.define = root.require = _define;

}(window));
