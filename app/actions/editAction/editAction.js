function EditAction(parentView){
    _.superClass(EditAction, this, parentView);
}

_.inherit(EditAction, BaseEditAction);


_.extend(EditAction.prototype, {
    setSelectedItem: function(){
        var editDataSource = this.getProperty('editDataSource'),
            destinationDataSource = this.getProperty('destinationDataSource'),
            destinationProperty = this.getProperty('destinationProperty');

        var selectedItem = destinationDataSource.getProperty(destinationProperty);

        if( this._isObjectDataSource(editDataSource) ) {
            this.setItem(editDataSource, selectedItem);
        } else {
            this.setDocument(editDataSource, selectedItem);
        }
    },

    setDocument: function (editDataSource, selectedItem){
        var selectedItemId = editDataSource.idOfItem( selectedItem );

        var criteria = [ { CriteriaType:1, Property: "Id", Value:  selectedItemId  } ];
        editDataSource.setFilter( criteria );
    },

    setItem: function(editDataSource, selectedItem){
        var item = _.clone( selectedItem );

        editDataSource.setItems( [item] );
        editDataSource.setSelectedItem( item );
    },

    save: function(){
        var editDataSource = this.getProperty('editDataSource'),
            destinationDataSource = this.getProperty('destinationDataSource'),
            destinationProperty = this.getProperty('destinationProperty');

        if( this._isObjectDataSource(editDataSource) ) {
            var item = editDataSource.getSelectedItem();
            destinationDataSource.setProperty(destinationProperty, item);
        } else {
            destinationDataSource.updateItems();
        }
    }
});