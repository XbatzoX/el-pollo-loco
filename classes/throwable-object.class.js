class ThrowableObject extends MoveableObject {

    constructor(position_x, position_y){
        super().loadImage('../assets/img/6_salsa_bottle/salsa_bottle.png');
        this.position_x = position_x;
        this.position_y = position_y;
        this.height = 70;
        this.width = 60;
        this.throw();
    }

    throw(){
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.position_x += 10;
        }, 25);
    }
}