class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    currentImage = 0;
    speedY = 0;
    acceleration = 2.5;
    offset = {
        "UP" : 0,
        "DOWN" : 0,
        "LEFT" : 0,
        "RIGHT" : 0
    };
    energy = 100;
    lastHit = 0;
    timestampDead;
    timeLastMove_x;
    timeLastMove_y;
    timestampIdle = 0;
    timestampLongIdle = 0;
    visible;
    isNoLongerAlive = false;
    jumpOnEnemy;
    storePosition_x;
    storePosition_y;

    moveRight(){
        this.position_x += this.speed;
        this.storePosition_x = this.position_x;
        this.timeLastMove_x = new Date().getTime();
    }

    moveLeft(){
        this.position_x -= this.speed;
        this.storePosition_x = this.position_x;
        this.timeLastMove_x = new Date().getTime();
    }

    playAnimation(images){
        let i = this.currentImage % images.length; // let i = 7 % 6 => 1, rest 1 (0,1,2,3,4,5,0,1,...)
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

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

    isAboveGround(){
        if(this instanceof ThrowableObject){ // Throwable objects should always fall
            return true;
        }else{
            return this.position_y < 230;
        }
    }

    jump(){
        this.speedY = 30;
    }

    // character.isColliding(chicken)
    isColliding(mo){
        return (((this.position_x + this.width - this.offset.RIGHT) > (mo.position_x + mo.offset.LEFT)) &&
            ((this.position_y + this.height - this.offset.DOWN) > (mo.position_y + mo.offset.UP)) &&
            ((this.position_x + this.offset.LEFT) < (mo.position_x + mo.width - mo.offset.RIGHT)) &&
            ((this.position_y + this.offset.UP) < (mo.position_y + mo.height - mo.offset.DOWN)) && (mo.energy > 0) && (!this.jumpOnEnemy));
    }

    hit(){
        this.energy -= 5;
        if(this.energy < 0){
            this.energy = 0;
        }else{
            this.lastHit = new Date().getTime();
        }
    }

    isHurt(){
        let timePassed = new Date().getTime() - this.lastHit; // difference in ms
        timePassed = (timePassed / 1000); // difference in s
        return (timePassed < 1);
    }

    isDead(){
        if((this.energy <= 0) && (!this.isNoLongerAlive)){
            this.isNoLongerAlive = true;
            this.timestampDead = new Date().getTime();
        }
        return (this.energy == 0);
    }

    // Pepe jumps on enemy
    isJumpingOnEnemy(mo){
        this.jumpOnEnemy = false;
        let diff_x = (this.position_x - mo.position_x);
        let diff_y = ((this.position_y + this.height) - mo.position_y);
         
        diff_x = Math.abs(diff_x);
        diff_y = Math.abs(diff_y);
        this.jumpOnEnemy = ((diff_x <= 50) && (diff_y <= 50) && (this.speedY <= 0))

        return this.jumpOnEnemy;
    }

    isIdle(){
        let idle = false;
        if(this.checkIdleTime()){
            idle = true;
            if(this.timestampIdle <= 0){
                this.timestampIdle = new Date().getTime();
            }else{
                this.timestampIdle = 0;
            }
        }
        return idle;
    }

    isLongIdle(){
        let longIdle;
        if((this.timestampLongIdle <= 0) && (this.isIdle())){
            this.timestampLongIdle = new Date().getTime();
        }

        if(this.isIdle()){
            longIdle = ((new Date().getTime() - this.timestampLongIdle) > 5000);
        }else{
            longIdle = false;
            this.timestampLongIdle = 0;
        }
        return longIdle;
    }

    checkIdleTime(){
        return ((this.position_x == this.storePosition_x) && (this.position_y == this.storePosition_y) &&
            (new Date().getTime() - this.timeLastMove_x >= 1000) && (new Date().getTime() - this.timeLastMove_y > 1000));
    }

    initialiseIdleData(){
        this.storePosition_x = this.position_x;
        this.storePosition_y = this.position_y;
        this.timeLastMove_x = new Date().getTime();
        this.timeLastMove_y = new Date().getTime();
    }
}