class Level {
    enemies;
    clouds;
    backgroundObjects = [];
    objArr;
    numberRepetitions = 2;
    level_end_x = 1000;

    constructor(enemies, clouds, objArr, numberRepetitions){
        this.enemies = enemies;
        this.clouds = clouds;
        this.numberRepetitions = numberRepetitions;
        this.level_end_x = ((this.numberRepetitions + 1 ) * 719 );
        this.objArr = objArr;
        this.fillBackgroundObjects(this.objArr, this.numberRepetitions);
    }

    test(objArr){
        for (let index = 0; index <= this.numberRepetitions; index++) {
            if(index == 0){
                for (let i = 0; i < (objArr.length / 2); i++){
                    this.backgroundObjects.push(new BackgroundObject(objArr[i], -719));
                }
            }else if((index % 2) != 0){
                for (let i = 4; i < objArr.length; i++) {
                    this.backgroundObjects.push(new BackgroundObject(objArr[i], ((index - 1) * 719)));
                }
            }else{
                for (let i = 0; i < (objArr.length / 2); i++) {
                   this.backgroundObjects.push(new BackgroundObject(objArr[i], ((index - 1) * 719))); 
                }
            }
        }
    }

    fillBackgroundObjects(objArr, numberRepetitions){
        for (let index = 0; index <= (numberRepetitions + 1); index++) {
            if(index == 0){
                for (let i = 0; i < (objArr.length / 2); i++){
                    this.backgroundObjects.push(new BackgroundObject(objArr[i], -719));
                }
            }else if((index % 2) != 0){
                for (let i = 4; i < objArr.length; i++) {
                    this.backgroundObjects.push(new BackgroundObject(objArr[i], ((index - 1) * 719)));
                }
            }else{
                for (let i = 0; i < (objArr.length / 2); i++) {
                   this.backgroundObjects.push(new BackgroundObject(objArr[i], ((index - 1) * 719))); 
                }
            }
        }
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