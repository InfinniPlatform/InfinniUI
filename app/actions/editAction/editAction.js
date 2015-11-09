function EditAction(parentView){
    _.superClass(EditAction, this, parentView);
}

_.inherit(EditAction, BaseAction);


_.extend(EditAction.prototype, {
    execute: function(callback){
        var linkView = this.getProperty('linkView');
        var that = this;

        linkView.createView(function(createdView){
            that.handleViewReady(createdView, callback);
        });
    },

    handleViewReady: function(editView, callback){
        var editDataSource = editView.getContext().dataSources['MainDataSource'];
        var editingItemId = this.getProperty('editingItemId');
        var that = this;

        editDataSource.setIdFilter(editingItemId);

        editDataSource.resumeUpdate();
        editDataSource.updateItems();

        editView.open();

        editView.onClosed(function(){
            var dialogResult = editView.getDialogResult();

            if (dialogResult == DialogResult.accepted) {
                that.handleClosingView(callback);
            }
        });
    },

    handleClosingView: function(callback){
        var parentDataSource = this.getProperty('parentDataSource');
        var editingItemId = this.getProperty('editingItemId');

        if(parentDataSource){
            parentDataSource.updateItems();
        }

         if (callback) {
             callback(editingItemId);
         }
    }
});