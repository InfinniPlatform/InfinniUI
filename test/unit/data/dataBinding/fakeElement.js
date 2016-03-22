var FakeElement = Backbone.Model.extend({
    onPropertyChanged: function(prop, callback){
        this.set('callback', callback);
    },

    setName: function(name){
        this.set('name', name);
    },

    getName: function(){
        return this.get('name');
    },

    setProperty: function(property, newValue){
        var oldValue = this.get(property);

        if(oldValue != newValue){
            this.set(property, newValue);
            var callback = this.get('callback');
            if(callback){
                callback({}, {property: property, newValue: newValue});
            }
        }
    },

    getProperty: function(property){
        return this.get(property);
    }
});