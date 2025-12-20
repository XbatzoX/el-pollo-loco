class MoveableObject{
    position_x = 120;
    position_y = 250;
    img;
    width = 100;
    height = 150;

    loadImage(path){
        this.img = new Image(); // document.getElementById('image') <img id="image">
        this.img.src = path;
    }

    moveRight(){
        console.log('Move right');
    }

    moveLeft(){
        console.log('Move left');
    }
}