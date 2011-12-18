ig.module(
	'game.entities.fountain'
)
.requires(
	'impact.entity',
    'impact.image'
)
.defines(function(){

    EntityFountain = ig.Entity.extend({
        lifetime: .1,
        particles: 10,
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(255, 0, 0, 0.7)',
        size: {x: 8, y: 8},
        init: function( x, y, settings ) {
            if(settings.width)
                this.size.x = settings.width;
            this.parent( x, y, settings );
            this.idleTimer = new ig.Timer();
        },
        update: function() {
            if( this.idleTimer.delta() > this.lifetime ) {
                for(var i=0; i < this.particles; i++)
                    ig.game.spawnEntity(EntityWaterParticle, (Math.random() * this.size.x) + this.pos.x, this.pos.y, {colorOffset: 2});
                this.idleTimer.reset();
                return;
            }
        }
    });

    EntityWaterParticle = ig.Entity.extend({
            size: {x: 2, y: 2},
            maxVel: {x: 30, y: 150},
            lifetime: 1,
            fadetime: 1,
            bounciness: 0,
            vel: {x: 10, y: 100},
            friction: {x:10, y: 100},
            collides: ig.Entity.COLLIDES.LITE,
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
                );
                this.parent();
            }
        });
});

