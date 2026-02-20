class Bottle extends DrawableObject {
    height = 70;
    width = 60;
    
    IMAGES_BOTTLE = [
        'assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * The constructor loads the choosen image of bottle and set the position on ground
     * 
     * @param {number} position_x - includes the x postion of bottle in map 
     * @param {number} imageNumber - includes the the choosen number for loading the image of IMAGES_BOTTLE array 
     */
    constructor(position_x, imageNumber){
        super().loadImage(this.IMAGES_BOTTLE[imageNumber]);
        this.position_x = position_x;
        this.position_y = 370;
    }

    /**
     * This function plays a collecting bottle sound, only when the sound is enabled
     * 
     * @param {boolean} isEnabled - includes the information if the sound is enabled in game 
     * @param {boolean} notCollected - includes status if the bottle is already collected 
     */
    playCollectingBottleSound(isEnabled, notCollected){
        if(notCollected && isEnabled){
            let sound = new Audio('assets/audio/collecting_bottle.mp3');
            sound.play();
        }
    }
}