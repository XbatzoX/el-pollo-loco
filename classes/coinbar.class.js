class Coinbar extends DrawableObject{
    amount = 0;

    IMAGES_COIN = [
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    ];

    /**
     * The constructor loads the images for status of coinbar set coin value to begin and set the position on map
     * 
     */
    constructor(){
        super().loadImages(this.IMAGES_COIN);
        this.setCoinValue(0, true);
        this.position_x = 30;
        this.position_y = 35;
        this.width = 150;
        this.height = 50;
    }

    /**
     * This function set the coin value
     * 
     * @param {number} amount - number of coins which character collected 
     * @param {boolean} notCollected - information if coin was already collected 
     */
    setCoinValue(amount, notCollected){
        if(notCollected){
            this.amount = amount;
            let path = this.IMAGES_COIN[this.resolveImageIndex()];
            this.img = this.imageCache[path];
        }
    }

    /**
     * This function is used to choose the correct image depending on amount of coins
     * 
     * @returns - a number for choose the correct status image in array
     */
    resolveImageIndex(){
        if(this.amount == 10){
            return 5;
        }else if(this.amount > 7){
            return 4;
        }else if(this.amount > 5){
            return 3;
        }else if(this.amount > 3){
            return 2;
        }else if(this.amount > 0){
            return 1;
        }else {
            return 0;
        }
    }

    /**
     * This function increases the amount of collected coins
     * 
     * @param {boolean} notCollected - includes the information if coin was already collected 
     */
    increaseAmount(notCollected){
        if(notCollected){
            this.amount += 1;
        }
    }

    /**
     * This function plays a sound if the character collected all coins in game
     * 
     * @param {boolean} isEnabled - includes the information if the sound is enabled 
     */
    playBonusSound(isEnabled){
        if(isEnabled){
            let sound = new Audio('assets/audio/bonus_sound.mp3');
            sound.play();
        }
    }
}