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

Data.prototype.calculateAverageAttributeValue = function(attribute){
	if(this.features[0].getAttributeTypeByName(attribute) == "number"){
		var average = 0;
		for(var index = 0; index < this.features.length; index++){
			average += this.features[index].getAttributeValueByName(attribute);
		}
		average = average / this.features.length;
		return average;
	}else{
		console.log("o tipo do atributo deve ser um número");
	}
}

Data.prototype.countAttributeOcurrences = function(attribute){
    var data_array = [], keys = [], ocurrences = [];
    var prev;

	for(var index = 0; index < this.features.length; index++){
		data_array.push(this.features[index].getAttributeValueByName(attribute));
	}

    data_array.sort();

    for(var index = 0; index < data_array.length; index++){
    	
    	var value = data_array[i];
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