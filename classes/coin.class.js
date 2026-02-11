class Coin extends DrawableObject {
    width = 100;
    height = 100;

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

    playCollectingCoinSound(isEnabled, notCollected){
        if(notCollected && isEnabled){
            let sound = new Audio('assets/audio/collecting_coin2.mp3');
            sound.play();
        }
    }

    setFinalCoin(){
        if(this.position_x == 3600){
            this.width = 250;
            this.height = 250;
        }
    }
}