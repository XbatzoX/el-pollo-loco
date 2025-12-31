class Cloud extends MoveableObject {
    position_y = 10;
    width = 500;
    height = 250;

    constructor(offset_x){
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png');
        this.position_x = offset_x + (Math.random() * 500);
        this.animate();
    }

    animate(){
        setInterval(() => {
             this.moveLeft();
        },15);
    }

}