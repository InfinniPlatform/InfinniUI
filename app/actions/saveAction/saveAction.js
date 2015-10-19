function SaveAction(parentView){
    _.superClass(SaveAction, this, parentView);
}

_.inherit(SaveAction, BaseAction);


_.extend(SaveAction.prototype, {
    execute: function(callback){
        var parentView = this.parentView;
        var parentDataSource = this.getProperty('parentDataSource');
        var canClose = this.getProperty('canClose');

        var onSuccessSave = function(data){
            if(canClose){
                parentView.setDialogResult(DialogResult.accepted);
                parentView.close();
            }

            if(callback){
                callback(data);
            }
        };

        var selectedItem = parentDataSource.getSelectedItem();
        parentDataSource.saveItem(selectedItem, onSuccessSave, callback);
    }
});