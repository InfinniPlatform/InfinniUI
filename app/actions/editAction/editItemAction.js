function EditItemAction(parentView){
    _.superClass(EditItemAction, this, parentView);
}

_.inherit(EditItemAction, BaseEditAction);


_.extend(EditItemAction.prototype, {
    setSelectedItem: function(){
        var editDataSource = this.getEditDataSource();

        var index = this.getProperty('index');

        var destinationSourceName = this.getProperty('destinationSource');
        var destinationSource = this.parentView.getContext().dataSources[destinationSourceName];
        var destinationProperty = this.getProperty('destinationProperty');

        var items =destinationSource.getProperty(destinationProperty);
        var item = _.clone(items[index]);

        editDataSource.setItems([item]);
        editDataSource.setSelectedItem(item);
    },

    save: function(){
        var editDataSource =  this.getEditDataSource();

        var destinationSourceName = this.getProperty('destinationSource');
        var destinationSource = this.parentView.getContext().dataSources[destinationSourceName];
        var destinationProperty = this.getProperty('destinationProperty');

        var index = this.getProperty('index');

        var items = _.clone(destinationSource.getProperty(destinationProperty));
        items[index] = editDataSource.getSelectedItem();
        destinationSource.setProperty(destinationProperty, items);
    },

    getEditDataSource: function(){
        var editView = this.getProperty('editView');
        var editSourceName = this.getProperty('sourceSource');
        var editDataSource = editView.getContext().dataSources[editSourceName];

        return editDataSource;
    }
});