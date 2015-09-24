var App = function(data) {
	this.data = data || null;
	this.map = null;
	this.visualization = null;
	

	this.getData = function(){
		return this.data;
	};
	
	this.setData = function(data){
		this.data = data;
	};
	
	this.getMap = function(){
		return this.map;
	};
	
	this.initMap = function(map){
		this.map = new Map();
	};

	this.addMarkers = function(){
		this.map.addMarkers(this.data);
	};

	this.getVisualization = function(){
		return this.visualization;
	};
	
	this.setVisualization = function(visualization){
		this.visualization = visualization;
	};


	//this.visualization = new Array();
	
};

App.prototype.printAppInstances = function(){
	console.log(this.map);
	console.log(this.data);
	console.log(this.visualization);
}
