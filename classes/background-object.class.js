class BackgroundObject extends MoveableObject {

    width = 720;
    height = 480;
    
    /**
     * The constructor loads the background image and set the position
     * 
     * @param {string} imgPath - includes the path of background image 
     * @param {number} x - includes the x position of background image in map 
     */
    constructor(imgPath, x){
        super().loadImage(imgPath);
        this.position_x = x;
        this.position_y = 480 - this.height;
    }
}