import {displayStatus} from "./http_options.js"

//api fetch logic
let jsonData = null;
async function btnFetch(){
    jsonData = null;
    const apiUri = document.getElementById("api-uri");
    const status = document.getElementById('api-result');
    const apiContent = document.getElementById('api-content');
    const cardBody = document.querySelector('.apicard');
    const background = document.querySelector('.glass-success');
    const btnDownloadJSON = document.querySelector('.jsonbtn');
    const currentStatus = displayStatus();
    console.log(currentStatus);

    if (apiUri.value.trim() === "") {
        return;
    }
    let codeStatus = null;
    let totalTimeIntervall = null;
    //delaying ms are mandatory
    const startingTimeInterval = performance.now()
    const bodyContent = document.getElementById('body');

    // controlling the status we can have a different fetch option
    switch (currentStatus) {
        case 'GET':
            try {
                const response = await fetch(apiUri.value);
                const timeOut = performance.now();
                codeStatus = response.status;
                totalTimeIntervall = (timeOut - startingTimeInterval).toFixed(2);
                let timeTag = document.getElementById('time');
                timeTag.textContent = totalTimeIntervall;
                status.textContent = response.status;

                if (!response.ok) {
                    throw new Error(`Response: ${response.status}`);
                }

                const contentType = response.headers.get("content-type");

                if (contentType && contentType.includes("image/")) {
                    const imageBlob = await response.blob();
                    const imageUrl = URL.createObjectURL(imageBlob);
                    apiContent.innerHTML = `<img src="${imageUrl}" class="img-fluid rounded" alt="Fetched Image">`;
                    btnDownloadJSON.style.display = "none";
                    cardBody.style.display = "block";
                    background.style.backgroundColor = "";

                } else {

                    const body = await response.json();
                    background.style.backgroundColor = "";
                    const currentJSONData = JSON.stringify(body, null, 2);
                    jsonData = currentJSONData;
                    apiContent.innerHTML = "<pre>" + currentJSONData + "</pre>";
                    cardBody.style.display = "block";
                    btnDownloadJSON.style.display = "block";
                }

            } catch (error) {

                cardBody.style.display = "block";
                background.style.setProperty('background-color', '#f58690', 'important');
                status.textContent = codeStatus;
                apiContent.textContent = error.message;
                btnDownloadJSON.style.display = "none";
            }

            break;
        case 'POST':
            window.alert("There is nothing to do with POST statement");
            break;
        case 'PUT':
            window.alert("There is nothing to do with PUT statement");
            break;
        case 'DELETE':
            window.alert("There is nothing to do with DELETE statement");
            break;
        default:
            break;
    }
}


function downloadJSONFile(){
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