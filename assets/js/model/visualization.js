var Visualization = function(name, type, map, data, attribute, chart_type, euclidian_number) {
	this.name = name || null;
	this.type = type || null;	//chart, heatmap or line
	this.attribute = attribute || null;
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

	this.getAttribute = function(){
		return this.attribute;
	};

	this.setAttribute = function(attribute){
		this.attribute = attribute;
	};

	this.getVisualization = function(){
		return this.visualization;
	};
	
	this.setVisualization = function(visualization){
		this.visualization = visualization;
	};

	if(this.type === "heatmap"){
		this.visualization = new Heatmap(map, data);
	}if(this.type === "convexhull"){
		this.visualization = new ConvexHull(map, data);
	}else if(this.type === "line"){
		this.visualization = new Line(map, data, attribute);
	}else if(this.type === "euclidian"){
		this.visualization = new Euclidian(map, data, euclidian_number);
	}else if(this.type === "chart"){
        this.visualization = new Chart(name, data, attribute, chart_type);
    }else if(this.type === "marker_chart"){
		console.log("MarkerChart", map, name, data, attribute, chart_type);
        this.visualization = new MarkerChart(map, name, data, attribute, chart_type);
    }else if(this.type === "cluster"){
		this.visualization = new ClusterVis(map);
	}
	
};

Visualization.prototype.printVisualization = function(){
	console.log(this.name);
	console.log(this.type);
	console.log(this.attribute);
	console.log(this.visualization);
};

Visualization.prototype.remove = function(map){
	this.visualization.destroy(map);
};