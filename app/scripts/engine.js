var Module = {
    noExitRuntime: true,
    preRun: [],
    postRun: function() {
        console.log('postRun');
        
        //handle backspace
        window.removeEventListener("keydown", GLFW.onKeydown, true);
        GLFW.onKeydown = function(event) {
            GLFW.onKeyChanged(event, 1);
            if (event.keyCode === 8 || event.keyCode === 9) {
                if(event.target.tagName === "INPUT") return;
                event.preventDefault();
            }
        };
        window.addEventListener("keydown", GLFW.onKeydown, true);
        
        //handle resize
        GLFW.setCanvasSize = function(){
          var ssaa = (window.devicePixelRatio<2 ? 2 : 1); //Super sampling anti-aliasing
          var w = Module['canvas'].clientWidth*window.devicePixelRatio*ssaa;
          var h = Module['canvas'].clientHeight*window.devicePixelRatio*ssaa;
          console.log('onResize',w,h,window.devicePixelRatio);
          Module.setCanvasSize(w,h,false);
          Module.GL_SetViewPort(w,h);
        }
        GLFW.onResize = function(event) {
          window.clearTimeout(GLFW.setCanvasSizeTimeout); //debounce action
          //wait for drawer to finish transition
          GLFW.setCanvasSizeTimeout = window.setTimeout(GLFW.setCanvasSize, 500);
        };
        window.addEventListener('resize', GLFW.onResize, true);
        GLFW.onResize(null);
        
        //handle mousewheel
        function setCanvasZoom(e2){
            var e = window.event || e2; // old IE support
            var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
            //console.log(delta);
            Module.SC_SetCamZoom(delta*-25);
        }
        document.getElementById('canvasDiv').addEventListener('mousewheel', setCanvasZoom, false);
        document.getElementById('canvasDiv').addEventListener('DOMMouseScroll', setCanvasZoom, false);
        
        app.ready=true;
    },
    setStatus: function(text) {
        if (!Module.setStatus.last) {
            Module.setStatus.last = {
                time: Date.now(),
                text: ''
            };
        }
        if (text === Module.setStatus.text) {return;}
        var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
        var now = Date.now();
        if (m && now - Date.now() < 30) {return;} // if this is a progress update, skip it if too soon
        if (m) {
            text = m[1];
        }
        document.getElementById('status').innerHTML = text;
    },
    totalDependencies: 0,
    monitorRunDependencies: function(left) {
        this.totalDependencies = Math.max(this.totalDependencies, left);
        Module.setStatus(left ? 'Starting... (' + (this.totalDependencies - left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
    }
};

window.onerror = function(event) {
    //console.log(event);
    if(event=='Uncaught Error: File exists') return;    // File exists happens in dual ward model
    // TODO: do not warn on ok events like simulating an infinite loop or exitStatus
    Module.setStatus('JavaScript error, open console for more details (Ctrl-Shift-J) <br>\
        <pre class="app-shell">'+event+'</pre>');
    //spinnerElement.style.display = 'none';
    Module.setStatus = function(text) {
        if (text) {Module.printErr('[post-exception status] ' + text);}
    };
};
