var Attribute = function(name, type) {
	this.name = name || null;
	this.type = type || null;
	
	this.getName= function(){
		return this.name;
	};
	
	this.setName = function(name){
		this.name = name;
	};

	this.getType = function(){
		return this.type;
	};
	
	this.setType = function(type){
		this.mapData = type;
	};
};