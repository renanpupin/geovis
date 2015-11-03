var Feature = function(id, geodata, infodata) {
    this.id = id || null;
    this.geodata = geodata || null;
    this.infodata = new Array();
    this.visible = true;
    
    this.getId = function(){
        return this.id;
    };
    
    this.setId = function(id){
        this.id = id;
    };

    this.getGeodata = function(){
        return this.geodata;
    };
    
    this.setGeodata = function(geodata){
        this.geodata = geodata;
    };

    this.getInfodata = function(){
        return this.infodata;
    };
    
    this.setInfodata = function(infodata){
        this.infodata = infodata;
    };

    this.getVisible = function(){
        return this.visible;
    };
    
    this.setVisible = function(visible){
        this.visible = visible;
    };
    
    this.parseAttributes(infodata);
};

Feature.prototype.parseAttributes = function(infodata){
    for(var i = 0; i < infodata.length; i++){
        this.infodata.push(new Attribute(infodata[i].name, infodata[i].value));
    }
}

Feature.prototype.getAttributeValueByName = function(name){
    
    for(var i = 0; i < this.infodata.length; i++){
        if(this.infodata[i].getName() == name){
            return this.infodata[i].getValue()
        }
    }
    return null;  //if don't find marker return null
}

Feature.prototype.getAttributeTypeByName = function(name){
    
    for(var i = 0; i < this.infodata.length; i++){
        if(this.infodata[i].getName() == name){
            return this.infodata[i].getType()
        }
    }
    return null;  //if don't find marker return null
}

Feature.prototype.getFeatureLat = function(){
    return this.geodata.lat;
}

Feature.prototype.getFeatureLon = function(){
    return this.geodata.lon;
}
