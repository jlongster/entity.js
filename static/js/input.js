
define(["inputlib", "class", "dynamics"], function(keys, Class, d) {
    
    var Input = Class.extend({
        
        heartbeat: function() {
            var player = d.scene.getObject("player");

            if(player) {
                if(keys.down('RIGHT')) {
                    var vel = player.body.GetLinearVelocity();
                    vel.x = 8;
                    player.body.SetAwake(true);
                    player.body.SetLinearVelocity(vel);
                    player.orientation = 1;
                    player.animate();
                }
                else if(keys.down('LEFT')) {
                    var vel = player.body.GetLinearVelocity();
                    vel.x = -8;
                    player.body.SetAwake(true);
                    player.body.SetLinearVelocity(vel);
                    player.orientation = -1;
                    player.animate();
                }
                else {
                    var vel = player.body.GetLinearVelocity();
                    vel.x = 0;
                    player.body.SetLinearVelocity(vel);
                    player.stop_animation();
                }

                if(keys.down('DOWN')) {
                    var vel = player.body.GetLinearVelocity();
                    vel.y = 10;
                    player.body.SetLinearVelocity(vel);
                }

                if(keys.once('SPACE')) {
                    var vel = player.body.GetLinearVelocity();
                    vel.y -= 10;
                    player.body.SetAwake(true);
                    player.body.SetLinearVelocity(vel);
                }

                player.body.SetFixedRotation(true);
            }

            keys.reset();
        }
    });

    return Input;
});