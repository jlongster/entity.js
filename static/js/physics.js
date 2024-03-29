
define(["objects/circle", "class", "dynamics"], function(Circle, Class, d) {

    var b2Vec2 = Box2D.Common.Math.b2Vec2;
    var b2AABB = Box2D.Collision.b2AABB;
    var b2BodyDef = Box2D.Dynamics.b2BodyDef;
    var b2Body = Box2D.Dynamics.b2Body;
    var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    var b2Fixture = Box2D.Dynamics.b2Fixture;
    var b2World = Box2D.Dynamics.b2World;
    var b2MassData = Box2D.Collision.Shapes.b2MassData;
    var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    var b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef;

    var Physics = Class.extend({
        init: function() {
            this.world = new b2World(new b2Vec2(0, 15.8), true);

            var debugDraw = new b2DebugDraw();
		    debugDraw.SetSprite(d.renderer._ctx);
		    debugDraw.SetDrawScale(30.0);
		    debugDraw.SetFillAlpha(0.5);
		    debugDraw.SetLineThickness(0.0);
		    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
		    this.world.SetDebugDraw(debugDraw);

            var listener = new Box2D.Dynamics.b2ContactListener;
            listener.BeginContact = function(contact) {
                var obj1 = contact.GetFixtureA().GetBody().GetUserData();
                var obj2 = contact.GetFixtureB().GetBody().GetUserData();

                for(var k in obj1.b) {
                    if(obj1.b[k].onCollide) {
                        obj1.b[k].onCollide(obj2);
                    }
                }

                for(var k in obj2.b) {
                    if(obj2.b[k].onCollide) {
                        obj2.b[k].onCollide(obj1)
                    }
                }
            };

            this.world.SetContactListener(listener);
        },

        addObject: function(obj, density, friction, restitution) {
            var bodyDef = new b2BodyDef();
            if(obj.Sticky) {
                bodyDef.type = b2Body.b2_staticBody;
            }
            else {
                bodyDef.type = b2Body.b2_dynamicBody;
            }
            bodyDef.position.Set(obj.pos.x/30, obj.pos.y/30);
            bodyDef.angle = obj.rot;
            bodyDef.userData = obj;
            
            var body = this.world.CreateBody(bodyDef);

            var fixDef = new b2FixtureDef();
            fixDef.density = density;
            fixDef.friction = friction;
            fixDef.restitution = restitution;

            if(obj instanceof Circle) {
                fixDef.shape = new b2CircleShape(obj.radius/30);
            }
            else {
                fixDef.shape = new b2PolygonShape();
                fixDef.shape.SetAsBox(obj.size.x/2/30, obj.size.y/2/30);
            }

            body.CreateFixture(fixDef);
            //body.SetLinearDamping(obj.Collidable.damping);

            obj.body = body;
        },

        removeObject: function(obj) {
            this.world.DestroyBody(obj.body);
        },

        heartbeat: function() {
            this.world.Step(d.elapsed/1000, 10, 10);
            //this.world.DrawDebugData();
            this.world.ClearForces();

            for(var b = this.world.GetBodyList(); b; b = b.m_next) {
                var obj = b.GetUserData();
                if(b.IsActive() && obj) {
                    obj.pos.x = b.GetPosition().x*30;
                    obj.pos.y = b.GetPosition().y*30;
                    obj.rot = b.GetAngle();
                }
            }
        }
    });

    return Physics;
});