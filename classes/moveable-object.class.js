class MoveableObject{
    position_x = 120;
    position_y = 280;
    img;
    width = 100;
    height = 150;
    imageCache = {};
    currentImage = 0;

    loadImage(path){
        this.img = new Image(); // document.getElementById('image') <img id="image">
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight(){
        console.log('Move right');
    }

    moveLeft(){
        console.log('Move left');
    }
}