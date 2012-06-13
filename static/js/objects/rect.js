
define(["objects/sprite", "util", "resources"], function(Sprite, util, resources) {
    function Rect(opts) {
        Sprite.init(this, opts);
        this.size = util.vec2d(opts.width, opts.height);
        this.num_textures = opts.num_textures || 1;
        this.texture_index = 0;
        this.orientation = 1;
        this.rot = 0;
    }

    function animate() {
        this.animating = true;
    }

    function stop_animation() {
        this.animating = false;
        this.texture_index = 0;
    }

    function render() {
        var ctx = renderer.ref()._ctx;
        var color = this.mat.color;

        if(this.animating) {
            if(this.anim_elapsed) {
                this.anim_elapsed += elapsed.ref();

                if(this.anim_elapsed > 100) {
                    this.texture_index = (this.texture_index+1) % this.num_textures;
                    this.anim_elapsed = 0;
                }
            }
            else {
                this.anim_elapsed = elapsed.ref();
            }
        }

        ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.rot);
        if(this.mat.texture) {
            if(this.orientation == -1) {
                ctx.scale(-1, 1);
            }

            ctx.drawImage(resources.get_texture(this.mat.texture),
                          this.texture_index*this.size.x,
                          0,
                          this.size.x,
                          this.size.y,
                          -this.size.x/2,
                          -this.size.y/2,
                          this.size.x,
                          this.size.y);
        }
        else {
            ctx.fillRect(-this.size.x/2, -this.size.y/2,
                         this.size.x, this.size.y);
        }
    }

    return Sprite.extend(Rect, render, animate, stop_animation);
});