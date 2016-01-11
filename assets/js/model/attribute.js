var Attribute = function(name, value) {
	this.name = name || null;
	// this.value = (value === null ? null : value === false ? String(value) : value);
	this.value = value;
	this.type = null;
	
	this.getName= function(){
		return this.name;
	};
	
	this.setName = function(name){
		this.name = name;
	};

	this.getValue = function(){
		return this.value;
	};
	
	this.setValue = function(value){
		this.value = value;
	};

	this.getType = function(){
		return this.type;
	};
	
	this.setType = function(type){
		this.type = type;
	};

	//on construct methods
	this.findAttributeType();
};

Attribute.prototype.findAttributeType = function(){
	if(typeof(this.value) === "boolean"){
		this.type = "boolean";
	}else if(typeof(this.value) === "number"){
		this.type = "number";
	}else if(typeof(this.value) === "string"){
		this.type = "string";
	}else{
		this.type = undefined;
	}
}