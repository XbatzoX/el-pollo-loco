class ThrowableObject extends MoveableObject {

    IMAGES_ROTATION = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    idBottleThrow;
    idBottlePosition_x;

    constructor(position_x, position_y){
        super().loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.position_x = position_x;
        this.position_y = position_y;
        this.height = 70;
        this.width = 60;
        this.throw();
    }

    throw(){
        this.speedY = 30;
        this.applyGravity();

        this.idBottleThrow = setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);
        }, 100);

        this.idBottlePosition_x = setInterval(() => {
            this.position_x += 10;
        }, 25);
    }

    bottleHitsEnemy(){
        this.speedY = 0;
        this.speed = 0;
        clearInterval(this.idBottleThrow);
        clearInterval(this.idBottlePosition_x);

        setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
        }, 200);
    }

    shiftBottleFromArray(actualBottle, bottleArr){
        if((actualBottle.position_y >= 480)){
            bottleArr.shift();
        }
    }
}