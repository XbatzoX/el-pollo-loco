let canvas;
let world;
let worldExist = false;
let keyboard = new Keyboard();
let isGameOver = false;
let isGameWon = false;
let isSoundEnabled = true;
let isMobileDevice = false;
let buttonLeft;
let buttonRight;

function init(){
    if(isGameOver){
        refreshMap();
        clearCanvas();
        showOverlay('game_over', 'canvas_id');
        isGameOver = false;
    }else if(isGameWon){
        refreshMap();
        clearCanvas();
        showOverlay('win_game', 'canvas_id');
        isGameWon = false;
    }else{
        showOverlay('start_frame', 'canvas_id');
        document.getElementById('start_ctrl_mobile').classList.add('invisible');
    }
    activateMobileButtons();
    // checkLocalStorageIsSoundEnabled();
    canvas = document.getElementById('canvas_id');
    world = new World(canvas, keyboard, isSoundEnabled);
    worldExist = true;
}

function onloadFunctions(){
    isMobileDevice = checkIfMobileDevice();
    activateMobileLeftButton();
    checkLocalStorageIsSoundEnabled();
    setSoundStatusToLocalStorage(isSoundEnabled);
}

function checkIfMobileDevice(){
    return window.matchMedia('(pointer: coarse)').matches;   
}

function activateMobileButtons(){
    if(isMobileDevice){
        document.getElementById('mobile_ctrl_left').classList.remove('invisible');
        document.getElementById('mobile_ctrl_right').classList.remove('invisible');
    }
}

function deactivateMobileButtons(){
    if(isMobileDevice){
        document.getElementById('mobile_ctrl_left').classList.add('invisible');
        document.getElementById('mobile_ctrl_right').classList.add('invisible');
    }
}

function checkLocalStorageIsSoundEnabled(){
    let mySoundStatus = JSON.parse(localStorage.getItem('mySound'));
    if(mySoundStatus != null){
        isSoundEnabled = mySoundStatus;
    }
    if(isSoundEnabled){
        document.getElementById('sound_image').src = './assets/icons/sound.svg';
    }else{
        document.getElementById('sound_image').src = './assets/icons/no_sound.svg';
    }
}

function setSoundStatusToLocalStorage(soundStatus){
    localStorage.setItem('mySound', JSON.stringify(soundStatus));
}

function openMainMenu(){
    refreshMap();
    clearCanvas();
    if(isGameOver){
        showOverlay('game_over', 'start_frame');
        document.getElementById('start_ctrl_mobile').classList.remove('invisible');
        isGameOver = false;
    }else if(isGameWon){
        showOverlay('win_game', 'start_frame');
        document.getElementById('start_ctrl_mobile').classList.remove('invisible');
        isGameWon = false;
    }
}

window.addEventListener('keydown', (e) => {
    if(e.keyCode == 39){keyboard.RIGHT = true;}
    if(e.keyCode == 37){keyboard.LEFT = true;}
    if(e.keyCode == 38){keyboard.UP = true;}
    if(e.keyCode == 40){keyboard.DOWN = true;}
    if(e.keyCode == 32){keyboard.SPACE = true;}
    if(e.keyCode == 68){keyboard.D = true;}
});

window.addEventListener('keyup', (e) => {
    if(e.keyCode == 39){keyboard.RIGHT = false;}
    if(e.keyCode == 37){keyboard.LEFT = false;}
    if(e.keyCode == 38){keyboard.UP = false;}
    if(e.keyCode == 40){keyboard.DOWN = false;}
    if(e.keyCode == 32){keyboard.SPACE = false;}
    if(e.keyCode == 68){keyboard.D = false;}
});

document.addEventListener("gameover", () => {
    deactivateMobileButtons();
    showOverlay('canvas_id', 'game_over');
    isGameOver = true;
});

document.addEventListener("gamewon", () => {
    deactivateMobileButtons();
    showOverlay('canvas_id', 'win_game');
    isGameWon = true;
});

function showOverlay(idRemove, idAdd){
    document.getElementById(idRemove).classList.remove('visible');
    document.getElementById(idRemove).classList.add('invisible');
    document.getElementById(idAdd).classList.remove('invisible');
    document.getElementById(idAdd).classList.add('visible');
}

function refreshMap(){
    world.intervalObj.forEach(obj => {
        if(typeof obj.resetInterval === 'function'){
            obj.resetInterval();
        }else if(obj instanceof Level){
            obj.enemies.forEach(enemy => {
                if(typeof enemy.resetInterval === 'function'){
                    enemy.resetInterval();
                }
            });
            obj.clouds.forEach(cloud => {
                if(typeof cloud.resetInterval === 'function'){
                    cloud.resetInterval();
                }
            });
        }
    });
    world.intervalObj.length = 0;
    world = null;
}

function clearCanvas(){
    let canvasContextRef = canvas.getContext("2d");
    canvasContextRef.clearRect(0, 0, canvas.width, canvas.height);
}

function setSoundStatus(){
    let soundEnabled;
    if(worldExist){
        soundEnabled = world.soundEnabled;
    }else{
        soundEnabled = isSoundEnabled;
    }
    if(soundEnabled){
        if(worldExist){
            world.soundEnabled = false;
        }else{
            isSoundEnabled = false;
        }
        document.getElementById('sound_image').src = './assets/icons/no_sound.svg';
        soundEnabled = false;
    }else{
        if(worldExist){
            world.soundEnabled = true;
        }
        else{
            isSoundEnabled = true;
        }
        document.getElementById('sound_image').src = './assets/icons/sound.svg';
        soundEnabled = true;
    }
    setSoundStatusToLocalStorage(soundEnabled);
}

// function buttonLeftDown(){
//     world.character.mobileLeft = true;
// }

// function buttonLeftUp(){
//     world.character.mobileLeft = false;
// }

function activateMobileLeftButton(){
    if(isMobileDevice){
        buttonLeft = document.querySelector('#ctrl_left_btn');
        buttonLeft.addEventListener('pointerdown', e => {
            e.preventDefault();
            world.character.mobileLeft = true;
        });
        buttonLeft.addEventListener('pointerup', e => {
            e.preventDefault();
            world.character.mobileLeft = false;
        });
    }
}

function buttonRightDown(){
    world.character.mobileRight = true;
}

function buttonRightUp(){
    world.character.mobileRight = false;
}

function buttonThrowBottleDown(){
    if(!world.mobileThrowBottle){
        world.mobileThrowBottle = true;
    }
}

function buttonThrowBottleUp(){
    world.mobileThrowBottle = false;
}

function buttonJumpDown(){
    if(!world.character.mobileJump){
        world.character.mobileJump = true;
    }
}

function buttonJumpUp(){
    world.character.mobileJump = false;
}