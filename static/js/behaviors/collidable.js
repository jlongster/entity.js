
define(["util"], function(util) {
    function Collidable(density, friction, restitution, damping) {
        this.density = density || 1.0;
        this.friction = friction || 0.5;
        this.restitution = restitution || .2;
        this.damping = damping || 0;
    }

    function update() {}

    return util.construct(Collidable, update);
});