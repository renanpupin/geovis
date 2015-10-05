var App = function(data) {
	this.data = data || null;
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
	
};

App.prototype.initMap = function(){
	this.map = new Map();
}

App.prototype.addMarkers = function(){
	this.map.addMarkers(this.data);
}

App.prototype.addVisualization = function(name, type){
	this.visualizations.push(new Visualization(name, type, this.map, this.data, "attribute"));
};

App.prototype.removeVisualization = function(index){
	if(this.visualizations[index] !== undefined){
		this.visualizations.splice(index,1);
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