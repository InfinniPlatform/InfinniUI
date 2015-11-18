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
            editItem = dataSource.getSelectedItem();

        var onSuccessDelete = function () {
            dataSource.updateItems();

            if (_.isFunction(callback)) {
                callback();
            }
        };

        dataSource.deleteItem(editItem, onSuccessDelete);
    }
});