
/**
 * @library wrapper.js
 * @author Edward Hotchkiss <edward@candidblend.la>
 * @contributor Avi Deitcher <avi@deitcher.net>
 * @description Wraps any function/module/object/lib within an
 * AMD-compliant definition if possible, otherwise binding to `window`
 * @license MIT
 */

(function(root) {

  'use strict';

  // fn entry point
  function _wrapper(name, deps, fn) {

    // format dep name to first char uppercase
    function _formatDepName(d) {
      return d.charAt(0).toUpperCase() + d.slice(1);
    }

    // description window or empty obj depending on require being defined
    var _root = (typeof(require) !== 'undefined' && require.amd) ?
      {} : window;

    // requirejs define or alternate
    var _define = (typeof(define) === 'function' && define.amd) ? 
      define : function(name, deps, fn) {
        var formated;
        // process deps
        deps = deps.map(function(dep, index) {
          if (dep ==='jquery') {
            return root[$];
          } else {
            return root[_formatDepName(dep)];
          }
        });
        root[name] = fn.apply(null, deps);
      };

    // execution and assignment block
    return (function(root, define) {
      define(name, deps, fn);
    }(_root, _define));
  
  }

  // bind "wrapper" to window (root scope)
  root.wrapper = _wrapper;

}(window));
