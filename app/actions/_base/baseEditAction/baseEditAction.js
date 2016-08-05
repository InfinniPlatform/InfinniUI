function BaseEditAction(parentView){
    _.superClass(BaseEditAction, this, parentView);
}

_.inherit(BaseEditAction, BaseAction);

_.extend(BaseEditAction.prototype, {
    execute: function(callback){
        var that = this;
        var linkView = this.getProperty('linkView');

        this.setProperty('callback', callback);

        linkView.createView(function(createdView){
            that.handleViewReady(createdView);
        });
    },

    handleViewReady: function(editView){
        var editSourceName = this.getProperty('sourceSource'),
            editDataSource = editView.getContext().dataSources[editSourceName],
            destinationSourceName = this.getProperty('destinationSource'),
            destinationDataSource = this.parentView.getContext().dataSources[destinationSourceName],
            that = this;

        this.setProperty('editDataSource', editDataSource);
        this.setProperty('destinationDataSource', destinationDataSource);

        var isSuccessfulPreset = this.setSelectedItem();

        if( isSuccessfulPreset ) {
            editView.open();

            editView.onClosed(function(){
                var dialogResult = editView.getDialogResult();

                if (dialogResult == DialogResult.accepted) {
                    that.handleClosingView();
                }
            });
        } else {
            editView.close();
        }
    },

    handleClosingView: function(){
        var callback = this.getProperty('callback');

        this.save();

        if (_.isFunction(callback)) {
            callback();
        }
    },

    _isObjectDataSource: function( source ) {
        return 'setItems' in source;
    }
});