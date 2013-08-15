
define(['app/wrapper'], function() {
  suite('`wrapper()` with AMD/RequireJS & Standard "window" instance creation', function() {
    var sandbox, runs = 0;

    beforeEach(function() {
      runs++;
      sandbox = sinon.sandbox.create();
      sandbox.stub(window.console, 'log');
      sandbox.stub(window.console, 'error');
      if (runs === 3) {
        define = undefined;
        require = undefined;
      }
      wrapper('logger', [], function() {
        return {
          log: function(msg) {
            console.log(msg);
          }
        };
      });
      wrapper('trivial', ['logger'], function(Logger) {
        var Trivial = function(name) {
          this.name = name;
        };
        Trivial.prototype.init = function() {
          Logger.log(this.name);
        };
        return Trivial;
      });
    });
    afterEach(function() {
      sandbox.restore();
    });

    test('Logger/Trivial ARE NOT aliased to window', function() {
      assert.equal(window.Logger, undefined);
      assert.equal(window.Trivial, undefined);
    });

    test('logs "trivial:amd"', function(done) {
      require(['trivial'], function(Trivial) {
        (new Trivial('trivial:amd')).init();
        sinon.assert.calledWithExactly(console.log, 'trivial:amd');
        done();
      });
    });

    test('Logger/Trivial ARE aliased to window', function() {
      assert.equal(typeof(window.Logger), 'object');
      assert.equal(typeof(window.Trivial), 'function');
    });

    test('logs "trivial:window"', function() {
      (new Trivial('trivial:window')).init();
      sinon.assert.calledWithExactly(console.log, 'trivial:window');
    });

  });
});
