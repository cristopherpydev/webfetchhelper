/* Author: Cristopher Mendez Cervantes | cristopherpydev (R3D)
   GitHub: https://github.com/cristopherpydev
   Portfolio: https://cristopherpydev.github.io/
*/

const { jsPDF } = window.jspdf;
/* parameters for lettering */
const styleConf = {
    fontsize: 22,
    font: "helvetica",
    additionalStyle: "bold"
}

/* === DEV MAINTENANCE 

    1. generates the report by getting and using the dataset unpacked during iteration handling
    2. uses the autotable plugin to generate a table with the said dataset

*/


export function generateReport(dataset = window.currentDataset){
    /* Parameter dataset: Array[Array[Int, float]] */
    const graph = document.getElementById('myChart');
    const img = graph.toDataURL("image/png");

    const doc = new jsPDF();
    doc.setFontSize(styleConf.fontsize);
    doc.setFont(styleConf.font);

    doc.text("Testing report", 80, 10); 
    doc.addImage(img, "PNG", 20, 20, 170, 80);
    
    doc.autoTable({
        startY: 110,
        head: [['Iteration', 'Latency (ms)']],
        body: dataset,
        theme: 'striped'
    });
    doc.save("stress_test_report.pdf");

}