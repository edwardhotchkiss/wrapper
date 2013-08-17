
wrapper('skeleton', ['logger'], function(Logger) {
  'use strict';
  function Skeleton(params) {
    params = params || {};
    this.name = params.name || 'default';
    this.initialize();
  }
  Skeleton.prototype = {
    initialize: function() {
      Logger.log('this skeleton\'s name is %s', this.name);
    }
  };
  return Skeleton;
});
