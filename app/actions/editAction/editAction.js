function EditAction(parentView){
    _.superClass(EditAction, this, parentView);
}

_.inherit(EditAction, BaseAction);


_.extend(EditAction.prototype, {
    execute: function(){
        var linkView = this.getProperty('linkView');

        linkView.createView(function(createdView){
            that.handleViewReady(createdView);
        });
    },

    handleViewReady: function(editView){
        var editDataSource = editView.getContext().dataSources['MainDataSource'];
        var editingItemId = this.getProperty('editingItemId');
        var that = this;

        editDataSource.setIdFilter(editingItemId);

        editDataSource.resumeUpdate();
        editDataSource.updateItems();

        editView.open();

        editView.onClose(function(){
            that.handleClosingView();
        });
    },

    handleClosingView: function(){
        var parentDataSource = this.getProperty('parentDataSource');

        if(parentDataSource){
            parentDataSource.updateItems();
        }

        /*
         if (callback && closeResult == dialogResult.accept) {

         callback(editItemId);
         }

         */
    }
});