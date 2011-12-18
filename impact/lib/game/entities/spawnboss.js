ig.module(
	'game.entities.spawnboss'
)
.requires(
	'impact.entity',
	'impact.sound'
)
.defines(function(){

    EntitySpawnboss = ig.Entity.extend({
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(0, 255, 0, 0.7)',
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        triggered: false,
        size: {x: 8, y: 8},
        xOffset: 0,
        yOffset: 0,
        powerupSFX: new ig.Sound('media/sounds/Explosion.*'),
        init: function( x, y, settings ) {
            if(settings.width)
                this.size.x = settings.width;
            this.parent( x, y, settings );
        },
        check: function(other) {
            if(this.triggered)
                return;
            else{
                if (other instanceof EntityPlayer) {
                    ig.input.unbindAll();
                    var entity = ig.game.spawnEntity(EntityImage, this.pos.x + 50, this.pos.y - 50, {src: "demon.png", alpha: 0});
                    this.triggered = true;
                    entity.tween({alpha: 1}, 1.0, {delay: .3}).start();
                    entity.tween({pos: {y: entity.pos.y - 30}}, .8, {delay: .4}).start();
                    this.powerupSFX.play();
                    this.kill();
                }
            }
        }
    });

});

