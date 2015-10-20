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

            if (dialogResult == DialogResult.accept) {
                that.handleClosingView(callback);
            }
        });
    },

    handleClosingView: function(callback){
        var parentDataSource = this.getProperty('parentDataSource');

        if(parentDataSource){
            parentDataSource.updateItems();
        }

        if (callback) {
            callback();
        }
    }
});