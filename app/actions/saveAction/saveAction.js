function SaveAction(parentView){
    _.superClass(SaveAction, this, parentView);
}

_.inherit(SaveAction, BaseAction);


_.extend(SaveAction.prototype, {
    execute: function(callback){
        var parentView = this.parentView;
        var dataSource = this.getProperty('dataSource');
        var canClose = this.getProperty('canClose');

        var onSuccessSave = function(data){
            if(canClose){
                parentView.setDialogResult(DialogResult.accepted);
                parentView.close();
            }

            if(_.isFunction(callback)){
                callback(data);
            }
        };

        var selectedItem = dataSource.getSelectedItem();
        dataSource.saveItem(selectedItem, onSuccessSave, callback);
    }
});