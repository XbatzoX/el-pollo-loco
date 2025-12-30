class Chicken extends MoveableObject {
    width = 70;
    height = 70;
    position_y = 360;
    IMAGES_WALKING = [
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGE_DEAD = [
        '../assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]
    energy = 5;

    constructor(){
        super().loadImage('../assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.visible = true;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);

        this.position_x = 600 + (Math.random() * 300);
        this.speed = 0.15 + (Math.random() * 0.3);

        this.animate();
    }

    animate(){
        setInterval(() =>{
            this.moveLeft();
        }, (1000 / 60));

        setInterval(() => {
            if(this.isDead()){
                this.playAnimation(this.IMAGE_DEAD);
            }else{
                this.playAnimation(this.IMAGES_WALKING);
            }      
        },200);
    }
}