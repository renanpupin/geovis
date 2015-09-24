var visualization = function(type, visualization) {
	this.type = type || null;
	this.visualization = visualization || null;
	
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

	this.AddVisualization = function(visualization){
		this.visualization.push(visualization);
	};


	//this.visualization = new Array();
	
};

app.prototype.printVisualization = function(){
	console.log(this.visualization);
	console.log(this.type);
}
