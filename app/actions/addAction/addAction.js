function AddAction(parentView){
    _.superClass(AddAction, this, parentView);
}

_.inherit(AddAction, BaseEditAction);


_.extend(AddAction.prototype, {
    setSelectedItem: function(){
        var editDataSource = this.getProperty('editDataSource'),
            editView = editDataSource.getView(),
            item = {};

        if( this._isObjectDataSource(editDataSource) ) {
            editDataSource.setItems([item]);
            editDataSource.setSelectedItem(item);
        } else {
            editView.onBeforeLoaded(function() {
                editDataSource.createItem();
            });
        }

        return true;
    },

    save: function(){
        var editDataSource = this.getProperty('editDataSource'),
            destinationDataSource = this.getProperty('destinationDataSource'),
            destinationProperty = this.getProperty('destinationProperty')  || "";

        if( this._isObjectDataSource(editDataSource) ) {
            var items = destinationDataSource.getProperty(destinationProperty) || [],
                newItem = editDataSource.getSelectedItem();

            items = _.clone(items);
            items.push(newItem);

            destinationDataSource.setProperty(destinationProperty, items);
        } else {
            destinationDataSource.updateItems();
        }
    }
});