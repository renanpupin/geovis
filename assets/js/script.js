$(document).ready(function(){
	//
});

google.load('visualization', '1', {'packages':['corechart']});

var app1 = new App(json_data);	//json_data - DATA LOADEAD FROM FILE

var clickedMarker = null;

app1.initMap();

setTimeout(function() {
	app1.addMarkers();
}, 1500);

//app1.addMapVisualization("Mapa de Calor", "heatmap");
// app1.addMapVisualization("Linhas", "line");
//app1.addChartVisualization("Gráfico", "chart", "pie");