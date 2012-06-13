
define(function() {

    function Walkable(speed) {
        if(!(this instanceof Walkable)) {
            return new Walkable(speed);
        }

        this.speed = speed;
    }

    Walkable.prototype.update = function() {
        this.object.pos.x += this.speed;
    }; 

    return Walkable;
});