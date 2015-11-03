function DeleteItemAction(parentView){
    _.superClass(DeleteItemAction, this, parentView);
}

_.inherit(DeleteItemAction, BaseAction);


_.extend(DeleteItemAction.prototype, {
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
                        onClick: that.deleteSelectedItemFromArrayProperty.bind(this, callback)
                    },
                    {
                        name: 'Нет'
                    }
                ]
            });
        } else {
            this.deleteSelectedItemFromArrayProperty(callback);
        }
    },

    deleteSelectedItemFromArrayProperty: function (callback) {
        var dataSource = this.getProperty('dataSource'),
            propertyName = this.getProperty('propertyName'),
            index = this.getProperty('index');

        var propertyValue = dataSource.getProperty(propertyName);

        if( !_.isArray(propertyValue) ){
            console.log("%c %s: некорректное свойство %s", "color: red", dataSource.getName(), propertyName );
            return;
        }

        if( (!_.isFinite(index)) || (index >= propertyValue.length) ){
            console.log("%c DeleteItemAction: некорректный индекс элемента", "color: red");
            return;
        }

        var newValue = _.clone(propertyValue);
        newValue.splice(index, 1);
        dataSource.setProperty(propertyName, newValue);

        if ( _.isFunction(callback) ) {
            callback();
        }
    }
});