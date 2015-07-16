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
        GLFW.onResize = function(event) {
          var w = Module['canvas'].clientWidth*window.devicePixelRatio;
          var h = Module['canvas'].clientHeight*window.devicePixelRatio;
          console.log('onResize',w,h,window.devicePixelRatio);
          Module.setCanvasSize(w,h,false);
          Module.GL_SetViewPort(w,h);
        };
        window.addEventListener('resize', GLFW.onResize, true);
        GLFW.onResize(null);
        
        app.ready=true;
        //prepareUI();
    },
    canvas: (function() {
        var canvas = document.getElementById('canvas');

        // As a default initial behavior, pop up an alert when webgl context is lost. To make your
        // application robust, you may want to override this behavior before shipping!
        // See http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.15.2
        canvas.addEventListener('webglcontextlost', function(e) {
            window.alert('WebGL context lost. You will need to reload the page.');
            e.preventDefault();
        }, false);
        
        //console.log(canvas);
        return canvas;
    })(),
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
Module.setStatus('Loading Engine...');
window.onerror = function(event) {
    // TODO: do not warn on ok events like simulating an infinite loop or exitStatus
    Module.setStatus('JavaScript error, open console for more details (Ctrl-Shift-J)');
    //spinnerElement.style.display = 'none';
    Module.setStatus = function(text) {
        if (text) {Module.printErr('[post-exception status] ' + text);}
    };
};
