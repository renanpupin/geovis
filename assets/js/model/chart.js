var Chart = function(features, attributes, type) {
	this.chart = null;
	this.attributes = attributes || null;
	this.type = type || null;

	this.getChart = function(){
		return this.chart;
	};
	
	this.setChart = function(chart){
		this.chart = chart;
	};

	this.getType = function(){
		return this.type;
	};
	
	this.setType = function(type){
		this.type = type;
	};

	this.getAttributes = function(){
		return this.attributes;
	};
	
	this.setAttributes = function(attributes){
		this.attributes = attributes;
	};
	
	if(this.type === "pie"){
		this.chart = new PieChart(features, attributes);
	}else if(this.type === "line"){
		this.chart = new LineChart(features, attributes);
	}else if(this.type === "bar"){
		this.chart = new BarChar(features, attributes);
	}
};

Chart.prototype.printChart = function(){
	console.log(this.chart);
	console.log(this.attributes);
	console.log(this.type);
}

Chart.prototype.destroy = function(){
	this.chart = null;
}

Chart.prototype.updateChartData = function(features){
	//todo
}