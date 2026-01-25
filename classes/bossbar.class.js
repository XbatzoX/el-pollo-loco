class Bossbar extends DrawableObject {
    IMAGES = [
        'assets/img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ];
    percentage = 60;

    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(30);
        this.position_x = 540;
        this.position_y = 0;
        this.width = 150;
        this.height = 50;
    }

    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(){
        if(this.percentage == 30){
            return 5;
        }else if(this.percentage > 25){
            return 4;
        }else if(this.percentage > 20){
            return 3;
        }else if(this.percentage > 10){
            return 2;
        }else if(this.percentage > 0){
            return 1;
        }else {
            return 0;
        }
    }
}