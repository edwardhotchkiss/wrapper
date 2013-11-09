  
/**
 * @library wrapper.js
 * @author Edward Hotchkiss <edward@candidblend.la>
 * @contributor Avi Deitcher <avi@deitcher.net>
 * @description wraps any function/module/object/lib within an
 * AMD-compliant definition.
 * @license MIT
 */

(function(root) {

  'use strict';

  /**
   * @private _modules
   */

  var _depMaster, _modules = {};

  /**
   * @private _depMaster
   */
    
  _depMaster = function(deps) {
    return deps.map(function(dep, index) {
      return (root[dep] !== undefined) ?
        root[dep] : _modules[dep];
    });
  };

  /**
   * @global define()
   */

  root.define = function(name, deps, fn) {
    deps = _depMaster(deps);
    _modules[name] = fn.apply(null, deps);
  };

  /**
   * @global require()
   * depending on environment
   * @param {String} name alias of module, lowercase
   * @param {Array} deps list of strings that are dependencies
   * @param {Function} fn return Function to build module
   */

  root.require = function(name, deps, fn) {
    return (function() {
      deps = _depMaster(deps);
      var _main = fn.apply(null, deps);
      new _main().init();
    }());

  };

}(window));
