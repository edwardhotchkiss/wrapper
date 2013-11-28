
/**
 * @library wrapper
 * @author Edward Hotchkiss <edward@candidblend.la>
 * @contributor Avi Deitcher <avi@deitcher.net>
 * @description extremely small boilerplate for building an AMD compatable library.
 * the idea being that the author is writing modules which are concatenated together
 * into a single file, removing the need to use "./" location/config file references
 * @license MIT
 */

(function(root) {

  'use strict';

  /**
   * @private _modules
   * @description list of modules in lib
   */

  var _modules = {};

  /**
   * @private _findDependency
   * @description find and attach dependencies as module defs
   */

  function _findDependency(dependencies) {
    return dependencies.map(function(dependency, index) {
      return (root[dependency] || _modules[dependency]) ||
        new Error('Unknown Module - ("' + dependency + '"")!');
    });
  }

  /**
   * @global define
   */

  root.define = (typeof(define) === 'function' && define.amd) ?
    root.define : function(name, dependencies, fn, isModule) {
      isModule = isModule || true;
      dependencies = _findDependency(dependencies);
      if (isModule === true) {
        _modules[name] = fn.apply(null, dependencies);
      } else {
        return fn.apply(null, dependencies);
      }
    };

  /**
   * @global require
   * @param {String} name alias of module, lowercase
   * @param {Array} dependencies list of strings that are dependencies
   * @param {Function} fn return Function to build module
   */

  root.require = (typeof(require) === 'function') ?
    root.require : function(name, dependencies, fn) {
      return root.define(name, dependencies, fn, false);
    };

}(window));
