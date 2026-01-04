class World {
    character = new Character();
    statusbar = new StatusBar();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    throwableObjects = [];
    actualBottle;
    bottleInAir = false;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw(); 
        this.setWorld();
        this.run();
    }

    setWorld(){
        this.character.world = this;
    }

    run(){
        setInterval(() => {
            // check Collision
            this.checkCollisions();
            // throw bottle
            this.checkThrowObjects();
            // check collecting Coins
            this.checkIfCollectingCoins();
        }, 200);
    }

    checkThrowObjects(){
        if(this.keyboard.D && this.bottleInAir == false){
            let bottle = new ThrowableObject((this.character.position_x + 100), (this.character.position_y + 100));
            this.throwableObjects.push(bottle);
        }
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
                if(this.actualBottle.isColliding(enemy)){
                    this.actualBottle.bottleHitsEnemy();
                    // this.actualBottle.speed = 0;
                    
                }
                this.actualBottle.shiftBottleFromArray(this.actualBottle, this.throwableObjects);
                // check bottle in air
                this.checkIfBottleInAir();
            }
                
        });
    }

    checkIfCollectingCoins(){
        this.level.coins.forEach((coin) => {
            if(this.character.isColliding(coin)){
                coin.notCollected = false;
            }
        });
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

       
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);


        this.ctx.translate(-this.camera_x,0);
        // Space for unmoveable elements
        this.addToMap(this.statusbar);
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
            if(!(o instanceof Coin)){
                this.checkIfEnemyAlive(o);
            }
            if(o instanceof Coin){
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
        if(o instanceof Chicken){
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