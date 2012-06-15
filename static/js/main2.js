
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

        var Wall = Rect.extend({
            init: function(opts) {
                opts.texture = "static/img/floor.png";
                opts.textureRepeat = true;
                opts.components = [
                    new Collidable(),
                    new Sticky()
                ];

                this.parent(opts);
            }
        });
        
        scene.addObject(new Wall({ left: 0,
                                   top: height-50,
                                   width: width,
                                   height: 50 }));

        scene.addObject(new Wall({ left: 0,
                                   top: 0,
                                   width: 25,
                                   height: height }));

        scene.addObject(new Wall({ left: width-25,
                                   top: 0,
                                   width: 25,
                                   height: height }));

        scene.addObject(new Wall({ left: 0,
                                   top: 200,
                                   width: 200,
                                   height: 25,
                                   rot: Math.PI/8 }));

        scene.addObject(new Wall({ left: width-200,
                                   top: 200,
                                   width: 200,
                                   height: 25,
                                   rot: -Math.PI/8 }));



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
