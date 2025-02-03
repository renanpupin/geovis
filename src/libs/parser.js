import Papa from "papaparse"

export const parseCsvFile = (fileInput) => {
    return exports.parseCsvString(fileInput.files[0])
}

export const parseCsvString = (csvStr) => {
    return Papa.parse(csvStr, {
        dynamicTyping: true,
        skipEmptyLines: true
        // header: true
    });
}

export const convertJsonToCsv = (jsonStr) => {
    return Papa.unparse(jsonStr);
}

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
