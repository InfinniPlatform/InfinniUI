function SaveAction(parentView){
    _.superClass(SaveAction, this, parentView);
}

_.inherit(SaveAction, BaseAction);


_.extend(SaveAction.prototype, {
    execute: function(callback){
        var parentView = this.parentView;
        var dataSource = this.getProperty('dataSource');
        var canClose = this.getProperty('canClose');

        var onSuccessSave = function(context, args){
            if(canClose){
                parentView.setDialogResult(DialogResult.accepted);
                parentView.close();
            }

            if(_.isFunction(callback)){
                callback(context, args);
            }
        };

        var selectedItem = dataSource.getSelectedItem();
        dataSource.saveItem(selectedItem, onSuccessSave, callback);
    }
});