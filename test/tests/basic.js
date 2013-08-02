
define(['app/wrapper'], function() {
  suite('basic "wrapper" tests', function() {
  
    test('it initializes', function() {
      assert.ok(true);
    });

    test('it is a function', function() {
      assert.isTrue(wrapper instanceof Function);
    });
  
  });

});
