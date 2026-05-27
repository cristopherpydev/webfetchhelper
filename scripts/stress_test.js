/* Author: Cristopher Mendez Cervantes | cristopherpydev (R3D)
   GitHub: https://github.com/cristopherpydev
   Portfolio: https://cristopherpydev.github.io/
*/

import { displayGraphic } from "./graphic.js"
import { generateReport } from "./report.js";

async function btnStressTest() {

    /*main logic fnc*/

    //now we instance the new controls and inputs

    const testSwitch = document.getElementById('stressMode').checked; //the switch
    const inputContent = document.getElementById('test-api-uri').value; //the endpoint
    const cardBody = document.querySelector('.apicard');
    const message = document.getElementById('api-content');
    const background = document.querySelector('.glass-success');
    const badge = document.getElementById('stateBadge');
    const bar = document.getElementById('bar');
    const btnDownloadReport = document.querySelector('.pdfbtn');

    const barDisplayal = document.querySelector('.progress');
    barDisplayal.style.display = "flex";
    badge.style.display = "block";
    bar.style.backgroundColor = ""
    let delayArray =  []
    let dataset = [];
    //toggle on logic

    if (testSwitch){
        try {
            const resultData = await stressTest(inputContent);
            if (!delayArray){
                cardBody.style.display = "block";
                background.style.setProperty('background-color', '#f58690', 'important');
                message.textContent = "Test failed";
                return;
            }

            [delayArray, dataset] = resultData;
            const result = calculateAverageDelay(delayArray);

            //LAST OPERATION IF EVERYTHING IS OK
            if (result !== null){
                cardBody.style.display = "block";
                const graph = displayGraphic(delayArray);
                btnDownloadReport.style.display = "block";
                window.currentDataset = dataset;
                return;
            }
            else{
                console.log("stress test failed during calculation");
                cardBody.style.display = "block";
                background.style.setProperty('background-color', '#f58690', 'important');
                message.textContent = "Test failed";
                return;
            }
        } catch (error) {
            cardBody.style.display = "block";
            background.style.setProperty('background-color', '#f58690', 'important');
            message.textContent = error.message;
            return;
        }
    }
    else{
        return;
    }

}


async function stressTest(endpoint) {
    /* Argument: endpoint (STR)
       Returns: Array with MS measure

       stresses out an endpoint in order to check the
       average server delay on responses.
    */
    const badge = document.getElementById('stateBadge');
 
    const bar = document.getElementById('bar');
    const total = 50;

    bar.style.width = "0%";
    badge.textContent = `0/${total}`;

    let dataset = [];
    let tmpArray = [];
    for(let i = 1; i<=total; i++){
        const initTime = performance.now()
        try{
            badge.textContent = `${i}/50`;
            bar.style.width = ((i + 1) / total) * 100 + "%";
            bar.setAttribute('aria-valuenow', ((i + 1) / total) * 100);
            const request = await fetch(endpoint);
            const endTime = performance.now();
            const delay = Number((endTime - initTime).toFixed(2));
            let tmpdata = [i, delay];
            dataset.push(tmpdata);
            tmpArray.push(delay);

        } catch(error){
            bar.style.backgroundColor = "#DC3545"
            return null;
        }
   }
   bar.style.backgroundColor = "#198754"
   return [tmpArray, dataset];
}

function calculateAverageDelay(delayArray){
    /* Argument: delayArray (array)
    Returns: The avg amount of latency whithin fetch calls (float)

    Calculates the average of the latency between fetches

    */
    try {
        console.log(delayArray);
        const totalDelay = delayArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return (totalDelay / delayArray.length).toFixed(2);     
    } catch (error) {
        return null;
    }

}



window.displayGraphic = displayGraphic;
window.btnStressTest = btnStressTest; 
window.generateReport = generateReport;
