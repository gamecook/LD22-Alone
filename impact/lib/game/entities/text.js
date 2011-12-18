ig.module(
	'game.entities.text'
)
.requires(
	'impact.entity',
    'impact.font'
)
.defines(function(){

    EntityText = ig.Entity.extend({
        font: null,
        text: "undefined",
        alpha: 1,
        alignment: ig.Font.ALIGN.LEFT,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.FIXED,
        maxVel: {x: 0, y: 0},
        init: function(x,y,settings)
        {
            this.parent(x,y,settings);
            var fileName = "04b03";

            switch(settings.size)
            {
                case("medium"): case("large"):
                    fileName += "-"+settings.size;
                    console.log(settings.size);
                    break;
                default:
                    fileName += "";
            }
            this.font = new ig.Font('media/'+fileName+'.font.png');
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
            this.size = {x: this.font.widthForString(this.text), y: 8};
            this.font.draw( this.text,
                            Math.round(this.pos.x) - this.offset.x - ig.game.screen.x,
            				Math.round(this.pos.y) - this.offset.y - ig.game.screen.y,
                            this.alignment);
            if( this.alpha != 1) {
                ig.system.context.globalAlpha = 1;
            }
        }
    });

});

