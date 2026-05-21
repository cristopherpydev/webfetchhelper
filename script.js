//api fetch logic
async function btnFetch(){
    const apiUri = document.getElementById("api-uri");
    const status = document.getElementById('api-result');
    const apiContent = document.getElementById('api-content');
    const cardBody = document.querySelector('.apicard');
    const background = document.querySelector('.glass-success');

    if (apiUri.value.trim() === "") {
        return;
    }
    let codeStatus = null;
    try {
        const response = await fetch(apiUri.value);
        codeStatus = response.status;
        status.textContent = response.status;
        if (!response.ok) {
            throw new Error(`Response: ${response.status}`);
        }
        const body = await response.json();
        background.style.backgroundColor = ""; 
        apiContent.innerHTML = "<pre>" + JSON.stringify(body, null, 2) + "</pre>";
        cardBody.style.display = "block";

    } catch (error) {
        cardBody.style.display = "block";
        background.style.setProperty('background-color', '#f58690', 'important');
        status.textContent = codeStatus;
        apiContent.textContent = error.message;
    }
}
function reset(){
    const body = document.querySelector('.apicard')
    body.style.display = "none";
    
    document.getElementById("api-content").textContent = "";
    document.getElementById("api-result").textContent = "";
}