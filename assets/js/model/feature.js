var Feature = function(id, geodata, infodata) {
    this.id = id || null;
    this.geodata = geodata || null;
    this.infodata = new Array();
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
    
    parseAttributes();

};

Feature.prototype.parseAttributes = function(){
    for(var i = 0; i < this.infodata; i++){
        this.infodata.push(new Attribute(this.infodata[i].name, this.infodata[i].value));
    }
}

Feature.prototype.getFeatureLat = function(){
    return this.geodata.lat;
}

Feature.prototype.getFeatureLon = function(){
    return this.geodata.lon;
}
