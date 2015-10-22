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
	try {
		this.loadData(data);
		//throw "Erro ao carregar os dados, os dados não estão no formato aceito pela aplicação!";
	}
	catch(error) {
		alert(error);
	}

};

App.prototype.loadData = function(data){
	this.data = new Data(data);
}

App.prototype.initMap = function(){
	this.map = new Map();
}

App.prototype.addFilter = function(name, attribute, condition, value){
	this.filters.push(new Filter(name, attribute, condition, value));
	this.map.executeFilter(this.data.features, this.filters[this.filters.length-1]);	//execute the last inserted filter
}

App.prototype.removeFilter = function(filter){
	for(var index = 0; index < this.filters.length; index++){
		if(this.filters[index] == filter){
			this.filters.splice(index,1);
		}
	}
	//this.map.resetMarkersVisibility();
	//reaply filters
	//heatmap verify marker visibility
}

App.prototype.toggleHeatmap = function(){
	for(var index = 0; index < this.visualizations.length; index++){
		if(this.visualizations[index].type === "heatmap"){
			this.visualizations[index].visualization.toggleHeatmap(this.map);
		}
	}
}

App.prototype.addMarkers = function(){
	this.map.addMarkers(this.data.features);
}

App.prototype.addMapVisualization = function(name, type){
	this.visualizations.push(new Visualization(name, type, this.map, this.data.features, null, null));
};

App.prototype.addChartVisualization = function(name, type, chart_type){
	//TODO: chart on div, on map, with filters, without filters
	this.visualizations.push(new Visualization(name, type, null, this.data, "attribute", chart_type));
};

App.prototype.removeVisualization = function(name){
	for(var index = 0; index < this.visualizations.length; index++){
		if(this.visualizations[index].name == name){
			this.visualizations.splice(index,1);
		}
	}
};

App.prototype.printAppInstances = function(){
	console.log(this.map);
	console.log(this.data);
	console.log(this.visualizations);
}

App.prototype.saveApplication = function(){
	var json_application = {};
	//save app settings and download
}

App.prototype.loadApplication = function(json_application){
	//load app here
}