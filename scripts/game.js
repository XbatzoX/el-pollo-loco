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
let introSound = new Audio('assets/audio/game_intro.mp3');
let wonGameSound = new Audio('assets/audio/game_win.mp3');
let gameOverSound = new Audio('assets/audio/game_over.mp3');

function init(){
    if(isGameOver){
        refreshMap();
        clearCanvas();
        showOverlay('game_over', 'canvas_id');
        isGameOver = false;
    }else if(isGameWon){
        clearCanvas();
        showOverlay('win_game', 'canvas_id');
        isGameWon = false;
    }else{
        showOverlay('start_frame', 'canvas_id');
        stopIntroSound();
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
    activateMobileRightButton();
    checkLocalStorageIsSoundEnabled();
    setSoundStatusToLocalStorage(isSoundEnabled);
    // playIntroSound();
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
    playIntroSound();
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
    clearGameSoundInstance();
    showOverlay('canvas_id', 'game_over');
    playGameOverSound();
    isGameOver = true;
});

document.addEventListener("gamewon", () => {
    deactivateMobileButtons();
    clearGameSoundInstance();
    showOverlay('canvas_id', 'win_game');
    playWinGameSound();
    if(isGameWon){
        refreshMap();
    }
    isGameWon = true;
});

function showOverlay(idRemove, idAdd){
    document.getElementById(idRemove).classList.remove('visible');
    document.getElementById(idRemove).classList.add('invisible');
    document.getElementById(idAdd).classList.remove('invisible');
    document.getElementById(idAdd).classList.add('visible');
}

function refreshMap(){
    clearInterval(world.intervalObj[world.intervalObj.length - 1]);
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
    clearGameSoundInstance();
    world = null;
    worldExist = false;
}

function clearCanvas(){
    let canvasContextRef = canvas.getContext("2d");
    canvasContextRef.clearRect(0, 0, canvas.width, canvas.height);
}

function clearGameSoundInstance(){
    if(world.gameSound != null){
        world.gameSound.pause();
        world.gameSound.src = '';
        world.gameSound.load();
        world.gameSound = null;
    }
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
    if(!worldExist){
        playIntroSound();
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
        const stopMoveLeft = () => {world.character.mobileLeft = false;};
        buttonLeft.addEventListener('pointerdown', e => {
            e.preventDefault();
            buttonLeft.setPointerCapture(e.pointerId);
            world.character.mobileLeft = true;
        });
        buttonLeft.addEventListener('pointerup', e => {
            e.preventDefault();
            stopMoveLeft();
        });
        buttonLeft.addEventListener('contextmenu', e => {
            e.preventDefault();
        })
        buttonLeft.addEventListener('pointercancel', stopMoveLeft);
        buttonLeft.addEventListener('lostpointercapture', stopMoveLeft);
    }
}

function activateMobileRightButton(){
    if(isMobileDevice){
        buttonRight = document.querySelector('#ctrl_right_btn');
        const stopMoveRight = () => {world.character.mobileRight = false;};
        buttonRight.addEventListener('pointerdown', e => {
            e.preventDefault();
            buttonRight.setPointerCapture(e.pointerId);
            world.character.mobileRight = true;
        });
        buttonRight.addEventListener('pointerup', e => {
            e.preventDefault();
            stopMoveRight();
        });
        buttonRight.addEventListener('contextmenu', e => {
            e.preventDefault();
        });
        buttonRight.addEventListener('pointercancel', stopMoveRight);
        buttonRight.addEventListener('lostpointercapture', stopMoveRight);
    }
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

function playIntroSound(){
    if(isSoundEnabled){
        introSound.currentTime = 0;
        introSound.volume = 0.3;
        introSound.play();
    }else{
        introSound.pause();
    }
}

function stopIntroSound(){
    introSound.pause();
}

function playWinGameSound(){
    if(isSoundEnabled && !isGameWon){
        wonGameSound.currentTime = 0;
        wonGameSound.play();
    }
    if(!isSoundEnabled){
        wonGameSound.pause();
    }
}

function playGameOverSound(){
    if(isSoundEnabled && !isGameOver){
        gameOverSound.currentTime = 0;
        gameOverSound.play();
    }
    if(!isSoundEnabled){
        gameOverSound.pause();
    }
}