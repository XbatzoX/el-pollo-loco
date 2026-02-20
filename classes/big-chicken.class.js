class BigChicken extends MoveableObject {
    width = 70;
    height = 70;
    position_y = 360;
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGE_DEAD = [
        'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]
    energy = 5;

    /**
     * The constructor load the images for BigChicken animation and calculate the x sporn point of chicken with random function and offset
     * 
     * @param {number} offsetX - includes the offset value for sporn point of big chicken 
     */
    constructor(offsetX){
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.visible = true;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);

        this.position_x = offsetX + (Math.random() * 300);
        this.speed = 0.15 + (Math.random() * 0.3);

        this.animate();
    }

    /**
     * This function creates intervals for for image and moving animations
     * 
     */
    animate(){
        this.moveInterval = setInterval(() =>{
            this.moveLeft();
        }, (1000 / 60));
        this.intervalIDs.push(this.moveInterval);

        this.animationInterval = setInterval(() => {
            if(this.isDead()){
                this.playAnimation(this.IMAGE_DEAD);
            }else{
                this.playAnimation(this.IMAGES_WALKING);
            }      
        },200);
        this.intervalIDs.push(this.animationInterval);
    }
}