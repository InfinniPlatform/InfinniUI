function EditAction(parentView){
    _.superClass(EditAction, this, parentView);
}

_.inherit(EditAction, BaseEditAction);


_.extend(EditAction.prototype, {
    setSelectedItem: function(){
        var editDataSource = this._getEditDataSource();

        var destinationSourceName = this.getProperty('destinationSource');
        var destinationSource = this.parentView.getContext().dataSources[destinationSourceName];

        var selectedItem = this._getSelectedItem(destinationSource);
        var selectedItemId = destinationSource.idOfItem(selectedItem);

        var criteria = [ { CriteriaType:1, Property: "Id", Value:  selectedItemId  } ];
        editDataSource.setFilter( criteria );
    },

    save: function(){
        var destinationSourceName = this.getProperty('destinationSource');
        var destinationSource = this.parentView.getContext().dataSources[destinationSourceName];

        if(destinationSource){
            destinationSource.updateItems();
        }
    },

    _getSelectedItem: function( source ){
        var propertyName = this.getProperty('destinationProperty');

        if( _.isEmpty(propertyName) || propertyName == '$' ){
            return source.getSelectedItem();
        }

        var index = this.getProperty('index');
        var sourceItems = source.getItems();

        return sourceItems[index];
    }
});