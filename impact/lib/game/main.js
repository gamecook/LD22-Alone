ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
    'game.entities.player',
    'game.entities.text',
    'game.entities.image',
    'game.entities.snowemitter',
    'game.entities.fountain',
    'game.entities.torrent',
    'game.levels.alone',
    /*'impact.debug.debug',*/
    'game.entities.sword',
    'game.entities.shield',
    'game.entities.spawnboss',
    'plugins.tween'
)
.defines(function(){

MyGame = ig.Game.extend({
    gravity: 300,
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	player: null,

	init: function() {
		// Initialize your game here; bind keys etc.
        ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
        ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
        ig.input.bind( ig.KEY.SPACE, 'jump' );
        this.loadLevel( LevelAlone );

        ig.music.add( 'media/sounds/24377__dj-chronos__asteriod-surface-wind.*' );
        ig.music.volume = 0.2;
        ig.music.play();
	},
	// In your Game class
	loadLevel: function( data ) {
	    this.parent( data );

	    // Find the player once at level load
	    this.player = this.getEntitiesByType( EntityPlayer )[0];
	},
    update: function() {
        // screen follows the player
        var player = this.getEntitiesByType( EntityPlayer )[0];
        if( player ) {
            if(player.accel.x > 0 && this.instructText)
                this.instructText = null;
            this.screen.x = player.pos.x - ig.system.width/2;
            this.screen.y = player.pos.y - ig.system.height/2;
        }
        if(ig.input.state('start')){
            console.log("Start");
        }
        if(!this.showStats){
            this.parent();
        }else{
            if(ig.input.state('continue')){
                this.showStats = false;
                this.levelExit.nextLevel();
                this.parent();
            }
        }
    },

	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 180, 2 );

});
