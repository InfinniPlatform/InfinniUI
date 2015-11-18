function AddItemAction(parentView){
    _.superClass(AddItemAction, this, parentView);
}

_.inherit(AddItemAction, BaseEditAction);


_.extend(AddItemAction.prototype, {
    setSelectedItem: function(){
        var editDataSource = this.getEditDataSource();

        editDataSource.setItems([{}]);
        editDataSource.setSelectedItem({});
    },

    save: function(){
        var editDataSource =  this.getEditDataSource();

        var destinationSourceName = this.getProperty('destinationSource');
        var destinationSource = this.parentView.getContext().dataSources[destinationSourceName];
        var destinationProperty = this.getProperty('destinationProperty');

        var newItem = editDataSource.getSelectedItem();

        var items = _.clone(destinationSource.getProperty(destinationProperty));
        items.push(newItem);
        destinationSource.setProperty(destinationProperty, items);
    },

    getEditDataSource: function(){
        var editView = this.getProperty('editView');
        var editSourceName = this.getProperty('sourceSource');
        var editDataSource = editView.getContext().dataSources[editSourceName];

        return editDataSource;
    }
});