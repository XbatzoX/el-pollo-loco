class Coin extends DrawableObject {
    width = 100;
    height = 100;

    /**
     * The constructor loads the image of coin set the position for x and y on map and set the offset value of coin for collecting it
     * 
     * @param {number} position_x - includes the value for position x on map 
     * @param {*} position_y - includes the value for position y on map 
     */
    constructor(position_x, position_y){
        super().loadImage('assets/img/8_coin/coin_1.png');
        this.position_x = position_x;
        this.position_y = position_y;
        this.offset.UP = 25;
        this.offset.DOWN = 25;
        this.offset.LEFT = 25;
        this.offset.RIGHT = 25;
        this.setFinalCoin();
    }

    /**
     * This function is used to play a sound if a coin is collected
     * 
     * @param {boolean} isEnabled - includes the information if the sound is enabled 
     * @param {boolean} notCollected - includes an information if the coin is already collected 
     */
    playCollectingCoinSound(isEnabled, notCollected){
        if(notCollected && isEnabled){
            let sound = new Audio('assets/audio/collecting_coin2.mp3');
            sound.play();
        }
    }

    /**
     * This function creates the final coin in near of endboss with size and position
     * 
     */
    setFinalCoin(){
        if(this.position_x == 3600){
            this.width = 250;
            this.height = 250;
            this.offset.LEFT = 50;
        }
    }
}