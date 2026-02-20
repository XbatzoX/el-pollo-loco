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

    setWorld(){
        this.character.world = this;
    }

    run(){
        this.idRunInterval = setInterval(() => {
            // check Collision
            this.checkCollisions();
            // throw bottle
            this.checkThrowObjects();
            // check collecting Coins
            this.checkIfCollectingCoins();
            // check collecting bottles
            this.checkIfCollectingBottles();
            // check encounter with endboss
            this.checkEncounterEndboss();
            // check bonus reached
            this.checkAmountOfCoins();
            this.checkIfEndbossIsDead();
            this.playGameSound();
        }, 200);
        this.intervalObj.push(this.idRunInterval);
    }

    checkThrowObjects(){
        if((this.keyboard.D || this.throwBottleMobile(this.mobileThrowBottle)) && this.bottleInAir == false && this.bottlebar.amount > 0 && this.isFinalAnimationFinished()){
            console.log('function wird doppelt aufgerufen');
            let bottle = new ThrowableObject(this.character.position_x, this.character.position_y, this.character.otherDirection);
            // bottle.playThrowBottleSound(this.soundEnabled, bottle.isThrown);
            this.playBottleSound();
            this.bottlebar.amount -= 1;
            this.bottlebar.setBottleValue(this.bottlebar.amount, true);
            this.throwableObjects.push(bottle);
        }
    }

    playBottleSound(){
        if(this.soundEnabled){
            console.log('sound wird abgespielt');
            this.throwSound.currentTime = 0;
            this.throwSound.play();
        }
    }

    isFinalAnimationFinished(){
        let throwBottleAllowed = false;
        if((this.character.position_x < 3350) || (this.character.position_x >= 3350 && this.endbossAttacks)){
            throwBottleAllowed = true;
        }
        return throwBottleAllowed;
    }

    checkCollisions(){
        this.level.enemies.forEach((enemy) => {
            if(this.character.isJumpingOnEnemy(enemy)){
                enemy.hit(true);
            }
            this.character.currentStateOfHit = this.character.isColliding(enemy);
            this.character.hit(this.character.currentStateOfHit);
            if(this.character.isColliding(enemy)){
                this.statusbar.setPercentage(this.character.energy);
            }
            if(this.throwableObjects.length > 0){
                this.actualBottle = this.throwableObjects[0];
                this.actualBottle.currentStateOfHit = this.actualBottle.isColliding(enemy);
                enemy.hit(this.actualBottle.currentStateOfHit);
                //this.actualBottle.isColliding(enemy)
                if(this.actualBottle.currentStateOfHit){
                    this.actualBottle.bottleHitsEnemy();
                    this.actualBottle.playBottleHitsEnemySound(this.soundEnabled, this.actualBottle.isHitEnemy)
                    if(enemy instanceof Endboss){
                        this.bossbar.setPercentage(enemy.energy);
                        this.checkDirectionOfHit();
                    }
                    // this.actualBottle.speed = 0;
                    
                }
                this.actualBottle.shiftBottleFromArray(this.actualBottle, this.throwableObjects);
                // check bottle in air
                this.checkIfBottleInAir();
            }
                
        });
    }

    checkDirectionOfHit(){
        let endbossChicken = this.level.enemies[(this.level.enemies.length) - 1];
        if(this.character.position_x > endbossChicken.position_x){
            this.level.enemies[(this.level.enemies.length) - 1].otherDirection = true;
        }
        if((this.character.position_x < endbossChicken.position_x) && endbossChicken.otherDirection == true){
            this.level.enemies[(this.level.enemies.length) - 1].otherDirection = false;
        }
    }

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

    checkAttackScenario(enemyEndboss){
        if(this.level.enemies[enemyEndboss].isAttack()){
            if(!this.endbossAttacks){
                this.level.enemies[enemyEndboss].playAttackSound(this.soundEnabled);
                this.endbossAttacks = true;
            }
        }
    }

    checkIfEndbossIsDead(){
        let endboss = this.level.enemies.length - 1;
        if(this.level.enemies[endboss].isDead() && !this.level.enemies[endboss].endbossDefeated && !this.isDefeated){
            this.level.enemies[endboss].playAttackSound(this.soundEnabled);
            this.isDefeated = true;
        }
    }

    checkAmountOfCoins(){
        if((this.coinbar.amount == 10) && !this.allCoinsCollected){
            this.character.energy = 100;
            this.statusbar.setPercentage(this.character.energy);
            this.fillBottleAmount();
            this.coinbar.playBonusSound(this.soundEnabled);
            this.allCoinsCollected = true;
        }
    }

    fillBottleAmount(){
        let amountOfBottles = this.bottlebar.amount;
        for (let index = amountOfBottles; index < 10; index++) {
            this.bottlebar.increaseAmount(true);
        }
        this.bottlebar.setBottleValue(this.bottlebar.amount, true);
    }

    throwBottleMobile(buttonDown){
        let throwBottle;
        if(buttonDown){
            throwBottle = true;
        }else{
            throwBottle = false;
        }
        return throwBottle;
    }

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

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

       
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);


        this.ctx.translate(-this.camera_x,0);
        // Space for unmoveable elements
        this.addToMap(this.statusbar);
        this.addToMap(this.coinbar);
        this.addToMap(this.bottlebar);
        this.addToMap(this.bossbar);
        this.ctx.translate(this.camera_x,0);
        // *********************************
        

        this.ctx.translate(-this.camera_x, 0);
        
        // draw() wird immer wieder aufgereufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        })
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            // this.addToMap(o);
            if(!(o instanceof Coin || o instanceof Bottle)){
                this.checkIfEnemyAlive(o);
            }
            if(o instanceof Coin || o instanceof Bottle){
                this.checkIfObjectCollected(o);
            }
        })
    }

    addToMap(mo){
        if(mo.otherDirection){
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        mo.drawOffsetFrame(this.ctx);

        if(mo.otherDirection){
            this.flipImageBack(mo);
        }
    }

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.position_x = mo.position_x * -1;
    }

    flipImageBack(mo){
        mo.position_x = mo.position_x * -1;
        this.ctx.restore();
    }
    
    checkIfBottleInAir(){
        if( (this.actualBottle.position_y > 480)){
            this.bottleInAir = false;
        }else{
            this.bottleInAir = true;
        }
    }

    checkIfEnemyAlive(o){
        if(o instanceof Chicken || o instanceof BigChicken){
            if(o.isDead()){
                if(!o.visible){return;}
                let actualTime = new Date().getTime();
                if((actualTime - o.timestampDead) > 2000){
                    o.visible = false;
                }else{
                    this.addToMap(o);
                }
            }else{
                this.addToMap(o);
            }
        }else{
            this.addToMap(o);
        }
    }

    checkIfObjectCollected(o){
        if(!o.isCollected()){
            this.addToMap(o);
        }
    }
}