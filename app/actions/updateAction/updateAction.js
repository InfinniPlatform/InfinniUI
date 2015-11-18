function UpdateAction(parentView){
    _.superClass(UpdateAction, this, parentView);
}

_.inherit(UpdateAction, BaseAction);


_.extend(UpdateAction.prototype, {
    execute: function(callback){

        var dataSource = this.getProperty('dataSource');

        dataSource.updateItems(callback, callback);
    }
});