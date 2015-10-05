var Data = function(data) {
	this.data = data || null;
	this.features = new Array();
	
	this.getData = function(){
		return this.data;
	};
	
	this.setData = function(data){
		this.data = data;
	};

	this.getFeatures = function(){
		return this.features;
	};
	
	this.setFeatures = function(features){
		this.features = features;
	};
	
	this.parseFeatures();

};

Data.prototype.parseFeatures = function(){
	for(var i = 0; i < this.data.length; i++){
		this.features.push(new Feature(this.data[i].id, this.data[i].geodata, this.data[i].infodata));
	}
}