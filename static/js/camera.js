
define(["class", "dynamics"], function(Class, d) {
   
    return Class.extend({
        init: function() {
            this.offset = 0;
            this.width = d.renderer.width;
        },

        heartbeat: function() {
            var player = d.scene.getObject("player");

            if(player) {
                if(player.pos.x < this.offset + 100) {
                    this.offset = player.pos.x - 100;
                }
                else if(player.pos.x + player.size.x/2 > (this.offset + this.width) - 100) {
                    this.offset = (player.pos.x + player.size.x/2 - this.width) + 100;
                }

                d.renderer.default_transform = [1, 0, 0, 1, -this.offset, 0];
            }
        }
    });

});