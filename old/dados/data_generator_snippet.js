for (var index = 0; index < 100; index++){
    
    var cat = Math.floor((Math.random() * 3) + 1);
    var valor = (Math.random() * 10);

    var lat = Math.floor((Math.random() * 1000) + 1);
    var lon = Math.floor((Math.random() * 1000) + 1);

    lat = "-22."+lat;
    lon = "-51."+lon;

    var bool;
    if(index%2 == 0){
        bool = true;
    }
    else{
        bool = false;
    }

    var template = {
        "id" : index,
        "geodata": 
            {
                "lat": parseFloat(lat), 
                "lon": parseFloat(lon)
            },
        "infodata": [
            {
                "name": "nome",
                "value": "feature"+index,
            },
            {
                "name": "categoria",
                "value": "cat"+cat,
            },
            {
                "name": "valor",
                "value": parseFloat(valor),
            },
            {
                "name": "ativo",
                "value": bool
            }
        ]
    };
    console.log(JSON.stringify(template));
}