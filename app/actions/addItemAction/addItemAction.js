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
        var editDataSource = editView.getContext().dataSources['MainDataSource'];
        var that = this;

        this.setProperty('editDataSource', editDataSource);

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
        var dataSource = this.getProperty('dataSource'),
            editDataSource = this.getProperty('editDataSource'),
            propertyName = this.getProperty('propertyName'),
            index = this.getProperty('index');

        var items = _.clone(dataSource.getProperty(propertyName));

        var newItem = editDataSource.getSelectedItem();

        items.push(newItem);

        dataSource.setProperty(propertyName, items);

        if (_.isFunction(callback)) {
            callback();
        }
    }
});