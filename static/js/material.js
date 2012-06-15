
define(["class"], function(Class) {

    return Class.extend({
        init: function(opts) {
            this.color = opts.color || { r: 255, g: 20, b: 147 };
            this.texture = opts.texture;
            this.textures = opts.textures;
        }
    });

});