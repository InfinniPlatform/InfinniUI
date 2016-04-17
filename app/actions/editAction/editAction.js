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

    resumeUpdateEditDataSource: function () {
        var editDataSource = this.getProperty('editDataSource');
        editDataSource.resumeUpdate('EditAction');
    },

    setDocument: function (editDataSource, selectedItem){
        var selectedItemId = editDataSource.idOfItem( selectedItem );
        editDataSource.setIdFilter(selectedItemId);
        editDataSource.tryInitData();
    },

    setItem: function(editDataSource, selectedItem){
        var item = _.clone( selectedItem );

        if(item === undefined || item === null){
            item = {};
        }
        this.resumeUpdateEditDataSource();
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