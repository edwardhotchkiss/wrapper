
# wrapper

> Uses require.js if possible, otherwise defines an extremely small internal `require` and `define` factory

### Example

**Setup:**

_Creates two modules, one which depends on the other_

```javascript
define('Logger', [], function() {
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

require('Main', ['Logger'], function(Logger) {
  Logger.log('name: %s', 'Main!');
});
```
