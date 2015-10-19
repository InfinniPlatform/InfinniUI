function UpdateAction(parentView){
    _.superClass(UpdateAction, this, parentView);
}

_.inherit(UpdateAction, BaseAction);


_.extend(UpdateAction.prototype, {
    execute: function(callback){

        var parentDataSource = this.getProperty('parentDataSource');

        parentDataSource.updateItems(callback, callback);
    }
});