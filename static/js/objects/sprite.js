
define(["objects/base", "material", "resources"], function(Base, Material, resources) {

    var Sprite = Base.extend({
        setup: function(opts) {
            this.pos = { x: opts.x, y: opts.y };
            this.mat = new Material(opts);
            this.loaded = false;
        },

        load: function() {
            if(this.mat.texture) {
                var _this = this;
                resources.load_texture(this.mat.texture, function() {
                    _this.loaded = true;
                });
            }
            else {
                this.loaded = true;
            }
        },
        
        render: function() {
            throw Error("render: not implemented");
        }
    });

    return Sprite;
});
