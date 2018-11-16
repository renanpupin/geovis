var App = function(data) {
	this.data = null;
	this.map = null;
	this.visualizations = new Array();
	this.filters = new Array();

	this.getData = function(){
		return this.data;
	};
	
	this.setData = function(data){
		this.data = data;
	};
	
	this.getMap = function(){
		return this.map;
	};

	this.getVisualizations = function(){
		return this.visualizations;
	};

	this.getFilters= function(){
		return this.filters;
	};
	
	//on construct methods
	if(data){
		try {
			this.loadData(data);
			//throw "Erro ao carregar os dados, os dados não estão no formato aceito pela aplicação!";
		}
		catch(error) {
			alert(error);
		}
	}

};

//init map instance
App.prototype.initMap = function(){
	this.map = new Map(this);
}

//push filter to filters list
App.prototype.addFilter = function(name, attribute, condition, value){
	this.filters.push(new Filter(name, attribute, condition, value));
	
	//verificar se o atributo é booleano para executar o filtro ("true" é diferente de true)
	//this.map.executeFilter(this.data.features, this.filters[this.filters.length-1]);	//execute the last inserted filter

	this.executeFilter(this.filters[this.filters.length-1]);

	this.map.runMapFilter(this.data.features);

	//find heatmap visualization and update data based on filters
	for(var index = 0; index < this.visualizations.length; index++){
		if(this.visualizations[index].type === "heatmap"){
			this.visualizations[index].visualization.updateHeatmapData(this.data.features);
		}
	}

	//find cluster visualization and update data based on filters
	for(var index = 0; index < this.visualizations.length; index++){
		if(this.visualizations[index].type === "cluster"){
			this.visualizations[index].visualization.updateClusterData(this.data.features);
		}
	}

	//find euclidian visualization and update data based on filters
	for(var index = 0; index < this.visualizations.length; index++){
		if(this.visualizations[index].type === "euclidian"){
			this.visualizations[index].visualization.updateEuclidianData(null, this.data.features);
		}
	}

	//find line visualization and update data based on filters
	for(var index = 0; index < this.visualizations.length; index++){
		if(this.visualizations[index].type === "line"){
			this.visualizations[index].visualization.updateLineData(null, this.data.features);
		}
	}

	//find convexhull visualization and update data based on filters
	for(var index = 0; index < this.visualizations.length; index++){
		if(this.visualizations[index].type === "convexhull"){
			this.visualizations[index].visualization.updateConvexHullData(this.data.features);
		}
	}

	//TODO
	//find chart visualization and update data based on filters
	/*for(var index = 0; index < this.visualizations.length; index++){
		if(this.visualizations[index].type === "chart"){
			this.visualizations[index].visualization.updateChartData(this.data.features);
		}
	}*/
}

//apply filter
App.prototype.executeFilter = function(filter){
	for (var i = 0; i < this.data.features.length; i++) {
		var feature_value = this.data.features[i].getAttributeValueByName(filter.attribute);
		if(feature_value != null && feature_value != undefined){
			var filter_result = filter.queryFilter(feature_value);

			if(filter_result === false){
				this.data.features[i].setVisible(false);
			}
		}
	}
	this.updateFeaturesCounter();
	this.updateSideFilterList();
	console.log(filter);
}

App.prototype.updateSideFilterList = function(){
	var html_str = "";
	console.log(this.filters.length);
	// console.log(this.filters);
	for(var i = 0; i < this.filters.length; i++){
		// console.log(i);
		// html_str += '<p class="filterItem"><input id="filter_'+(i+1)+'" value="markers" type="checkbox" class="toggleFilters" checked=""> '+this.filters[i].name+'</p>';
		html_str += '<p class="filterItem">'+this.filters[i].name+'</p>';
	}
	$(".tabs.filters").find(".filterItem").remove();
	
	$(".tabs.filters").append(html_str);

	if($(".tabs.filters").find(".filterItem").length == 0){
		$(".tabs.filters").append('<p class="filterItem">Sem Filtros</p>');
	}
};

App.prototype.updateFeaturesCounter = function(){
	console.log(this.countVisibleFeatures()+" de "+this.data.features.length +" visível");
	$(".features-visible").html(this.countVisibleFeatures());
	$(".features-total").html(this.data.features.length);

	$(".features-counter").css("display", "block");
};

App.prototype.countVisibleFeatures = function(){
	var counter = 0;
	for (var i = 0; i < this.data.features.length; i++) {
		if(this.data.features[i].isVisible()){
			counter++;
		}
	}
	return counter;
}

