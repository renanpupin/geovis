var Visualization = function(name, type, map, data, attribute) {
	this.name = name || null;
	this.type = type || null;	//chart, heatmap or line
	this.visualization = null;
	
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

	this.getVisualization = function(){
		return this.visualization;
	};
	
	this.setVisualization = function(visualization){
		this.visualization = visualization;
	};

	if(this.type === "heatmap"){
		this.visualization = new Heatmap(map, data);
	}else if(this.type === "line"){
		this.visualization = new Line(map, data);
	}else if(this.type === "chart"){
		this.visualization = new Chart(data, type, attribute);
	}
	
};

Visualization.prototype.printVisualization = function(){
	console.log(this.name);
	console.log(this.type);
	console.log(this.visualization);
}