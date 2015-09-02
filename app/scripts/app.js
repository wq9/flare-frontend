(function(document) {
  'use strict';
  
  var app = document.querySelector('#app');
  app.ready = false;

  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
    console.log('WebComponentsReady');
    
  });
  
})(document);
