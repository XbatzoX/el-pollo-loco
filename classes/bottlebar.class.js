class Bottlebar extends Coinbar {
    IMAGES_BOTTLE = [
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    constructor(){
        super().loadImages(this.IMAGES_BOTTLE);
        this.setBottleValue(0, true);
        this.position_x = 30;
        this.position_y = 70;
        this.width = 150;
        this.height = 50;
    }

    setBottleValue(amount, notCollected){
        if(notCollected){
            this.amount = amount;
            let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
            this.img = this.imageCache[path];
        }
    }
}