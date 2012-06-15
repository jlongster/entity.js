
define(["class", "dynamics", "objects/rect",
        "behaviors/collidable", "behaviors/removable"], function(Class, d, Rect, Collidable, Removable) {
    
    return Class.extend({
        init: function() {
            this.elapsed = 0;
            this.dropped = false;
        },

        add: function(x, y) {
            var name;
            var opts = { x: x,
                         y: y,
                         color: { r: 200, g: 100, b: 50 },
                         components: [
                             new Collidable(1.0, 0.1, 0.2),
                             new Removable(Rect)
                         ]};
            
            if(Math.random() > .2) {
                name = "cookie";
                opts.width = 24;
                opts.height = 24;
                opts.texture = "static/img/cookie.png";
            }
            else {
                name = "bomb";
                opts.width = 16;
                opts.height = 22;
                opts.texture = "static/img/bomb.png";
            }

            d.scene.addObject(name, new Rect(opts));
        },

        update: function(obj) {
            if(obj.name == "player") {
                var player = obj;
                this.elapsed += d.elapsed;

                if(player.pos.x > 500 && !this.dropped) {
                    this.dropped = true;

                   for(var i=0; i<20; i++) {
                        this.add(Math.random()*500 + player.pos.x - 200,
                                 Math.random()*100);
                    }
                }
                else if(player.pos.x > 100 && this.elapsed > player.drop_sleep) {
                    this.add(player.pos.x + Math.random() * 15, 75);
                    this.elapsed = 0;
                }
            }
        }
    });

});