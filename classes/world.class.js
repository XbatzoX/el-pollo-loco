class World {
    character = new Character();
    statusbar = new StatusBar();
    coinbar = new Coinbar();
    bottlebar = new Bottlebar();
    bossbar = new Bossbar();
    idRunInterval;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    throwableObjects = [];
    actualBottle;
    bottleInAir = false;
    endbossAttacks = false;
    isDefeated = false;
    allCoinsCollected = false;
    intervalObj = [];
    soundEnabled = true;
    mobileThrowBottle = false;
    gameSound = new Audio('assets/audio/game_sound .mp3');
    throwSound = new Audio('assets/audio/bottle_throw.mp3');
    
/**
 * The constructor loads the map with all necessary elements and informations
 * @param {HTMLCanvasElement} canvas - includes the canvas html element
 * @param {Keyboard} keyboard  - includes the stats of keyboard elements
 * @param {boolean} soundEnabled - includes the information if sound is enabled 
 */
    constructor(canvas, keyboard, soundEnabled){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.soundEnabled = soundEnabled;
        this.level = createLevel(this.soundEnabled);
        this.intervalObj.push(this.character, this.level);
        this.draw(); 
        this.setWorld();
        this.run();
    }

    /*** This function links the world instance back to character for recognizing keyboard elements*/
    setWorld(){
        this.character.world = this;
    }

    /*** This function creates an intervall for checking if something happening in game*/
    run(){
        this.idRunInterval = setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkIfCollectingCoins();
            this.checkIfCollectingBottles();
            this.checkEncounterEndboss();
            this.checkAmountOfCoins();
            this.checkIfEndbossIsDead();
            this.playGameSound();
        }, 200);
        this.intervalObj.push(this.idRunInterval);
    }

    /*** This function checks if a player throw a bottle*/
    checkThrowObjects(){
        if((this.keyboard.D || this.throwBottleMobile(this.mobileThrowBottle)) && this.bottleInAir == false && this.bottlebar.amount > 0 && this.isFinalAnimationFinished()){
            let bottle = new ThrowableObject(this.character.position_x, this.character.position_y, this.character.otherDirection);
            this.playBottleSound();
            this.bottlebar.amount -= 1;
            this.bottlebar.setBottleValue(this.bottlebar.amount, true);
            this.throwableObjects.push(bottle);
        }
    }

    /*** This function plays the throwing bottle sound*/
    playBottleSound(){
        if(this.soundEnabled){
            this.throwSound.currentTime = 0;
            this.throwSound.play();
        }
    }

    /**
     * This function checks if the final animation after first encounter with endboss is finished and throwing bottle is allowed
     * @returns - a boolean feedback
     */
    isFinalAnimationFinished(){
        let throwBottleAllowed = false;
        if((this.character.position_x < 3350) || (this.character.position_x >= 3350 && this.endbossAttacks)){
            throwBottleAllowed = true;
        }
        return throwBottleAllowed;
    }

    /*** This function checks if pepe or a bottle is colliding wit an enemy*/
    checkCollisions(){
        this.level.enemies.forEach((enemy) => {
            this.checkJumpingOnEnemy(enemy);
            this.checkCharacterCollidingEnemy(enemy);
            this.checkBottleThrown(enemy);
        });
    }

    /**
     * This function checks if pepe is jumping on enemy
     * @param {MoveableObject} enemy - includes the instance of enemy
     */
    checkJumpingOnEnemy(enemy){
        if(this.character.isJumpingOnEnemy(enemy)){
            enemy.hit(true);
        }
        this.character.currentStateOfHit = this.character.isColliding(enemy);
        this.character.hit(this.character.currentStateOfHit);
    }

    /**
     * This function checks if pepe is colliding with an enemy
     * @param {MoveableObject} enemy - includes the instance of enemy
     */
    checkCharacterCollidingEnemy(enemy){
        if(this.character.isColliding(enemy)){
            this.statusbar.setPercentage(this.character.energy);
        }
    }

    /**
     * This function checks if a throwing bottle is hitting an enemy
     * @param {MoveableObject} enemy - includes the instance of enemy
     */
    checkBottleThrown(enemy){
        if(this.throwableObjects.length > 0){
            this.actualBottle = this.throwableObjects[0];
            this.actualBottle.currentStateOfHit = this.actualBottle.isColliding(enemy);
            enemy.hit(this.actualBottle.currentStateOfHit);
            if(this.actualBottle.currentStateOfHit){
                this.actualBottle.bottleHitsEnemy();
                this.actualBottle.playBottleHitsEnemySound(this.soundEnabled, this.actualBottle.isHitEnemy)
                if(enemy instanceof Endboss){
                    this.bossbar.setPercentage(enemy.energy);
                    this.checkDirectionOfHit();
                }
            }
            this.actualBottle.shiftBottleFromArray(this.actualBottle, this.throwableObjects);
            this.checkIfBottleInAir();
        }  
    }

    /*** This function checks if pepe is hitting endboss from behind*/
    checkDirectionOfHit(){
        let endbossChicken = this.level.enemies[(this.level.enemies.length) - 1];
        if(this.character.position_x > endbossChicken.position_x){
            this.level.enemies[(this.level.enemies.length) - 1].otherDirection = true;
        }
        if((this.character.position_x < endbossChicken.position_x) && endbossChicken.otherDirection == true){
            this.level.enemies[(this.level.enemies.length) - 1].otherDirection = false;
        }
    }

    /*** This function checks if pepe is collecting a coin*/
    checkIfCollectingCoins(){
        this.level.coins.forEach((coin) => {
            if(this.character.isColliding(coin)){
                this.coinbar.increaseAmount(coin.notCollected);
                coin.playCollectingCoinSound(this.soundEnabled, coin.notCollected);
                this.coinbar.setCoinValue(this.coinbar.amount, coin.notCollected);
                coin.notCollected = false;
            }
        });
    }

    /*** This function checks if pepe is collecting a salsa bottle from ground*/
    checkIfCollectingBottles(){
        this.level.bottles.forEach((bottle) => {
            if(this.character.isColliding(bottle)){
                this.bottlebar.increaseAmount(bottle.notCollected);
                bottle.playCollectingBottleSound(this.soundEnabled, bottle.notCollected);
                this.bottlebar.setBottleValue(this.bottlebar.amount, bottle.notCollected);
                bottle.notCollected = false;
            }
        });
    }

    /*** This function checks if pepe has the first contact with endboss*/
    checkEncounterEndboss(){
        let enemyEndboss = this.level.enemies.length - 1;
        let bossEncounter = this.level.enemies[enemyEndboss].bossEncounter;
        let encounterTimerActive = this.level.enemies[enemyEndboss].encounterTimerActive;
        if(!bossEncounter && !encounterTimerActive){
            if(this.character.position_x >= 3600){
                this.level.enemies[enemyEndboss].playAlertSound(this.soundEnabled);
                setTimeout(() => {
                    this.level.enemies[enemyEndboss].bossEncounter = true;
                }, 3000);
                this.level.enemies[enemyEndboss].encounterTimerActive = true;
            }
        }
        this.checkAttackScenario(enemyEndboss);
    }

    /*** This function checks if enboss is attacking*/
    checkAttackScenario(enemyEndboss){
        if(this.level.enemies[enemyEndboss].isAttack()){
            if(!this.endbossAttacks){
                this.level.enemies[enemyEndboss].playAttackSound(this.soundEnabled);
                this.endbossAttacks = true;
            }
        }
    }

    /*** This function checks if endboss is dead*/
    checkIfEndbossIsDead(){
        let endboss = this.level.enemies.length - 1;
        if(this.level.enemies[endboss].isDead() && !this.level.enemies[endboss].endbossDefeated && !this.isDefeated){
            this.level.enemies[endboss].playAttackSound(this.soundEnabled);
            this.isDefeated = true;
        }
    }

    /*** This function checks if all coins are collected and gives a bonus */
    checkAmountOfCoins(){
        if((this.coinbar.amount == 10) && !this.allCoinsCollected){
            this.character.energy = 100;
            this.statusbar.setPercentage(this.character.energy);
            this.fillBottleAmount();
            this.coinbar.playBonusSound(this.soundEnabled);
            this.allCoinsCollected = true;
        }
    }

    /*** This function fill the bottle amount if bonus szenario is set*/
    fillBottleAmount(){
        let amountOfBottles = this.bottlebar.amount;
        for (let index = amountOfBottles; index < 10; index++) {
            this.bottlebar.increaseAmount(true);
        }
        this.bottlebar.setBottleValue(this.bottlebar.amount, true);
    }

    /**
     * This function recognize a throw bottle push button on mobile view
     * @param {boolean} buttonDown - includes the button down event 
     * @returns - a boolean feedback for one throw
     */
    throwBottleMobile(buttonDown){
        let throwBottle;
        if(buttonDown){
            throwBottle = true;
        }else{
            throwBottle = false;
        }
        return throwBottle;
    }

    /*** This function plays a game sound during playing game*/
    playGameSound(){
        if(this.gameSound != null){
            if(this.soundEnabled && (this.gameSound.ended || this.gameSound.paused)){
            this.gameSound.currentTime = 0;
            this.gameSound.volume = 0.3;
            this.gameSound.play();
            }
            if(!this.soundEnabled){
                this.gameSound.pause();
            }
        }
    }

    /*** This function draws all objects to map*/
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawMoveableObjects();
        this.ctx.translate(-this.camera_x,0);
        this.drawUnmoveableObjects();
        this.ctx.translate(this.camera_x,0);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        })
    }

    /*** This function draws all moveable objects to map*/
    drawMoveableObjects(){
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
    }

    /*** This function draws all unmoveable objects to map*/
    drawUnmoveableObjects(){
        this.addToMap(this.statusbar);
        this.addToMap(this.coinbar);
        this.addToMap(this.bottlebar);
        this.addToMap(this.bossbar);
    }

    /**
     * This function add objects from array into map
     * @param {Array} objects 
     */
    addObjectsToMap(objects){
        objects.forEach(o => {
            if(!(o instanceof Coin || o instanceof Bottle)){this.checkIfEnemyAlive(o);}
            if(o instanceof Coin || o instanceof Bottle){this.checkIfObjectCollected(o);}
        })
    }

    /**
     * This functions draw an image with correct direction to map
     * @param {MoveableObject} mo - includes the instace of object 
     */
    addToMap(mo){
        if(mo.otherDirection){this.flipImage(mo);}
        mo.draw(this.ctx);
        if(mo.otherDirection){this.flipImageBack(mo);}
    }

    /**
     * This function is used to flip the image of moveable object
     * @param {MoveableObject} mo  - includes the instace of object 
     */
    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.position_x = mo.position_x * -1;
    }

    /**
     * This function is used to flip the image back
     * 
     * @param {MoveableObject} mo - includes the instace of object 
     */
    flipImageBack(mo){
        mo.position_x = mo.position_x * -1;
        this.ctx.restore();
    }
    
    /**
     * This function checks if thrown bottle is above the ground
     */
    checkIfBottleInAir(){
        if( (this.actualBottle.position_y > 480)){
            this.bottleInAir = false;
        }else{
            this.bottleInAir = true;
        }
    }

    /**
     * This function checks if enemy is longer alive
     * @param {MoveableObject} o - includes the instace of object
     * @returns - end of function
     */
    checkIfEnemyAlive(o){
        if(o instanceof Chicken || o instanceof BigChicken){
            if(o.isDead()){
                if(!o.visible){return;}
                let actualTime = new Date().getTime();
                if((actualTime - o.timestampDead) > 2000){o.visible = false;}else{this.addToMap(o);}
            }else{this.addToMap(o);}
        }else{this.addToMap(o);}
    }

    /**
     * This function checks if a collectable object is already collected
     * @param {MoveableObject} o - includes the instace of object
     */
    checkIfObjectCollected(o){
        if(!o.isCollected()){this.addToMap(o);}
    }
}