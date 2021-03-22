import Papa from "papaparse"

export const parseFile = (fileInput) => {
    Papa.parse(fileInput.files[0], {
        complete: function(results) {
            console.log(results);
        }
    });
}

// // Parse CSV string
// var data = Papa.parse(csv);
//

//
// // Stream big file in worker thread
// Papa.parse(bigFile, {
//     worker: true,
//     step: function(results) {
//         console.log("Row:", results.data);
//     }
// });
