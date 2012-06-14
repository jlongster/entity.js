
require(["engine", "renderer", 
         "physics", "scene", "input",
         "dynamics",
         "objects/rect",
         "objects/circle",
         "behaviors/walkable",
         "behaviors/sticky",
         "behaviors/gravity",
         "behaviors/collidable",
         "behaviors/removable",
         "behaviors/noop",
         "material", "util", "editor"],
        function(Engine, Renderer, Physics, Scene, Input, d,
          Rect, Circle, Walkable, Sticky, gravity, Collidable,
          Removable, Noop, Material, util, editor) {
            var engine = new Engine();
            engine.install_task(new Renderer("canvas", 500, 500));
            engine.install_task(new Scene());
            engine.install_task(new Physics());
            engine.install_task(new Input());
            engine.run();

            var s = d.scene.ref();

            // add floor
            var height = d.renderer.ref().height;
            var width = d.renderer.ref().width;
            s.add_object(Rect({ x: width/2, 
                                y: height-50, 
                                width: width,
                                height: 100,
                                color: util.color(0, 0, 0) }),
                         Collidable(),
                         Sticky());

            s.add_object(Rect({ x: 10,
                                y: -height*5 + height,
                                width: 20,
                                height: height*10,
                                color: util.color(0, 0, 0) }),
                         Collidable(),
                         Sticky());

            s.add_object(Rect({ x: width-10,
                                y: -height*5 + height,
                                width: 20,
                                height: height*10,
                                color: util.color(0, 0, 0) }),
                         Collidable(),
                         Sticky());

            // add player
            s.add_object("player",
                         Rect({ x: 75,
                                y: 300, 
                                width: 50,
                                height: 75,
                                texture: "static/img/player.png",
                                num_textures: 5}),
                         Collidable(5.0));

            for(var i=0; i<50; i++) {
                var type;
                var opts = { x: Math.random()*500,
                             y: Math.random()*100,
                             color: util.color(200, 100, 50) };
                
                if(Math.random() > .5) {
                    type = Circle;
                    opts.radius = 25/2;
                }
                else {
                    type = Rect;
                    opts.width = 25;
                    opts.height = 25;
                }

                var sprite = type(opts);
                s.add_object(sprite,
                             Collidable(1.0, 0.1, 0.2),
                             type == Rect ? Removable(Rect) : Noop());
            }

            editor.init();
        });
