function EditItemAction(parentView){
    _.superClass(EditItemAction, this, parentView);
}

_.inherit(EditItemAction, BaseAction);


_.extend(EditItemAction.prototype, {
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

        var dataSource = this.getProperty('dataSource'),
            propertyName = this.getProperty('propertyName'),
            index = this.getProperty('index');

        var items = dataSource.getProperty(propertyName);
        var item = _.clone(items[index]);

        editDataSource.setItems([item]);
        editDataSource.setSelectedItem(item);

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

        items[index] = editDataSource.getSelectedItem();

        dataSource.setProperty(propertyName, items);

        if (_.isFunction(callback)) {
            callback();
        }
    }
});