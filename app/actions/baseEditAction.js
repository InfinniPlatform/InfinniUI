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
        var that = this;

        this.setProperty('editView', editView);

        that.setSelectedItem();

        editView.open();


        editView.onClosed(function(){
            var dialogResult = editView.getDialogResult();

            if (dialogResult == DialogResult.accepted) {
                that.handleClosingView();
            }
        });
    },

    handleClosingView: function(){
        var callback = this.getProperty('callback');

        this.save();

        if (_.isFunction(callback)) {
            callback();
        }
    },

    _getEditDataSource: function(){
        var editView = this.getProperty('editView');
        var editSourceName = this.getProperty('sourceSource');
        var editDataSource = editView.getContext().dataSources[editSourceName];

        return editDataSource;
    }
});