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
    isThrown = false;
    isHitEnemy = false;
    throwDirectionLeft = false;

    constructor(position_x, position_y, throwDirectionLeft){
        super().loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.setPositionOfBottle(position_x, position_y, throwDirectionLeft);
        this.height = 70;
        this.width = 60;
        this.throw();
    }

    throw(){
        this.speedY = 30;
        this.applyGravity();

        this.idBottleThrow = setInterval(() => {
            this.playThrowBottleSound(this.isThrown);
            this.playAnimation(this.IMAGES_ROTATION);
        }, 100);

        this.idBottlePosition_x = setInterval(() => {
            if(!this.throwDirectionLeft){
                this.position_x += 10;
            }else{
                this.position_x -= 10;
            }
        }, 25);
    }

    bottleHitsEnemy(){
        this.speedY = 0;
        this.speed = 0;
        clearInterval(this.idBottleThrow);
        clearInterval(this.idBottlePosition_x);

        setInterval(() => {
            this.playBottleHitsEnemySound(this.isHitEnemy);
            this.playAnimation(this.IMAGES_SPLASH);
        }, 200);
    }

    shiftBottleFromArray(actualBottle, bottleArr){
        if((actualBottle.position_y >= 480)){
            bottleArr.shift();
        }
    }

    playThrowBottleSound(isThrown){
        if(!isThrown){
            let sound = new Audio('assets/audio/bottle_throw.mp3');
            sound.play();
            this.isThrown = true;
        }
    }

    playBottleHitsEnemySound(isHitEnemy){
        if(!isHitEnemy){
            let sound = new Audio('assets/audio/bottle_hit.mp3');
            sound.play();
            this.isHitEnemy = true;
        }
    }

    setPositionOfBottle(position_x, position_y, throwDirectionLeft){
        this.throwDirectionLeft = throwDirectionLeft;
        this.position_y = (position_y + 100);
        if(!this.throwDirectionLeft){
            this.position_x = (position_x + 100);
        }else{
            this.position_x = (position_x - 100);
        }
    }
}