var Data = function(data) {
	this.data = data || null;
	this.mapData = null;
	this.attributes = new Array();
	this.config = '{"geodata": "latlon"}';
	
	this.getData = function(){
		return this.data;
	};
	
	this.setData = function(data){
		this.data = data;
	};

	this.getMapData = function(){
		return this.mapData;
	};
	
	this.setMapData = function(mapData){
		this.mapData = mapData;
	};
	
	generateMapData();

};

Data.prototype.generateMapData = function(){
	var json_data = JSON.parse(this.data);
	console.log(json_data);

	for(var i = 0; i < json_data.length; i++){
		for(var j = 0; j < json_data.length; j++){
			if(json_data[i][j] == this.config["geoattribute"]){
				console.log("geoattribute found");
			}
		}
	}
}
