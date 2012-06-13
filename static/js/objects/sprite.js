
define(["util", "material", "resources"], function(util, Material, resources) {
    function Sprite(opts) {
        this.pos = util.vec2d(opts.x, opts.y);
        this.mat = Material(opts);
        this.loaded = false;
    }

    function load() {
        if(this.mat.texture) {
            var _this = this;
            resources.load_texture(this.mat.texture, function() {
                _this.loaded = true;
            });
        }
        else {
            this.loaded = true;
        }
    }

    function render() {
        throw Error("render: not implemented");
    }

    return util.construct(Sprite, load, render);
});
