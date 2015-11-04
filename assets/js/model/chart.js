var Chart = function(name, features, attributes, type) {
	this.chart = null;
	this.name = name || null;
	this.attributes = attributes || null;
	this.type = type || null;

	this.getChart = function(){
		return this.chart;
	};
	
	this.setChart = function(chart){
		this.chart = chart;
	};

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

	this.getAttributes = function(){
		return this.attributes;
	};
	
	this.setAttributes = function(attributes){
		this.attributes = attributes;
	};

	var chart_div = document.createElement('div');
	chart_div.className = 'chartDiv';
	chart_div.setAttribute("chart-name", name);
	document.getElementsByClassName('map-wrap')[0].appendChild(chart_div);
	makeDivDraggable(chart_div);

	//TODO: habilitar gráficos apenas para registros filtrados
	
	if(this.type === "pie"){
		var processed_data = this.processChartData(features, attributes);
		this.chart = new PieChart(name, features, attributes, processed_data, chart_div);
	}else if(this.type === "line"){
		this.chart = new LineChart(features, attributes);
	}else if(this.type === "bar"){
		var processed_data = this.processChartData(features, attributes);
		this.chart = new BarChart(name, features, attributes, processed_data, chart_div);
	}
};

Chart.prototype.processChartData = function(features, attributes){
	var data_chart = [];

	var ocurrences = features.countAttributeOcurrences(attributes);

	for(var index = 0; index < ocurrences[0].length; index++){
		data_chart[index] = [ocurrences[0][index], ocurrences[1][index]];
	}

	return data_chart;
}

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