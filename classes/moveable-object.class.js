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
        console.log('Move right');
    }

    moveLeft(){
        setInterval(() =>{
            this.position_x -= this.speed;
        }, (1000 / 60));
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
}