//remove filter
App.prototype.removeFilter = function(filter){
	//remove from filters array
	for(var index = 0; index < this.filters.length; index++){
		if(this.filters[index].name == filter){
			this.filters.splice(index,1);
		}
	}

	//marker visible attribute set to true
	this.data.resetFeatureVisibility();
	this.map.resetMarkersVisibility();

	//execute others filters again
	for(var index = 0; index < this.filters.length; index++){
		this.executeFilter(this.filters[index]);
	}

	//update map markers after execute filters again
	this.map.runMapFilter(this.data.features);

	//find heatmap visualization and update data based on filters
	for(var index = 0; index < this.visualizations.length; index++){
		if(this.visualizations[index].type === "heatmap"){
			this.visualizations[index].visualization.updateHeatmapData(this.data.features);
		}
	}

	//find cluster visualization and update data based on filters
	for(var index = 0; index < this.visualizations.length; index++){
		if(this.visualizations[index].type === "cluster"){
			this.visualizations[index].visualization.updateClusterData(this.data.features);
		}
	}

	//find euclidian visualization and update data based on filters
	for(var index = 0; index < this.visualizations.length; index++){
		if(this.visualizations[index].type === "euclidian"){
			this.visualizations[index].visualization.updateEuclidianData(null, this.data.features);
		}
	}

	//find line visualization and update data based on filters
	for(var index = 0; index < this.visualizations.length; index++){
		if(this.visualizations[index].type === "line"){
			this.visualizations[index].visualization.updateLineData(null, this.data.features);
		}
	}

	//find convexhull visualization and update data based on filters
	for(var index = 0; index < this.visualizations.length; index++){
		if(this.visualizations[index].type === "convexhull"){
			this.visualizations[index].visualization.updateConvexHullData(this.data.features);
		}
	}

	//find chart visualization and update data based on filters
	for(var index = 0; index < this.visualizations.length; index++){
		if(this.visualizations[index].type === "chart"){
			this.visualizations[index].visualization.updateChartData(this.data.features);
		}
	}

	this.updateFeaturesCounter();
	this.updateSideFilterList();
}

App.prototype.toggleHeatmap = function(){
	for(var index = 0; index < this.visualizations.length; index++){
		if(this.visualizations[index].type === "heatmap"){
			this.visualizations[index].visualization.toggleHeatmap(this.map);
		}
	}
}

App.prototype.toggleCluster = function(){
	for(var index = 0; index < this.visualizations.length; index++){
		if(this.visualizations[index].type === "cluster"){
			this.visualizations[index].visualization.toggleCluster(this.map);
		}
	}
}

App.prototype.toggleMarkers = function(){
	this.map.toggleMarkers();
	//reaply filters when visible
}

App.prototype.toggleEuclidian = function(name){
	for(var index = 0; index < this.visualizations.length; index++){
		if(this.visualizations[index].type === "euclidian"){
			this.visualizations[index].visualization.toggleEuclidian(this.map);
		}
	}
}

App.prototype.toggleLine = function(name){
	for(var index = 0; index < this.visualizations.length; index++){
		if(this.visualizations[index].type === "line"){
			this.visualizations[index].visualization.toggleLine(this.map);
		}
	}
}

App.prototype.toggleConvexHull = function(name){
	for(var index = 0; index < this.visualizations.length; index++){
		if(this.visualizations[index].type === "convexhull"){
			this.visualizations[index].visualization.toggleConvexHull(this.map);
		}
	}
}

App.prototype.toggleCharts = function(name){
	$(".chartDiv").fadeToggle();
}

App.prototype.toggleFilter = function(index, state){
	if(index != null && index != undefined){
		for(var index = 0; index < this.filters.length; index++){
			if(this.filters[index].name === name){
				this.filters[index].filter.setVisible(state);
			}
		}
	}else{
		console.log ("index undefined");
	}
}

App.prototype.addMarkers = function(){
	this.map.addMarkers(this.data.features);
}

App.prototype.addMapVisualization = function(name, type, attribute){
	this.visualizations.push(new Visualization(name, type, this.map, this.data.features, attribute, null, null));
};

App.prototype.addChartVisualization = function(name, type, attributes, chart_type){
	//TODO: chart on div, on map, with filters, without filters
	this.visualizations.push(new Visualization(name, type, null, this.data, attributes, chart_type, null));
};

App.prototype.addEuclidianVisualization = function(name, type, euclidian_number){
	this.visualizations.push(new Visualization(name, type, this.map, this.data.features, null, null, euclidian_number));
};

