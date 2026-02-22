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

/**
 * This function is used to stop the event bubbling of body click
 * @param {event} event - includes the click event
 */
function clickOnDialog(event){
    event.stopPropagation();
}

/**
 * This function is used to close the dialogs if onbody was clicked
 */
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

/**
 * This function is used to display the footer only on start overlay
 */
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

/**
 * This function is used to undisplay the footer
 * @param {HTMLDivElement} contentImprintRef - includes the div container of link
 * @param {HTMLDivElement} contentPrivacyRef - includes the div container of link
 */
function conditionUnshowFooter(contentImprintRef, contentPrivacyRef){
    contentImprintRef.classList.remove('visible');
    contentPrivacyRef.classList.remove('visible');
    contentImprintRef.classList.add('invisible');
    contentPrivacyRef.classList.add('invisible');
}


/**
 * This function is used to display the footer
 * @param {*} contentImprintRef - includes the div container of link
 * @param {*} contentPrivacyRef - includes the div container of link
 */
function conditionShowFooter(contentImprintRef, contentPrivacyRef){
    contentImprintRef.classList.remove('invisible');
    contentPrivacyRef.classList.remove('invisible');
    contentImprintRef.classList.add('visible');
    contentPrivacyRef.classList.add('visible');
}