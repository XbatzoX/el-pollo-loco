const level1Data = {
    "objArr" : [
        'assets/img/5_background/layers/air.png',
        'assets/img/5_background/layers/3_third_layer/2.png',
        'assets/img/5_background/layers/2_second_layer/2.png',
        'assets/img/5_background/layers/1_first_layer/2.png',
        'assets/img/5_background/layers/air.png',
        'assets/img/5_background/layers/3_third_layer/1.png',
        'assets/img/5_background/layers/2_second_layer/1.png',
        'assets/img/5_background/layers/1_first_layer/1.png'
    ],
    "numberRepetitions" : 4
};

/**
 * This function creates a new level with all instances of classes
 * 
 * @param {boolean} isSoundEnabled - information if sound is enabled 
 * @returns - a new instance of class Level
 */
function createLevel(isSoundEnabled){
    let enemies = createNewInstanceOfEnemies(isSoundEnabled);
    let clouds = createNewInstanceOfClouds(); 
    let coins = createNewInstanceOfCoins(); 
    let bottles = createNewInstanceOfBottles(); 

    return new Level(enemies, clouds, level1Data.objArr,
        level1Data.numberRepetitions, coins, bottles);
}

/**
 * This subfunction is used to create new Instances of enemies for new level
 * 
 * @param {boolean} isSoundEnabled - information if sound is enabled
 * @returns -  an array with instances of enemies
 */
function createNewInstanceOfEnemies(isSoundEnabled){
    let enemies = [
        new Chicken(600),
        new Chicken(800),
        new Chicken(950),
        new BigChicken(1500),
        new BigChicken(1700),
        new BigChicken(2000),
        new Chicken(3200),
        new BigChicken(3400),
        new Chicken(3500),
        new Endboss(isSoundEnabled)
    ];
    return enemies;
}

/**
 * This subfunction is used to create new Instances of clouds for new level
 * 
 * @returns - an array with instances of clouds
 */
function createNewInstanceOfClouds(){
    let clouds = [
        new Cloud(0),
        new Cloud(720),
        new Cloud(2 * 720),
        new Cloud(3 * 720),
        new Cloud(4 * 720),
        new Cloud(5 * 720),
        new Cloud(6 * 720)
    ];
    return clouds;
}

/**
 * This subfunction is used to create new Instances of coins for new level
 * 
 * @returns - an array with instances of coins
 */
function createNewInstanceOfCoins(){
    let coins = [
        new Coin(500, 350),
        new Coin(570, 350),
        new Coin(640, 350),
        new Coin(2000, 210),
        new Coin(2100, 180),
        new Coin(2200, 210),
        new Coin(2900, 210),
        new Coin(3000, 350),
        new Coin(3070, 210),
        new Coin(3600, 210)
    ];
    return coins;
}

/**
 * This subfunction is used to create new Instances of bottles for new level
 * 
 * @returns - an array with instances of bottles
 */
function createNewInstanceOfBottles(){
    let bottles = [
        new Bottle(250, 0),
        new Bottle(400, 0),
        new Bottle(750, 1),
        new Bottle(1000, 0),
        new Bottle(1500, 0),
        new Bottle(2350, 0),
        new Bottle(2700, 1),
        new Bottle(3000, 0),
        new Bottle(3200, 1),
        new Bottle(3400, 1)
    ];
    return bottles;
}