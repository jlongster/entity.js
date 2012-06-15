
define(["objects/sprite"], function(Sprite) {
    function Thing(opts) {
        opts.size = { x: 10, y: 30 };
        Sprite.init(this, opts);

        this.behaviors = [
            Collidable(),
            Sticky()
        ];
    }

    return Sprite.extend(Thing);
});