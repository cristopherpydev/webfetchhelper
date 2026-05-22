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

    if (apiUri.value.trim() === "") {
        return;
    }
    let codeStatus = null;
    let totalTimeIntervall = null;
    //delaying ms are mandatory
    const startingTimeInterval = performance.now()
    try {
        const response = await fetch(apiUri.value);
        const timeOut = performance.now()
        codeStatus = response.status;
        totalTimeIntervall = (timeOut - startingTimeInterval).toFixed(2);
        let timeTag = document.getElementById('time')
        timeTag.textContent = totalTimeIntervall;
        //provides the status of the response
        status.textContent = response.status;
        if (!response.ok) {
            throw new Error(`Response: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");

        //blob fallback
        if (contentType && contentType.includes("image/")) {
            console.log("es imagen")
            const imageBlob = await response.blob(); 
            const imageUrl = URL.createObjectURL(imageBlob);
            apiContent.innerHTML = `<img src="${imageUrl}" class="img-fluid rounded" alt="Fetched Image">`;
            btnDownloadJSON.style.display = "none"; 
            cardBody.style.display = "block"; 
            background.style.backgroundColor = "";
        }
        else{
            const body = await response.json();
            background.style.backgroundColor = ""; 
            const currentJSONData = JSON.stringify(body, null, 2)
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