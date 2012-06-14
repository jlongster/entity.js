
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


define(["dynamics", "util"], function(d, util) {

    function Engine() {
        this.tasks = [];
        this.last_frame = 0;
    }

    function heartbeat() {
        for(var i=0, len=this.tasks.length; i<len; i++) {
            this.tasks[i].heartbeat();
        }
    }

    function run() {
        var _this = this;

        function loop() {
            var now = time();
            // hack: the maximum time allowed to pass is 30ms
            d.elapsed.set(Math.min(now - _this.last_frame, 30));

            _this.heartbeat();

            _this.last_frame = now;
            requestAnimFrame(loop);
        }

        this.last_frame = time();
        loop();
    }

    function install_task(task) {
        this.tasks.push(task);

        // make it a global dynamic variable
        d.Dynamic(task.typename.toLowerCase(), task);
    }

    d.Dynamic("elapsed", 0);

    return util.construct(Engine, heartbeat, run, install_task);
});
