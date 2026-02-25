class ThrowableObject extends MoveableObject {

    IMAGES_ROTATION = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    idBottleThrow;
    idBottlePosition_x;
    idBottleSplash;
    isThrown = false;
    isHitEnemy = false;
    throwDirectionLeft = false;

    /**
     * The constructor loads the images of throwing bottle and set the position and direction if pepe is throwing
     * 
     * @param {number} position_x - includes the sporn point of bottle in x position 
     * @param {number} position_y - - includes the sporn point of bottle in y position  
     * @param {boolean} throwDirectionLeft - includes information if the bottle should throw in left direction
     */
    constructor(position_x, position_y, throwDirectionLeft){
        super().loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.setPositionOfBottle(position_x, position_y, throwDirectionLeft);
        this.height = 70;
        this.width = 60;
        this.offset.UP = 10;
        this.offset.DOWN = 10;
        this.offset.RIGHT = 20;
        this.offset.LEFT = 20;
        this.throw();
    }

    /**
     * This function is used to creates intervals for moving and image animation
     * 
     */
    throw(){
        this.speedY = 30;
        this.applyGravity();
        this.idBottleThrow = setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);
        }, 100);
        this.intervalIDs.push(this.idBottleThrow);
        this.idBottlePosition_x = setInterval(() => {
            this.setPositionX();
            this.clearBottleIntervals();
        }, 25);
        this.intervalIDs.push(this.idBottlePosition_x);
    }

    /**
     * This function is used to set the X Position of bootle during flight
     */
    setPositionX(){
        if(!this.throwDirectionLeft){
            this.position_x += 10;
        }else{
            this.position_x -= 10;
        }
    }

    /**
     * This function plays the animation if a bottle hits an enemy
     * 
     */
    bottleHitsEnemy(){
        this.speedY = 0;
        this.speed = 0;
        clearInterval(this.idBottleThrow);
        clearInterval(this.idBottlePosition_x);
        this.idBottleSplash = setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
            this.clearBottleIntervals();
        }, 200);
        this.intervalIDs.push(this.idBottleSplash);
    }

    /**
     * This function is used clear the bottle Intervals after hit an enemy or miss thrown
     */
    clearBottleIntervals(){
        if(this.position_y >= 480){
            this.resetInterval();
        }
    }

    /**
     * This function decrease the amount of bottles if pepe is throwing one
     * 
     * @param {ThrowableObject} actualBottle - includes all information of instance from actual bottle
     * @param {Array} bottleArr - includes the amount of bottles 
     */
    shiftBottleFromArray(actualBottle, bottleArr){
        if((actualBottle.position_y >= 480)){
            bottleArr.shift();
        }
    }

    /**
     * This function plays a sound if a bottle is thrown
     * 
     * @param {boolean} isEnabled - includes the information if the sound is enabled
     * @param {boolean} isThrown - includes the information if a bottle ist thrown 
     */
    playThrowBottleSound(isEnabled, isThrown){
        if(!isThrown && isEnabled){
            let sound = new Audio('assets/audio/bottle_throw.mp3');
            sound.play();
            this.isThrown = true;
        }
    }

    /**
     * This function plays a sound if a bottle hits an enemy
     * 
     * @param {boolean} isEnabled - includes the information if the sound is enabled
     * @param {boolean} isHitEnemy - includes the information if the bottle hits the enemy  
     */
    playBottleHitsEnemySound(isEnabled, isHitEnemy){
        if(!isHitEnemy && isEnabled){
            let sound = new Audio('assets/audio/bottle_hit.mp3');
            sound.play();
            this.isHitEnemy = true;
        }
    }

    /**
     * This function sets the start position of bottle if throwing begins
     * 
     * @param {number} position_x - includes the position on x-axis
     * @param {number} position_y - includes the position on y-axis
     * @param {boolean} throwDirectionLeft - includes information if pepe is throwing the bottle in left direction
     */
    setPositionOfBottle(position_x, position_y, throwDirectionLeft){
        this.throwDirectionLeft = throwDirectionLeft;
        this.position_y = (position_y + 100);
        if(!this.throwDirectionLeft){
            this.position_x = (position_x + 10);
        }else{
            this.position_x = (position_x - 10);
        }
    }
}