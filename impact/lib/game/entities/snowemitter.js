ig.module(
	'game.entities.snowemitter'
)
.requires(
	'impact.entity',
    'impact.image'
)
.defines(function(){

    EntitySnowemitter = ig.Entity.extend({
        lifetime: .3,
        particles: 1,
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
                ig.game.spawnEntity(EntityDeathExplosionParticle, (Math.random() * this.size.x) + this.pos.x, this.pos.y, {colorOffset: 1});
                this.idleTimer.reset();
                return;
            }
        }
    });
});

