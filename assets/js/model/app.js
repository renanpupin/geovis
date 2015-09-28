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
	
	this.initMap = function(map){
		this.map = new Map();
	};

	this.addMarkers = function(){
		this.map.addMarkers(this.data);
	};

	this.getVisualizations = function(){
		return this.visualizations;
	};
	
	this.setVisualizations = function(visualizations){
		this.visualizations.push(visualizations);
	};
	
};

App.prototype.printAppInstances = function(){
	console.log(this.map);
	console.log(this.data);
	console.log(this.visualizations);
}
