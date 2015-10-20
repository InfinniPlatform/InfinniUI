function DeleteAction(parentView){
    _.superClass(DeleteAction, this, parentView);
}

_.inherit(DeleteAction, BaseAction);


_.extend(DeleteAction.prototype, {
    execute: function(callback){
        var accept = this.getProperty('accept');
        var that = this;

        var deleteSelectedFromParentDataSource = function () {
            var parentDataSource = that.getProperty('parentDataSource'),
                editItem = parentDataSource.getSelectedItem();

            var onSuccessDelete = function () {
                parentDataSource.updateItems();

                if (callback) {
                    callback();
                }
            };

            parentDataSource.deleteItem(editItem, onSuccessDelete);
        };

        if(accept){
            new MessageBox({
                text: 'Вы уверены, что хотите удалить?',
                buttons: [
                    {
                        name: 'Да',
                        type: 'action',
                        onClick: deleteSelectedFromParentDataSource
                    },
                    {
                        name: 'Нет'
                    }
                ]
            });
        } else {
            deleteSelectedFromParentDataSource();
        }
    }
});