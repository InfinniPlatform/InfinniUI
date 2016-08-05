function SaveAction(parentView){
    _.superClass(SaveAction, this, parentView);
}

_.inherit(SaveAction, BaseAction);


_.extend(SaveAction.prototype, {
    execute: function(callback){
        var parentView = this.parentView,
            dataSource = this.getProperty('dataSource'),
            canClose = this.getProperty('canClose'),
            that = this;

        var onSuccessSave = function(context, args){
                if(canClose !== false){
                    parentView.setDialogResult(DialogResult.accepted);
                    parentView.close();
                }

                that.onExecutedHandler(args);

                if(_.isFunction(callback)){
                    callback(context, args);
                }
            },
            onErrorSave = function(context, args){
                that.onExecutedHandler(args);

                if (_.isFunction(callback)) {
                    callback();
                }
            };

        var selectedItem = dataSource.getSelectedItem();
        dataSource.saveItem(selectedItem, onSuccessSave, onErrorSave);
    }
});