class Character extends MoveableObject {
    height = 200;
    // position_y = 50;
    jumpOfDeath = false;
    cameraPositionReached = false;
    cameraOffset = 10;
    deathAnimationDone = false;
    mobileLeft = false;
    mobileRight = false;
    mobileJump = false;
    longIdleSound = new Audio('assets/audio/pepe_snoring.mp3');
    hurtSound = new Audio('assets/audio/pepe_hurt.mp3');


    IMAGES_WALKING = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'assets/img/2_character_pepe/3_jump/J-31.png',
        'assets/img/2_character_pepe/3_jump/J-32.png',
        'assets/img/2_character_pepe/3_jump/J-33.png',
        'assets/img/2_character_pepe/3_jump/J-34.png',
        'assets/img/2_character_pepe/3_jump/J-35.png',
        'assets/img/2_character_pepe/3_jump/J-36.png',
        'assets/img/2_character_pepe/3_jump/J-37.png',
        'assets/img/2_character_pepe/3_jump/J-38.png',
        'assets/img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DEAD = [
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-52.png',
        'assets/img/2_character_pepe/5_dead/D-53.png',
        'assets/img/2_character_pepe/5_dead/D-54.png',
        'assets/img/2_character_pepe/5_dead/D-55.png',
        'assets/img/2_character_pepe/5_dead/D-56.png',
        'assets/img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        'assets/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_IDLE = [
        'assets/img/2_character_pepe/1_idle/idle/I-1.png',
        'assets/img/2_character_pepe/1_idle/idle/I-2.png',
        'assets/img/2_character_pepe/1_idle/idle/I-3.png',
        'assets/img/2_character_pepe/1_idle/idle/I-4.png',
        'assets/img/2_character_pepe/1_idle/idle/I-5.png',
        'assets/img/2_character_pepe/1_idle/idle/I-6.png',
        'assets/img/2_character_pepe/1_idle/idle/I-7.png',
        'assets/img/2_character_pepe/1_idle/idle/I-8.png',
        'assets/img/2_character_pepe/1_idle/idle/I-9.png',
        'assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_IDLE_LONG = [
        'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    world;
    speed = 10;
    
    /**
     * Constructor loads images for animation and put offset for colliding with objects
     * 
     */
    constructor(){
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.animate();
        this.applyGravity();
        this.initialiseIdleData();
        this.position_y = 100;
        this.offset.UP = 70;
        this.offset.LEFT = 25;
        this.offset.RIGHT = 30;
    }

    /**
     * This function is used set Intervals for movements and animations
     * 
     */
    animate(){
        this.moveInterval = setInterval(() => {
            this.moveConditionsWithFunctions();
        }, (1000 / 60));
        this.intervalIDs.push(this.moveInterval);

        this.animationInterval = setInterval(() => {
           this.characterAnimations(); 
        },100);
        this.intervalIDs.push(this.animationInterval);
    }

    /**
     * This function controls moving right of character
     * 
     */
    moveRightCondition(){
        if((this.world.keyboard.RIGHT || this.movingRightMobile(this.mobileRight)) && (this.position_x < this.world.level.level_end_x) && this.movePermission()){
            this.moveRight();
            this.otherDirection = false;
        }
    }

    /**
     * This function controls moving left of character
     * 
     */
    moveLeftCondition(){
        if((this.world.keyboard.LEFT || this.movingLeftMobile(this.mobileLeft)) && (this.position_x > 0) && this.movePermission()){
            this.moveLeft();
            this.otherDirection = true;
        }
    }

    /**
     * This function controls jumping of character
     * 
     */
    jumpCondition(){
        if((this.world.keyboard.SPACE || this.jumpMobile(this.mobileJump)) && !this.isAboveGround()){
            this.jump();
            this.playJumpSound(this.world.soundEnabled);
        }
    }

    /**
     * This function is used to control the camera view on x-axis during game 
     * 
     */
    cameraView(){
        if(!this.world.level.enemies[this.world.level.enemies.length - 1].encounterTimerActive){
            this.world.camera_x = -this.position_x + 100;
        }else{
            this.updateCamera();
        }
    }

    /**
     * This function stages the death of the character.
     * 
     */
    deadAnimation(){
        this.playAnimation(this.IMAGES_DEAD);
        if(!this.jumpOfDeath){
            this.jump();
            this.jumpOfDeath = true;
        }
        if(this.jumpOfDeath){
            setTimeout(() => {
                this.deathAnimationDone = true;
            },500);
            if(this.deathAnimationDone && (this.position_y > 200)){
                document.dispatchEvent(new Event("gameover"));
            }
        }
    }

    /**
     * This function stages the character's damage event.
     * 
     */
    hurtAnimation(){
        this.playAnimation(this.IMAGES_HURT);
        this.playHurtSound(this.world.soundEnabled);
    }

    /**
     * This function stages the character's long idle event.
     * 
     */
    longIdleAnimation(){
        this.playAnimation(this.IMAGES_IDLE_LONG);
        this.playLongIdleSound(this.world.soundEnabled);
    }

    /**
     * This function manages the movement conditions and animations.
     * 
     */
    moveConditionsWithFunctions(){
        this.moveRightCondition();
        this.moveLeftCondition();
        this.jumpCondition();
        this.cameraView();
    }

    /**
     * This function manages the animation of different animations from character.
     * 
     */
    characterAnimations(){
        if(this.isDead()){
            this.deadAnimation();
        }else if(this.isHurt()){
            this.hurtAnimation();
        }else if(this.isLongIdle(this.world.keyboard.D)){
            this.longIdleAnimation();
        }else if(this.isIdle(this.world.keyboard.D)){
            this.playAnimation(this.IMAGES_IDLE);
        }else if(this.isAboveGround()){
            this.playAnimation(this.IMAGES_JUMPING);
        }else if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.movingLeftMobile(this.mobileLeft) || this.movingRightMobile(this.mobileRight)){
            this.playAnimation(this.IMAGES_WALKING);
        }else{this.playAnimation(['assets/img/2_character_pepe/1_idle/idle/I-1.png']);}           
    }

