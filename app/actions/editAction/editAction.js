function EditAction(parentView){
    _.superClass(EditAction, this, parentView);
}

_.inherit(EditAction, BaseEditAction);


_.extend(EditAction.prototype, {
    setSelectedItem: function(){
        var editDataSource = this.getEditDataSource();

        if(!editDataSource.isDataReady()){
            var message = stringUtils.format('{0} не инициализирован. Невозможно установить текущий элемент.', [editDataSource.getName()]);
            InfinniUI.global.logger.error( message );
            return;
        }

        editDataSource.setSelectedItem( this.getDestinationSelectedItem() );
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
    },

    getDestinationSelectedItem: function(){
        var destinationSourceName = this.getProperty('destinationSource');
        var destinationSource = this.parentView.getContext().dataSources[destinationSourceName];
        var propertyName = this.getProperty('destinationProperty');

        if( _.isEmpty(propertyName) ){
            return destinationSource.getSelectedItem();
        }

        var index = this.getProperty('index');
        var destinationSourceItems = destinationSource.getItems();

        return destinationSourceItems[index];
    }
});