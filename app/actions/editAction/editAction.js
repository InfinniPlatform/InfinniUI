function EditAction(parentView){
    _.superClass(EditAction, this, parentView);
}

_.inherit(EditAction, BaseEditAction);


_.extend(EditAction.prototype, {
    setSelectedItem: function(){
        var editDataSource = this._getEditDataSource();

        if(!editDataSource.isDataReady()){
            var message = stringUtils.format('{0} не инициализирован. Невозможно установить текущий элемент.', [editDataSource.getName()]);
            InfinniUI.global.logger.error( message );
            return;
        }

        var selectedItem = _.clone( this.getDestinationSelectedItem() );
        editDataSource.setSelectedItem( selectedItem );
    },

    save: function(){
        var destinationSourceName = this.getProperty('destinationSource');
        var destinationSource = this.parentView.getContext().dataSources[destinationSourceName];

        if(destinationSource){
            destinationSource.updateItems();
        }
    },

    // todo: повторяется в DeleteAction, придумать, как обобщить
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