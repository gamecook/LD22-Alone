ig.module(
	'game.entities.image'
)
.requires(
	'impact.entity',
    'impact.image'
)
.defines(function(){

    EntityImage = ig.Entity.extend({
        image: null,
        src: null,
        alpha: 1,
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(0, 0, 255, 0.7)',
        size: {x: 8, y: 8},
        alignment: ig.Font.ALIGN.LEFT,
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NONE,
        maxVel: {x: 0, y: 0},
        init: function(x,y,settings)
        {
            this.parent(x,y,settings);
            if(settings.width)
                this.size.x = settings.width;
            if(settings.height)
                this.size.y = settings.height;
            if(this.src)
                this.image = new ig.Image('media/'+this.src);
        },
        update: function()
        {
            this.parent()

        },
        draw: function()
        {
            if( this.alpha != 1) {
                ig.system.context.globalAlpha = this.alpha;
            }
            this.parent();
            if(this.image)
            {
            this.image.draw(Math.round(this.pos.x) - this.offset.x - ig.game.screen.x,
            				Math.round(this.pos.y) - this.offset.y - ig.game.screen.y,
                            this.alignment);
            }
            if( this.alpha != 1) {
                ig.system.context.globalAlpha = 1;
            }
        }
    });

});

