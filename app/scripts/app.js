(function(document) {
  'use strict';
  
  var app = document.querySelector('#app');
  app.ready=false;
  
  app.displayInstalledToast = function() {
    document.querySelector('#caching-complete').show();
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('dom-change');
  });

  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
    console.log('WebComponentsReady');
    var fileref=document.createElement('script');
    fileref.setAttribute('type','text/javascript');
    fileref.setAttribute('src', '/scripts/engine.js');
    document.getElementsByTagName('head')[0].appendChild(fileref);
    var fileref2=document.createElement('script');
    fileref2.setAttribute('type','text/javascript');
    fileref2.setAttribute('src', 'raw.js');
    document.getElementsByTagName('head')[0].appendChild(fileref2);
    
    //handle resize
    function setCanvasSize(){
      var div = document.getElementById('canvasDiv');
      var viewport = document.getElementById('canvas');
      
      var w = div.clientWidth;
      var h = div.clientHeight;
      
      if(w>h){
        viewport.style.width=h.toString()+'px';
        viewport.style.height='';
      }else{
        viewport.style.height=w.toString()+'px';
        viewport.style.width='';
      }
    }
    window.addEventListener('resize', setCanvasSize, true);
    
    
    
  });
  
})(document);
