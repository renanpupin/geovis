import Papa from "papaparse"

export const parseCsvFile = (fileInput) => {
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


export const convertGeovisJsonToCsv = (jsonString) => {
    let csvTxt = "";

    const infoHeaders = jsonString[0].infodata.map(item => item.name).join(',');
    let header = "id,lat,lon,"+infoHeaders+"\n"
    csvTxt += header;

    for(const item of jsonString){
        const infoData = item.infodata.map(item => item.value).join(',');
        csvTxt += item.id+","+item.geodata.lat+","+item.geodata.lon+","+infoData+"\n"
    }
    return csvTxt;
}
