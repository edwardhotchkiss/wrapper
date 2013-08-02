
define(['app/wrapper'], function() {
  suite('"wrapper" with standard "window.myLib" work flow', function() {

    var sandbox;

    beforeEach(function() {
      sandbox = sinon.sandbox.create();
    });

    afterEach(function() {
      sandbox.restore();
    });

    setup(function() {
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
          Logger.log('initializing Trivial as: "'+this.name+'"');
        };
        return Trivial;
      });
    });
  
    test('it can create a "wrapped" trivial library', function() {
      assert.ok(true);
    });

    test('both "Logger" and "Trivial" are aliased to the "window" object', function() {
      assert.typeOf(window.Logger, 'object');
      assert.typeOf(window.Trivial, 'function'); 
    });

    test('it can be instatiated and "logs" \'initializing Trivial as: "trivial:window"\'', function() {
      (new Trivial('trivial:window')).init();
      sinon.assert.calledWithExactly(console.log, 'initializing Trivial as: "trivial:window"');
    });
  
  });

});
