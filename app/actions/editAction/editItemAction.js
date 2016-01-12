function EditItemAction(parentView){
    _.superClass(EditItemAction, this, parentView);
}

_.inherit(EditItemAction, BaseEditAction);


_.extend(EditItemAction.prototype, {
    setSelectedItem: function(){
        var editDataSource = this._getEditDataSource();

        var destinationSourceName = this.getProperty('destinationSource');
        var destinationSource = this.parentView.getContext().dataSources[destinationSourceName];
        var destinationProperty = this.getProperty('destinationProperty');

        var item = destinationSource.getProperty(destinationProperty);
        item = _.clone(item);

        editDataSource.setItems([item]);
        editDataSource.setSelectedItem(item);
    },

    save: function(){
        var editDataSource = this._getEditDataSource();

        var destinationSourceName = this.getProperty('destinationSource');
        var destinationSource = this.parentView.getContext().dataSources[destinationSourceName];
        var destinationProperty = this.getProperty('destinationProperty');

        var item = editDataSource.getSelectedItem();
        destinationSource.setProperty(destinationProperty, item);
    }
});