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

    moveRight(){
        this.position_x += this.speed;
    }

    moveLeft(){
        this.position_x -= this.speed;
    }

    playAnimation(images){
        let i = this.currentImage % images.length; // let i = 7 % 6 => 1, Rest 1 (0,1,2,3,4,5,0,1,...)
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || (this.speedY > 0)){
                this.position_y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, (1000 / 25));
    }

    isAboveGround(){
        return this.position_y < 230;
    }

    jump(){
        this.speedY = 30;
    }

    drawFrame(ctx){
        if(this instanceof Character || this instanceof Chicken){
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.position_x, this.position_y, this.width, this.height);
            ctx.stroke();
        }
    }

    // character.isColliding(chicken)
    isColliding(mo){
        return (((this.position_x + this.width - this.offset.RIGHT) > (mo.position_x + mo.offset.LEFT)) &&
            ((this.position_y + this.height - this.offset.DOWN) > (mo.position_y + mo.offset.UP)) &&
            ((this.position_x + this.offset.LEFT) < (mo.position_x + mo.width - mo.offset.RIGHT)) &&
            ((this.position_y + this.offset.UP) < (mo.position_y + mo.height - mo.offset.DOWN)));
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
        return (this.energy == 0);
    }
}