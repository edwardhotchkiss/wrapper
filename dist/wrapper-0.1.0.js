  
/**
 * @library wrapper.js
 * @author Edward Hotchkiss <edward@candidblend.la>
 * @contributor Avi Deitcher <avi@deitcher.net>
 * @description wraps any function/module/object/lib within an
 * AMD-compliant definition if possible, otherwise binding to `window`
 * @license MIT
 */

(function(root) {

  'use strict';

  /**
   * @private _weirdKids
   * @description abbreviations or strange standards for vendored globals
   */

  var _root, _define, _weirdKids = {
    'jquery'     : '$',
    'lodash'     : '_',
    'underscore' : '_'
  };

  /**
   * @private _root
   * @description assign root correct value based on AMD existence
   */

  _root = (typeof(require) === 'undefined') ?
    root : {};

  /**
   * @private _define
   * @description determines define function and deps
   */

  _define = (typeof(define) === 'function' && define.amd) ?
    define : function(name, deps, fn) {
      deps = deps.map(function(dep, index) {
        // check for _ or $
        return (_weirdKids[dep.toLowerCase()] !== undefined) ?
          _root[_weirdKids[dep.toLowerCase()]] : _root[_formatDepName(dep)];
      });
      _root[_formatDepName(name)] = fn.apply(null, deps);
    };

  /**
   * @private _formatDepName
   * @description format dependency name to be lowecase excluding first char
   * @param {String} dep dependency string
   * @return {String} formated dep
   */

  function _formatDepName(dep) {
    return dep.toLowerCase().replace(/(\w){1}/, function(first) {
      return first.toUpperCase();
    });
  }

  /**
   * @method wrapper
   * @description creates an AMD compliant or window aliased obj/fn module setup
   * depending on environment
   * @param {String} name alias of module, lowercase
   * @param {Array} deps list of strings that are dependencies
   * @param {Function} fn return Function to build module
   * @optional {Boolean} invoke instantiate module on define? (default false)
   * @return {Function} module definition 
   */

  root.wrapper = function(name, deps, fn, invoke) {

    // invoke on definition? / module reference
    var _invoke, _module;

    // default to false, coerce to boolean
    _invoke = !!~~invoke;

    // return "defined" module
    return (function(define) {
      // define module
      define(name, deps, fn);
      // invoke a new instance on definition?
      if (invoke === true && _root === window) {
        _module = _root[_formatDepName(name)];
        new _module();
      }
    }(_define));

  };

}(window));
