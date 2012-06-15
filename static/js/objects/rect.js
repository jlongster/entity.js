
define(["objects/sprite", "resources", "dynamics"], function(Sprite, resources, d) {
    return Sprite.extend({
        init: function(opts) {
            if (opts.left) {
                opts.x = opts.left + opts.width/2;
            }

            if(opts.top) {
                opts.y = opts.top + opts.height/2;
            }

            this.parent(opts);
            this.size = { x: opts.width, y: opts.height };
            this.num_textures = opts.num_textures || 1;
            this.texture_index = 0;
            this.orientation = 1;
            this.rot = 0;
        },

        animate: function() {
            this.animating = true;
        },

        stop_animation: function() {
            this.animating = false;
            this.texture_index = 0;
        },

        render: function() {
            var ctx = d.renderer._ctx;
            var color = this.mat.color;

            if(this.animating) {
                if(this.anim_elapsed) {
                    this.anim_elapsed += d.elapsed;

                    if(this.anim_elapsed > 50) {
                        this.texture_index = (this.texture_index+1) % this.num_textures;
                        this.anim_elapsed = 0;
                    }
                }
                else {
                    this.anim_elapsed = d.elapsed;
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
    });
});