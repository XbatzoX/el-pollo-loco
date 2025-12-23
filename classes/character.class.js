class Character extends MoveableObject {

    height = 250;
    position_y = 185;
    IMAGES_WALKING = ['../assets/img/2_character_pepe/2_walk/W-21.png',
                        '../assets/img/2_character_pepe/2_walk/W-22.png',
                        '../assets/img/2_character_pepe/2_walk/W-23.png',
                        '../assets/img/2_character_pepe/2_walk/W-24.png',
                        '../assets/img/2_character_pepe/2_walk/W-25.png',
                        '../assets/img/2_character_pepe/2_walk/W-26.png'
                    ];
    currentImage = 0;

    constructor(){
        super().loadImage('../assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate(){
        setInterval(() => {
            let path = this.IMAGES_WALKING[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
        },1000);
    }

    jump(){

    }
}