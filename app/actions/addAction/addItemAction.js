function AddItemAction(parentView){
    _.superClass(AddItemAction, this, parentView);
}

_.inherit(AddItemAction, BaseAction);


_.extend(AddItemAction.prototype, {
    execute: function(callback){
        var linkView = this.getProperty('linkView');
        var that = this;

        linkView.createView(function(createdView){
            that.handleViewReady(createdView, callback);
        });
    },

    handleViewReady: function(editView, callback){
        var sourceSourceName = this.getProperty('SourceSource');
        var editDataSource = editView.getContext().dataSources[sourceSourceName];
        var that = this;

        this.setProperty('editView', editView);

        editDataSource.setItems([{}]);
        editDataSource.setSelectedItem({});

        editView.open();

        editView.onClosed(function(){
            var dialogResult = editView.getDialogResult();

            if (dialogResult == DialogResult.accepted) {
                that.handleClosingView(callback);
            }
        });
    },

    handleClosingView: function(callback){
        var editView = this.getProperty('editView');
        var editSourceName = this.getProperty('SourceSource');
        var editDataSource = editView.getContext().dataSources[editSourceName];

        var destinationSourceName = this.getProperty('DestinationSource');
        var destinationSource = this.parentView.getContext().dataSources[destinationSourceName];
        var destinationProperty = this.getProperty('DestinationProperty');

        var newItem = editDataSource.getSelectedItem();

        var items = _.clone(destinationSource.getProperty(destinationProperty));
        items.push(newItem);
        destinationSource.setProperty(destinationProperty, items);

        if (_.isFunction(callback)) {
            callback();
        }
    }
});