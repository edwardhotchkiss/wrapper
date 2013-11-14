# wrapper [![Build Status](https://secure.travis-ci.org/CandidBlend/wrapper.png)](http://travis-ci.org/CandidBlend/wrapper)

> Wraps any library/function/object within an AMD-compliant definition if possible, otherwise using an internal `require` and `define`

### Example

**Setup:**

_Creates two modules, one which depends on the other_

```javascript
// define logger internally
define('logger', [], function() {
  return {
    startedAt: (new Date().getTime()),
    elapsed: function() {
      return (new Date().getTime() - this.startedAt);
    },
    pad: function(ms) {
      var _max = '000000';
      return (_max + ms).slice(-(_max.length));
    },
    log: function(message) {
      var log, args, name;
      args = Array.prototype.slice.call(arguments);
      args[0] = ('LOG [' + this.pad(this.elapsed()) + '] > ') + message;
      log = Function.prototype.bind.call(console.log, console);
      log.apply(console, args);
    }
  };
});

// main fn execution blog, requiring "logger"
require('main', ['logger'], function(Logger) {
  var Main = function(name) {
    this.name = 'main_module';
  };
  Main.prototype.init = function() {
    Logger.log('name: %s', this.name);
  };
  return Main;
});
```
