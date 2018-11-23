var MarkerChart = function(map, name, features, attributes, type) {
    this.name = name || null;
    this.attributes = attributes || null;
    // this.features = features || null;
    this.type = type || null;

    this.visible = true;

    this.getChart = function(){
        return this.chart;
    };

    this.setChart = function(chart){
        this.chart = chart;
    };

    this.getName = function(){
        return this.name;
    };

    this.setName = function(name){
        this.name = name;
    };

    this.getType = function(){
        return this.type;
    };

    this.setType = function(type){
        this.type = type;
    };

    this.getAttributes = function(){
        return this.attributes;
    };

    this.setAttributes = function(attributes){
        this.attributes = attributes;
    };

    this.getVisible = function(){
        return this.visible;
    };

    this.setVisible = function(isVisible){
        this.visible = isVisible;
    };

    this.initMarkerChart(map, name, features, attributes, type);
};

// MarkerChart.prototype.generateChartUrl = function(features, attributes, type){
MarkerChart.prototype.generateChartUrl = function(features, attributesMinMaxValues, marker){
    //https://chart.googleapis.com/chart?chs=500x200&chd=t:120,80&cht=p3&chl=aaa|World&chf=bg,s,FFFFFF00
    //https://chart.googleapis.com/chart?chs=500x200&chd=t:120,80&cht=p&chl=aaaaaaa|bbbbb&chf=bg,s,FFFFFF00
    //https://developers.google.com/chart/image/docs/chart_params#gcharts_rgb
    //https://developers.google.com/chart/image/docs/chart_params#gcharts_solid_fills
    //https://developers.google.com/chart/image/docs/data_formats#encoding_data
    //https://developers.google.com/chart/image/docs/data_formats
    //https://developers.google.com/chart/image/docs/gallery/dynamic_icons
    //https://stackoverflow.com/questions/12698003/save-a-google-chart-as-svg
    // https://developers.google.com/chart/image/docs/gallery/scatter_charts
    //     https://developers.google.com/chart/image/docs/gallery/line_charts
    //https://developers.google.com/chart/image/docs/gallery/radar_charts
    // https://developers.google.com/chart/image/docs/chart_params#gcharts_cht

    //polar, radar
    // https://chart.googleapis.com/chart?cht=rs&chs=200x200&chd=t:77,66,15,0,31,48,100,77|20,36,100,2,0,100&chco=FF0000,FF9900&chls=2.0,4.0,0.0|2.0,4.0,0.0&chxt=x&chxl=0:|0|45|90|135|180|225|270|315&chxr=0,0.0,360.0&chg=25.0,25.0,4.0,4.0&chm=B,FF000080,0,1.0,5.0|B,FF990080,1,1.0,5.0

    //set value
    let result = this.processChartData(features, attributesMinMaxValues, marker);
    let url = `https://chart.googleapis.com/chart?chxl=0:||1:|}&chf=bg,s,FFFFFF00`;
    //legends: &chl=${result.legends}

    //set type and size
    let type = this.getType();
    let size;
    let gChartType;
    if(type === "bar"){
        // gChartType = "bvs";
        gChartType = "bvg";
        size = "150x250";
    }else if(type === "line"){
        gChartType = "lc";  //lc:nda
        size = "150x150";
        url += `&chm=B,FF0000,0,0,0`;
    }else{
        gChartType = "p3";
        size = "150x60";
    }

    url += `&chs=${size}`;
    url += `&cht=${gChartType}`;
    url += `&chco=${result.colors}`;
    url += `&chd=t:${result.values}`;

    //permitir gráfico ser maior
    // http://www2.microstrategy.com/producthelp/10/GISHelp/Lang_1033/images/google/google_Analyze_Flash_terrain.png

    //permitir mostrar detalhes do marcador na lateral quando passar o mouse em cima
    // http://www.bmdata.co.uk/effective/index_map.html

    //https://www.targetmap.com/viewer.aspx?reportId=47255

    return url

};


MarkerChart.prototype.getColorForNormalizedValue = function(normalizedValue){
    console.log("getColorForNormalizedValue", normalizedValue);
    if(normalizedValue <= 20){
        return "0000FF";
    }else if(normalizedValue > 20 && normalizedValue <= 40){
        return "00FFFF";
    }else if(normalizedValue > 40 && normalizedValue <= 60){
        return "00FF00";
    }else if(normalizedValue > 60 && normalizedValue <= 80){
        return "FFFF00";
    }else{
        return "FF0000";
    }
};

MarkerChart.prototype.processChartData = function(features, attributesMinMaxValues, marker){

    let values = "";
    let legends = "";
    let colors = "";

    var markerFeature = features.findFeatureById(marker.id);

    if (markerFeature.visible === true){
        for(var index = 0; index < attributesMinMaxValues.length; index++){

            var normalizedValue = 100 * ((markerFeature.getAttributeValueByName(attributesMinMaxValues[index].name) - attributesMinMaxValues[index].min) / (attributesMinMaxValues[index].max - attributesMinMaxValues[index].min));

            values += normalizedValue;
            legends += String(attributesMinMaxValues[index].name);
            colors += this.getColorForNormalizedValue(normalizedValue);

            if(index !== attributesMinMaxValues.length-1){
                values += ",";
                legends += "|";
                colors += ",";
            }
        }
    }

    console.log("processChartData values", values);
    // console.log("processChartData legends", legends);
    console.log("processChartData colors", colors);
    return {values, legends, colors};
};

MarkerChart.prototype.processChartDataOld = function(features){
    // var data_chart = [];

    var ocurrences = features.countAttributeOcurrences(this.attributes);

    let values = "";
    let legends = "";

    for(var index = 0; index < ocurrences[0].length; index++){
        // data_chart[index] = [String(ocurrences[0][index]), ocurrences[1][index]];
        values += ocurrences[1][index];
        legends += String(ocurrences[0][index]);

        if(index !== ocurrences[0].length-1){
            values += ",";
            legends += "|";
        }
    }

    // console.log("processChartData values", values);
    // console.log("processChartData legends", legends);

    return {values, legends};
};

MarkerChart.prototype.initMarkerChart = function(map, name, features, attributes, type){
    this.generateMarkerCharts(map, name, features, attributes, type);
};

MarkerChart.prototype.generateMarkerCharts = function(map, name, features, attributes, type){
    let markers = map.getMarkers();

    let attributesMinMaxValues = features.calculateAttributesMinAndMaxValue();

    for (var index = 0; index < markers.length; index++) {
        // console.log(markers[index]);
        markers[index].setIcon({
            url: this.generateChartUrl(features, attributesMinMaxValues, markers[index]),
            size: new google.maps.Size(65, 35),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(33, 33),
            scaledSize: new google.maps.Size(65, 35)
        });
    }
};
MarkerChart.prototype.destroy = function(map){
    console.log(map);
    let markers = map.getMarkers();
    for (var index = 0; index < markers.length; index++) {
        markers[index].setIcon(map.getDefaultIcon());
    }
};

MarkerChart.prototype.updateMarkerChart = function(map){
    // this.initMarkerChart(map);
};

MarkerChart.prototype.toggleMarkerChart = function(map, name, features, attributes, type){
    if(this.getVisible()){
        this.destroy(map);
    }else{
        this.generateMarkerCharts(map, name, features, attributes, type);
    }
    this.setVisible(!this.getVisible());
};