    /**
     * This function is used to set the camera view of x-axis
     * 
     */
    updateCamera(){
        let offsetCameraX = -this.position_x + 250;
        if((this.world.camera_x != offsetCameraX) && !this.cameraPositionReached){
            this.world.camera_x = -this.position_x + 100 + this.cameraOffset;
            this.cameraOffset += 0.5;
            if(this.world.camera_x == offsetCameraX){
                this.cameraPositionReached = true;
            }
        }else{
            this.world.camera_x = -this.position_x + 250;
        }
    }

    /**
     * This function creates a jump sound if sound is enabled
     * 
     * @param {boolean} isEnabled - includes information if the sound is enabled 
     */
    playJumpSound(isEnabled){
        if(isEnabled){
            let jumpSound = new Audio('assets/audio/jump.mp3');
            jumpSound.play();
        }
    }

    /**
     * This function creates a snoring sound if sound is enabled
     * 
     * @param {boolean} isEnabled - includes information if the sound is enabled 
     */
    playLongIdleSound(isEnabled){
        if(isEnabled && (this.longIdleSound.ended || this.longIdleSound.paused)){
            this.longIdleSound.currentTime = 0;
            this.longIdleSound.play();
        }
        if(!isEnabled && (this.longIdleSound != 0)){
            this.longIdleSound.pause();
        }
    }

    /**
     * This function creates a damage sound if the sound is enabled
     * 
     * @param {boolean} isEnabled - includes information if the sound is enabled  
     */
    playHurtSound(isEnabled){
        if(isEnabled && (this.hurtSound.ended || this.hurtSound.paused)){
            this.hurtSound.currentTime = 0;
            this.hurtSound.play();
        }
        if(!isEnabled && (this.hurtSound.currentTime != 0)){
            this.hurtSound.pause();
        }
    }

    /**
     * This function is used to stop the movement of character during first encounter with endboss
     * 
     * @returns - a boolean with info of move permission
     */
    movePermission(){
        let permission = false;
        let encounterDone = this.world.level.enemies[this.world.level.enemies.length - 1].encounterTimerActive;
        if(!encounterDone || (encounterDone && this.cameraPositionReached)){
            permission = true;
        }
        return permission;
    }

    /**
     * This function is used control the character for moving left in mobile version
     * 
     * @param {boolean} buttonDown - includes the information, that a user is pressing the button down 
     * @returns - returns a boolean as information that button is pressed
     */
    movingLeftMobile(buttonDown){
        let movingLeft;
        if(buttonDown){
            movingLeft = true;
        }else{
            movingLeft = false;
        }
        return movingLeft;
    }

    /**
     * This function is used control the character for moving right in mobile version
     * 
     * @param {boolean} buttonDown - includes the information, that a user is pressing the button down 
     * @returns - returns a boolean as information that button is pressed
     */
    movingRightMobile(buttonDown){
        let movingRight;
        if(buttonDown){
            movingRight = true;
        }else{
            movingRight = false;
        }
        return movingRight;
    }

    /**
     * This function is used control the character for jumping in mobile version
     * 
     * @param {boolean} buttonDown - includes the information, that a user is pressing the button down
     * @returns - returns a boolean as information that button is pressed
     */
    jumpMobile(buttonDown){
        let jump;
        if(buttonDown){
            jump = true;
        }else{
            jump = false;
        }
        return jump;
    }
}