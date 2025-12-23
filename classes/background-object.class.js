class BackgroundObject extends MoveableObject {

    width = 720;
    height = 400;

    constructor(imgPath, x){
        super().loadImage(imgPath);
        this.position_x = x;
        this.position_y = 480 - this.height;
    }
}