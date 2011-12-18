ig.module(
	'game.entities.shield'
)
.requires(
	'impact.entity'
)
.defines(function(){

    EntityShield = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/shield.png', 7, 7 ),
        size: {x: 7, y: 7},
        offset: {x:0,y:2},
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.LITE,

        init: function(x,y,settings)
        {
            this.parent(x,y,settings);
            this.addAnim('idle', 1, [0]);
        },
        check: function(other) {
            if (other instanceof EntityPlayer) {
                other.equip("shield");
                this.kill();
            }
        }

    });

});

