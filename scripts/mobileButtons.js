/*** This function is used to handle the mobile left button for mobile devices*/
function activateMobileLeftButton(isMobileDevice, buttonLeft, world){
    if(isMobileDevice){
        buttonLeft = document.querySelector('#ctrl_left_btn');
        const stopMoveLeft = () => {world.character.mobileLeft = false;};
        createEventListenerMobileLeftDown(buttonLeft, world);
        createEventListenerMobileLeftUp(buttonLeft);
        stopMoveLeft();
        buttonLeft.addEventListener('contextmenu', e => {e.preventDefault();});
        buttonLeft.addEventListener('pointercancel', stopMoveLeft);
        buttonLeft.addEventListener('lostpointercapture', stopMoveLeft);
    }
}

/*** This function creates an event listener on pointerdown action*/
function createEventListenerMobileLeftDown(buttonLeft, world){
    buttonLeft.addEventListener('pointerdown', e => {
        e.preventDefault();
        buttonLeft.setPointerCapture(e.pointerId);
        world.character.mobileLeft = true;
    });
}

/*** This function creates an event listener on pointerup action*/
function createEventListenerMobileLeftUp(buttonLeft){
    buttonLeft.addEventListener('pointerup', e => {
        e.preventDefault();
        world.character.mobileLeft = false;
    });
}

/*** This function is used to handle the mobile right button for mobile devices*/
function activateMobileRightButton(isMobileDevice, buttonRight, world){
    if(isMobileDevice){
        buttonRight = document.querySelector('#ctrl_right_btn');
        const stopMoveRight = () => {world.character.mobileRight = false;};
        createEventListenerMobileRightDown(buttonRight, world);
        createEventListenerMobileRightUp(buttonRight);
        stopMoveRight();
        buttonRight.addEventListener('contextmenu', e => {e.preventDefault();});
        buttonRight.addEventListener('pointercancel', stopMoveRight);
        buttonRight.addEventListener('lostpointercapture', stopMoveRight);
    }
}

/*** This function creates an event listener for pointerdown action*/
function createEventListenerMobileRightDown(buttonRight, world){
    buttonRight.addEventListener('pointerdown', e => {
        e.preventDefault();
        buttonRight.setPointerCapture(e.pointerId);
        world.character.mobileRight = true;
    });
}

/*** This function creates an event listener for pointerup action*/
function createEventListenerMobileRightUp(buttonRight){
    buttonRight.addEventListener('pointerup', e => {
        e.preventDefault();
        world.character.mobileRight = false;
    });
}

/*** This function is used to handle the throw bottle button for mobile devices*/
function activateMobileThrowBottleButton(isMobileDevice, buttonThrow, world){
    if(isMobileDevice){
        buttonThrow = document.querySelector('#ctrl_throw_btn');
        const stopThrowBottle = () => {world.mobileThrowBottle = false;};
        createEventListenerMobileThrowBottleDown(buttonThrow, world);
        createEventListenerMobileThrowBottleUp(buttonThrow);
        stopThrowBottle();
        buttonThrow.addEventListener('contextmenu', e => {e.preventDefault();});
        buttonThrow.addEventListener('pointercancel', stopThrowBottle);
        buttonThrow.addEventListener('lostpointercapture', stopThrowBottle);
    }
}

/*** This function creates an event listener for pointerdown action*/
function createEventListenerMobileThrowBottleDown(buttonThrow, world){
    buttonThrow.addEventListener('pointerdown', e => {
        e.preventDefault();
        buttonThrow.setPointerCapture(e.pointerId);
        world.mobileThrowBottle = true;
    });
}

/*** This function creates an event listener for pointerup action*/
function createEventListenerMobileThrowBottleUp(buttonThrow){
    buttonThrow.addEventListener('pointerup', e => {
        e.preventDefault();
        world.mobileThrowBottle = false;
    });
}

/*** This function is used to handle the jump button for mobile devices*/
function activateMobileJumpButton(isMobileDevice, buttonJump, world){
    if(isMobileDevice){
        buttonJump = document.querySelector('#ctrl_jump_btn');
        const stopJumping = () => {world.character.mobileJump = false;};
        createEventListenerJumpMobileDown(buttonJump, world);
        createEventListenerJumpMobileUp(buttonJump);
        stopJumping();
        buttonJump.addEventListener('contextmenu', e => {e.preventDefault();});
        buttonJump.addEventListener('pointercancel', stopJumping);
        buttonJump.addEventListener('lostpointercapture', stopJumping);
    }
}

/*** This function creates an event listener for pointerdown action*/
function createEventListenerJumpMobileDown(buttonJump, world){
    buttonJump.addEventListener('pointerdown', e => {
        e.preventDefault();
        buttonJump.setPointerCapture(e.pointerId);
        world.character.mobileJump = true;
    });
}

/*** This function creates an event listener for pointerup action*/
function createEventListenerJumpMobileUp(buttonJump){
    buttonJump.addEventListener('pointerup', e => {
        e.preventDefault();
        world.character.mobileJump = false;
    });
}