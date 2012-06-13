
define(["objects/sprite"], function(Sprite) {
    function Circle(opts) {
        Sprite.init(this, opts);
        this.radius = opts.radius;
    }

    function render() {
        var ctx = renderer.ref()._ctx;
        var color = this.mat.color;

        ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.rot);
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, Math.PI*2, false);
        ctx.closePath();
        ctx.fill();
    };

    return Sprite.extend(Circle, render);
});
