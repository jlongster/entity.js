
// util

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
var requestAnimFrame = (function(){
    return window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

var time;

if(performance && performance.now) {
    time = function() { return performance.now(); };
}
else {
    time = Date.now;
}

// engine

function Engine() {
    this.tasks = [];
    this.last_frame = 0;
}

Engine.prototype.heartbeat = function() {
    for(var i=0, len=this.tasks.length; i<len; i++) {
        this.tasks[i].heartbeat();
    }
};

Engine.prototype.run = function() {
    var _this = this;

    function loop() {
        var now = time();
        // hack: the maximum time allowed to pass is 30ms
        elapsed.set(Math.min(now - _this.last_frame, 30));

        _this.heartbeat();

        _this.last_frame = now;
        requestAnimFrame(loop);
    }

    this.last_frame = time();
    loop();
};

define(["fluids"], function(make_fluid) {

    Engine.prototype.install_task = function(task, name) {
        this.tasks.push(task);

        // make it a global fluid variable
        window[name] = make_fluid(task);
    };

    window.elapsed = make_fluid(0);

    return Engine;
});
