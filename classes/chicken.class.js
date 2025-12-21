class Chicken extends MoveableObject {

    constructor(){
        super().loadImage('../assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.position_x = 200 + (Math.random() * 500);
    }
}