App.prototype.removeVisualization = function(name){
	for(var index = 0; index < this.visualizations.length; index++){
		if(this.visualizations[index].name == name){
			this.visualizations[index].remove();
			this.visualizations.splice(index,1);
		}
	}
};

App.prototype.updateEuclidianVisualization = function(marker_id){
	for(var index = 0; index < this.visualizations.length; index++){
		if(this.visualizations[index].type == "euclidian"){
			this.visualizations[index].visualization.updateEuclidianData(marker_id, this.data.features);
		}
	}
};

App.prototype.updateLineVisualization = function(marker_id){
	for(var index = 0; index < this.visualizations.length; index++){
		if(this.visualizations[index].type == "line"){
			this.visualizations[index].visualization.updateLineData(marker_id, this.data.features);
		}
	}
};

App.prototype.updateConvexHullVisualization = function(){
	for(var index = 0; index < this.visualizations.length; index++){
		if(this.visualizations[index].type == "convexhull"){
			this.visualizations[index].visualization.updateConvexHullData(this.data.features);
		}
	}
};

App.prototype.printAppInstances = function(){
	console.log(this.map);
	console.log(this.data);
	console.log(this.visualizations);
}

App.prototype.saveApplication = function(){
	var json_application = '{"app": { "filters" : [';
	//save app settings and download
	// alert();
	for(var index = 0; index < this.filters.length; index++){
		json_application += '{"name": "'+this.filters[index].name+'", "attribute": "'+this.filters[index].attribute+'", "condition": "'+this.filters[index].condition+'", "value": "'+this.filters[index].value+'"}'

		if(index < this.filters.length-1){
			json_application += ',';
		}
	}
	json_application += '], "visualizations" : [';

	for(var index = 0; index < this.visualizations.length; index++){
		if(this.visualizations[index].type == "line"){
			json_application += '{"name": "'+this.visualizations[index].name+'", "type": "'+this.visualizations[index].type+'", "attribute": "'+this.visualizations[index].visualization.attribute+'"}'
		}else if(this.visualizations[index].type == "euclidian"){
			json_application += '{"name": "'+this.visualizations[index].name+'", "type": "'+this.visualizations[index].type+'", "euclidian_number": "'+this.visualizations[index].visualization.euclidian_number+'"}'
		}else if(this.visualizations[index].type == "chart"){
			json_application += '{"name": "'+this.visualizations[index].name+'", "type": "'+this.visualizations[index].type+'", "attribute": "'+this.visualizations[index].visualization.attributes+'", "chart_type": "'+this.visualizations[index].visualization.type+'"}'
		}else if(this.visualizations[index].type == "heatmap" || this.visualizations[index].type == "cluster"){
			json_application += '{"name": "'+this.visualizations[index].name+'", "type": "'+this.visualizations[index].type+'"}'
		}else{
			json_application += '{"name": "'+this.visualizations[index].name+'", "type": "'+this.visualizations[index].type+'", "attribute": "'+this.visualizations[index].attribute+'"}'
		}

		if(index < this.visualizations.length-1){
			json_application += ',';
		}
	}
	json_application += ']';


	json_application += '}}';

	console.log(json_application);
	console.log(JSON.parse(json_application));
	return json_application;
}


//load data from json
App.prototype.loadData = function(data){
	//TODO: limpar se já tiver carregado e mensagem de verificação
	this.data = new Data(data);
	console.log(this.data);
}

//load config from json
App.prototype.loadConfig = function(data){
	console.log(data);

	for(var index = 0; index < data.app.filters.length; index++){
		this.addFilter(data.app.filters[index].name, data.app.filters[index].attribute, data.app.filters[index].condition, data.app.filters[index].value)
	}

	for(var index = 0; index < data.app.visualizations.length; index++){
		if(data.app.visualizations[index].type == "chart"){
			this.addChartVisualization(data.app.visualizations[index].name, data.app.visualizations[index].type, data.app.visualizations[index].attribute, data.app.visualizations[index].chart_type);
		}else if(data.app.visualizations[index].type == "euclidian"){
			this.addEuclidianVisualization(data.app.visualizations[index].name, data.app.visualizations[index].type, data.app.visualizations[index].euclidian_number);
		}else{
			this.addMapVisualization(data.app.visualizations[index].name, data.app.visualizations[index].type, data.app.visualizations[index].attribute);
		}
	}
}

// App.prototype.loadApplication = function(json_application){
	//load app here
	
	//this.addMarkers();
	//this.addFilters();
	//this.addVisualizations();
// }