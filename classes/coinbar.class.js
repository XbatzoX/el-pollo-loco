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

    constructor(){
        super().loadImages(this.IMAGES_COIN);
        this.setCoinValue(0, true);
        this.position_x = 30;
        this.position_y = 35;
        this.width = 150;
        this.height = 50;
    }

    setCoinValue(amount, notCollected){
        if(notCollected){
            this.amount = amount;
            let path = this.IMAGES_COIN[this.resolveImageIndex()];
            this.img = this.imageCache[path];
        }
    }

    resolveImageIndex(){
        if(this.amount == 10){
            return 5;
        }else if(this.amount > 7){
            return 4;
        }else if(this.amount > 5){
            return 3;
        }else if(this.amount > 3){
            return 2;
        }else if(this.amount > 1){
            return 1;
        }else {
            return 0;
        }
    }

    increaseCoinAmount(notCollected){
        if(notCollected){
            this.amount += 1;
        }
    }
}