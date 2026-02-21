class StatusBar extends DrawableObject {
    IMAGES = [
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png', // 0
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png' // 5
    ];
    percentage = 100;

    /**
     * The constructor loads the images of status bar health of pepe and set the position on map
     * 
     */
    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.position_x = 30;
        this.position_y = 0;
        this.width = 150;
        this.height = 50;
    }

    /**
     * This function set the percentage of energie level of pepe
     * 
     * @param {number} percentage - includes the energie level of pepe
     */
    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * This function is used to choose the correct number for getting the correct image of statusbar depending on energy level of pepe
     * 
     * @returns a number which will use for take the correct image of statusbar array
     */
    resolveImageIndex(){
        if(this.percentage == 100){
            return 5;
        }else if(this.percentage > 80){
            return 4;
        }else if(this.percentage > 60){
            return 3;
        }else if(this.percentage > 40){
            return 2;
        }else if(this.percentage > 20){
            return 1;
        }else {
            return 0;
        }
    }
}