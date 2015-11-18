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
                        onClick: function(){
                            that.remove(callback)
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
            propertyName = this.getProperty('destinationProperty'),
            index = this.getProperty('index');

        // важно для изменения массива использовать именно setProperty (иначе не произойдёт OnItemsUpdate),
        // поэтому работать с массивом по ссылке нельзя
        var items = _.clone( dataSource.getProperty(propertyName) );

        if( !_.isArray(items) ){
            var message = stringUtils.format("{0}: некорректное свойство {1}", "color: red", [dataSource.getName(), propertyName]);
            logger.error( message );
            return;
        }

        if( (!_.isFinite(index)) || (index >= items.length) ){
            logger.error("DeleteItemAction: некорректный индекс элемента");
            return;
        }

        items.splice(index, 1);
        dataSource.setProperty(propertyName, items);

        if ( _.isFunction(callback) ) {
            callback();
        }
    }
});