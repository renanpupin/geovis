const Papa = require('papaparse')
const fs = require('fs');

const parseCsvString = (selectedFileConfig) => {
    const csvStr = fs.readFileSync(selectedFileConfig.path, {encoding:'utf8', flag:'r'});
    const csvStrReference = fs.readFileSync(selectedFileConfig.referenceFilePath, {encoding:'utf8', flag:'r'});

    const parsedCsvReference = Papa.parse(csvStrReference, {
        dynamicTyping: true,
        skipEmptyLines: true
        // header: true
    });

    if (parsedCsvReference.errors && parsedCsvReference.errors.length > 0) {
        throw new Error("Erro ao ler arquivo: " + parsedCsvReference.errors[0].message)
    }
    // console.log("parsedCsvReference", parsedCsvReference);
    const attributesReference = parsedCsvReference.data.slice(0, 1)[0];
    const rowsReference = parsedCsvReference.data.slice(1, parsedCsvReference.data.length);
    const latlonKeyAttributeReferenceIndex = attributesReference.indexOf(selectedFileConfig.referenceFilelatlonKeyAttribute)
    const latAttributeReferenceIndex = attributesReference.indexOf('lat')
    const lonAttributeReferenceIndex = attributesReference.indexOf('lon')
    console.log('attributesReference', attributesReference);
    console.log('rowsReference[0]', rowsReference[0]);
    console.log('latlonKeyAttributeReferenceIndex', latlonKeyAttributeReferenceIndex);

    const parsedCsv = Papa.parse(csvStr, {
        dynamicTyping: true,
        skipEmptyLines: true
        // header: true
    });

    if (parsedCsv.errors && parsedCsv.errors.length > 0) {
        throw new Error("Erro ao ler arquivo: " + parsedCsv.errors[0].message)
    }
    // console.log("parseCsvString", parsedCsv);

    const attributes = parsedCsv.data.slice(0, 1)[0];
    const rows = parsedCsv.data.slice(1, parsedCsv.data.length);
    const latlonKeyAttributeIndex = attributes.indexOf(selectedFileConfig.latlonKeyAttribute)
    console.log('attributes', attributes);
    console.log('rows[0]', rows[0]);
    console.log('latlonKeyAttributeIndex', latlonKeyAttributeIndex);


    // for(let row)

    const newCsv = Papa.unparse({
        data : rows.map(row => {
            const referenceRow = rowsReference.find(rowReference => rowReference[latlonKeyAttributeReferenceIndex] === row[latlonKeyAttributeIndex]);
            if(!referenceRow){
                // throw new Error('Coordenadas não encontradas ('+row+')');
                return []
            }
            // console.log('referenceRow', referenceRow)
            // console.log('lat', referenceRow ? referenceRow[latAttributeReferenceIndex] : '')
            // console.log('lon', referenceRow ? referenceRow[lonAttributeReferenceIndex] : '')

            return [
                ...row,
                referenceRow ? referenceRow[latAttributeReferenceIndex] : '',
                referenceRow ? referenceRow[lonAttributeReferenceIndex] : ''
            ];
        }).filter(row => row && row.length > 0),
        fields: [...attributes, 'lat', 'lon']
    });
    // const blob = new Blob([newCsv]);
    fs.writeFileSync(`${selectedFileConfig.path.replace('.csv', '')}-latlon.csv`, newCsv)//,{encoding:'utf8', flag:'r'});
}

const selectedFileConfig = {
    path: './cases-brazil-cities.csv',
    latlonKeyAttribute : 'ibgeID',
    referenceFilePath: '../utils/brCitiesCoords.csv',
    referenceFilelatlonKeyAttribute : 'ibgeID',
}
parseCsvString(selectedFileConfig)
