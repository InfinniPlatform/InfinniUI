function DeleteAction(parentView){
    _.superClass(DeleteAction, this, parentView);
}

_.inherit(DeleteAction, BaseAction);


_.extend(DeleteAction.prototype, {
    execute: function(callback){
        var accept = this.getProperty('accept'),
            that = this,
            dataSource = this.getProperty('destinationSource'),
            property = this.getProperty('destinationProperty');

        if( dataSource.getProperty(property) ) {
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
        } else {
            new MessageBox({
                text: 'Вы не выбрали элемент который необходимо удалить',
                buttons: [
                    {
                        name: 'Закрыть'
                    }
                ]
            });
        }
    },

    remove: function (callback) {
        var dataSource = this.getProperty('destinationSource'),
            property = this.getProperty('destinationProperty');

        if( this._isDocument(property) ) {
            this._deleteDocument(dataSource, property, callback);
        } else {
            this._deleteItem(dataSource, property, callback);
        }
    },

    _deleteDocument: function(dataSource, property, callback){
        var that = this,
            onSuccessDelete = function (context, args) {
                dataSource.updateItems();

                that.onExecutedHandler(args);

                if (_.isFunction(callback)) {
                    callback();
                }
            },
            onErrorDelete = function(context, args){
                that.onExecutedHandler(args);

                if (_.isFunction(callback)) {
                    callback();
                }
            };

        var selectedItem = dataSource.getProperty(property);
        dataSource.deleteItem(selectedItem, onSuccessDelete, onErrorDelete);
    },

    _deleteItem: function(dataSource, property, callback){
        var propertyPathList = property.split("."),
            index = propertyPathList.pop(),
            parentProperty = propertyPathList.join("."),
            items = dataSource.getProperty(parentProperty);

        items = _.clone( items );
        items.splice(index, 1);
        dataSource.setProperty(parentProperty, items);

        this.onExecutedHandler();

        if (_.isFunction(callback)) {
            callback();
        }
    },

    _isDocument: function(propertyName){
        return propertyName == '$' || _.isFinite(propertyName);
    }
});
