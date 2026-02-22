class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    currentImage = 0;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    timestampDead;
    timeLastMove_x;
    timeLastMove_y;
    timestampIdle = 0;
    timestampLongIdle = 0;
    timestampBottleThrow = 0;
    visible;
    isNoLongerAlive = false;
    jumpOnEnemy;
    storePosition_x;
    storePosition_y;
    lastStateOfHit = false;
    currentStateOfHit;
    bossEncounter = false;
    encounterTimerActive = false;
    attackTimerActive = false;
    isAttacking = false;
    intervalIDs = [];
    animationInterval;
    moveInterval;

    /**
     * The constructor implements the functions of class DrawableObjects
     * 
     */
    constructor(){
        super();
        this.value = 0;
    }

    /**
     * This function is used to move the object in right direction and store the time of last moving of object
     * 
     */
    moveRight(){
        this.position_x += this.speed;
        this.storePosition_x = this.position_x;
        this.timeLastMove_x = new Date().getTime();
    }

    /**
     * This function is used to move the object in left direction and store the time of last moving of object
     * 
     */
    moveLeft(){
        this.position_x -= this.speed;
        this.storePosition_x = this.position_x;
        this.timeLastMove_x = new Date().getTime();
    }

    /**
     * This function is used to show the correct animation image on map
     * 
     * @param {Array} images - includes the images path
     * @returns - a boolean if all images of array are loaded
     */
    playAnimation(images){
        let i = this.currentImage % images.length; 
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        return ((this.currentImage) == images.length);
    }

    /**
     * This function is used to craete gravity of objects which are above the ground
     * 
     */
    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || (this.speedY > 0)){
                this.position_y -= this.speedY;
                this.speedY -= this.acceleration;
                this.storePosition_y = this.position_y;
                this.timeLastMove_y = new Date().getTime();
            }
        }, (1000 / 25));
    }

    /**
     * This function checks if the object is above the ground on map
     * 
     * @returns - a bollean with info
     */
    isAboveGround(){
        if(this instanceof ThrowableObject){ 
            return true;
        }else{
            return this.position_y < 230;
        }
    }

    /**
     * This function is used to jump animation of moveable objects
     * 
     */
    jump(){
        this.speedY = 30;
    }

    /**
     * This function is used to check if a moveable object is colliding with an moveable object
     * 
     * @param {MoveableObject} mo - includes the instance of a moveable object 
     * @returns - a boolean feedback
     */
    isColliding(mo){
        return (((this.position_x + this.width - this.offset.RIGHT) > (mo.position_x + mo.offset.LEFT)) &&
            ((this.position_y + this.height - this.offset.DOWN) > (mo.position_y + mo.offset.UP)) &&
            ((this.position_x + this.offset.LEFT) < (mo.position_x + mo.width - mo.offset.RIGHT)) &&
            ((this.position_y + this.offset.UP) < (mo.position_y + mo.height - mo.offset.DOWN)) &&
            ((mo.energy || mo.value) > 0) && (!this.jumpOnEnemy));
    }

    /**
     * This function decrease the energy level of the character or enemy
     * 
     * @param {boolean} currentStateOfHit - includes information if the object was hit for first time
     */
    hit(currentStateOfHit){
        this.currentStateOfHit = currentStateOfHit;
        let risingEdge = this.currentStateOfHit && !this.lastStateOfHit;
        this.lastStateOfHit = this.currentStateOfHit;
        if(risingEdge){
            this.energy -= 5;
            if(this.energy < 0){
                this.energy = 0;
            }else{
                this.lastHit = new Date().getTime();
            }
        }
    }

    /**
     * This function is used to play the hurt animation of object
     * 
     * @returns - boolean information
     */
    isHurt(){
        let timePassed = new Date().getTime() - this.lastHit; 
        timePassed = (timePassed / 1000); 
        return (timePassed < 0.5);
    }

    /**
     * This function is used to play animation if the object is dead
     * 
     * @returns - boolean information
     */
    isDead(){
        if((this.energy <= 0) && (!this.isNoLongerAlive)){
            this.isNoLongerAlive = true;
            this.currentImage = 0;
            this.timestampDead = new Date().getTime();
        }
        return (this.energy == 0);
    }

    /**
     * This function is used to play animation if the endnoss is attacking
     * 
     * @returns - a boolean information
     */
    isAttack(){
        if(this.bossEncounter && this.encounterTimerActive && !this.isAttacking){
            if(!this.attackTimerActive){
                setTimeout(() => {
                    this.isAttacking = true;
                }, 2000);
                this.attackTimerActive = true;
            }
            return true;
        }else{
            return false;
        }
    }

    /**
     * This function is used to play running animation of endboss after first Encounter with pepe
     * 
     * @returns - a boolean information
     */
    isRunning(){
        if(this.bossEncounter && this.encounterTimerActive && this.isAttacking && this.attackTimerActive){
            return true;
        }
    }

    /**
     * This function checks if pepe is jumping on an enemy
     * 
     * @param {MoveableObject} mo - instance of moveable object 
     * @returns 
     */
    isJumpingOnEnemy(mo){
        this.jumpOnEnemy = false;
        let diff_x = (this.position_x - mo.position_x);
        let diff_y = ((this.position_y + this.height) - mo.position_y);
        diff_x = Math.abs(diff_x);
        diff_y = Math.abs(diff_y);
        this.jumpOnEnemy = ((diff_x <= 70) && (diff_y <= 50) && (this.speedY <= 0))
        return this.jumpOnEnemy;
    }

    /**
     * This function is used to play animation after time of standing still 
     * 
     * @param {boolean} isThrowKeyActive - includes the information if pepe is throwing a salsa bottle
     * @returns - a boolean feedback if idle animation should play
     */
    isIdle(isThrowKeyActive){
        let idle = false;
        if(this.checkIdleTime(isThrowKeyActive)){
            idle = true;
            if(this.timestampIdle <= 0){
                this.timestampIdle = new Date().getTime();
            }else{
                this.timestampIdle = 0;
            }
        }
        return idle;
    }

    /**
     * This function is used to play a pepe animation after a long time of standing still 
     * 
     * @param {boolean} isThrowKeyActive - includes the information if pepe is throwing a salsa bottle
     * @returns - a boolean feedback if long idle animation should play
     */
    isLongIdle(isThrowKeyActive){
        let longIdle;
        if((this.timestampLongIdle <= 0) && (this.isIdle())){
            this.timestampLongIdle = new Date().getTime();
        }
        if(this.isIdle(isThrowKeyActive)){
            longIdle = ((new Date().getTime() - this.timestampLongIdle) > 8000);
        }else{
            longIdle = false;
            this.timestampLongIdle = 0;
        }
        return longIdle;
    }

    /**
     * This function is used to check the time how long pepe did not move or did not throw a bottle
     * 
     * @param {boolean} isThrowKeyActive - includes the information if pepe is throwing a salsa bottle
     * @returns - a boolean information
     */
    checkIdleTime(isThrowKeyActive){
        if(isThrowKeyActive){
            this.timestampBottleThrow = new Date().getTime();
        }else{
            this.timestampBottleThrow = 0;
        }
        return ((this.position_x == this.storePosition_x) && (this.position_y == this.storePosition_y) &&
            (new Date().getTime() - this.timeLastMove_x >= 200) && (new Date().getTime() - this.timeLastMove_y > 200) &&
            (new Date().getTime() - this.timestampBottleThrow >= 200));
    }

    /**
     * This function initialse time stamp and position to begin of game
     * 
     */
    initialiseIdleData(){
        this.storePosition_x = this.position_x;
        this.storePosition_y = this.position_y;
        this.timeLastMove_x = new Date().getTime();
        this.timeLastMove_y = new Date().getTime();
    }

    /**
     * This function is used to clear the intervals if game is ended
     * 
     */
    resetInterval(){
        this.intervalIDs.forEach(id => {
            clearInterval(id);
        });
        this.intervalIDs = [];
    }
}