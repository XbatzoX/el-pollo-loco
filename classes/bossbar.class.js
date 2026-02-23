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

    /**
     * The constructor loads to begin the status bar images and set the position of bar in map
     * 
     */
    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.position_x = 540;
        this.position_y = 0;
        this.width = 150;
        this.height = 50;
    }

    /**
     * This function is used to set the value of statusbar
     * 
     * @param {number} percentage - includes the value of rest energie from endboss 
     */
    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * This function is used to choose the correct number for getting the correct image of statusbar depending on energy level of endboss
     * 
     * @returns - a number which will use for take the correct image of statusbar array
     */
    resolveImageIndex(){
        if(this.percentage == 100){
            return 5;
        }else if(this.percentage == 80){
            return 4;
        }else if(this.percentage == 60){
            return 3;
        }else if(this.percentage == 40){
            return 2;
        }else if(this.percentage == 20){
            return 1;
        }else {
            return 0;
        }
    }
}