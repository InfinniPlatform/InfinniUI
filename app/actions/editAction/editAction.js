function EditAction(parentView){
    _.superClass(EditAction, this, parentView);
}

_.inherit(EditAction, BaseEditAction);


_.extend(EditAction.prototype, {
    setSelectedItem: function(){
        var destinationSourceName = this.getProperty('destinationSource');
        var destinationSource = this.parentView.getContext().dataSources[destinationSourceName];
        var editDataSource = this.getEditDataSource();

        var selectedItem = destinationSource.getSelectedItem();

        editDataSource.setSelectedItem(selectedItem);
    },

    save: function(){
        var destinationSourceName = this.getProperty('destinationSource');
        var destinationSource = this.parentView.getContext().dataSources[destinationSourceName];

        if(destinationSource){
            destinationSource.updateItems();
        }
    },

    getEditDataSource: function(){
        var editView = this.getProperty('editView');
        var editSourceName = this.getProperty('sourceSource');
        var editDataSource = editView.getContext().dataSources[editSourceName];

        return editDataSource;
    }
});