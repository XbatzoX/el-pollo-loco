class MoveableObject{
    position_x = 120;
    position_y = 280;
    img;
    width = 100;
    height = 150;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;

    loadImage(path){
        this.img = new Image(); // document.getElementById('image') <img id="image">
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

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

    draw(ctx){
        ctx.drawImage(this.img, this.position_x, this.position_y, this.width, this.height);

    }

    drawFrame(ctx){
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.position_x, this.position_y, this.width, this.height);
        ctx.stroke();
    }
}