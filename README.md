# wrapper [![Build Status](https://secure.travis-ci.org/CandidBlend/wrapper.png)](http://travis-ci.org/CandidBlend/wrapper)

> Wraps any library/function/object within an AMD-compliant definition if possible, otherwise binding to `window`

### What is "wrapper"?

After dealing with the cumbersome spaghetti code of RequireJS/AMD testing, and library setup depending on users state, I decided to simply encapsulate it into a short function, where you `return` your library. This could be in the form of a constructor function, an object, etc. This library is **geared towards users that wish to write libraries** in a fast, standardized way while supporting either the general `window.MyLibrary` or being able to use `AMD/RequireJS`. Either way, the syntax is simple, two lines of code replace the typical libraries opening/ending closure lines.

If the user is using RequireJS, then nothing is aliased (excluding `wrapper`) to the `window`, and is available in usual fashion through RequireJS. Otherwise, the user can access your library through a general `MyLibrary` or `window.MyLibrary`. Two lines of code wrapped around your library can create a highly compartmentalized module and allow users using Require and other AMD loaders to use your library without any extra work.

### Why?

  * Rapid Local Development in small modules
  * Use great tools like RequireJS to keep organized
  * Break large tools into testable, distinct files
  * No RequireJS knowledge needed

### Examples

**Setup:**

_Creates two modules, one which depends on the other_

```javascript
// basic console logging module
wrapper('logger', [], function() {
  return {
    log: function(msg) {
      console.log(msg);
    }
  };
});

// trivial app that depends on "Logger"
wrapper('trivial', ['logger'], function(Logger) {
  var Trivial = function(name) {
    this.name = name;
  };
  Trivial.prototype.init = function() {
    Logger.log('initializing Trivial as: "'+this.name+'"');
  };
  return Trivial;
});
```

_Your library/code works exactly as before. If you or a user aren't using RequireJS/AMD, then the usage is straight-forward: your library is aliased to window. In this case then, simple reference `Blog` or `window.Blog` (see below):_

**Usage _WITHOUT_ RequireJS:**

```javascript
// document ready
$(function() {
  (new Trivial('trivialWindow')).init();
});
```

**Usage _WITH_ RequireJS:**

```javascript
// requirejs gobal config
require.config({
  baseUrl: 'js/',
  optimize: 'none',
  inlineText: true,
  paths: {
    'trivial'  : 'src/trivial.js'
  },
  shim: {
    trivial: {
      exports: 'Trivial',
    }
  }
});

// document ready
$(function() {
  require(['trivial'], function(Trivial) {
    (new Trivial('trivialAMDRequire')).init();
  });
});
```

