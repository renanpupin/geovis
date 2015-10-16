var App = function(data) {
	this.data = null;
	this.map = null;
	this.visualizations = new Array();
	

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

App.prototype.addMarkers = function(){
	this.map.addMarkers(this.data.features);
}

App.prototype.addMapVisualization = function(name, type){
	this.visualizations.push(new Visualization(name, type, this.map, this.data.features, null, null));
};

App.prototype.addChartVisualization = function(name, type, chart_type){
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