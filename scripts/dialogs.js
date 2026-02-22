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

function clickOnDialog(event){
    event.stopPropagation();
}

function closeDialogs(){
    let defControlsDialogRef = document.getElementById('controls_dialog');
    let defInstructionsDialogRef = document.getElementById('instructions_dialog');
    if(defControlsDialogRef.open){
        closeControlsDialog();
    }
    if(defInstructionsDialogRef.open){
        closeInstructionsDialog();
    }
}

function displayFooter(){
    let contentStartRef = document.getElementById('start_frame');
    let contentImprintRef = document.getElementById('imprint_box');
    let contentPrivacyRef = document.getElementById('privacy_box');
    if(contentStartRef.classList.contains("invisible")){
        conditionUnshowFooter(contentImprintRef, contentPrivacyRef);
    }else{
        conditionShowFooter(contentImprintRef, contentPrivacyRef);
    }
    
}

function conditionUnshowFooter(contentImprintRef, contentPrivacyRef){
    contentImprintRef.classList.remove('visible');
    contentPrivacyRef.classList.remove('visible');
    contentImprintRef.classList.add('invisible');
    contentPrivacyRef.classList.add('invisible');
}

function conditionShowFooter(contentImprintRef, contentPrivacyRef){
    contentImprintRef.classList.remove('invisible');
    contentPrivacyRef.classList.remove('invisible');
    contentImprintRef.classList.add('visible');
    contentPrivacyRef.classList.add('visible');
}