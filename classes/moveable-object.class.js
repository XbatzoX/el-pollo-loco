class MoveableObject{
    position_x;
    position_y;
    img;

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