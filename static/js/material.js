
define(["util"], function(util) {
    function Material(opts) {
        this.color = opts.color || util.color(255, 20, 147);
        this.texture = opts.texture;
        this.textures = opts.textures;
    }

    return util.construct(Material);
});