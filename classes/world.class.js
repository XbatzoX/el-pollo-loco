class World {
    character = new Character();
    enemies = level1.enemies;
    ctx;
    canvas;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw(); 
        this.setWorld();
    }

    setWorld(){
        this.character.world = this;
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);

        this.ctx.translate(-this.camera_x, 0);
        
        // draw() wird immer wieder aufgereufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        })
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo){
        if(mo.otherDirection){
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.position_x = mo.position_x * -1;
        }
        this.ctx.drawImage(mo.img, mo.position_x, mo.position_y, mo.width, mo.height);
        if(mo.otherDirection){
            mo.position_x = mo.position_x * -1;
            this.ctx.restore();
        }
    }
}