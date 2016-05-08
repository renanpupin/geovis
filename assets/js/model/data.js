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

Data.prototype.findLargestAttributeValueFeatures = function(attribute){
	if(this.features[0].getAttributeTypeByName(attribute) == "number"){
		var largest_features = [];
		var largest_value;
		for(var index = 0; index < this.features.length; index++){
			if (this.features[index].visible == true){
				if(largest_features.length == 0){
					largest_features.push(this.features[index]);
					largest_value = this.features[index].getAttributeValueByName(attribute);
				}else if(largest_value == this.features[index].getAttributeValueByName(attribute)){
					largest_features.push(this.features[index]);
				}else if(largest_value < this.features[index].getAttributeValueByName(attribute)){
					largest_features = [];
					largest_features.push(this.features[index]);
					largest_value = this.features[index].getAttributeValueByName(attribute);
				}
			}
		}
		return largest_features;
	}else{
		console.log("o tipo do atributo deve ser um número");
	}
}

Data.prototype.findLowestAttributeValueFeatures = function(attribute){
	if(this.features[0].getAttributeTypeByName(attribute) == "number"){
		var lowest_features = [];
		var lowest_value;
		for(var index = 0; index < this.features.length; index++){
			if (this.features[index].visible == true){
				if(lowest_features.length == 0){
					lowest_features.push(this.features[index]);
					lowest_value = this.features[index].getAttributeValueByName(attribute);
				}else if(lowest_value == this.features[index].getAttributeValueByName(attribute)){
					lowest_features.push(this.features[index]);
				}else if(lowest_value > this.features[index].getAttributeValueByName(attribute)){
					lowest_features = [];
					lowest_features.push(this.features[index]);
					lowest_value = this.features[index].getAttributeValueByName(attribute);
				}
			}
		}
		return lowest_features;
	}else{
		console.log("o tipo do atributo deve ser um número");
	}
}

Data.prototype.calculateAverageAttributeValue = function(attribute){
	if(this.features[0].getAttributeTypeByName(attribute) == "number"){
		var average = 0;
		var visible_count = 0;;
		for(var index = 0; index < this.features.length; index++){
			if (this.features[index].visible == true){
				visible_count++;
				average += this.features[index].getAttributeValueByName(attribute);
			}
		}
		average = average / visible_count;
		return average;
	}else{
		console.log("o tipo do atributo deve ser um número");
	}
}

Data.prototype.countAttributeOcurrences = function(attribute){
	var data_array = [], keys = [], ocurrences = [];
	var prev;

	for(var index = 0; index < this.features.length; index++){
		if (this.features[index].visible == true){
			data_array.push(this.features[index].getAttributeValueByName(attribute));
		}
	}

	data_array.sort();

	for(var index = 0; index < data_array.length; index++){

		var value = data_array[index];
        if ( value !== prev ) {
            keys.push(value);
            ocurrences.push(1);
        } else {
            ocurrences[ocurrences.length-1]++;
        }
        prev = value;
    }
    
    return [keys, ocurrences];
	//http://jsfiddle.net/bnACW/727/
	//document.write('[' + result[0] + ']<br>[' + result[1] + ']');
}

//reset feature visibility
Data.prototype.resetFeatureVisibility = function(){
    for (var index = 0; index < this.features.length; index++) {
        this.features[index].setVisible(true);
    }
}