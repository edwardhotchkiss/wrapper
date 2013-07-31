
# Wrapper

> Wraps any library/function/object within an AMD-compliant definition if possible, otherwise binding to `window`

### What is "Wrapper"?

After dealing with the cumbersome spaghetti code of RequireJS/AMD testing, and library setup depending on users state, I decided to simple encapsulate it into a two line function, where you `return` your library. This could be in the form of a constructor function, an object, etc. 

If the user is using RequireJS, then nothing is aliased (excluding `Wrapper`) to the `window`, and is available in usual fashion through RequireJS. Otherwise, the user can access your library through a general `MyLibrary` or `window.MyLibrary`. Two lines of code wrapped around your library can create a highly compartmentalized module and allow users using Require and other AMD loaders to use your library without any extra work.

### Why?

  * Rapid Local Development in small modules
  * Use great tools like RequireJS to keep organized
  * Break large tools into testable, distinct files
  * No RequireJS knowledge needed

### Examples

**Setup:**

_Creates two modules, one which depends on the other_

```javascript

// creates a simpler Logger module
Wrapper('Logger', [], function() {
  return {
    log: function(msg) {
      console.log(msg);
    }
  };
});

// create a mock "Blog" lib 
Wrapper('Blog', ['logger'], function(Logger) {
  // lib constructor
  var Blog = function(params) {
    this.title = params.title || 'unknown';
    return this;
  };
  Blog.prototype.init = function() {
    // reference and use "Logger" module
    Logger.log('init "Blog": '+this.title);
  };
  // return lib!
  return Blog;
});

```

_Your library/code works exactly as before. If you or a user aren't using RequireJS/AMD, then the usage is straight-forward: your library is aliased to window. In this case then, simple reference `Blog` or `window.Blog` (see below):_

**Usage _WITHOUT_ RequireJS:**

```javascript

// document ready
$(function() {
  var blog = new Blog({ title : 'wrapper crafted, mother approved!' });
  blog.init();
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
    'blog'  : 'src/blog.js'
  },
  shim: {
    blog: {
      exports: 'Blog',
    }
  }
});

// document ready
$(function() {
  define(['blog'], function(Blog) {
    var blog = new Blog({ title : 'wrapper crafted, mother approved!' });
    blog.init();
  });
});

```


