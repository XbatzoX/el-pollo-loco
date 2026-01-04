class DrawableObject {
    position_x = 120;
    position_y = 280;
    img;
    width = 100;
    height = 150;
    imageCache = {};
    offset = {
        "UP" : 0,
        "DOWN" : 0,
        "LEFT" : 0,
        "RIGHT" : 0
    };
    notCollected = true;
    value = 5;

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

    draw(ctx){
        ctx.drawImage(this.img, this.position_x, this.position_y, this.width, this.height);

    }

    drawFrame(ctx){
        if(this instanceof Character || this instanceof Chicken){
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.position_x, this.position_y, this.width, this.height);
            ctx.stroke();
        }
    }

    isCollected(){
        let collected;
        if(!this.notCollected){
            collected = true;
        }else{
            collected = false;
        }
        return collected;
    }
}