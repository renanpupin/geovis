var Filter = function(name, attribute, condition, value) {
	this.name = name || null;
	this.attribute = attribute || null;
	this.condition = condition || null;	//equal, more than, less than
	this.value = value || null;
	
	this.getName = function(){
		return this.name;
	};
	
	this.setName = function(name){
		this.name = name;
	};

	this.getAttribute = function(){
		return this.attribute;
	};
	
	this.setAttribute = function(attribute){
		this.attribute = attribute;
	};
	
	this.getCondition = function(){
		return this.condition;
	};

	this.setCondition = function(condition){
		this.condition = condition;
	};

	this.getValue = function(){
		return this.value;
	};

	this.setValue = function(value){
		this.value = value;
	};
	
};

Filter.prototype.queryFilter = function(checkValue){
	if(this.condition === "equal"){
		if(this.value !== null && this.value !== undefined){
			return (String(checkValue) == String(this.value));
		}else{
			return false;
		}
	}else if(this.condition === "more than"){
		if(!isNaN(this.value)){	//check if it's a valid number
			return (checkValue >= this.value);
		}else{
			return false;
		}
	}else if(this.condition === "less than"){
		if(!isNaN(this.value)){	//check if it's a valid number
			return (checkValue <= this.value);
		}else{
			return false;
		}
	}
}