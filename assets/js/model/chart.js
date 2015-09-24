var Chart = function(chart, type) {
	this.chart = chart || null;
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
	
};

Chart.prototype.printChart = function(){
	console.log(this.chart);
	console.log(this.type);
}
