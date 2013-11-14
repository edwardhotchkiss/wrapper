  
/**
 * @library wrapper.js
 * @author Edward Hotchkiss <edward@candidblend.la>
 * @contributor Avi Deitcher <avi@deitcher.net>
 * @license MIT
 */

(function(root) {

  'use strict';

  /**
   * @private _modules
   */

  var _modules = {};

  /**
   * @private _depMaster
   */
    
  function _depFinder(deps) {
    return deps.map(function(dep, index) {
      return ((root[dep] !== undefined) ?
        root[dep] : _modules[dep]) || new Error('Unknown dependency! (' + dep + ')');
    });
  }

  /**
   * @global define()
   */

  root.define = (typeof(define) === 'function' && define.amd) ?
    define : function(name, deps, fn) {
      deps = _depFinder(deps);
      _modules[name] = fn.apply(null, deps);
    };

  /**
   * @global require()
   * depending on environment
   * @param {String} name alias of module, lowercase
   * @param {Array} deps list of strings that are dependencies
   * @param {Function} fn return Function to build module
   */

  root.require = (typeof(require) === 'function') ?
    require : function(name, deps, fn) {
      return (function() {
        deps = _depFinder(deps);
        var _main = fn.apply(null, deps);
        new _main().init();
      }());
    };

}(window, undefined));
