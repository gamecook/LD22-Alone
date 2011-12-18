ig.module(
	'game.entities.sword'
)
.requires(
	'impact.entity'
)
.defines(function(){

    EntitySword = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/sword.png', 3, 8 ),
        size: {x: 3, y: 8},
        offset: {x:0,y:3},
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
                other.equip("sword");
                this.kill();
            }
        }

    });

});

