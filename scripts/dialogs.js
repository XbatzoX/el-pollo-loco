/**
 * This function is used to open the controls dialog on start overlay
 */
function openControlsDialog(){
    const contentDialogRef = document.getElementById('controls_dialog');
    contentDialogRef.showModal();
}

/**
 * This function is used to close the controls dialog on start overlay
 */
function closeControlsDialog(){
    const contentDialogRef = document.getElementById('controls_dialog');
    contentDialogRef.close();
}

/**
 * This function is used to open the instructions dialog on start overlay
 */
function openInstructionsDialog(){
    const instructionsDialogRef = document.getElementById('instructions_dialog');
    instructionsDialogRef.showModal(); 
}

/**
 * This function is used to close the instructions dialog on start overlay
 */
function closeInstructionsDialog(){
    const instructionsDialogRef = document.getElementById('instructions_dialog');
    instructionsDialogRef.close();
}