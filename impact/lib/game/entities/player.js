ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){
    EntityPlayer = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/player.png', 16, 16 ),
        size: {x: 8, y:14},
        offset: {x: 4, y: 2},
        flip: false,
        maxVel: {x: 50, y: 100},
        friction: {x: 600, y: 0},
        accelGround: 400,
        accelAir: 200,
        jump: 200,
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        startPosition: null,
        fallDistance: 0,
        maxFallDistance: 20000,
        hasSword: false,
        hasShield: false,
        init: function( x, y, settings ) {
        	this.parent( x, y, settings );
            this.setupAnimation();
            this.startPosition = {x:x,y:y};
        },
        setupAnimation: function()
        {
            var offset = 0;
            if(this.hasShield && this.hasSword)
                offset = 3;
            else if(this.hasSword)
                offset = 2;
            else if(this.hasShield)
                offset = 1;

            offset = offset * 10;
            this.addAnim('idle', 1, [0+offset]);
            this.addAnim('run', .07, [0+offset,1+offset,2+offset,3+offset,4+offset,5+offset]);
            this.addAnim('jump', 1, [9+offset]);
            this.addAnim('fall', 0.4, [6+offset,7+offset]);
        },
        update: function() {
           // move left or right
        	var accel = this.standing ? this.accelGround : this.accelAir;
        	if(this.standing)
            {
                if( ig.input.state('left') ) {
                    this.accel.x = -accel;
                    this.flip = true;
                }else if( ig.input.state('right') ) {
                    this.accel.x = accel;
                    this.flip = false;
                }else{
                    this.accel.x = 0;
                }
            }
            else
            {

                this.accel.x = 0;
            }
        	// jump
            /*if( this.standing && ig.input.pressed('jump')){
                this.vel.y = -this.jump;
            }*/

            // set the current animation, based on the player's speed
            if( this.vel.y < 0 ) {
            	this.currentAnim = this.anims.jump;
                this.fallDistance = 0;
            }else if( this.vel.y > 0 ) {
            	this.currentAnim = this.anims.fall;
                this.fallDistance += this.vel.y;
            }else if( this.vel.x != 0 ) {
            	this.currentAnim = this.anims.run;
                this.fallDistance = 0;
            }else {
            	this.currentAnim = this.anims.idle;
                this.fallDistance = 0;
            }
            this.currentAnim.flip.x = this.flip;

            if(this.fallDistance > this.maxFallDistance)
                this.kill();

            //console.log("Fall Distance", this.fallDistance);
            // move!
        	this.parent();
        },
        check: function( other ) {
            //other.alpha = .5;
            if(this.fallDistance > (this.maxFallDistance * .8))
                this.kill();
        },
        kill: function()
        {
            this.parent();
            var x = this.startPosition.x;
            var y = this.startPosition.y;
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {callBack:function(){ig.game.spawnEntity( EntityPlayer, x, y)}} );
        },
        equip: function(id)
        {
            if(id == "sword")
                this.hasSword = true
            if(id == "shield")
                this.hasShield = true;

            this.setupAnimation();
        }

    });

    EntityDeathExplosion = ig.Entity.extend({
        lifetime: 1,
        callBack: null,
        particles: 25,
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
                for(var i = 0; i < this.particles; i++)
                    ig.game.spawnEntity(EntityDeathExplosionParticle, x, y, {colorOffset: settings.colorOffset ? settings.colorOffset : 0});
                this.idleTimer = new ig.Timer();
            },
            update: function() {
                if( this.idleTimer.delta() > this.lifetime ) {
                    this.kill();
                    if(this.callBack)
                        this.callBack();
                    return;
                }
            }
    });

    EntityDeathExplosionParticle = ig.Entity.extend({
        size: {x: 2, y: 2},
        maxVel: {x: 160, y: 200},
        lifetime: 2,
        fadetime: 1,
        bounciness: 0,
        vel: {x: 100, y: 30},
        friction: {x:100, y: 0},
        collides: ig.Entity.COLLIDES.LITE,
        colorOffset: 0,
        totalColors: 7,
        animSheet: new ig.AnimationSheet( 'media/blood.png', 2, 2 ),
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            var frameID = Math.round(Math.random()*this.totalColors) + (this.colorOffset * (this.totalColors+1));
            this.addAnim( 'idle', 0.2, [frameID] );
            this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
            this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
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