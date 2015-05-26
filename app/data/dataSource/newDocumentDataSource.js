var DocumentDataSource = BaseDataSource.extend({
    saveItem : function (item, onSuccess) {
        var dataProvider = this.get('dataProvider'),
            showingWarnings = this.get('showingWarnings'),
            that = this;

        dataProvider.replaceItem(item, showingWarnings, function (data) {
            var idProperty = that.get('idProperty');

            if ((data.IsValid === false) ) {

                that.trigger('error', data.ValidationMessage);

            } else {

                if(!(data instanceof Array) && item != null) {
                    item[idProperty] = data.InstanceId;
                    that.setSelectedItem(item);
                    //currentStrategy.onItemSaved(item, data);

                    if (data.InstanceId) {
                        var instanceId = InfinniUI.ObjectUtils.getPropertyValue(data, 'InstanceId');
                        InfinniUI.ObjectUtils.setPropertyValue(value, idProperty, instanceId);
                    }

                    that.trigger('error', item);
                    that.resetModified(item);
                }

                if (onSuccess) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    onSuccess.apply(undefined, args);
                }

            }
        });
    }
});