function BaseAction(parentView){
    this.parentView = parentView;
}

_.extend(BaseAction.prototype, {
    setProperty: function(name, value){
        this[name] = value;
    },

    getProperty: function(name){
        return this[name];
    }
});