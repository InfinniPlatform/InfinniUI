function DeleteAction(parentView){
    _.superClass(DeleteAction, this, parentView);
}

_.inherit(DeleteAction, BaseAction);


_.extend(DeleteAction.prototype, {
    execute: function(callback){
        var accept = this.getProperty('accept');
        var that = this;

        if(accept){
            new MessageBox({
                text: 'Вы уверены, что хотите удалить?',
                buttons: [
                    {
                        name: 'Да',
                        type: 'action',
                        onClick: function() {
                            that.remove(callback);
                        }
                    },
                    {
                        name: 'Нет'
                    }
                ]
            });
        } else {
            this.remove(callback);
        }
    },

    remove: function (callback) {
        var dataSource = this.getProperty('destinationSource');

        var onSuccessDelete = function () {
            dataSource.updateItems();

            if (_.isFunction(callback)) {
                callback();
            }
        };

        dataSource.deleteItem(this.getDestinationSelectedItem(), onSuccessDelete);
    },

    // todo: повторяет метод из EditAction, придумать, как обобщить
    getDestinationSelectedItem: function(){
        var destinationSource = this.getProperty('destinationSource');
        var propertyName = this.getProperty('destinationProperty');

        if( _.isEmpty(propertyName) ){
            return destinationSource.getSelectedItem();
        }

        var index = this.getProperty('index');
        var destinationSourceItems = destinationSource.getItems();

        return destinationSourceItems[index];
    }
});