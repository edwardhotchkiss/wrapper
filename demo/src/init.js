
// configure
require.config({
  baseUrl: './dist',
  paths: {
    'skeleton': 'wrapper-demo-0.0.1.min'
  },
  shim: {
    skeleton: {
      exports: 'Skeleton',
      deps: []
    }
  }
});

// initialize
require(['skeleton'], function(Skeleton) {
  'use strict';
  var skeleton = new Skeleton({ name : 'skeletonAMD' });
});
