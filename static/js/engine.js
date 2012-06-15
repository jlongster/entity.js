
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


define(["dynamics", "class"], function(d, Class) {

    var Engine = Class.extend({
        init: function() {
            this.tasks = [];
            this.lastFrame = 0;
        },

        heartbeat: function () {
            for(var i=0, len=this.tasks.length; i<len; i++) {
                this.tasks[i].heartbeat();
            }
        },

        run: function() {
            var _this = this;

            function loop() {
                var now = time();
                // hack: the maximum time allowed to pass is 30ms
                d.elapsed = Math.min(now - _this.lastFrame, 30);

                _this.heartbeat();

                _this.lastFrame = now;
                requestAnimFrame(loop);
            }

            this.lastFrame = time();
            loop();
        },

        addTask: function(name, task) {
            this.tasks.push(task);
            d.createDynamic(name, task);
        }
    });

    d.createDynamic("elapsed", 0);

    return Engine;
});
