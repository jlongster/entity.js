
require(
    ["slay",
     "objects/rect",
     "behaviors/sticky",
     "behaviors/collidable",
     "behaviors/removable",
     "behaviors/noop",
     "behaviors/drop",
     "camera"],
    function(sl, Rect, Sticky,
      Collidable, Removable, Noop,
      Drop, Camera) {

        sl.engine.addTask("camera", new Camera());

        var scene = sl.scene;

        // add floor
        var height = sl.renderer.height;
        var width = sl.renderer.width;
        scene.addObject(new Rect({ left: -100, 
                                   top: height-100,
                                   width: width*2,
                                   height: 100,
                                   color: { r: 0, g: 0, b: 0 } }),
                        new Collidable(),
                        new Sticky());

        scene.addObject(new Rect({ left: width*2-100+50,
                                   top: height-100,
                                   width: width*3,
                                   height: 100,
                                   color: { r: 0, g: 0, b: 0 } }),
                        new Collidable(),
                        new Sticky());

        // add player
        var Player = Rect.extend({
            drop_sleep: 1000,

            eaten: function() {
                this.drop_sleep = Math.max(this.drop_sleep - 100, 100);
            }
        });

        scene.addObject("player",
                        new Player({ x: 75,
                                   y: 300, 
                                   width: 24,
                                   height: 43,
                                   texture: "static/img/player.png",
                                   num_textures: 5}),
                        new Collidable(5.0));

        scene.addGlobalBehavior(new Drop());
        sl.engine.run();
    });
