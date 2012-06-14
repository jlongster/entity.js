
define(["util"], function(util) {

    function Renderer(id, w, h) {
        this._queue = [];
        this._canvas = document.getElementById(id);
        this._canvas.width = w;
        this._canvas.height = h;
        this.width = w;
        this.height = h;

        this._ctx = this._canvas.getContext('2d');
    }

    function heartbeat() {
        var len = this._queue.length;
        var q = this._queue;

        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.fillStyle = 'white';
        this._ctx.fillRect(0, 0, this.width, this.height);

        for(var i=0; i<len; i++) {
            if(q[i].loaded) {
                this._ctx.setTransform(1, 0, 0, 1, 0, 0);
                q[i].render();
            }
        }

        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._queue = [];
    };

    function queue(obj) {
        this._queue.push(obj);
    };

    return util.construct(Renderer, heartbeat, queue);
});
