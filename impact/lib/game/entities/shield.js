ig.module(
	'game.entities.shield'
)
.requires(
	'impact.entity'
)
.defines(function(){

    EntityShield = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/shield.png', 7, 7 ),
        lifetime: .1,
        particles: 3,
        colorOffset: 2,
        size: {x: 8, y: 8},
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.LITE,
        init: function( x, y, settings ) {
            if(settings.width)
                this.size.x = settings.width;
            this.parent( x, y, settings );
            this.addAnim('idle', 1, [0]);
            this.idleTimer = new ig.Timer();
        },
        update: function() {
            if( this.idleTimer.delta() > this.lifetime ) {
                ig.game.spawnEntity(EntityFlameParticle, (Math.random() * this.size.x-2) + this.pos.x, this.pos.y-2, {colorOffset: 3});
                this.idleTimer.reset();
                return;
            }
        },
        check: function(other) {
            if (other instanceof EntityPlayer) {
                other.equip("shield");
                this.kill();
            }
        }
    });

    EntityFlameParticle = ig.Entity.extend({
                size: {x: 2, y: 2},
                maxVel: {x: 20, y: -20},
                lifetime: 1,
                fadetime: 1,
                bounciness: 0,
                vel: {x: 10, y: 30},
                friction: {x:10, y: 0},
                collides: ig.Entity.COLLIDES.NONE,
                colorOffset: 2,
                totalColors: 7,
                animSheet: new ig.AnimationSheet( 'media/blood.png', 2, 2 ),
                init: function( x, y, settings ) {
                    this.parent( x, y, settings );
                    var frameID = Math.round(Math.random()*this.totalColors) + (this.colorOffset * (this.totalColors+1));
                    this.addAnim( 'idle', 0.2, [frameID] );
                    this.vel.x = (Math.random() * 1) * this.vel.x;
                    this.vel.y = (Math.random() * 5 - 1) * this.vel.y;
                    this.idleTimer = new ig.Timer();
                },
                update: function() {
                    if( this.idleTimer.delta() > this.lifetime ) {
                        this.kill();
                        return;
                    }
                    this.currentAnim.alpha = this.idleTimer.delta().map(
                        this.lifetime - this.fadetime, this.lifetime,
                        1, 0
                    ) -.2;
                    if(this.currentAnim.alpha < 0)
                        this.kill();
                    this.parent();
                }
            });
});

