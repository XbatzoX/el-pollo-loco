class Chicken extends MoveableObject {
    width = 70;
    height = 70;
    position_y = 360;
    IMAGES_WALKING = [
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor(){
        super().loadImage('../assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.position_x = 200 + (Math.random() * 500);
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate(){
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length; 
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        },200);
    }
}