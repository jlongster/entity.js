
define(["objects/sprite", "dynamics"], function(Sprite, d) {
    return Sprite.extend({
        init: function Circle(opts) {
            this.parent(this);
            this.radius = opts.radius;
        },

        render: function() {
            var ctx = d.renderer._ctx;
            var color = this.mat.color;

            ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
            ctx.translate(this.pos.x, this.pos.y);
            ctx.rotate(this.rot);
            ctx.beginPath();
            ctx.arc(0, 0, this.radius, Math.PI*2, false);
            ctx.closePath();
            ctx.fill();
        }
    });
});
