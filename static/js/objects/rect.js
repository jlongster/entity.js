
define(["objects/sprite", "resources", "dynamics"], function(Sprite, resources, d) {
    return Sprite.extend({
        init: function(opts) {
            console.log(opts.texture);
            if(opts.left !== undefined) {
                opts.x = opts.left + opts.width/2;
            }

            if(opts.top !== undefined) {
                opts.y = opts.top + opts.height/2;
            }

            this.parent(opts);
            this.size = { x: opts.width, y: opts.height };
            this.num_textures = opts.num_textures || 1;
            this.textureRepeat = opts.textureRepeat;
            this.texture_index = 0;
            this.orientation = 1;
            this.rot = opts.rot || 0;
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

                var tex = resources.get_texture(this.mat.texture);

                if(this.textureRepeat) {
                    var x = 0;
                    var y = 0;
                    var left = -this.size.x/2;
                    var top = -this.size.y/2;

                    while(x < this.size.x) {
                        while(y < this.size.y) {
                            ctx.drawImage(tex,
                                          0, 0,
                                          tex.width,
                                          tex.height,
                                          left + x,
                                          top + y,
                                          Math.min(tex.width, this.size.x-x),
                                          Math.min(tex.height, this.size.y-y));
                            y += tex.height;
                        }

                        x += tex.width;
                        y = 0;
                    }
                }
                else {
                    ctx.drawImage(tex,
                                  this.texture_index*this.size.x,
                                  0,
                                  tex.width / this.num_textures,
                                  tex.height,
                                  -this.size.x/2,
                                  -this.size.y/2,
                                  this.size.x,
                                  this.size.y);
                }
            }
            else {
                ctx.fillRect(-this.size.x/2, -this.size.y/2,
                             this.size.x, this.size.y);
            }
        }
    });
});