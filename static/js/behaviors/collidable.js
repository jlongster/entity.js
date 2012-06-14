
define(["util", "dynamics"], function(util, d) {
    function Collidable(density, friction, restitution, damping) {
        this.density = density || 1.0;
        this.friction = friction || 0.5;
        this.restitution = restitution || .2;
        this.damping = damping || 0;
    }

    function onAdd() {
        d.physics.ref().add_object(this.object,
                                   this.density,
                                   this.friction,
                                   this.restitution);

    }

    function onRemove() {
        d.physics.ref().remove_object(this.object);
    }

    return util.construct(Collidable, onAdd, onRemove);
});