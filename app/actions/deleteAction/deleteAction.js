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
        var dataSource = this.getProperty('destinationSource'),
            property = this.getProperty('destinationProperty');

        if( this._isPredefinedIdentifierProperty(property) ) {
            this._deleteDocument(dataSource, property);
        } else {
            this._deleteItem(dataSource, property);
        }

        if ( _.isFunction(callback) ) {
            callback();
        }
    },

    _deleteDocument: function(dataSource, property){
        var onSuccessDelete = function () {
            dataSource.updateItems();

            if (_.isFunction(callback)) {
                callback();
            }
        };

        var selectedItem = dataSource.getProperty(property);
        dataSource.deleteItem(selectedItem, onSuccessDelete);
    },

    _deleteItem: function(dataSource, property){
        var propertyPathList = property.split("."),
            index = propertyPathList.pop(),
            parentProperty = propertyPathList.join("."),
            items = dataSource.getProperty(parentProperty);

        items = _.clone( items );
        items.splice(index, 1);
        dataSource.setProperty(parentProperty, items);
    },

    _isPredefinedIdentifierProperty: function(propertyName){
        return propertyName == '$' || propertyName == '#';
    }
});
