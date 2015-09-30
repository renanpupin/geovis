var Filter = function(attribute, condition, value) {
	this.attribute = attribute || null;
	this.condition = condition || null;	//equal, more than, less than
	this.value = value || null;
	

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

Filter.prototype.queryFilter = function(){
	if(this.condition === "equal"){
		if(value !== null && value !== undefined){
			return (this.attribute === value);
		}else{
			return false;
		}
	}else if(this.condition === "more than"){
		if(!isNaN(value)){	//check if it's a valid number
			return (this.attribute >= value);
		}else{
			return false;
		}
	}else if(this.condition === "less than"){
		if(!isNaN(value)){	//check if it's a valid number
			return (this.attribute <= value);
		}else{
			return false;
		}
	}
}