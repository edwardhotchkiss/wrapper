
(function(window) {

  // setup config
  var params = {
    paths: {
      app:  '../src'
    },
    shim: {}
  };

  // TDD asserts
  window.assert = chai.assert;

  // setup mocha as TDD
  mocha.setup('tdd');

  // requirejs config
  require.config(params);

  // requirejs init
  require(['init'], function(lot) {
    require(lot, function() {
      mocha.globals(['Logger','Trivial']);
      mocha.run();
    });
  });

}(window, undefined));
