ig.module(
	'game.entities.sword'
)
.requires(
	'impact.entity'
)
.defines(function(){

    EntitySword = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/sword.png', 3, 8 ),
        lifetime: .1,
        particles: 3,
        colorOffset: 2,
        size: {x: 3, y: 8},
        offset: {x:0,y:3},
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
                ig.game.spawnEntity(EntityFlameParticle, (Math.random() * this.size.x-2) + this.pos.x, this.pos.y-6, {colorOffset: 3});
                this.idleTimer.reset();
                return;
            }
        },
        check: function(other) {
            if (other instanceof EntityPlayer) {
                other.equip("sword");
                this.kill();
            }
        }

    });

});

