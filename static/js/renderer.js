
define(["class"], function(Class) {

    var Renderer = Class.extend({
        init: function(id, w, h) {
            this._queue = [];
            this._canvas = document.getElementById(id);
            this._canvas.width = w;
            this._canvas.height = h;
            this.width = w;
            this.height = h;
            this.default_transform = [1, 0, 0, 1, 0, 0];

            this._ctx = this._canvas.getContext('2d');
        },

        heartbeat: function() {
            var len = this._queue.length;
            var q = this._queue;
            var t = this.default_transform;

            this._ctx.setTransform(1, 0, 0, 1, 0, 0);
            this._ctx.fillStyle = 'white';
            this._ctx.fillRect(0, 0, this.width, this.height);

            for(var i=0; i<len; i++) {
                if(q[i].loaded) {
                    this._ctx.setTransform(t[0], t[1], t[2], t[3], t[4], t[5]);
                    q[i].render();
                }
            }

            this._ctx.setTransform(1, 0, 0, 1, 0, 0);
            this._queue = [];
        },

        queue: function(obj) {
            this._queue.push(obj);
        }
    });

    return Renderer;
});
