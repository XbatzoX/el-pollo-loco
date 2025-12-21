class Cloud extends MoveableObject {
    position_y = 10;
    width = 500;
    height = 250;

    constructor(){
        super().loadImage('../assets/img/5_background/layers/4_clouds/1.png');
        this.position_x = (Math.random() * 500);
    }
}