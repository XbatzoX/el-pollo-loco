class Coin extends DrawableObject {
    width = 100;
    height = 100;

    constructor(position_x, position_y){
        super().loadImage('assets/img/8_coin/coin_1.png');
        this.position_x = position_x;
        this.position_y = position_y;
    }

    playCollectingCoinSound(notCollected){
        if(notCollected){
            let sound = new Audio('assets/audio/collecting_coin2.mp3');
            sound.play();
        }
    }
}