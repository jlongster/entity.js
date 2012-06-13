
function Renderer(id, w, h) {
    this._queue = [];
    this._canvas = document.getElementById(id);
    this._canvas.width = w;
    this._canvas.height = h;
    this.width = w;
    this.height = h;

    this._ctx = this._canvas.getContext('2d');
}

Renderer.prototype.heartbeat = function() {
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

Renderer.prototype.queue = function(obj) {
    this._queue.push(obj);
};

define(function() {
    return Renderer;
});
