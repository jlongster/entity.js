
define(["class", "dynamics"], function(Class, d) {
    var Collidable = Class.extend({
        name: "Collidable",

        init: function(density, friction, restitution, damping) {
            this.density = density || 1.0;
            this.friction = friction || 0.5;
            this.restitution = restitution || .2;
            this.damping = damping || 0;
        },

        onAdd: function () {
            d.physics.addObject(this.object,
                                 this.density,
                                 this.friction,
                                 this.restitution);
        },

        onRemove: function () {
            d.physics.removeObject(this.object);
        }
    });

    return Collidable;
});