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
let buttonThrow;
let buttonJump;
let introSound = new Audio('assets/audio/game_intro.mp3');
let wonGameSound = new Audio('assets/audio/game_win.mp3');
let gameOverSound = new Audio('assets/audio/game_over.mp3');

/*** This function initialize the world after game ended or start*/
function init(){
    if(isGameOver){
        gameOverActions();
    }else if(isGameWon){
        gameWonActions();
    }else{
        startOverlayActions();
    }
    canvas = document.getElementById('canvas_id');
    world = new World(canvas, keyboard, isSoundEnabled);
    worldExist = true;
    showMobileButtons();
    activateMobileButtons();
}

/*** This function is used to activate the functionality of mobile buttons*/
function activateMobileButtons(){
    activateMobileLeftButton(isMobileDevice, buttonLeft, world);
    activateMobileRightButton(isMobileDevice, buttonRight, world);
    activateMobileThrowBottleButton(isMobileDevice, buttonThrow, world);
    activateMobileJumpButton(isMobileDevice, buttonJump, world);
}

/*** This function shows canvas view after game over*/
function gameOverActions(){
    refreshMap();
    clearCanvas();
    showOverlay('game_over', 'canvas_id');
    isGameOver = false;
}

/*** This function shows canvas view after won game*/
function gameWonActions(){
    clearCanvas();
    showOverlay('win_game', 'canvas_id');
    isGameWon = false;
}

/*** This function shows start overlay*/
function startOverlayActions(){
    showOverlay('start_frame', 'canvas_id');
    stopIntroSound();
    document.getElementById('start_ctrl_mobile').classList.add('invisible');
    displayFooter();
}

/*** This functions checks the sound status of local storage and checks if the game is loaded on a mobile device*/
function onloadFunctions(){
    isMobileDevice = checkIfMobileDevice();
    
    checkLocalStorageIsSoundEnabled();
    setSoundStatusToLocalStorage(isSoundEnabled);
}

/**
 * This function checks if a mobile device is used
 * @returns - a boolean feedback
 */
function checkIfMobileDevice(){
    return window.matchMedia('(pointer: coarse)').matches;   
}

/*** This function activate mobile buttons if a mobile device is used*/
function showMobileButtons(){
    if(isMobileDevice){
        document.getElementById('mobile_ctrl_left').classList.remove('invisible');
        document.getElementById('mobile_ctrl_right').classList.remove('invisible');
    }
}

/*** This function deactivates mobile buttons if needed*/
function deactivateMobileButtons(){
    if(isMobileDevice){
        document.getElementById('mobile_ctrl_left').classList.add('invisible');
        document.getElementById('mobile_ctrl_right').classList.add('invisible');
    }
}

/*** This function checks to local storage if sound is enabled*/
function checkLocalStorageIsSoundEnabled(){
    let mySoundStatus = JSON.parse(localStorage.getItem('mySound'));
    if(mySoundStatus != null){isSoundEnabled = mySoundStatus;}
    if(isSoundEnabled){
        document.getElementById('sound_image').src = './assets/icons/sound.svg';
    }else{
        document.getElementById('sound_image').src = './assets/icons/no_sound.svg';
    }
}

/**
 * This function set the actual sound status to local storage
 * @param {boolean} soundStatus - includes the feedback of actual sound status 
 */
function setSoundStatusToLocalStorage(soundStatus){
    localStorage.setItem('mySound', JSON.stringify(soundStatus));
}

/*** This function open the start overlay*/
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
    displayFooter();
    playIntroSound();
}

/*** Event Listener for keydown actions */
window.addEventListener('keydown', (e) => {
    if(e.keyCode == 39){keyboard.RIGHT = true;}
    if(e.keyCode == 37){keyboard.LEFT = true;}
    if(e.keyCode == 38){keyboard.UP = true;}
    if(e.keyCode == 40){keyboard.DOWN = true;}
    if(e.keyCode == 32){keyboard.SPACE = true;}
    if(e.keyCode == 68){keyboard.D = true;}
});

/*** Event Listener for keyup actions*/
window.addEventListener('keyup', (e) => {
    if(e.keyCode == 39){keyboard.RIGHT = false;}
    if(e.keyCode == 37){keyboard.LEFT = false;}
    if(e.keyCode == 38){keyboard.UP = false;}
    if(e.keyCode == 40){keyboard.DOWN = false;}
    if(e.keyCode == 32){keyboard.SPACE = false;}
    if(e.keyCode == 68){keyboard.D = false;}
});

/*** Event Listener for recognizing game over*/
document.addEventListener("gameover", () => {
    deactivateMobileButtons();
    clearGameSoundInstance();
    showOverlay('canvas_id', 'game_over');
    isSoundEnabled = world.soundEnabled;
    playGameOverSound();
    isGameOver = true;
});

/*** Event Listener for recognizing win game*/
document.addEventListener("gamewon", () => {
    deactivateMobileButtons();
    clearGameSoundInstance();
    showOverlay('canvas_id', 'win_game');
    isSoundEnabled = world.soundEnabled;
    playWinGameSound();
    if(isGameWon){refreshMap();}
    isGameWon = true;
});

