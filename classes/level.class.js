class Level {
    enemies;
    clouds;
    backgroundObjects = [];
    objArr;
    numberRepetitions = 2;
    level_end_x = 1000;
    coins;
    bottles;

    /**
     * The constructor creates a level with instances of drawable objects
     * 
     * @param {Array} enemies 
     * @param {Array} clouds 
     * @param {Array} objArr 
     * @param {number} numberRepetitions 
     * @param {Array} coins 
     * @param {Array} bottles 
     */
    constructor(enemies, clouds, objArr, numberRepetitions, coins, bottles){
        this.enemies = enemies;
        this.clouds = clouds;
        this.numberRepetitions = numberRepetitions;
        this.coins = coins;
        this.bottles = bottles;
        this.level_end_x = ((this.numberRepetitions + 1 ) * 719 );
        this.objArr = objArr;
        this.fillBackgroundObjects(this.objArr, this.numberRepetitions);
    }

    /**
     * This function is used to fill the map with background Images and creates the lenght of map
     * 
     * @param {Array} objArr - includes the path of background images 
     * @param {number} numberRepetitions - includes the value of Repetitions of background images to set the length of map 
     */
    fillBackgroundObjects(objArr, numberRepetitions){
        this.calculatePositionsOfBackgroundObjects(objArr, numberRepetitions);
        this.calculatePositionOfBackgroundObjectIfNumberUnequal(objArr, numberRepetitions);
    }

    /**
     * This function sets the background images on position in x-axis
     * 
     * @param {Array} objArr - includes the path of background images 
     * @param {number} numberRepetitions - includes the value of Repetitions of background images to set the length of map 
     */
    calculatePositionsOfBackgroundObjects(objArr, numberRepetitions){
        for (let index = 0; index <= (numberRepetitions + 1); index++) {
            if(index == 0){
                for (let i = 0; i < (objArr.length / 2); i++){this.backgroundObjects.push(new BackgroundObject(objArr[i], -719));}
            }else if((index % 2) != 0){
                for (let i = 4; i < objArr.length; i++) {this.backgroundObjects.push(new BackgroundObject(objArr[i], ((index - 1) * 719)));}
            }else{
                for (let i = 0; i < (objArr.length / 2); i++) {this.backgroundObjects.push(new BackgroundObject(objArr[i], ((index - 1) * 719)));}
            }
        }
    }

    /**
     * This function sets the background images on position in x-axis if the number is unequal
     * 
     * @param {Array} objArr - includes the path of background images
     * @param {number} numberRepetitions - includes the value of Repetitions of background images to set the length of map 
     */
    calculatePositionOfBackgroundObjectIfNumberUnequal(objArr, numberRepetitions){
        if((numberRepetitions % 2) == 0){
            for (let i = 0; i < (objArr.length / 2); i++) {
               this.backgroundObjects.push(new BackgroundObject(objArr[i], ((numberRepetitions + 1) * 719)));      
            }
        }else{
            for (let i = 4; i < (objArr.length); i++) {
               this.backgroundObjects.push(new BackgroundObject(objArr[i], ((numberRepetitions + 1) * 719)));      
            }
        } 
    }
}