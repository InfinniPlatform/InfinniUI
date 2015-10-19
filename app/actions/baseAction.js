function BaseAction(parentView){
    this.parentView = parentView;
}

_.extend(BaseAction.prototype, {
    execute: function(){
        if(this.action){
            this.action.apply(undefined, arguments);
        }
    },

    setProperty: function(name, value){
        this[name] = value;
    },

    getProperty: function(name){
        return this[name];
    },

    setAction: function(action){
        this.action = action;
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