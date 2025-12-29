class World {
    character = new Character();
    statusbar = new StatusBar();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    throwableObjects = [];

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw(); 
        this.setWorld();
        this.run();
    }

    setWorld(){
        this.character.world = this;
    }

    run(){
        setInterval(() => {
            // check Collision
            this.checkCollisions();
            // throw bottle
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects(){
        if(this.keyboard.D){
            let bottle = new ThrowableObject((this.character.position_x + 100), (this.character.position_y + 100));
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions(){
        this.level.enemies.forEach((enemy) => {
                if(this.character.isColliding(enemy)){
                    this.character.hit();
                    this.statusbar.setPercentage(this.character.energy);
                }
        });
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x,0);
        // Space for unmoveable elements
        this.addToMap(this.statusbar);
        this.ctx.translate(this.camera_x,0);
        // *********************************

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);

        

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
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if(mo.otherDirection){
            this.flipImageBack(mo);
        }
    }

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.position_x = mo.position_x * -1;
    }

    flipImageBack(mo){
        mo.position_x = mo.position_x * -1;
        this.ctx.restore();
    } 
}