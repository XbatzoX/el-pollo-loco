class Character extends MoveableObject {

    height = 200;
    position_y = 230;
    IMAGES_WALKING = ['../assets/img/2_character_pepe/2_walk/W-21.png',
                        '../assets/img/2_character_pepe/2_walk/W-22.png',
                        '../assets/img/2_character_pepe/2_walk/W-23.png',
                        '../assets/img/2_character_pepe/2_walk/W-24.png',
                        '../assets/img/2_character_pepe/2_walk/W-25.png',
                        '../assets/img/2_character_pepe/2_walk/W-26.png'
                    ];
    world;
    speed = 10;

    constructor(){
        super().loadImage('../assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate(){
        setInterval(() => {
            if(this.world.keyboard.RIGHT){
                this.position_x += this.speed;
                this.otherDirection = false;
            }

            if(this.world.keyboard.LEFT){
                this.position_x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.position_x;
        }, (1000 / 60));

        setInterval(() => {
            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
                // walk animation
                let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 7 % 6 => 1, Rest 1 (0,1,2,3,4,5,0,1,...)
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        },50);
    }

    jump(){

    }
}