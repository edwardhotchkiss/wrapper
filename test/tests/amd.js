
define(['app/wrapper'], function() {
  suite('"wrapper" with "AMD" via the "requirejs" work flow', function() {

    var sandbox;

    // create a sandbox with stubbed console methods
    beforeEach(function() {
      sandbox = sinon.sandbox.create();
      sandbox.stub(window.console, 'log');
      sandbox.stub(window.console, 'error');
    });

    // nuke environment changes
    afterEach(function() {
      sandbox.restore();
    });

    // before test suite init
    setup(function() {
      // create a simple "Logger" module
      wrapper('logger', [], function() {
        return {
          log: function(msg) {
            console.log(msg);
          }
        };
      });
      // create a trivial lib which depends on "Logger"
      wrapper('trivial', ['logger'], function(Logger) {
        var Trivial = function(name) {
          this.name = name;
        };
        Trivial.prototype.init = function() {
          Logger.log('initializing Trivial as: "'+this.name+'"');
        };
        return Trivial;
      });
    });
  
    test('it can create a "wrapped" trivial library', function() {
      assert.ok(true);
    });

    // make sure that neither "Logger" nor "Trivial" are aiased to the window, as we're using require/AMD
    test('both "Logger" and "Trivial" are NOT aliased to the "window" object', function() {
      assert.typeOf(window.Logger, 'undefined');
      assert.typeOf(window.Trivial, 'undefined'); 
    });

    test('it can be instatiated and "logs" \'initializing Trivial as: "trivial:amd"\'', function(done) {
      require(['trivial'], function(Trivial) {
        var trivialAMDRequire = (new Trivial('trivial:amd')).init();
        sinon.assert.calledWithExactly(console.log, 'initializing Trivial as: "trivial:amd"');
        done();
      });
    });
  
  });

});
