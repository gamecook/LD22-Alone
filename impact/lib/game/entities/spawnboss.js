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
        duration: 2,
        strength: 8,
        quakeTimer: null,

        powerupSFX: new ig.Sound('media/sounds/Explosion.*'),
        init: function( x, y, settings ) {
            if(settings.width)
                this.size.x = settings.width;
            this.parent( x, y, settings );
            this.quakeTimer = new ig.Timer();
        },
        check: function(other) {
            if(this.triggered)
                return;
            else{
                if (other instanceof EntityPlayer) {
                    this.triggered = true;
                    ig.input.unbindAll();
                    var entity = ig.game.spawnEntity(EntityImage, this.pos.x + 50, this.pos.y - 50, {src: "demon.png", alpha: 0});

                    entity.tween({alpha: 1}, 1.0, {delay: .3}).start();
                    entity.tween({pos: {y: entity.pos.y - 30}}, .8, {delay: .4}).start();
                    this.powerupSFX.play();

                    var gameOverScreen = ig.game.spawnEntity(EntityImage, ig.game.screen.x+16, ig.game.screen.y, {src: "game-over-mask.png", alpha:0});
                    gameOverScreen.tween({alpha:1}, 1.5, {delay: 2.0}).start();

                    var continueText = ig.game.spawnEntity(EntityImage, ig.game.screen.x+100, ig.game.screen.y+100, {src: "continue.png", alpha:0, width:76, height: 8});
                    continueText.tween({alpha:1}, 0.5, {delay: 4.5}).start();

                    this.quakeTimer.set( this.duration );

                }
            }
        },
        update: function() {
            var delta = this.quakeTimer.delta();
            if( delta < -0.1 ) {
                var s = this.strength * Math.pow( -delta / this.duration, 2 );
                if( s > 0.5 ) {
                    ig.game.screen.x += Math.random().map( 0, 2, -s, s );
                    ig.game.screen.y += Math.random().map( 0, 2, -s, s );
                }
            }
        }
    });

});

