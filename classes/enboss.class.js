class Endboss extends MoveableObject {
    position_x = 3950;
    position_y = 50;
    speed = 2.5;
    height = 400;
    width = 200;
    energy = 30;
    endbossDefeated = false;
    // leftDirection = true;
    // rightDirection = false;
    deathAnimationDone = false;

    IMAGES_ALERT = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    IMAGES_RUNNING = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    constructor(){
        super().loadImage('assets/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_RUNNING);
        this.animate();
        this.offset.UP = 50;
    }

    animate(){
        this.animationInterval = setInterval(() => {
            if(this.isDead() && this.endbossDefeated){
                if(this.endbossDefeated){
                    setTimeout(() => {
                        this.deathAnimationDone = true;
                    }, 500);
                }
                if(this.deathAnimationDone){
                    document.dispatchEvent(new Event('gamewon'));
                }
            }else if(this.isDead() && !this.endbossDefeated){
                let lastImage = this.playAnimation(this.IMAGES_DEAD);
                if(lastImage){
                    this.endbossDefeated = true;
                    this.playAttackSound();
                }
            }else if(this.isAttack()){
                this.playAnimation(this.IMAGES_ATTACK);
            }else if(this.isHurt() && !this.isDead()){
                this.playAnimation(this.IMAGES_HURT);
            }else if(this.isRunning() && !this.isDead()){
                this.playAnimation(this.IMAGES_RUNNING);
            }else if(!this.isDead()){
                this.playAnimation(this.IMAGES_ALERT);
            }

            this.checkDirectionOfRunning();
        },200);
        this.intervalIDs.push(this.animationInterval);

        this.moveInterval = setInterval(() =>{
            if(this.isRunning() && !this.isDead()){
                if(this.otherDirection){
                    this.moveRight();
                }else{
                    this.moveLeft();
                }
            }
        }, (1000 / 60));
        this.intervalIDs.push(this.moveInterval);
    }

    playAlertSound(){
        let sound = new Audio('assets/audio/endboss_begin.mp3');
        sound.play();
    }

    playAttackSound(){
        let sound = new Audio('assets/audio/chicken-cackle.mp3');
        sound.play();
    }

    checkDirectionOfRunning(){
        if(this.position_x < 100 && !this.otherDirection){
            this.otherDirection = true;
        }
        if(this.position_x >= 3950 && this.otherDirection){
            this.otherDirection = false;
        }
    }
}