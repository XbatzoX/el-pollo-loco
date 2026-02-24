class Chicken extends MoveableObject {
    width = 40;
    height = 40;
    position_y = 395;
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGE_DEAD = [
        'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]
    energy = 5;

    /**
     * The constructor loads the image arrays to begin and set the position of chicken with random function
     * 
     * @param {number} offsetX - includes an offset value for creating postion of chicken 
     */
    constructor(offsetX){
        super().loadImage('assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.visible = true;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.position_x = offsetX + (Math.random() * 300);
        this.speed = 0.15 + (Math.random() * 0.3);
        this.offset.LEFT = 0;
        this.offset.RIGHT = 0;
        this.animate();
    }

    /**
     * This function is used to creates intervals for moving and animation of chicken
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