class ThrowableObject extends MoveableObject {

    IMAGES_ROTATION = [
        '../assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(position_x, position_y){
        super().loadImage('../assets/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.position_x = position_x;
        this.position_y = position_y;
        this.height = 70;
        this.width = 60;
        this.throw();
    }

    throw(){
        this.speedY = 30;
        this.applyGravity();

        setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);
        }, 100);

        setInterval(() => {
            this.position_x += 10;
        }, 25);
    }
}