/**
 * This function is used to show and undisplay overlays
 * @param {string} idRemove - includes the id of undisplay overlay
 * @param {string} idAdd - includes the id of display overlay 
 */
function showOverlay(idRemove, idAdd){
    document.getElementById(idRemove).classList.remove('visible');
    document.getElementById(idRemove).classList.add('invisible');
    document.getElementById(idAdd).classList.remove('invisible');
    document.getElementById(idAdd).classList.add('visible');
}

/*** This function refreshes the map after game ended*/
function refreshMap(){
    if(world != null){
        clearInterval(world.intervalObj[world.intervalObj.length - 2]);
        clearInterval(world.intervalObj[world.intervalObj.length - 1]);
        clearIntervalsFromBrowser();
        resetKeys();
        resetMobileKeys();
        isSoundEnabled = world.soundEnabled;
        world.intervalObj.length = 0;
        clearGameSoundInstance();
        cancelAnimationFrame(world.animationID);
        world = null;
        worldExist = false;
    }
}

/*** This function is used to set key activities to false after game*/
function resetKeys(){
    keyboard.UP = false;
    keyboard.DOWN = false;
    keyboard.SPACE = false;
    keyboard.D = false;
    keyboard.RIGHT = false;
    keyboard.LEFT = false;
}

/*** This function is used to set key activities to false after game*/
function resetMobileKeys(){
    world.character.mobileRight = false;
    world.character.mobileLeft = false;
    world.mobileThrowBottle = false;
    world.character.mobileJump = false;
}

/*** This function clear all Intervals if game is ended*/
function clearIntervalsFromBrowser(){
    world.intervalObj.forEach(obj => {
        if(typeof obj.resetInterval === 'function'){
            obj.resetInterval();
        }else if(obj instanceof Level){
            obj.enemies.forEach(enemy => {
                if(typeof enemy.resetInterval === 'function'){enemy.resetInterval();}
            });
            obj.clouds.forEach(cloud => {
                if(typeof cloud.resetInterval === 'function'){cloud.resetInterval();}
            });
        }
    });
}

/*** This function clear the content of canvas tag*/
function clearCanvas(){
    let canvasContextRef = canvas.getContext("2d");
    canvasContextRef.clearRect(0, 0, canvas.width, canvas.height);
}

/*** This function clear the Instance of game sound*/
function clearGameSoundInstance(){
    if(world.gameSound != null){
        world.gameSound.pause();
        world.gameSound.src = '';
        world.gameSound.load();
        world.gameSound = null;
    }
}

/*** This function set the sound status if button is pressed*/
function setSoundStatus(){
    let soundEnabled;
    soundEnabled = checkSoundStatusWorldExist(soundEnabled);
    if(soundEnabled){
        soundEnabled = changeSoundIconToMute(soundEnabled);
    }else{
        soundEnabled = changeSoundIconToOn(soundEnabled);
    }
    if(!worldExist){
        playIntroSound();
    }
    setSoundStatusToLocalStorage(soundEnabled);
}

/**
 * This subfunction checks if the new status of sound comes from start page or game page
 * @param {boolean} soundEnabled - store bit for information if sound is enabled 
 */
function checkSoundStatusWorldExist(soundEnabled){
    if(worldExist){
        soundEnabled = world.soundEnabled;
    }else{
        soundEnabled = isSoundEnabled;
    }
    return soundEnabled;
}

/**
 * This function changes the state of sound and changes the icon from button
 * @param {boolean} soundEnabled - includes previous state of sound status 
 * @returns - new state of actual sound status
 */
function changeSoundIconToMute(soundEnabled){
    if(worldExist){
        world.soundEnabled = false;
    }else{
        isSoundEnabled = false;
    }
    document.getElementById('sound_image').src = './assets/icons/no_sound.svg';
    soundEnabled = false;
    return soundEnabled;
}

/**
 * This function changes the state of sound and changes the icon from button
 * @param {boolean} soundEnabled - includes previous state of sound status 
 * @returns - new state of actual sound status
 */
function changeSoundIconToOn(soundEnabled){
    if(worldExist){
        world.soundEnabled = true;
    }
    else{
        isSoundEnabled = true;
    }
    document.getElementById('sound_image').src = './assets/icons/sound.svg';
    soundEnabled = true;
    return soundEnabled;
}

/*** This function plays an intro sound an start page after first interaction of user*/
function playIntroSound(){
    if(isSoundEnabled){
        introSound.currentTime = 0;
        introSound.volume = 0.3;
        introSound.play();
    }else{
        introSound.pause();
    }
}

/*** This function is used to stop the intro sound*/
function stopIntroSound(){
    introSound.pause();
}

/*** This function is used to play a sound after win of endboss*/
function playWinGameSound(){
    if(isSoundEnabled && !isGameWon){
        wonGameSound.currentTime = 0;
        wonGameSound.play();
    }
    if(!isSoundEnabled){
        wonGameSound.pause();
    }
}

/*** This function is used to play a sound after loosing the game*/
function playGameOverSound(){
    if(isSoundEnabled && !isGameOver){
        gameOverSound.currentTime = 0;
        gameOverSound.play();
    }
    if(!isSoundEnabled){
        gameOverSound.pause();
    }
}