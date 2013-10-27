
(function(window) {

  // TDD asserts
  window.assert = chai.assert;

  // setup mocha as TDD
  mocha.setup('tdd');

  // requirejs config
  require.config({
    paths: {
      app:  '../src'
    },
    shim: {}
  });

  // requirejs init
  require(['init'], function(lot) {
    require(lot, function() {
      mocha.globals(['Logger','Trivial']);
      mocha.run();
    });
  });

}(window, undefined));
