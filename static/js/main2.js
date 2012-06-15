
require(
    ["slay",
     "objects/rect",
     "behaviors/sticky",
     "behaviors/collidable",
     "behaviors/removable",
     "behaviors/noop",
     "behaviors/drop2",
     "camera"],
    function(sl, Rect, Sticky,
      Collidable, Removable, Noop,
      Drop, Camera) {

        var scene = sl.scene;

        // add floor
        var height = sl.renderer.height;
        var width = sl.renderer.width;
        scene.addObject(new Rect({ left: 0,
                                   top: height-50,
                                   width: width,
                                   height: 50,
                                   texture: "static/img/floor.png",
                                   textureRepeat: true,
                                   components: [
                                       new Collidable(),
                                       new Sticky()
                                   ]}));

        scene.addObject(new Rect({ left: 0,
                                   top: 0,
                                   width: 25,
                                   height: height,
                                   texture: "static/img/floor.png",
                                   textureRepeat: true,
                                   components: [
                                       new Collidable(),
                                       new Sticky()
                                   ]}));

        scene.addObject(new Rect({ left: width-25,
                                   top: 0,
                                   width: 25,
                                   height: height,
                                   texture: "static/img/floor.png",
                                   textureRepeat: true,
                                   components: [
                                       new Collidable(),
                                       new Sticky()
                                   ]}));

        // add player
        var Player = Rect.extend({
            drop_sleep: 1000,

            eaten: function() {
                this.drop_sleep = Math.max(this.drop_sleep - 100, 20);
            }
        });

        scene.addObject("player",
                        new Player({ x: 75,
                                     y: 300,
                                     width: 24,
                                     height: 43,
                                     texture: "static/img/player.png",
                                     num_textures: 5,
                                     components: [
                                         new Collidable(5.0)
                                     ]}));

        scene.addGlobalBehavior(new Drop());
        sl.engine.run();
    });
