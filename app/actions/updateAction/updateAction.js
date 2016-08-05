function UpdateAction(parentView){
    _.superClass(UpdateAction, this, parentView);
}

_.inherit(UpdateAction, BaseAction);


_.extend(UpdateAction.prototype, {
    execute: function(callback){

        var dataSource = this.getProperty('dataSource');

        var that = this,
            onUpdate = function (context, args) {
                that.onExecutedHandler(args);

                if (_.isFunction(callback)) {
                    callback();
                }
            };

        dataSource.updateItems(onUpdate, onUpdate);
    }
});