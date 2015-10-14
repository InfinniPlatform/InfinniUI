function BaseAction(parentView){
    this.parentView = parentView;
}

_.extend(BaseAction.prototype, {
    execute: function(){

    },

    setProperty: function(name, value){
        this[name] = value;
    },

    getProperty: function(name){
        return this[name];
    }
});

/*function BaseAction(view) {
    var action;

    this.setAction = function (actionFunc) {
        action = actionFunc;
    };

    this.getAction = function () {
        return action;
    };

    this.execute = function (callback) {
        action(callback);
    };
}*/