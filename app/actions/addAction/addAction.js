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

            if (dialogResult == DialogResult.accepted) {
                that.handleClosingView(callback);
            }
        });
    },

    handleClosingView: function(callback){
        var destinationSourceName = this.getProperty('DestinationSource');
        var destinationSource = this.parentView.getContext().dataSources[destinationSourceName];

        if(destinationSource){
            destinationSource.updateItems();
        }

        if (callback) {
            callback();
        }
    }
});