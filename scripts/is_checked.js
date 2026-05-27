/* Author: Cristopher Mendez Cervantes | cristopherpydev (R3D)
   GitHub: https://github.com/cristopherpydev
   Portfolio: https://cristopherpydev.github.io/
*/

/*

        ===== DEV MAINTENANCE ===== 

        1º this file is meant to be used as a switch.
        2º by default, no parameters are accepted during fetch handling.
        3º if the checkbox is unchecked, a combobox is displayed for the user.
        4º if the checkbox is checked, a combobox is checked for GET/POST/PUT/DELETE params.

*/
const isCheckedParameters = document.getElementById('checkParam').checked;
const combobox = document.querySelector('.check');

    if (isCheckedParameters){
        combobox.style.display = "none";
        combobox.selectedIndex = 0;
    }

function checkListener(){
    const isCheckedParameters = document.getElementById('checkParam').checked;
    const combobox = document.querySelector('.check');

    if (isCheckedParameters){
        combobox.style.display = "none";
        combobox.selectedIndex = 0;
    }
    else{
        combobox.style.display = "block";
    }
}

function checkListenerTest(){
    const switchTest = document.getElementById('stressMode').checked;
    const switchFetch = document.getElementById('checkParam');

    // > inputs

    const inputFetch = document.getElementById('api-uri');
    const inputTest = document.getElementById('test-api-uri');

    // > buttons

    const btnFetch = document.getElementById('fetchBtn');
    const btnTest = document.getElementById('testBtn');
    const btnDownloadJSON = document.querySelector('.jsonbtn');
    const btnDownloadPDF = document.querySelector('.pdfbtn');

    // > labels

    const lblFetch = document.getElementById('lblReadOnly')

    // > messages
    
    const cardBody = document.querySelector('.apicard');
    const message = document.getElementById('api-content');
    const bar = document.querySelector('.progress');
    const barDisplayal = document.querySelector('.progress');
    const badge = document.getElementById('stateBadge');

    //card reset
    cardBody.style.display = "none";
    message.textContent = "";
    bar.style.display = "none";
    btnDownloadJSON.style.display = "none";
    btnDownloadPDF.style.display = "none";

    if (switchTest){
        //when on, we clean the UX
        inputFetch.style.display = "none";
        switchFetch.style.display = "none";
        lblFetch.style.display = "none";
        btnFetch.style.display = "none";
        //when on, we display the new UX
        
        inputTest.style.display = "block";
        btnTest.style.display = "block";

    }
    else{
        //when off, we clean the UX

        inputFetch.style.display = "block";
        switchFetch.style.display = "block";
        lblFetch.style.display = "block";
        btnFetch.style.display = "block";


        //when off, we display the DEFAULT UX
        badge.value = ""
        badge.style.display = "none";
        
        barDisplayal.style.display = "none";
        inputTest.value = "";
        inputTest.style.display = "none";
        btnTest.style.display = "none";
        bar.style.display = "none";


    }
}


