function AddAction(parentView){
    _.superClass(AddAction, this, parentView);
}

_.inherit(AddAction, BaseAction);


_.extend(AddAction.prototype, {
    execute: function(callback){
        var linkView = this.getProperty('linkView');
        var that = this;

        linkView.createView(function(createdView){
            that.handleViewReady(createdView, callback);
        });
    },

    handleViewReady: function(editView, callback){
        var that = this;

        editView.open();

        editView.onClose(function(){
            var dialogResult = editView.getDialogResult();
            that.handleClosingView(dialogResult, callback);
        });
    },

    handleClosingView: function(dialogResult, callback){
        var parentDataSource = this.getProperty('parentDataSource');
        var editingItemId = this.getProperty('editingItemId');

        if(parentDataSource){
            parentDataSource.updateItems();
        }

        if (callback && dialogResult == DialogResult.accept) {
            callback(editingItemId);
        }
    }
});