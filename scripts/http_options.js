/* Author: Cristopher Mendez Cervantes | cristopherpydev (R3D)
   GitHub: https://github.com/cristopherpydev
   Portfolio: https://cristopherpydev.github.io/
*/

/* ==== DEV MAINTENANCE ==== 

    This script tries to control the behavior of the options, returning
    a simple STRING showing up the current user CHOSEN OPTION.

    script.js imports this function in order to control the main flux.

*/
const bodyContent = document.getElementById('body');

bodyContent.style.display = 'none';

export function displayStatus(){
    const option = document.getElementById('options').value;
    console.log(option);
    bodyContent.value = "";

    switch (option) {
        case 'GET':
            bodyContent.style.display = 'none';
            return 'GET'
            break;

        case 'POST':
            bodyContent.style.display = 'block';
            return 'POST'
            break;

        case 'PUT':
            bodyContent.style.display = 'block';
            return 'PUT'    
            break;
            
        case 'DELETE':
            bodyContent.style.display = 'block';
            return 'DELETE'
            break;

        default:
            bodyContent.style.display = 'none';
            return 'GET'
            break;
    }

}
