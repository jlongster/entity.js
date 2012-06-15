
define(["class", "dynamics", "objects/rect",
        "behaviors/collidable", "behaviors/removable"], function(Class, d, Rect, Collidable, Removable) {
    
    return Class.extend({
        init: function() {
            this.elapsed = 0;
            this.dropped = false;
        },

        add: function(x, y) {
            d.scene.addObject(
                new Rect({ x: x,
                           y: y,
                           width: 24,
                           height: 24,
                           texture: "static/img/ball.png",
                           color: { r: 200, g: 100, b: 50 },
                           components: [
                               new Collidable(1.0, 0.1, 1.0),
                               new Removable(Rect)
                           ]})
            );
        },

        update: function(obj) {
            if(obj.name == "player") {
                var player = obj;
                this.elapsed += d.elapsed;

                if(this.elapsed > player.drop_sleep) {
                    if(d.scene.numObjects() < 100) {
                        this.add(Math.random() * 400 + 50,
                                 Math.random() * 100 + 25);
                    }
                    this.elapsed = 0;
                }
            }
        }
    });

});