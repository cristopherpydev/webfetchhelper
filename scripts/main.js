/* Author: Cristopher Mendez Cervantes | cristopherpydev (R3D)
   GitHub: https://github.com/cristopherpydev
   Portfolio: https://cristopherpydev.github.io/
*/

import {displayStatus} from "./http_options.js"


let jsonData = null;
async function btnFetch() {
    jsonData = null;

    /* ==== DOM ELEMENTS === */

    const apiUri = document.getElementById('api-uri');
    const status = document.getElementById('api-result');
    const apiContent = document.getElementById('api-content');
    const timeTag = document.getElementById('time');
    const bodyInput = document.getElementById('body');
    /* ==== CLASS SELECTORS === */

    const cardBody = document.querySelector('.apicard');
    const background = document.querySelector('.glass-success');
    const btnDownloadJSON = document.querySelector('.jsonbtn');
    
    const currentStatus = displayStatus();
    const url = apiUri.value.trim();

    //EARLY FALLBACK
    if (!url) return;

    const startingTimeInterval = performance.now();
    let codeStatus = "Error";

    try {
        const config = { method: currentStatus, headers: {} };

        if (['POST', 'PUT', 'DELETE'].includes(currentStatus)) {
            config.headers['Content-Type'] = 'application/json';
            const requestBody = bodyInput?.value;
            if (requestBody) config.body = requestBody;
        }

        const response = await fetch(url, config);
        //TIMER
        const timeOut = performance.now();
        timeTag.textContent = (timeOut - startingTimeInterval).toFixed(2);
        
        codeStatus = response.status;
        status.textContent = codeStatus;

        if (codeStatus >= 200 && codeStatus < 300) {
            //ok response
            status.style.color = "#198754";
            background.style.backgroundColor = "";
        } else if (codeStatus >= 400) {
            //4xx or 5xx
            status.style.color = "#dc3545";
            background.style.setProperty('background-color', '#f58690', 'important');
        } else if (codeStatus >= 300 && codeStatus < 400) {
            //3XX CODE
            status.style.color = "#fd7e14"; 
            background.style.backgroundColor = ""; 
        }

        if (currentStatus === 'GET' && !response.ok) {
            throw new Error(`Response: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");

        cardBody.style.display = "block";

        if (currentStatus === 'GET' && contentType?.includes("image/")) {
            //IMG HANDLER
            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            apiContent.innerHTML = `<img src="${imageUrl}" class="img-fluid rounded" alt="Fetched Image">`;
            btnDownloadJSON.style.display = "none";
            
        } else {
            let data;
            if (contentType?.includes("application/json")) {
                data = await response.json();
                jsonData = JSON.stringify(data, null, 2);
                
                //original prefixes for PUT/DELETE
                let prefix = "";
                if (currentStatus === 'PUT') prefix = "<p>Modified:</p>";
                if (currentStatus === 'DELETE') prefix = "<p>Deleted:</p>";
                
                apiContent.innerHTML = `${prefix}<pre>${jsonData}</pre>`;
            } else {
                data = await response.text();
                jsonData = data;
                apiContent.textContent = data;
            }
            btnDownloadJSON.style.display = "block";
        }

    } catch (error) {
        cardBody.style.display = "block";
        status.style.color = "#dc3545"; 
        background.style.setProperty('background-color', '#f58690', 'important');
        status.textContent = codeStatus;
        apiContent.textContent = error.message;
        btnDownloadJSON.style.display = "none";
    }
}


function downloadJSONFile(){
    /* === EXPLANATION ===

    I thought in user experience by adding a button to download the JSON data fetched, 
    thinking in a helpfull tool for devs.

    */

    if (jsonData){
        const blob = new Blob([jsonData], {type:'application/json'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'fetch_result.json';
        document.body.appendChild(link);
        link.click()
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    return;
}
function reset(){
    /* === onchange reset to clean up UX === */
    jsonData = null;
    const body = document.querySelector('.apicard')
    body.style.display = "none";
    
    document.getElementById("api-content").textContent = "";
    document.getElementById("api-result").textContent = "";
}


window.btnFetch = btnFetch;
window.reset = reset;
window.displayStatus = displayStatus;
window.downloadJSONFile = downloadJSONFile;