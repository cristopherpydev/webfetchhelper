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



