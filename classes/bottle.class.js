class Bottle extends DrawableObject {
    height = 70;
    width = 60;
    
    IMAGES_BOTTLE = [
        'assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(position_x, imageNumber){
        super().loadImage(this.IMAGES_BOTTLE[imageNumber]);
        this.position_x = position_x;
        this.position_y = 370;
    }
}