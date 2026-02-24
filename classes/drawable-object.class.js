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

    /**
     * This function creates an Instance of image with path of image
     * 
     * @param {string} path - includes the relative path of image 
     */
    loadImage(path){
        this.img = new Image(); 
        this.img.src = path;
    }

    /**
     * This function creates an Instance of image with path of images
     * 
     * @param {Array} arr - includes an array of strings, filled with paths of images
     */
    loadImages(arr){
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * This function draw on object on map
     * 
     * @param {CanvasRenderingContext2D} ctx - includes the context of canvas
     */
    draw(ctx){
        ctx.drawImage(this.img, this.position_x, this.position_y, this.width, this.height);

    }

    /**
     * This function is used to draw a frame around of drawable objects in map 
     * 
     * @param {CanvasRenderingContext2D} ctx - includes the context of canvas 
     */
    drawFrame(ctx){
        if(this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coin || this instanceof BigChicken){
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.position_x, this.position_y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * This function is used to draw a frame with offset values around of drawable objects in map 
     * 
     * @param {CanvasRenderingContext2D} ctx - includes the context of canvas 
     */
    drawOffsetFrame(ctx){
        if(this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coin || this instanceof BigChicken || this instanceof ThrowableObject){
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            let x = this.position_x + this.offset.LEFT;
            let y = this.position_y + this.offset.UP;
            let offsetWidth = this.width - this.offset.LEFT - this.offset.RIGHT;
            let offsetHight = this.height - this.offset.UP - this.offset.DOWN;
            ctx.rect(x, y, offsetWidth, offsetHight);
            ctx.stroke();
        }
    }

    /**
     * This function checks if an object is already collected
     * 
     * @returns - a bollean info
     */
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