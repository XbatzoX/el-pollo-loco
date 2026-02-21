class Cloud extends MoveableObject {
    position_y = 10;
    width = 500;
    height = 250;

    /**
     * The constructor loads cloud image to begin and set the start position of cloud with a position random function
     * 
     * @param {number} offset_x - includes an offset value for setting start position on x-axis 
     */
    constructor(offset_x){
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png');
        this.position_x = offset_x + (Math.random() * 500);
        this.animate();
    }

    /**
     * This function is used to create an intervall for moving left for cloud
     * 
     */
    animate(){
        this.moveInterval = setInterval(() => {
             this.moveLeft();
        },15);
        this.intervalIDs.push(this.moveInterval);
    }

}