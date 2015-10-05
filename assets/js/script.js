$(document).ready(function(){

	// INIT SMOOTHWHEEL
	$("body").smoothWheel();

	//NAV ACTIVE ITENS
	$("#nav-links li a").click( function() {
		$("#nav-links li a").removeClass("nav-active");
		$(this).addClass("nav-active");
	});
});

google.load('visualization', '1', {'packages':['corechart']});
// $(document).ready(function(){
// });

	//json_data - DATA LOADEAD FROM FILE
	var app1 = new App(json_data);
	
	var clickedMarker = null;
	
	app1.initMap();

	setTimeout(function() {
		app1.addMarkers();
	}, 1500);

	//var heatmap = new Visualization();
	app1.addMapVisualization("Mapa de Calor", "heatmap");
	// app1.addMapVisualization("Linhas", "line");
	//app1.addChartVisualization("Gráfico", "chart", "pie");

	// addMarkers(app1.map, app1.data);