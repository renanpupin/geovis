var Chart = function(data, attributes, type) {
	this.data = data || null;
	this.chart = null;
	this.type = type || null;
	this.attributes = attributes || null;

	this.getData = function(){
		return this.data;
	};
	
	this.setData = function(data){
		this.data = data;
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
		this.chart = new PieChart(data, attributes);
	}else if(this.type === "line"){
		this.chart = new LineChart(data, attributes);
	}else if(this.type === "bar"){
		this.chart = new BarChar(data, attributes);
	}
};

Chart.prototype.printChart = function(){
	console.log(this.chart);
	console.log(this.attributes);
	console.log(this.type);
}