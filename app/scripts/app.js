(function(document) {
  'use strict';
  
  var app = document.querySelector('#app');
  app.ready=false;

  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
    console.log('WebComponentsReady');
    
    Module.canvas = document.getElementById('canvas');
    Module.canvas.addEventListener('webglcontextlost', function(e) {
        window.alert('WebGL context lost. You will need to reload the page.');
        e.preventDefault();
    }, false);
    
    Module.setStatus('Loading Engine...');
    
    var fileref2=document.createElement('script');
    fileref2.setAttribute('type','text/javascript');
    fileref2.setAttribute('src', 'raw.js');
    document.getElementsByTagName('head')[0].appendChild(fileref2);
    
  });
  
})(document);
